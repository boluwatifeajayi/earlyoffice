// Exportable Express app for tests — does NOT call dbConnect or app.listen.
// The production static catch-all is intentionally omitted so API routes
// are never shadowed by the GET * handler during test runs.
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const authentication = require('./routes/authentication/indexAuthentication.route');
const studentRoutes = require('./routes/student.route');
const companyRoutes = require('./routes/company.route');
const profileRoutes = require('./routes/profile/index.profile');
const postRoutes = require('./routes/post.route');
const jobRoutes = require('./routes/job.route');

const app = express();

app.use(helmet());
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(authentication);
app.use(studentRoutes);
app.use(companyRoutes);
app.use(profileRoutes);
app.use(jobRoutes);
app.use(postRoutes);

module.exports = app;
