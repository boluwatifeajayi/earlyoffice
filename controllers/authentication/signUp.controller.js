const companyModel = require("../../models/company.model");
const studentModel = require("../../models/student.model");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const {
  oAuthstudentSignUpSchema,
} = require("../../middlewares/validation/validation.Schema/signUp.schema");
const {
  hashPassword,
} = require("../../middlewares/helperfunctions/hashPassword.helper");
const mailSender = require("../../middlewares/helperfunctions/mailSender");
const {
  studentSignUpTitle,
  companySignUpTitle,
} = require("../../middlewares/mails/title.mails");
const {
  studentSignUpBody,
  companySignUpBody,
} = require("../../middlewares/mails/body.mails");

async function studentSignUp(req, res) {
  // destructuring req.body
  /*
    #swagger.summary= "Student sign up"
  */
  const { email, lastname, firstname, password, phoneNumber} = req.body;
  const hashedPassword = await hashPassword(password);
  try {
    const currentStudent = await studentModel.create({
      email,
      lastname,
      firstname,
      password: hashedPassword,
      phoneNumber,
    });
    console.log("created new student @" + currentStudent);

    const token = jwt.sign(
      { studentId: currentStudent._id.toString(), email },
      process.env.TOKEN_KEY
    );

    const response = {
      currentStudent,
      authToken: token,
    };

    res.cookie("authToken", token);
    await mailSender(
      {
        title: studentSignUpTitle(),
        body: studentSignUpBody(currentStudent),
      },
      email
    );
    return res.status(201).json(response);
  } catch (error) {
    console.log(error.message);

    if (error.code == 11000)
      return res.status(400).json({ error: "Email already registered!" });
    return res.status(400).json({ error: error.message });
  }
}

async function companySignUp(req, res) {
  // destructuring req.body
  const {
    adminFirstName,
    adminLastName,
    orgEmail,
    orgPassword,
    orgName,
    phoneNumber
  } = req.body;
  console.log(req.body);
  const hashedPassword = await hashPassword(orgPassword);
  try {
    const currentCompany = await companyModel.create({
      adminFirstName,
      adminLastName,
      orgEmail,
      orgPassword: hashedPassword,
      phoneNumber,
      orgName,
     
    });
    console.log("created new company @" + currentCompany);

    const token = jwt.sign(
      { companyId: currentCompany._id.toString(), orgEmail },
      process.env.TOKEN_KEY
    );
    const response = {
      currentCompany,
      authToken: token,
    };

    res.cookie("authToken", token);
    await mailSender(
      {
        title: companySignUpTitle(),
        body: companySignUpBody(currentCompany),
      },
      orgEmail
    );
    return res.status(201).json(response);
  } catch (error) {
    console.log(error.message);
    if (error.code == 11000)
      return res.status(400).json({ error: "Account already exists" });
    return res.status(400).json({ error: error.message });
  }
}

module.exports = {
  studentSignUp,
  companySignUp,
};
