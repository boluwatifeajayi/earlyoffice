const express = require("express");
const {
  studentSignUp,
  companySignUp,
  adminSignUp
} = require("../../controllers/authentication/signUp.controller");
const validation = require("../../middlewares/validation/validation");

const {
  studentSignUpSchema,
  companySignUpSchema,
} = require("../../middlewares/validation/validation.Schema/signUp.schema");
var route = express.Router();

// Student signup route
route.post(
  "/api/student/signUp",
  validation(studentSignUpSchema),
  studentSignUp
);

// Company signup route
route.post(
  "/api/company/signUp",
  validation(companySignUpSchema),
  companySignUp
);

// admin signup route
route.post(
  "/api/admin/signUp",
  adminSignUp
);

module.exports = route;
