const express = require("express");
const {
  jobApplicationSchema,
} = require("../middlewares/validation/validation.Schema/Jobs/jobApplication.schema");
const {
  createJobSchema,
} = require("../middlewares/validation/validation.Schema/Jobs/createJob.schema");
const validation = require("../middlewares/validation/validation");
var route = express.Router();
const {
  protectedRoutes,
} = require("../middlewares/authentication/protectedRoutes");
const {
  applyToJob,
  createJob,
  getStateJobs,
  getTypeJobs,
  getSalaryJobs,
  updateJob,
  deleteJob,
  getAllJobs,
  getCompanyJobs,
  getJobsBySearch,
  getJobById,
  getStudentInfoForJob,
  decideApplicant,
  getStudentAppliedJobs,
  reviewStudent,
  getJobOfCompany
} = require("../controllers/job.controller");
const customValidation = require("../middlewares/validation/customValidation");
const {
  decideApplicantSchema,
} = require("../middlewares/validation/validation.Schema/company/index.schema");

// Create job
// route.post("/api/job/create", createJob);
route.post(
  "/api/company/job/create",
  protectedRoutes,
  createJob
);

// Get all jobs
route.get("/api/jobs", getAllJobs);

// 
route.get("/api/jobs/search", getJobsBySearch)

// Get company's job
route.get("/api/company/jobs", protectedRoutes, getCompanyJobs);

// get jobs of company by name
route.get("/api/jobs/:orgName", getJobOfCompany);


// get jobs applied to by student

// get jobs a student applied to
route.get("/api/jobs/student/applications/applied-jobs", protectedRoutes, getStudentAppliedJobs);

// get info of student that applied to a job
route.get("/api/jobs/:jobId/students/:studentId", getStudentInfoForJob);


// To review an applicant from a job posted by a company
route.get(
  "/api/:companyName/jobs/id/:jobId/review/:studentId",
  protectedRoutes,
  reviewStudent
);

// Get job by id
route.get("/api/jobs/id/:jobId", getJobById);

// Get job by state
route.get("/api/jobs/state/:place", getStateJobs);

// Get job by job type
route.get("/api/jobs/type/:jobProfile", getTypeJobs);

// // Get job by role.
// route.get("/api/jobs/role/:role?",);

// // Get job by Skills
// route.post("/api/jobs/role/:skills",);

// Get job by Salary. <Using query params> i.e minSalary and maxSalary
route.get("/api/jobs/salary", getSalaryJobs);

// TO APPLY FOR A PARTICULAR JOB

route.post(
  "/api/jobs/:jobid/apply",
  protectedRoutes,
  applyToJob
);

// TO DECIDE WHETHER TO ACCEPT OR DECLINE A STUDENT
route.patch(
  "/api/jobs/:jobId/decide",
  protectedRoutes,
  customValidation(decideApplicantSchema, "query"),
  decideApplicant
);

// Update job by id
route.put("/api/jobs/update/:jobId", protectedRoutes, updateJob);

// Delete job by id
route.delete("/api/jobs/delete/:jobId", protectedRoutes, deleteJob);





module.exports = route;
