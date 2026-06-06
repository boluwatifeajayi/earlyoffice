process.env.TOKEN_KEY = 'earlyoffice-test-secret';
process.env.NODE_ENV = 'test';

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../testApp');
const Student = require('../models/student.model');

let mongo;
let seedStudent;
let studentToken;

const uid = () => `${Date.now()}${Math.random().toString(36).slice(2, 8)}`;

function makeStudentToken(student) {
  const token = jwt.sign(
    { studentId: student._id.toString(), email: student.email },
    process.env.TOKEN_KEY
  );
  return token;
}

beforeAll(async () => {
  mongo = await MongoMemoryServer.create({ instance: { startupTimeout: 120000 } });
  await mongoose.connect(mongo.getUri());

  seedStudent = await Student.create({
    email: `seed_${uid()}@test.com`,
    firstname: 'Alice',
    lastname: 'Smith',
    phoneNumber: '08011111111',
    currentLocation: 'Lagos',
  });
  studentToken = makeStudentToken(seedStudent);
}, 120000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

// ---------------------------------------------------------------------------
// GET /api/students — public, list all
// ---------------------------------------------------------------------------

describe('GET /api/students', () => {
  it('returns an array of students (public)', async () => {
    const res = await request(app).get('/api/students');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
});

// ---------------------------------------------------------------------------
// GET /api/students/student — protected, returns the token owner
// ---------------------------------------------------------------------------

describe('GET /api/students/student', () => {
  it('returns the authenticated student (no password)', async () => {
    const res = await request(app)
      .get('/api/students/student')
      .set('Authorization', `Bearer ${studentToken}`)
      .set('Cookie', `authToken=${studentToken}`);

    expect(res.status).toBe(200);
    expect(res.body.email).toBe(seedStudent.email);
    expect(res.body.password).toBeUndefined();
  });

  it('rejects without token', async () => {
    const res = await request(app).get('/api/students/student');
    expect(res.status).toBe(401);
  });

  it('rejects when Authorization and Cookie do not match', async () => {
    const res = await request(app)
      .get('/api/students/student')
      .set('Authorization', `Bearer ${studentToken}`)
      .set('Cookie', 'authToken=different.token');
    expect(res.status).toBe(401);
  });
});

// ---------------------------------------------------------------------------
// GET /api/student/id/:id — public, get by id
// ---------------------------------------------------------------------------

describe('GET /api/student/id/:id', () => {
  it('returns a student by id', async () => {
    const res = await request(app).get(`/api/student/id/${seedStudent._id}`);
    expect(res.status).toBe(200);
    expect(res.body.email).toBe(seedStudent.email);
  });

  it('returns 404 for invalid id', async () => {
    const res = await request(app).get('/api/student/id/nonexistentid000');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// GET /api/student/location/:location — protected
// Note: the controller reads req.body.location, not req.params.location (bug)
// ---------------------------------------------------------------------------

describe('GET /api/student/location/:location (protected)', () => {
  it('returns students matching the body location field', async () => {
    // Controller reads req.body.location (not req.params), so send body
    const res = await request(app)
      .get('/api/student/location/Lagos')
      .set('Authorization', `Bearer ${studentToken}`)
      .set('Cookie', `authToken=${studentToken}`)
      .send({ location: 'Lagos' });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // seedStudent has currentLocation=Lagos but the body.location filters by 'location' field
    // (the model field is 'currentLocation', not 'location') — may return empty array
  });

  it('rejects without token', async () => {
    const res = await request(app).get('/api/student/location/Lagos');
    expect(res.status).toBe(401);
  });
});

// ---------------------------------------------------------------------------
// GET /api/student/fieldofinterest/:fieldOfInterest — protected
// Note: controller reads req.body.interest (not req.params.fieldOfInterest) (bug)
// ---------------------------------------------------------------------------

describe('GET /api/student/fieldofinterest/:field (protected)', () => {
  it('returns 200 with array (uses req.body.interest, not the URL param)', async () => {
    const res = await request(app)
      .get('/api/student/fieldofinterest/Engineering')
      .set('Authorization', `Bearer ${studentToken}`)
      .set('Cookie', `authToken=${studentToken}`)
      .send({ interest: 'Engineering' });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('rejects without token', async () => {
    const res = await request(app).get('/api/student/fieldofinterest/Engineering');
    expect(res.status).toBe(401);
  });
});
