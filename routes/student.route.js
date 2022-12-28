const express = require("express");
const {
  getStudents,
  getStudent,
  getStudentById,
  getStudentByLocation,
  getStudentByInterest,
} = require("../controllers/student.controller");
const {
  protectedRoutes,
} = require("../middlewares/authentication/protectedRoutes");
var route = express.Router();

// Get all students
route.get("/api/students", getStudents);

// Get particular student without id, just token
route.get("/api/students/student", protectedRoutes, getStudent);

// Get student by id
route.get("/api/student/id/:id", protectedRoutes, getStudentById);

// Get student by location
route.get(
  "/api/student/location/:location",
  protectedRoutes,
  getStudentByLocation
);

// Get student by fieldOfInterest
route.get(
  "/api/student/fieldofinterest/:fieldOfInterest",
  protectedRoutes,
  getStudentByInterest
);


module.exports = route



