const express = require("express")
const route = express.Router()

// Student oauth route
route.get("/api/oauth/google", oauthSignup);

module.exports = route
