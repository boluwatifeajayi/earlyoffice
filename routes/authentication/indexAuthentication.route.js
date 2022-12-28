const express = require("express")
var route = express.Router()

// Importing the authentication routes
const signupRoute = require("./signUp.route")
const signInRoute = require("./signIn.route")
const logoutRoute = require("./logout.route")


route.use(signupRoute)
route.use(signInRoute)
route.use(logoutRoute)

module.exports = route