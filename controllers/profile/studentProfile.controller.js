const studentModel = require("../../models/student.model");

async function updateStudentProfile (req,res){
    try{
        const {studentId} = res.locals.decodedToken;
        if (studentId == null) return res.status(400).json({error : "Ensure you are a student to access this route"})

        const {
            firstname, 
            lastname, 
            currentLocation,
            status,
            fieldOfInterest,
            grade,
            schoolName,
            workName,
            workTitle,
            workDescription,
            works,
            skills, 
            resume,
            coverLetter,
            degree } = req.body;
        console.log("res.locals",res.locals);
        const updatedStudentProfile = await studentModel.findOneAndUpdate({_id : studentId},
            {
                firstname, 
                lastname, 
                currentLocation,
                status,
                fieldOfInterest,
                grade,
                schoolName,
                workName,
                workTitle,
                workDescription,
                works,
                skills, 
                resume,
                degree,
                coverLetter
            },{
                new : true
            })
        return res.json(updatedStudentProfile)
    }catch(error){
        console.log(error.message);
        return res.status(400).json({error : error.message})
    }
}

async function changeStudentPassword (req,res){
    try {
        const { studentId } = res.locals.decodedToken
        if (studentId == null) return res.status(400).json({error : "Ensure you are a student to access this route"})

        const {password} = req.body

        const updatedStudentProfile = await studentModel.findByIdAndUpdate(studentId, 
        {password},
        { new : true })
        return res.status(200).json(updatedStudentProfile)
    }catch(error){
        console.log(error.message)
        return res.status(400).json({error : error.message})
    }
}

async function getStudentProfile(req, res) {
    try {
      const { studentId } = res.locals.decodedToken;
      if (!studentId) {
        return res.status(400).json({ error: "Ensure you are a student to access this route" });
      }
  
      const studentProfile = await studentModel.findById(studentId);
      if (!studentProfile) {
        return res.status(404).json({ error: "Student profile not found" });
      }
  
      return res.json(studentProfile);
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error: error.message });
    }
  }


module.exports = {
    updateStudentProfile,
    changeStudentPassword,
    getStudentProfile
}

