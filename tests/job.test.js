process.env.TOKEN_KEY = 'earlyoffice-test-secret';
process.env.NODE_ENV = 'test';

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../testApp');
const Company = require('../models/company.model');
const Student = require('../models/student.model');
const Job = require('../models/job.model');

let mongo;
let seedCompany;
let companyToken;
let seedStudent;
let studentToken;

const uid = () => `${Date.now()}${Math.random().toString(36).slice(2, 8)}`;

function makeJobPayload(overrides = {}) {
  return {
    jobProfile: 'Software Engineering',
    jobName: `Backend Intern_${uid()}`,
    jobDescription: 'Build and maintain APIs',
    jobType: 'internship',
    numberOfOpenings: '3',
    applicationDeadline: '2025-12-31',
    salary: '50000',
    applicationInfo: 'Apply via email',
    educationLevel: 'undergraduate',
    experienceLevel: 'entry',
    skillsRequired: 'Node.js, MongoDB',
    duration: '3 months',
    place: 'Lagos',
    benefits: 'lunch, transport',
    ...overrides,
  };
}

beforeAll(async () => {
  mongo = await MongoMemoryServer.create({ instance: { startupTimeout: 120000 } });
  await mongoose.connect(mongo.getUri());

  // Company with a recognisable orgName for route tests
  seedCompany = await Company.create({
    orgEmail: `company_${uid()}@corp.com`,
    orgName: `InternCorp_${uid()}`,
    orgPassword: 'hashed',
    phoneNumber: '08033333333',
  });
  companyToken = jwt.sign(
    { companyId: seedCompany._id.toString(), orgEmail: seedCompany.orgEmail },
    process.env.TOKEN_KEY
  );

  // Student with ALL required fields for the applyToJob endpoint
  seedStudent = await Student.create({
    email: `student_${uid()}@test.com`,
    firstname: 'Bob',
    lastname: 'Intern',
    phoneNumber: '08044444444',
    currentLocation: 'Abuja',
    degree: 'BSc Computer Science',
    fieldOfInterest: 'Backend',
    grade: '4.5',
    resume: 'https://example.com/resume.pdf',
    schoolName: 'University of Lagos',
    skills: 'Node.js',
    status: 'undergraduate',
    workDescription: 'Helped build things',
    workName: 'Startup',
    workTitle: 'Developer',
    works: 'https://github.com/bob',
  });
  studentToken = jwt.sign(
    { studentId: seedStudent._id.toString(), email: seedStudent.email },
    process.env.TOKEN_KEY
  );
}, 120000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

afterEach(async () => {
  await Job.deleteMany({});
});

// ---------------------------------------------------------------------------
// POST /api/company/job/create — protected company
// ---------------------------------------------------------------------------

describe('POST /api/company/job/create', () => {
  it('creates a job and embeds company info', async () => {
    const res = await request(app)
      .post('/api/company/job/create')
      .set('Authorization', `Bearer ${companyToken}`)
      .set('Cookie', `authToken=${companyToken}`)
      .send(makeJobPayload());

    expect(res.status).toBe(201);
    expect(res.body._id).toBeDefined();
    expect(res.body.jobType).toBe('internship');
    expect(res.body.org.orgName).toBe(seedCompany.orgName);
    expect(res.body.org.orgEmail).toBe(seedCompany.orgEmail);
    expect(res.body.student).toHaveLength(0);
  });

  it('rejects without token', async () => {
    const res = await request(app).post('/api/company/job/create').send(makeJobPayload());
    expect(res.status).toBe(401);
  });

  it('returns 400 when token lacks companyId', async () => {
    const res = await request(app)
      .post('/api/company/job/create')
      .set('Authorization', `Bearer ${studentToken}`)
      .set('Cookie', `authToken=${studentToken}`)
      .send(makeJobPayload());
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/company/i);
  });
});

// ---------------------------------------------------------------------------
// GET /api/jobs — public
// ---------------------------------------------------------------------------

