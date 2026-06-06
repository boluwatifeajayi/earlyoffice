process.env.TOKEN_KEY = 'earlyoffice-test-secret';
process.env.NODE_ENV = 'test';

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../testApp');
const Admin = require('../models/admin.model');
const Student = require('../models/student.model');
const Post = require('../models/post.model');

let mongo;
let seedAdmin;
let adminToken;
let seedStudent;
let studentToken;

const uid = () => `${Date.now()}${Math.random().toString(36).slice(2, 8)}`;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create({ instance: { startupTimeout: 120000 } });
  await mongoose.connect(mongo.getUri());

  seedAdmin = await Admin.create({
    email: `admin_${uid()}@earlyoffice.com`,
    username: `admin_${uid()}`,
    password: 'hashed',
  });
  adminToken = jwt.sign(
    { adminId: seedAdmin._id.toString(), username: seedAdmin.username },
    process.env.TOKEN_KEY
  );

  seedStudent = await Student.create({
    email: `student_${uid()}@test.com`,
    firstname: 'Post',
    lastname: 'Tester',
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
  await Post.deleteMany({});
});

// ---------------------------------------------------------------------------
// POST /api/admin/post/create — protected admin
// ---------------------------------------------------------------------------

describe('POST /api/admin/post/create', () => {
  it('creates a post and returns the document', async () => {
    const res = await request(app)
      .post('/api/admin/post/create')
      .set('Authorization', `Bearer ${adminToken}`)
      .set('Cookie', `authToken=${adminToken}`)
      .send({ title: 'First Post', content: 'Hello world', category: 'tech', tags: 'js,node' });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('First Post');
    expect(res.body.category).toBe('tech');
    expect(res.body.admin.username).toBe(seedAdmin.username);
    expect(res.body._id).toBeDefined();
  });

  it('rejects without token', async () => {
    const res = await request(app)
      .post('/api/admin/post/create')
      .send({ title: 'Unauth', content: 'Should fail' });
    expect(res.status).toBe(401);
  });

  it('returns 400 when token does not contain adminId', async () => {
    const res = await request(app)
      .post('/api/admin/post/create')
      .set('Authorization', `Bearer ${studentToken}`)
      .set('Cookie', `authToken=${studentToken}`)
      .send({ title: 'Test', content: 'Should fail — not admin' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/admin/i);
  });
});

// ---------------------------------------------------------------------------
// GET /api/posts — public
// ---------------------------------------------------------------------------

describe('GET /api/posts', () => {
  it('returns empty array when no posts', async () => {
    const res = await request(app).get('/api/posts');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(0);
  });

  it('returns all posts sorted newest first', async () => {
    await request(app)
      .post('/api/admin/post/create')
      .set('Authorization', `Bearer ${adminToken}`)
      .set('Cookie', `authToken=${adminToken}`)
      .send({ title: 'First', content: 'A' });

    await request(app)
      .post('/api/admin/post/create')
      .set('Authorization', `Bearer ${adminToken}`)
      .set('Cookie', `authToken=${adminToken}`)
      .send({ title: 'Second', content: 'B' });

    const res = await request(app).get('/api/posts');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].title).toBe('Second');
  });
});

// ---------------------------------------------------------------------------
// GET /api/posts/id/:postId — public
// ---------------------------------------------------------------------------

