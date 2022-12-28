const studentModel = require("../../models/student.model");

async function updateStudentProfile (req,res){
    try{
        const {studentId} = res.locals.decodedToken;
        if (studentId == null) return res.status(400).json({error : "Ensure you are a student to access this route"})

        const {firstname, lastname, currentLocation, preferredLanguage, status, fieldOfInterest, graduation, workExperience, reasonToHire, jobAvailability} = req.body;
        console.log("res.locals",res.locals);
        const updatedStudentProfile = await studentModel.findOneAndUpdate({_id : studentId},
            {
                firstname, 
                lastname, 
                currentLocation, 
                preferredLanguage, 
                status, 
                fieldOfInterest,
                graduation, 
                workExperience, 
                reasonToHire, 
                jobAvailability
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

module.exports = {
    updateStudentProfile,
    changeStudentPassword
}

