const studentModel = require("../../models/student.model");
const { studentSignUp } = require("./signUp.controller");

async function googleOAuth(req, res) {
    const oAuthStudent = {}
    try {
      console.log("NEW REQUEST!!!");
      const CLIENT_ID = "906540842423-7ki40si5b62f8dvlem89emrm28vk83rm.apps.googleusercontent.com";
      const CLIENT_SECRET = "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";
      const REDIRECT_URI = "http://localhost:4500/api/oauth/google/signup";
      const SIGN_WITH_GOOGLE = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/userinfo.profile&include_granted_scopes=true&response_type=code&state=state&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}`;
      const { code } = req.query;
      const response = await axios.post(
        `https://www.googleapis.com/oauth2/v4/token?code=${code}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}&grant_type=authorization_code`
      );
      console.log(response.data);
      const { access_token } = response.data;
      console.log("access token =  " + access_token);
      const getUserData = await axios.get(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`
      );
      const {
        email,
        given_name: firstname,
        family_name: lastname,
      } = getUserData.data;
      const password =
        Date.now().toString(36) +
        Math.floor(
          Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
        ).toString(36);

      oAuthStudent = { email, firstname, lastname, password };
  
      const validationResult = oAuthstudentSignUpSchema.validate(oAuthStudent);
      const { error } = validationResult;
      const valid = error == null;
  
      if (valid) {
        req.body = oAuthStudent;
        console.log(req.body);
        await studentSignUp(req, res);
      } else {
        const { details } = error;
        const message = details.map((detail) => detail.message).join(",");
        console.log("error", message);
        res.status(422).json({ error: message });
      }
    } catch (error) {
        // Login if user exists
        if(error.code == 11000){
            const currentStudent = studentModel.findOne({email : oAuthStudent.email})
            const token = jwt.sign(
                { id: currentStudent._id.toString(), email: oAuthStudent.email },
                process.env.TOKEN_KEY
            );
            const response = {
                currentStudent,
                authToken: token,
            };
    
            res.cookie("authToken",token)
            return res.status(200).json(response);
        }
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    googleOAuth
}