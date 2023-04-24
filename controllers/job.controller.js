const jobModel = require("../models/job.model");
const companyModel = require("../models/company.model");
const studentModel = require("../models/student.model");
const mailSender = require("../middlewares/helperfunctions/mailSender");


const createJob = async (req, res) => {
  try {
    const { companyId } = res.locals.decodedToken;
    if (companyId == null)
      return res.status(400).json({
        error: "Ensure you are a registered company to access this route",
      });
    const {
      jobProfile,
      jobName,
      jobDescription,
      jobType,
      numberOfOpenings,
      applicationDeadline,
      salary,
      applicationInfo,
      educationLevel,
      experienceLevel,
      skillsRequired,
      duration,
      place,
      benefits
    } = req.body;
    // const { companyName: orgName } = req.params;
    const currentOrg = await companyModel.findById(companyId);
    const { _id: orgId, orgEmail, orgName, orgDescription, orgWebsite } = currentOrg;
    const newJob = await jobModel.create({
      jobProfile,
      jobName,
      jobDescription,
      jobType,
      numberOfOpenings,
      applicationDeadline,
      salary,
      applicationInfo,
      educationLevel,
      experienceLevel,
      skillsRequired,
      duration,
      place,
      benefits,
      org: {
        orgId,
        orgName,
        orgEmail,
        orgDescription,
      },
    });

    // await mailSender(
    //   {
    //     title: createJobTitle(newJob),
    //     body: createJobBody(newJob),
    //   },
    //   orgEmail
    // );
    return res.status(201).json(newJob);
  } catch (error) {
    console.log(error.message);
    if (error.code == 11000)
      return res.status(400).json({ error: "Job already exists" });
    return res.status(400).json({ error: error.message });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const allJobs = await jobModel.find().sort({ updatedAt: -1 });
    res.status(200).json(allJobs);
  } catch (error) {
    res.status(404).json({ error: "No jobs available" });
  }
};

const getJobsBySearch = async (req, res) => {
  try {
    const { search, location } = req.query;
    let searchedJobs;
    if (location) {
      searchedJobs = await jobModel.find({
        $and: [
          {
            $or: [
              { jobName: { $regex: search, $options: "i" } },
              { jobProfile: { $regex: search, $options: "i" } },
              { jobType: { $regex: search, $options: "i" } },
            ],
          },
          { place: { $regex: location, $options: "i" } },
        ],
      }).sort({ updatedAt: -1 });
    } else {
      searchedJobs = await jobModel
        .find({
          $or: [
            { jobName: { $regex: search, $options: "i" } },
            { jobProfile: { $regex: search, $options: "i" } },
            { jobType: { $regex: search, $options: "i" } },
          ],
        })
        .sort({ updatedAt: -1 });
    }
    res.status(200).json(searchedJobs);
  } catch (error) {
    res.status(404).json({ error: "No Internships available" });
  }
};



