const joi = require("joi");

const studentSignUpSchema = joi.object().keys({
  firstname: joi.string().required().label("Student first name"),
  lastname: joi.string().required().label("Student last name"),
  email: joi.string().email().required().label("Student email"),
  password: joi.string().required().label("Student password"),
  phoneNumber: joi.string().required().label("Student phone number"),
});

const oAuthStudentSignUpSchema = joi.object().keys({
  firstname: joi.string().required().label("Student first name"),
  lastname: joi.string().required().label("Student last name"),
  email: joi.string().email().required().label("Student email"),
  password: joi.string().required().label("Student password"),
});

const companySignUpSchema = joi.object().keys({
  adminFirstName: joi.string().required().label("Admin first name"),
  adminLastName: joi.string().required().label("Admin last name"),
  orgEmail: joi.string().email().required().label("Company email"),
  orgPassword: joi.string().required().label("Company password"),
  phoneNumber: joi.string().required().label("Company phone number"),
  orgName: joi.string().required().label("Company name"),
  orgDescription: joi.string().label("Company description"),
});

module.exports = {
  studentSignUpSchema,
  companySignUpSchema,
  oAuthStudentSignUpSchema,
};
