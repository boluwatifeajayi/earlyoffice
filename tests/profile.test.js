process.env.TOKEN_KEY = 'earlyoffice-test-secret';
process.env.NODE_ENV = 'test';

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../testApp');
const Student = require('../models/student.model');
const Company = require('../models/company.model');

let mongo;
let seedStudent;
let studentToken;
let seedCompany;
let companyToken;

const uid = () => `${Date.now()}${Math.random().toString(36).slice(2, 8)}`;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create({ instance: { startupTimeout: 120000 } });
  await mongoose.connect(mongo.getUri());

  seedStudent = await Student.create({
    email: `profile_${uid()}@test.com`,
    firstname: 'Charlie',
    lastname: 'Profile',
    phoneNumber: '08055555555',
  });
  studentToken = jwt.sign(
    { studentId: seedStudent._id.toString(), email: seedStudent.email },
    process.env.TOKEN_KEY
  );

  seedCompany = await Company.create({
    orgEmail: `profile_${uid()}@corp.com`,
    orgName: `ProfileCorp_${uid()}`,
    orgPassword: 'hashed',
    phoneNumber: '08066666666',
  });
  companyToken = jwt.sign(
    { companyId: seedCompany._id.toString(), orgEmail: seedCompany.orgEmail },
    process.env.TOKEN_KEY
  );
}, 120000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

// ---------------------------------------------------------------------------
// GET /api/student/profile — protected student
// ---------------------------------------------------------------------------

describe('GET /api/student/profile', () => {
  it('returns the student profile', async () => {
    const res = await request(app)
      .get('/api/student/profile')
      .set('Authorization', `Bearer ${studentToken}`)
      .set('Cookie', `authToken=${studentToken}`);

    expect(res.status).toBe(200);
    expect(res.body.email).toBe(seedStudent.email);
    expect(res.body.firstname).toBe(seedStudent.firstname);
  });

  it('rejects without token', async () => {
    const res = await request(app).get('/api/student/profile');
    expect(res.status).toBe(401);
  });

  it('returns 400 when token has companyId instead of studentId', async () => {
    const res = await request(app)
      .get('/api/student/profile')
      .set('Authorization', `Bearer ${companyToken}`)
      .set('Cookie', `authToken=${companyToken}`);
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/student/i);
  });
});

// ---------------------------------------------------------------------------
// PUT /api/student/profile/update — protected student
// ---------------------------------------------------------------------------

describe('PUT /api/student/profile/update', () => {
  it('updates student profile fields and returns updated document', async () => {
    const res = await request(app)
      .put('/api/student/profile/update')
      .set('Authorization', `Bearer ${studentToken}`)
      .set('Cookie', `authToken=${studentToken}`)
      .send({
        firstname: 'Updated',
        lastname: 'Name',
        currentLocation: 'Port Harcourt',
        status: 'freshgraduate',
        fieldOfInterest: 'Data Science',
        grade: '3.8',
        schoolName: 'Unilag',
        degree: 'BSc',
        workName: 'FinTech Co',
        workTitle: 'Analyst',
        workDescription: 'Analysed data',
        works: 'https://github.com/updated',
        skills: 'Python, SQL',
      });

    expect(res.status).toBe(200);
    expect(res.body.firstname).toBe('Updated');
    expect(res.body.currentLocation).toBe('Port Harcourt');
    expect(res.body.status).toBe('freshgraduate');
    expect(res.body.fieldOfInterest).toBe('Data Science');
  });

  it('rejects without token', async () => {
    const res = await request(app)
      .put('/api/student/profile/update')
      .send({ firstname: 'NoAuth' });
    expect(res.status).toBe(401);
  });
});

// ---------------------------------------------------------------------------
// PATCH /api/student/profile/update/password — protected student
// ---------------------------------------------------------------------------

describe('PATCH /api/student/profile/update/password', () => {
  it('updates the student password field (raw — controller does not hash)', async () => {
    const res = await request(app)
      .patch('/api/student/profile/update/password')
      .set('Authorization', `Bearer ${studentToken}`)
      .set('Cookie', `authToken=${studentToken}`)
      .send({ password: 'NewPass999!' });

    expect(res.status).toBe(200);
    expect(res.body._id).toBeDefined();
  });

  it('rejects without token', async () => {
    const res = await request(app)
      .patch('/api/student/profile/update/password')
      .send({ password: 'NoAuthPass' });
    expect(res.status).toBe(401);
  });
});

// ---------------------------------------------------------------------------
// GET /api/company/profile — protected company
// ---------------------------------------------------------------------------

describe('GET /api/company/profile', () => {
  it('returns the company profile', async () => {
    const res = await request(app)
      .get('/api/company/profile')
      .set('Authorization', `Bearer ${companyToken}`)
      .set('Cookie', `authToken=${companyToken}`);

    expect(res.status).toBe(200);
    expect(res.body.orgEmail).toBe(seedCompany.orgEmail);
    expect(res.body.orgName).toBe(seedCompany.orgName);
  });

  it('rejects without token', async () => {
    const res = await request(app).get('/api/company/profile');
    expect(res.status).toBe(401);
  });

  it('returns 400 when token has studentId instead of companyId', async () => {
    const res = await request(app)
      .get('/api/company/profile')
      .set('Authorization', `Bearer ${studentToken}`)
      .set('Cookie', `authToken=${studentToken}`);
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/company/i);
  });
});

// ---------------------------------------------------------------------------
// PUT /api/company/profile/update — protected company
// ---------------------------------------------------------------------------

describe('PUT /api/company/profile/update', () => {
  it('updates company profile and returns updated document', async () => {
    const res = await request(app)
      .put('/api/company/profile/update')
      .set('Authorization', `Bearer ${companyToken}`)
      .set('Cookie', `authToken=${companyToken}`)
      .send({
        adminFirstName: 'Jane',
        adminLastName: 'Doe',
        orgLocation: 'Victoria Island, Lagos',
        orgIndustry: 'Technology',
        orgMission: 'Connecting talent with opportunity',
        orgSize: '50-100',
        orgDescription: 'A leading tech company',
        orgWebsite: 'https://profilecorp.com',
        orgBenefits: 'Health insurance, remote work',
      });

    expect(res.status).toBe(201);
    expect(res.body.adminFirstName).toBe('Jane');
    expect(res.body.orgLocation).toBe('Victoria Island, Lagos');
    expect(res.body.orgIndustry).toBe('Technology');
  });

  it('rejects without token', async () => {
    const res = await request(app)
      .put('/api/company/profile/update')
      .send({ adminFirstName: 'NoAuth' });
    expect(res.status).toBe(401);
  });
});
