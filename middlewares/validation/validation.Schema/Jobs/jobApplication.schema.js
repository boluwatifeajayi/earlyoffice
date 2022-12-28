const joi = require("joi");

const jobApplicationSchema = joi.object().keys({
  jobAvailability: joi.string().required().label("Student job Availability"),
  reasonToBeHired: joi.string().required().label("Student reason to be hired"),
});
module.exports = { jobApplicationSchema };