describe('GET /api/jobs', () => {
  it('returns empty array when no jobs', async () => {
    const res = await request(app).get('/api/jobs');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('returns all jobs after creation', async () => {
    await request(app)
      .post('/api/company/job/create')
      .set('Authorization', `Bearer ${companyToken}`)
      .set('Cookie', `authToken=${companyToken}`)
      .send(makeJobPayload({ jobName: 'Job Alpha' }));

    await request(app)
      .post('/api/company/job/create')
      .set('Authorization', `Bearer ${companyToken}`)
      .set('Cookie', `authToken=${companyToken}`)
      .send(makeJobPayload({ jobName: 'Job Beta' }));

    const res = await request(app).get('/api/jobs');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });
});

// ---------------------------------------------------------------------------
// GET /api/jobs/search — public, keyword search
// ---------------------------------------------------------------------------

describe('GET /api/jobs/search', () => {
  beforeEach(async () => {
    await request(app)
      .post('/api/company/job/create')
      .set('Authorization', `Bearer ${companyToken}`)
      .set('Cookie', `authToken=${companyToken}`)
      .send(makeJobPayload({ jobName: 'Frontend React Intern', place: 'Lagos' }));

    await request(app)
      .post('/api/company/job/create')
      .set('Authorization', `Bearer ${companyToken}`)
      .set('Cookie', `authToken=${companyToken}`)
      .send(makeJobPayload({ jobName: 'Backend Node Intern', place: 'Abuja' }));
  });

  it('returns matching jobs by keyword', async () => {
    const res = await request(app).get('/api/jobs/search?search=Frontend');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some(j => j.jobName.includes('Frontend'))).toBe(true);
  });

  it('filters by location when both search and location given', async () => {
    const res = await request(app).get('/api/jobs/search?search=Intern&location=Abuja');
    expect(res.status).toBe(200);
    expect(res.body.every(j => j.place.toLowerCase().includes('abuja'))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// GET /api/company/jobs — protected company, own jobs only
// ---------------------------------------------------------------------------

describe('GET /api/company/jobs', () => {
  it('returns only jobs belonging to the authenticated company', async () => {
    await request(app)
      .post('/api/company/job/create')
      .set('Authorization', `Bearer ${companyToken}`)
      .set('Cookie', `authToken=${companyToken}`)
      .send(makeJobPayload({ jobName: 'My Company Job' }));

    const res = await request(app)
      .get('/api/company/jobs')
      .set('Authorization', `Bearer ${companyToken}`)
      .set('Cookie', `authToken=${companyToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.every(j => j.org.orgEmail === seedCompany.orgEmail)).toBe(true);
  });

  it('rejects without token', async () => {
    const res = await request(app).get('/api/company/jobs');
    expect(res.status).toBe(401);
  });
});

// ---------------------------------------------------------------------------
// GET /api/jobs/:orgName — public, jobs by company name
// ---------------------------------------------------------------------------

describe('GET /api/jobs/:orgName', () => {
  it('returns jobs belonging to the named company', async () => {
    await request(app)
      .post('/api/company/job/create')
      .set('Authorization', `Bearer ${companyToken}`)
      .set('Cookie', `authToken=${companyToken}`)
      .send(makeJobPayload());

    const res = await request(app).get(`/api/jobs/${encodeURIComponent(seedCompany.orgName)}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.every(j => j.org.orgName === seedCompany.orgName)).toBe(true);
  });

  it('returns empty array for unknown company name', async () => {
    const res = await request(app).get('/api/jobs/UnknownOrg99999');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// GET /api/jobs/id/:jobId — public
// ---------------------------------------------------------------------------

describe('GET /api/jobs/id/:jobId', () => {
  let jobId;

  beforeEach(async () => {
    const create = await request(app)
      .post('/api/company/job/create')
      .set('Authorization', `Bearer ${companyToken}`)
      .set('Cookie', `authToken=${companyToken}`)
      .send(makeJobPayload({ jobName: 'Get By ID Job' }));
    jobId = create.body._id;
  });

  it('returns the job by id', async () => {
    const res = await request(app).get(`/api/jobs/id/${jobId}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(jobId);
    expect(res.body.jobName).toBe('Get By ID Job');
  });

  it('returns 404 for invalid id', async () => {
    const res = await request(app).get('/api/jobs/id/badjobid000');
    expect(res.status).toBe(404);
  });
});

// ---------------------------------------------------------------------------
// GET /api/jobs/state/:place — public, filter by location
// ---------------------------------------------------------------------------

describe('GET /api/jobs/state/:place', () => {
  beforeEach(async () => {
    await request(app)
      .post('/api/company/job/create')
      .set('Authorization', `Bearer ${companyToken}`)
      .set('Cookie', `authToken=${companyToken}`)
      .send(makeJobPayload({ place: 'Kano' }));
  });

  it('returns jobs in the given state/city', async () => {
    const res = await request(app).get('/api/jobs/state/Kano');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.every(j => j.place === 'Kano')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// GET /api/jobs/type/:jobProfile — public, filter by profile type
// ---------------------------------------------------------------------------

describe('GET /api/jobs/type/:jobProfile', () => {
  beforeEach(async () => {
    await request(app)
      .post('/api/company/job/create')
      .set('Authorization', `Bearer ${companyToken}`)
      .set('Cookie', `authToken=${companyToken}`)
      .send(makeJobPayload({ jobProfile: 'Design' }));
  });

  it('returns jobs matching the profile type', async () => {
    const res = await request(app).get('/api/jobs/type/Design');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.every(j => j.jobProfile === 'Design')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// POST /api/jobs/:jobid/apply — protected student
// ---------------------------------------------------------------------------

describe('POST /api/jobs/:jobid/apply', () => {
  let jobId;

  beforeEach(async () => {
    const create = await request(app)
      .post('/api/company/job/create')
      .set('Authorization', `Bearer ${companyToken}`)
      .set('Cookie', `authToken=${companyToken}`)
      .send(makeJobPayload({ jobName: 'Applyable Job' }));
    jobId = create.body._id;
  });

  it('student applies to a job and is added to student array', async () => {
    const res = await request(app)
      .post(`/api/jobs/${jobId}/apply`)
      .set('Authorization', `Bearer ${studentToken}`)
      .set('Cookie', `authToken=${studentToken}`)
      .send({ coverLetter: 'I am a perfect fit.' });

    expect(res.status).toBe(201);
    expect(res.body.student).toHaveLength(1);
    expect(res.body.student[0].studentEmail).toBe(seedStudent.email);
    expect(res.body.student[0].coverLetter).toBe('I am a perfect fit.');
    expect(res.body.student[0].status).toBe('pending');
  });

  it('rejects duplicate application from the same student', async () => {
    await request(app)
      .post(`/api/jobs/${jobId}/apply`)
      .set('Authorization', `Bearer ${studentToken}`)
      .set('Cookie', `authToken=${studentToken}`)
      .send({ coverLetter: 'First apply.' });

    const res = await request(app)
      .post(`/api/jobs/${jobId}/apply`)
      .set('Authorization', `Bearer ${studentToken}`)
      .set('Cookie', `authToken=${studentToken}`)
      .send({ coverLetter: 'Duplicate apply.' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/already applied/i);
  });

  it('rejects application without token', async () => {
    const res = await request(app)
      .post(`/api/jobs/${jobId}/apply`)
      .send({ coverLetter: 'No auth.' });
    expect(res.status).toBe(401);
  });
});

// ---------------------------------------------------------------------------
// GET /api/jobs/student/applications/applied-jobs — protected student
// ---------------------------------------------------------------------------

describe('GET /api/jobs/student/applications/applied-jobs', () => {
  let jobId;

  beforeEach(async () => {
    const create = await request(app)
      .post('/api/company/job/create')
      .set('Authorization', `Bearer ${companyToken}`)
      .set('Cookie', `authToken=${companyToken}`)
      .send(makeJobPayload({ jobName: 'Applied Job' }));
    jobId = create.body._id;
  });

  it('returns jobs the student has applied to', async () => {
    await request(app)
      .post(`/api/jobs/${jobId}/apply`)
      .set('Authorization', `Bearer ${studentToken}`)
      .set('Cookie', `authToken=${studentToken}`)
      .send({ coverLetter: 'Applying!' });

    const res = await request(app)
      .get('/api/jobs/student/applications/applied-jobs')
      .set('Authorization', `Bearer ${studentToken}`)
      .set('Cookie', `authToken=${studentToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some(j => j._id.toString() === jobId)).toBe(true);
  });

  it('rejects without token', async () => {
    const res = await request(app).get('/api/jobs/student/applications/applied-jobs');
    expect(res.status).toBe(401);
  });
});

// ---------------------------------------------------------------------------
// PATCH /api/jobs/:jobId/decide — protected company
// ---------------------------------------------------------------------------

describe('PATCH /api/jobs/:jobId/decide', () => {
  let jobId;

  beforeEach(async () => {
    const create = await request(app)
      .post('/api/company/job/create')
      .set('Authorization', `Bearer ${companyToken}`)
      .set('Cookie', `authToken=${companyToken}`)
      .send(makeJobPayload({ jobName: 'Decide Job' }));
    jobId = create.body._id;

    // Student applies first
    await request(app)
      .post(`/api/jobs/${jobId}/apply`)
      .set('Authorization', `Bearer ${studentToken}`)
      .set('Cookie', `authToken=${studentToken}`)
      .send({ coverLetter: 'Please accept me.' });
  });

  it('updates the student application status to accepted', async () => {
    const res = await request(app)
      .patch(`/api/jobs/${jobId}/decide`)
      .set('Authorization', `Bearer ${companyToken}`)
      .set('Cookie', `authToken=${companyToken}`)
      .query({ studentId: seedStudent._id.toString(), status: 'accepted' });

    expect(res.status).toBe(200);
    const applicant = res.body.student.find(
      s => s.studentId.toString() === seedStudent._id.toString()
    );
    expect(applicant.status).toBe('accepted');
  });

  it('rejects without token', async () => {
    const res = await request(app)
      .patch(`/api/jobs/${jobId}/decide`)
      .query({ studentId: seedStudent._id.toString(), status: 'accepted' });
    expect(res.status).toBe(401);
  });
});

// ---------------------------------------------------------------------------
// PUT /api/jobs/update/:jobId — protected
// ---------------------------------------------------------------------------

describe('PUT /api/jobs/update/:jobId', () => {
  let jobId;

  beforeEach(async () => {
    const create = await request(app)
      .post('/api/company/job/create')
      .set('Authorization', `Bearer ${companyToken}`)
      .set('Cookie', `authToken=${companyToken}`)
      .send(makeJobPayload({ jobName: 'Update Target' }));
    jobId = create.body._id;
  });

  it('updates job fields and returns updated document', async () => {
    const res = await request(app)
      .put(`/api/jobs/update/${jobId}`)
      .set('Authorization', `Bearer ${companyToken}`)
      .set('Cookie', `authToken=${companyToken}`)
      .send({ jobName: 'Renamed Job', salary: '75000' });

    expect(res.status).toBe(200);
    expect(res.body.jobName).toBe('Renamed Job');
    expect(res.body.salary).toBe('75000');
  });

  it('rejects without token', async () => {
    const res = await request(app)
      .put(`/api/jobs/update/${jobId}`)
      .send({ jobName: 'NoAuth' });
    expect(res.status).toBe(401);
  });
});

// ---------------------------------------------------------------------------
// DELETE /api/jobs/delete/:jobId — protected
// ---------------------------------------------------------------------------

describe('DELETE /api/jobs/delete/:jobId', () => {
  let jobId;

  beforeEach(async () => {
    const create = await request(app)
      .post('/api/company/job/create')
      .set('Authorization', `Bearer ${companyToken}`)
      .set('Cookie', `authToken=${companyToken}`)
      .send(makeJobPayload({ jobName: 'To Delete' }));
    jobId = create.body._id;
  });

  it('deletes the job and returns success message', async () => {
    const res = await request(app)
      .delete(`/api/jobs/delete/${jobId}`)
      .set('Authorization', `Bearer ${companyToken}`)
      .set('Cookie', `authToken=${companyToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);

    // Verify gone
    const check = await Job.findById(jobId);
    expect(check).toBeNull();
  });

  it('rejects without token', async () => {
    const res = await request(app).delete(`/api/jobs/delete/${jobId}`);
    expect(res.status).toBe(401);
  });
});
