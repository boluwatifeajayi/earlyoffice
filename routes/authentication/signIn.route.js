const express = require("express");
const validation = require("../../middlewares/validation/validation");
const {
  studentSignInSchema,
} = require("../../middlewares/validation/validation.Schema/authentication/signIn.schema");
const studentSignIn =
  require("../../controllers/authentication/signIn.controller").studentSignIn;
const companySignIn =
  require("../../controllers/authentication/signIn.controller").companySignIn;
var route = express.Router();

// Student signin route
route.post(
  "/api/student/signIn",
  validation(studentSignInSchema),
  studentSignIn
);

// Company signin route
route.post("/api/company/signIn", companySignIn);

module.exports = route;
