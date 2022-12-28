const express = require("express")
const { logout } = require("../../controllers/authentication/logout.controller")
const { protectedRoutes } = require("../../middlewares/authentication/protectedRoutes")
const route = express.Router()

// This route logs bothe student and company out
route.post("/api/logout", protectedRoutes, logout)

module.exports = route