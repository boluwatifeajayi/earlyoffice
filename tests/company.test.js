process.env.TOKEN_KEY = 'earlyoffice-test-secret';
process.env.NODE_ENV = 'test';

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../testApp');
const Company = require('../models/company.model');

let mongo;
let seedCompany;
let companyToken;

const uid = () => `${Date.now()}${Math.random().toString(36).slice(2, 8)}`;

function makeCompanyToken(company) {
  const token = jwt.sign(
    { companyId: company._id.toString(), orgEmail: company.orgEmail },
    process.env.TOKEN_KEY
  );
  return token;
}

beforeAll(async () => {
  mongo = await MongoMemoryServer.create({ instance: { startupTimeout: 120000 } });
  await mongoose.connect(mongo.getUri());

  seedCompany = await Company.create({
    orgEmail: `seed_${uid()}@corp.com`,
    orgName: `SeedCorp_${uid()}`,
    orgPassword: 'hashedpassword',
    phoneNumber: '08022222222',
  });
  companyToken = makeCompanyToken(seedCompany);
}, 120000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

// ---------------------------------------------------------------------------
// GET /api/company/all — public
// ---------------------------------------------------------------------------

describe('GET /api/company/all', () => {
  it('returns array of all companies (public)', async () => {
    const res = await request(app).get('/api/company/all');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it('returns companies with expected fields', async () => {
    const res = await request(app).get('/api/company/all');
    const found = res.body.find(c => c.orgEmail === seedCompany.orgEmail);
    expect(found).toBeDefined();
    expect(found.orgName).toBe(seedCompany.orgName);
  });
});

// ---------------------------------------------------------------------------
// GET /api/company/id/:id — public
// ---------------------------------------------------------------------------

describe('GET /api/company/id/:id', () => {
  it('returns a company by id', async () => {
    const res = await request(app).get(`/api/company/id/${seedCompany._id}`);
    expect(res.status).toBe(200);
    expect(res.body.orgEmail).toBe(seedCompany.orgEmail);
  });

  it('returns 404 for invalid id', async () => {
    const res = await request(app).get('/api/company/id/badid000000');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// GET /api/company/one — protected (company token)
// ---------------------------------------------------------------------------

describe('GET /api/company/one', () => {
  it('returns the authenticated company profile (no password)', async () => {
    const res = await request(app)
      .get('/api/company/one')
      .set('Authorization', `Bearer ${companyToken}`)
      .set('Cookie', `authToken=${companyToken}`);

    expect(res.status).toBe(200);
    expect(res.body.orgEmail).toBe(seedCompany.orgEmail);
    expect(res.body.orgPassword).toBeUndefined();
  });

  it('rejects without token', async () => {
    const res = await request(app).get('/api/company/one');
    expect(res.status).toBe(401);
  });

  it('returns 400 when token does not contain companyId', async () => {
    // Student token has studentId, not companyId
    const studentToken = jwt.sign({ studentId: 'some-id', email: 'x@x.com' }, process.env.TOKEN_KEY);
    const res = await request(app)
      .get('/api/company/one')
      .set('Authorization', `Bearer ${studentToken}`)
      .set('Cookie', `authToken=${studentToken}`);

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/registered company/i);
  });
});
