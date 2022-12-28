const express = require("express");
var route = express.Router();

// Student profile routes
const studentProfileRoute = require("./studentProfile.route");

// Company profile routes
const companyProfileRoutes = require("./companyProfile.route");

// Using profile routes
route.use(studentProfileRoute);
route.use(companyProfileRoutes);

module.exports = route;
