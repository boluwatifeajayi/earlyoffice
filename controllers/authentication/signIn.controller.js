const student = require("../../models/student.model");
const company = require("../../models/company.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function studentSignIn(req, res) {
  // destructuring req.body
  const { email, password } = req.body;
  try {
    /*
      #swagger.tags=['Authorizationt']
      #swagger.description='Logout from early office'
    */
    const currentStudent = await student.findOne({ email });

    if (currentStudent == null || typeof currentStudent == undefined)
      return res.status(401).json({ error: "User does not exist" });

    const passwordCompare = await bcrypt.compare(
      password,
      currentStudent.password
    );
    if (passwordCompare) {
      const token = jwt.sign(
        { studentId: currentStudent._id.toString(), email },
        process.env.TOKEN_KEY
      );
      const response = {
        currentStudent,
        authToken: token,
      };

      res.cookie("authToken",token, { sameSite: 'None', secure: true})
      return res.status(200).json(response);
    } else {
      return res.status(401).json({ error: "Incorrect Password" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Server error");
  }
}

async function companySignIn(req, res) {
  const { orgEmail, orgPassword } = req.body;
  try {
    const currentCompany = await company.findOne({ orgEmail });
    if (currentCompany == null || typeof currentCompany == undefined)
      return res.status(401).json({ error: "User does not exist" });

      console.log(req.body, currentCompany)
    const passwordCompare = await bcrypt.compare(
      orgPassword,
      currentCompany.orgPassword
    );
    if (passwordCompare) {
      const token = jwt.sign(
        { companyId: currentCompany._id.toString(), orgEmail },
        process.env.TOKEN_KEY
      );
      const response = {
        currentCompany,
        authToken: token,
      };

      res.cookie("authToken",token, { sameSite: "None", secure: true})
      return res.status(200).json(response);
    } else {
      return res.status(401).json({ error: "Incorrect Password" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Server error");
  }
}

module.exports = {
  studentSignIn,
  companySignIn,
};