const getCompanyJobs = async (req, res) => {
  try {
    const { companyId } = res.locals.decodedToken;
    if (companyId == null)
      return res.status(400).json({
        error: "Ensure you are a registered company to access this route",
      });
    const currentCompany = await companyModel.findById(companyId);
    const jobsForCompany = await jobModel
      .find({ "org.orgId": companyId })
      .sort({ updatedAt: -1 });
    res.status(200).json(jobsForCompany);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};



const getJobOfCompany = async (req, res) => {
  try {
    const { orgName } = req.params; // update to req.params
    if (orgName == null)
      return res.status(400).json({
        error: "Ensure you are a registered company to access this route",
      });
   
    const jobsForCompany = await jobModel
      .find({ "org.orgName": orgName })
      .sort({ updatedAt: -1 });
    res.status(200).json(jobsForCompany);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};








const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;
    const currentJob = await jobModel.findById(jobId);
    res.status(200).json(currentJob);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getStateJobs = async (req, res) => {
  try {
    const { place } = req.params;
    const currentJob = await jobModel
      .find({ place } )
      .sort({ updatedAt: -1 });
    res.status(200).json(currentJob);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getStudentAppliedJobs = async (req, res) => {
  try {
    const { studentId } = res.locals.decodedToken;
    if (studentId == null)
      return res.status(400).json({
        error: "Ensure you are a registered student to access this route",
      });
    const appliedJobs = await jobModel.find({ "student.studentId": studentId });
    res.status(200).json(appliedJobs);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getStudentInfoForJob = async (req, res) => {
  try {
    const { jobId, studentId } = req.params;
    const job = await jobModel.findById(jobId).exec();
    if (!job) {
      return res.status(404).json({
        error: `No job found for jobId: ${jobId}`,
      });
    }
    const studentInfo = job.student.find((s) => s.studentId === studentId);
    if (!studentInfo) {
      return res.status(404).json({
        error: `No student found for jobId: ${jobId} and studentId: ${studentId}`,
      });
    }
    const student = await studentModel.findById(studentInfo.studentId).exec();
    if (!student) {
      return res.status(404).json({
        error: `No student found with studentId: ${studentId}`,
      });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
};


const getTypeJobs = async (req, res) => {
  try {
    const { jobProfile } = req.params;
    const currentJob = await jobModel.find({ jobProfile }).sort({ updatedAt: -1 });
    res.status(200).json(currentJob);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getSalaryJobs = async (req, res) => {
  try {
    const { minSalary, maxSalary } = req.query;
    const currentJob = await jobModel.find({
      salary: { $gt: minSalary, $lt: maxSalary },
    });
    res.status(200).json(currentJob);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const applyToJob = async (req, res) => {
  try {
    const { studentId } = res.locals.decodedToken;
    if (studentId == null)
      return res
        .status(400)
        .json({ error: "Ensure you are a student to access this route" });

    // check if student has already applied to this job
    const { jobid } = req.params;
    const hasApplied = await jobModel.exists({
      _id: jobid,
      "student.studentId": studentId,
    });
    if (hasApplied)
      return res
        .status(400)
        .json({ error: "You have already applied to this job" });

    const getStudent = await studentModel.findById(studentId);
    const {
      firstname,
      lastname,
      email,
      phoneNumber,
      currentLocation,
      degree,
      fieldOfInterest,
      grade,
      resume,
      schoolName,
      skills,
      status,
      workDescription,
      workName,
      workTitle,
      works,
    } = getStudent;

    // check if any required attribute is empty or null
    if (
      !(
        firstname &&
        lastname &&
        email &&
        phoneNumber &&
        currentLocation &&
        degree &&
        fieldOfInterest &&
        grade &&
        resume &&
        schoolName &&
        skills &&
        status &&
        workDescription &&
        workName &&
        workTitle &&
        works
      )
    ) {
      return res
        .status(400)
        .json({ error: "Please complete your student profile first" });
    }

    const { coverLetter } = req.body;
    const appliedAt = Date.now();

    const newJobApplication = await jobModel.findByIdAndUpdate(
      jobid,
      {
        $push: {
          student: {
            studentId,
            studentFirstname: firstname,
            studentLastname: lastname,
            studentEmail: email,
            studentPhone: phoneNumber,
            studentLocation: currentLocation,
            studentDegree: degree,
            studentIntrest: fieldOfInterest,
            studentGrade: grade,
            studentResume: resume,
            studentSchool: schoolName,
            studentSkills: skills,
            studentStatus: status,
            studentDescription: workDescription,
            studentWorkName: workName,
            studentTitle: workTitle,
            studentWorks: works,
            coverLetter,
            appliedAt,
          },
        },
      },
      { new: true }
    );

    res.status(201).json(newJobApplication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const decideApplicant = async (req, res) => {
  try {
    const { companyId } = res.locals.decodedToken;
    if (companyId == null)
      return res.status(400).json({
        error: "Ensure you are a registered company to access this route",
      });
    const { studentId, status } = req.query;
    const { jobId } = req.params;
    const getStudent = await studentModel.findById(studentId);
    const queryData = ["pending", "accepted", "declined", "reviwed"];
    const currentJob = await jobModel.findOneAndUpdate(
      { _id: jobId, 'student.studentId' : studentId },
      { $set: { "student.$.status": status } },
      { new: true }
    );

    // const currentJob = await jobModel.findOne({ _id : jobId});
    if (status.toLowerCase() == "accepted") {
      // await mailSender(
      //   {
      //     title: acceptedForJobTitle(),
      //     body: acceptedForJobBody(currentJob, getStudent),
      //   },
      //   getStudent.email
      // );
      console.log("accepted")
    } else if (status.toLowerCase() == "declined") {
      // await mailSender(
      //   {
      //     title: declinedForJobTitle(),
      //     body: declinedForJobBody(currentJob, getStudent),
      //   },
      //   getStudent.email
      // );
      console.log("declined")
    }
    res.status(200).json(currentJob);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};




const reviewStudent = async () => {
  try {
    const { companyId } = res.locals.decodedToken;
    const { companyName, jobId, studentId } = req.params;
    if (companyId == null)
      return res.status(400).json({
        error: "Ensure you are a registered company to access this route",
      });
    const getStudent = await studentModel.findById(studentId);
    const currentJob = await jobModel.findOne({
      _id: jobId,
      "student.studentId": studentId,
      "org.orgName": companyName,
    });
    currentJob.$set({ "student.status": "reviewed" });
    // await mailSender(
    //   {
    //     title: reviewedForJobTitle(),
    //     body: reviewedForJobBody(currentJob),
    //   },
    //   getStudent.email
    // );
    res.status(200).json(currentJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const {
      jobProfile,
      jobName,
      jobDescription,
      jobType,
      numberOfOpenings,
      applicationDeadline,
      salary,
      applicationInfo,
      educationLevel,
      experienceLevel,
      skillsRequired,
      duration,
      place,
      benefits
    } = req.body;
    const updatedJob = await jobModel.findByIdAndUpdate(jobId, {
      jobProfile,
      jobName,
      jobDescription,
      jobType,
      numberOfOpenings,
      applicationDeadline,
      salary,
      applicationInfo,
      educationLevel,
      experienceLevel,
      skillsRequired,
      duration,
      place,
      benefits,
    }, { new: true });
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    await jobModel.findByIdAndDelete(jobId);
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  createJob,
  getAllJobs,
  getCompanyJobs,
  getJobById,
  getStateJobs,
  getTypeJobs,
  getSalaryJobs,
  applyToJob,
  decideApplicant,
  reviewStudent,
  getJobsBySearch,
  getStudentAppliedJobs,
  getStudentInfoForJob,
  getJobOfCompany, 
  updateJob,
  deleteJob
};
