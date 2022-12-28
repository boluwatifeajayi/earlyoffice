const express = require("express");
var route = express.Router();
const {
  getCompanyById,
  getCompany,
  getCompanies,
} = require("../controllers/company.controller");
const {
  protectedRoutes,
} = require("../middlewares/authentication/protectedRoutes");
//Get all companies
route.get("/api/company/all", getCompanies);
// Get company by id
route.get("/api/company/id/:id", getCompanyById);

// Get particular student without id, just token
route.get("/api/company/one", protectedRoutes, getCompany);

// Get company by location
// route.get("/api/company/location/:location", getCompanyByLocation);

// Update status of job

module.exports = route;
