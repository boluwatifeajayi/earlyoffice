process.env.TOKEN_KEY = 'earlyoffice-test-secret';
process.env.NODE_ENV = 'test';

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../testApp');
const Student = require('../models/student.model');
const Company = require('../models/company.model');
const Admin = require('../models/admin.model');

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create({ instance: { startupTimeout: 120000 } });
  await mongoose.connect(mongo.getUri());
}, 120000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

afterEach(async () => {
  await Student.deleteMany({});
  await Company.deleteMany({});
  await Admin.deleteMany({});
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const uid = () => `${Date.now()}${Math.random().toString(36).slice(2, 8)}`;

const makeStudent = (overrides = {}) => {
  const id = uid();
  return {
    firstname: 'Test',
    lastname: 'Student',
    email: `student_${id}@test.com`,
    password: 'Secret123!',
    phoneNumber: '08012345678',
    ...overrides,
  };
};

const makeCompany = (overrides = {}) => {
  const id = uid();
  return {
    adminFirstName: 'Admin',
    adminLastName: 'User',
    orgEmail: `company_${id}@corp.com`,
    orgPassword: 'CorpPass123!',
    phoneNumber: '08098765432',
    orgName: `TechCorp_${id}`,
    ...overrides,
  };
};

const makeAdmin = (overrides = {}) => {
  const id = uid();
  return {
    username: `admin_${id}`,
    email: `admin_${id}@earlyoffice.com`,
    password: 'AdminPass123!',
    ...overrides,
  };
};

// ---------------------------------------------------------------------------
// Student sign-up
// ---------------------------------------------------------------------------

describe('POST /api/student/signUp', () => {
  it('creates a student and returns authToken with cookie', async () => {
    const data = makeStudent();
    const res = await request(app).post('/api/student/signUp').send(data);

    expect(res.status).toBe(201);
    expect(res.body.authToken).toBeDefined();
    expect(res.body.currentStudent.email).toBe(data.email);
    expect(res.body.currentStudent.firstname).toBe(data.firstname);
    // password must not be in response
    expect(res.body.currentStudent.password).not.toBe(data.password);
    // cookie set on response
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('rejects duplicate email with 400', async () => {
    const data = makeStudent();
    await request(app).post('/api/student/signUp').send(data);
    const res = await request(app).post('/api/student/signUp').send(data);

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/already registered/i);
  });

  it('rejects missing firstname with 422 (validation)', async () => {
    const data = makeStudent({ firstname: undefined });
    const res = await request(app).post('/api/student/signUp').send(data);
    expect(res.status).toBe(422);
    expect(res.body.error).toBeDefined();
  });

  it('rejects missing phoneNumber with 422', async () => {
    const data = makeStudent({ phoneNumber: undefined });
    const res = await request(app).post('/api/student/signUp').send(data);
    expect(res.status).toBe(422);
  });

  it('rejects invalid email format with 422', async () => {
    const data = makeStudent({ email: 'not-an-email' });
    const res = await request(app).post('/api/student/signUp').send(data);
    expect(res.status).toBe(422);
  });
});

// ---------------------------------------------------------------------------
// Student sign-in
// ---------------------------------------------------------------------------

describe('POST /api/student/signIn', () => {
  let seed;

  beforeEach(async () => {
    seed = makeStudent();
    await request(app).post('/api/student/signUp').send(seed);
  });

  it('returns authToken for valid credentials', async () => {
    const res = await request(app)
      .post('/api/student/signIn')
      .send({ email: seed.email, password: seed.password });

    expect(res.status).toBe(200);
    expect(res.body.authToken).toBeDefined();
    expect(res.body.currentStudent.email).toBe(seed.email);
    // cookie set
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('rejects wrong password', async () => {
    const res = await request(app)
      .post('/api/student/signIn')
      .send({ email: seed.email, password: 'wrongpassword' });
    expect(res.status).toBe(401);
    expect(res.body.error).toBeDefined();
  });

  it('rejects non-existent email', async () => {
    const res = await request(app)
      .post('/api/student/signIn')
      .send({ email: 'ghost@nowhere.com', password: seed.password });
    expect(res.status).toBe(401);
    expect(res.body.error).toBeDefined();
  });

  it('rejects missing email with 422 (validation)', async () => {
    const res = await request(app)
      .post('/api/student/signIn')
      .send({ password: seed.password });
    expect(res.status).toBe(422);
  });
});

// ---------------------------------------------------------------------------
// Company sign-up
// ---------------------------------------------------------------------------

describe('POST /api/company/signUp', () => {
  it('creates a company and returns authToken', async () => {
    const data = makeCompany();
    const res = await request(app).post('/api/company/signUp').send(data);

    expect(res.status).toBe(201);
    expect(res.body.authToken).toBeDefined();
    expect(res.body.currentCompany.orgName).toBe(data.orgName);
    expect(res.body.currentCompany.orgEmail).toBe(data.orgEmail);
  });

  it('rejects duplicate orgEmail with 400', async () => {
    const data = makeCompany();
    await request(app).post('/api/company/signUp').send(data);

    // Same email, different org name
    const dup = { ...data, orgName: `DiffCorp_${uid()}` };
    const res = await request(app).post('/api/company/signUp').send(dup);
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('rejects missing orgName with 422', async () => {
    const data = makeCompany({ orgName: undefined });
    const res = await request(app).post('/api/company/signUp').send(data);
    expect(res.status).toBe(422);
  });

  it('rejects missing adminFirstName with 422', async () => {
    const data = makeCompany({ adminFirstName: undefined });
    const res = await request(app).post('/api/company/signUp').send(data);
    expect(res.status).toBe(422);
  });
});

// ---------------------------------------------------------------------------
// Company sign-in
// ---------------------------------------------------------------------------

describe('POST /api/company/signIn', () => {
  let seed;

  beforeEach(async () => {
    seed = makeCompany();
    await request(app).post('/api/company/signUp').send(seed);
  });

  it('returns authToken for valid credentials', async () => {
    const res = await request(app)
      .post('/api/company/signIn')
      .send({ orgEmail: seed.orgEmail, orgPassword: seed.orgPassword });

    expect(res.status).toBe(200);
    expect(res.body.authToken).toBeDefined();
    expect(res.body.currentCompany.orgEmail).toBe(seed.orgEmail);
  });

  it('rejects wrong password', async () => {
    const res = await request(app)
      .post('/api/company/signIn')
      .send({ orgEmail: seed.orgEmail, orgPassword: 'wrongpassword' });
    expect(res.status).toBe(401);
  });

  it('rejects non-existent orgEmail', async () => {
    const res = await request(app)
      .post('/api/company/signIn')
      .send({ orgEmail: 'ghost@corp.com', orgPassword: seed.orgPassword });
    expect(res.status).toBe(401);
  });
});

// ---------------------------------------------------------------------------
// Admin sign-up + sign-in
// ---------------------------------------------------------------------------

describe('POST /api/admin/signUp', () => {
  it('creates an admin and returns authToken', async () => {
    const data = makeAdmin();
    const res = await request(app).post('/api/admin/signUp').send(data);

    expect(res.status).toBe(201);
    expect(res.body.authToken).toBeDefined();
    expect(res.body.currentadmin.username).toBe(data.username);
    expect(res.body.currentadmin.email).toBe(data.email);
  });

  it('rejects duplicate admin email', async () => {
    const data = makeAdmin();
    await request(app).post('/api/admin/signUp').send(data);
    const dup = { ...data, username: `admin_${uid()}` };
    const res = await request(app).post('/api/admin/signUp').send(dup);
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});

describe('POST /api/admin/signIn', () => {
  let seed;

  beforeEach(async () => {
    seed = makeAdmin();
    await request(app).post('/api/admin/signUp').send(seed);
  });

  it('returns authToken for valid credentials', async () => {
    const res = await request(app)
      .post('/api/admin/signIn')
      .send({ username: seed.username, password: seed.password });

    expect(res.status).toBe(200);
    expect(res.body.authToken).toBeDefined();
    expect(res.body.currentadmin.username).toBe(seed.username);
  });

  it('rejects wrong password', async () => {
    const res = await request(app)
      .post('/api/admin/signIn')
      .send({ username: seed.username, password: 'wrongpassword' });
    expect(res.status).toBe(401);
  });

  it('rejects non-existent username', async () => {
    const res = await request(app)
      .post('/api/admin/signIn')
      .send({ username: 'ghost_admin', password: seed.password });
    expect(res.status).toBe(401);
  });
});

// ---------------------------------------------------------------------------
// Logout
// ---------------------------------------------------------------------------

describe('POST /api/logout', () => {
  let studentToken;

  beforeEach(async () => {
    const student = await Student.create({
      email: `logout_${uid()}@test.com`,
      firstname: 'Logout',
      lastname: 'Test',
    });
    studentToken = jwt.sign(
      { studentId: student._id.toString(), email: student.email },
      process.env.TOKEN_KEY
    );
  });

  it('clears the authToken cookie', async () => {
    const res = await request(app)
      .post('/api/logout')
      .set('Authorization', `Bearer ${studentToken}`)
      .set('Cookie', `authToken=${studentToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toBe('Logout successful');
    // Cookie should be cleared (set with empty/expired value)
    const setCookie = res.headers['set-cookie'];
    expect(setCookie).toBeDefined();
    expect(setCookie.join(',')).toMatch(/authToken/);
  });

  it('rejects logout without token', async () => {
    const res = await request(app).post('/api/logout');
    expect(res.status).toBe(401);
  });

  it('rejects logout when header and cookie do not match', async () => {
    const res = await request(app)
      .post('/api/logout')
      .set('Authorization', `Bearer ${studentToken}`)
      .set('Cookie', 'authToken=wrong.token.value');
    expect(res.status).toBe(401);
  });
});
