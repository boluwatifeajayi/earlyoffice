const joi = require("joi");

const createJobSchema = joi.object().keys({
  role: joi.string(),
  jobName: joi.string(),
  jobResponsibility: joi.array(),
  jobType: joi.string(),
  numberOfOpenings: joi.string(),
  skillsNeeded: joi.array().items(joi.string()),
  duration: joi.string(),
  salary: joi.number(),
  location: joi.object().keys({
    state: joi.string(),
    country: joi.string(),
  }),
  benefits: joi.string(),
  additionalInformation: joi.string(),

  // role: joi.string().required(),
  // jobName: joi.string().required(),
  // jobResponsibility: joi.string().required(),
  // jobType: joi.string().required(),
  // numberOfOpenings: joi.string().required(),
  // skillsNeeded: joi.array().items(joi.string().required()),
  // duration: joi.string(),
  // salary: joi.number().required(),
  // location: joi.object().required().keys({
  //     state: joi.string(),
  //     country: joi.string(),
  // }),
  // benefits: joi.string(),
  // additionalInformation: joi.string(),
});

module.exports = { createJobSchema };
