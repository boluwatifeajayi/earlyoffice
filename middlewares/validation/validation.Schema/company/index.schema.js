const { jobs } = require("googleapis/build/src/apis/jobs")
const joi = require("joi")

const decideApplicantSchema = joi.object({
    studentId : joi.string().required().label("Student Id"),
    status : joi.string().valid("pending","reviewed", "accepted", "declined").required().label("Application status")
})

module.exports = {
    decideApplicantSchema
}