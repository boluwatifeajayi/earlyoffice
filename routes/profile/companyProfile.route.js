const express = require("express");
const {
  updateCompanyProfile,
} = require("../../controllers/profile/companyProfile.controller");
const {
  changeStudentPassword,
} = require("../../controllers/profile/studentProfile.controller");

const {getCompanyProfile} = require("../../controllers/profile/companyProfile.controller");

const {
  protectedRoutes,
} = require("../../middlewares/authentication/protectedRoutes");
const validation = require("../../middlewares/validation/validation");
const {
  updateCompanyProfileSchema,
} = require("../../middlewares/validation/validation.Schema/updateProfile.schema");
var route = express.Router();

// Update Company profile
route.put(
  "/api/company/profile/update",
  protectedRoutes,
  updateCompanyProfile
);

// Get Company profile
route.get(
  "/api/company/profile",
  protectedRoutes,
 getCompanyProfile
);

// Change Company password
// route.post("/api/Company/change/password",protectedRoutes,changeStudentPassword)
route.patch(
  "/api/company/profile/update/password",
  protectedRoutes,
  changeStudentPassword
);



module.exports = route;