describe('GET /api/posts/id/:postId', () => {
  let createdPostId;

  beforeEach(async () => {
    const create = await request(app)
      .post('/api/admin/post/create')
      .set('Authorization', `Bearer ${adminToken}`)
      .set('Cookie', `authToken=${adminToken}`)
      .send({ title: 'Get-By-Id Test', content: 'Some content', category: 'finance' });
    createdPostId = create.body._id;
  });

  it('returns the post by id', async () => {
    const res = await request(app).get(`/api/posts/id/${createdPostId}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Get-By-Id Test');
  });

  it('returns 404 for malformed id (CastError path)', async () => {
    // 12-byte strings are valid ObjectId format in Mongoose and return null (200).
    // Use a clearly malformed string to trigger CastError → 404.
    const res = await request(app).get('/api/posts/id/not-an-id');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// GET /api/posts/category/:category — public
// ---------------------------------------------------------------------------

describe('GET /api/posts/category/:category', () => {
  beforeEach(async () => {
    await request(app)
      .post('/api/admin/post/create')
      .set('Authorization', `Bearer ${adminToken}`)
      .set('Cookie', `authToken=${adminToken}`)
      .send({ title: 'Tech Article', content: 'Content A', category: 'tech' });

    await request(app)
      .post('/api/admin/post/create')
      .set('Authorization', `Bearer ${adminToken}`)
      .set('Cookie', `authToken=${adminToken}`)
      .send({ title: 'Finance Article', content: 'Content B', category: 'finance' });
  });

  it('returns only posts matching the category', async () => {
    const res = await request(app).get('/api/posts/category/tech');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.every(p => p.category === 'tech')).toBe(true);
  });

  it('returns empty array for non-existent category', async () => {
    const res = await request(app).get('/api/posts/category/sports');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// PUT /api/admin/post/update/:postId — protected admin
// ---------------------------------------------------------------------------

describe('PUT /api/admin/post/update/:postId', () => {
  let postId;

  beforeEach(async () => {
    const create = await request(app)
      .post('/api/admin/post/create')
      .set('Authorization', `Bearer ${adminToken}`)
      .set('Cookie', `authToken=${adminToken}`)
      .send({ title: 'Original Title', content: 'Original content', category: 'news' });
    postId = create.body._id;
  });

  it('updates the post and returns updated document', async () => {
    const res = await request(app)
      .put(`/api/admin/post/update/${postId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .set('Cookie', `authToken=${adminToken}`)
      .send({ title: 'Updated Title', content: 'Updated content' });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated Title');
    expect(res.body.content).toBe('Updated content');
  });

  it('rejects update without token', async () => {
    const res = await request(app)
      .put(`/api/admin/post/update/${postId}`)
      .send({ title: 'No auth' });
    expect(res.status).toBe(401);
  });
});

// ---------------------------------------------------------------------------
// DELETE /api/admin/post/delete/:postId — protected admin
// ---------------------------------------------------------------------------

describe('DELETE /api/admin/post/delete/:postId', () => {
  let postId;

  beforeEach(async () => {
    const create = await request(app)
      .post('/api/admin/post/create')
      .set('Authorization', `Bearer ${adminToken}`)
      .set('Cookie', `authToken=${adminToken}`)
      .send({ title: 'To Delete', content: 'Goodbye' });
    postId = create.body._id;
  });

  it('deletes the post and returns deleted document', async () => {
    const res = await request(app)
      .delete(`/api/admin/post/delete/${postId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .set('Cookie', `authToken=${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(postId);

    // Verify gone
    const check = await request(app).get(`/api/posts/id/${postId}`);
    expect(check.body).toBeNull();
  });

  it('returns 404 for non-existent post id', async () => {
    const fakeId = new mongoose.Types.ObjectId().toString();
    const res = await request(app)
      .delete(`/api/admin/post/delete/${fakeId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .set('Cookie', `authToken=${adminToken}`);
    expect(res.status).toBe(404);
  });

  it('rejects delete without token', async () => {
    const res = await request(app).delete(`/api/admin/post/delete/${postId}`);
    expect(res.status).toBe(401);
  });
});

// ---------------------------------------------------------------------------
// POST /api/posts/:postid/comment — protected
// ---------------------------------------------------------------------------

describe('POST /api/posts/:postid/comment', () => {
  let postId;

  beforeEach(async () => {
    const create = await request(app)
      .post('/api/admin/post/create')
      .set('Authorization', `Bearer ${adminToken}`)
      .set('Cookie', `authToken=${adminToken}`)
      .send({ title: 'Commentable Post', content: 'Discuss here' });
    postId = create.body._id;
  });

  it('adds a comment and returns updated post', async () => {
    const res = await request(app)
      .post(`/api/posts/${postId}/comment`)
      .set('Authorization', `Bearer ${studentToken}`)
      .set('Cookie', `authToken=${studentToken}`)
      .send({ name: 'Alice', email: 'alice@test.com', message: 'Great post!' });

    expect(res.status).toBe(201);
    expect(Array.isArray(res.body.comment)).toBe(true);
    expect(res.body.comment).toHaveLength(1);
    expect(res.body.comment[0].message).toBe('Great post!');
    expect(res.body.comment[0].name).toBe('Alice');
  });

  it('multiple comments accumulate', async () => {
    await request(app)
      .post(`/api/posts/${postId}/comment`)
      .set('Authorization', `Bearer ${studentToken}`)
      .set('Cookie', `authToken=${studentToken}`)
      .send({ name: 'Bob', email: 'bob@test.com', message: 'First!' });

    const res = await request(app)
      .post(`/api/posts/${postId}/comment`)
      .set('Authorization', `Bearer ${studentToken}`)
      .set('Cookie', `authToken=${studentToken}`)
      .send({ name: 'Eve', email: 'eve@test.com', message: 'Second!' });

    expect(res.body.comment).toHaveLength(2);
  });

  it('rejects without token', async () => {
    const res = await request(app)
      .post(`/api/posts/${postId}/comment`)
      .send({ name: 'Ghost', email: 'ghost@x.com', message: 'Nope' });
    expect(res.status).toBe(401);
  });
});
