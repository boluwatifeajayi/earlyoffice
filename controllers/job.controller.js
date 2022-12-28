const jobModel = require("../models/job.model");
const companyModel = require("../models/company.model");
const studentModel = require("../models/student.model");
const mailSender = require("../middlewares/helperfunctions/mailSender");
const {
  createJobBody,
  appliedToJobBody,
  acceptedForJobBody,
  declinedForJobBody,
  reviewedForJobBody,
} = require("../middlewares/mails/body.mails");

const {
  createJobTitle,
  appliedToJobTitle,
  declinedForJobTitle,
  acceptedForJobTitle,
  reviewedForJobTitle,
} = require("../middlewares/mails/title.mails");

const createJob = async (req, res) => {
  try {
    const { companyId } = res.locals.decodedToken;
    if (companyId == null)
      return res.status(400).json({
        error: "Ensure you are a registered company to access this route",
      });
    const {
      role,
      jobName,
      jobResponsibility,
      jobType,
      numberOfOpenings,
      skillsNeeded,
      salary,
      duration,
      location,
      benefits,
      additionalInformation,
    } = req.body;
    // const { companyName: orgName } = req.params;
    const currentOrg = await companyModel.findById(companyId);
    const { _id: orgId, orgEmail, orgName, orgDescription } = currentOrg;
    const newJob = await jobModel.create({
      role,
      jobName,
      jobResponsibility,
      jobType,
      numberOfOpenings,
      org: {
        orgId,
        orgName,
        orgEmail,
        orgDescription,
      },
      skillsNeeded,
      salary,
      duration,
      location,
      benefits,
      additionalInformation,
    });

    await mailSender(
      {
        title: createJobTitle(newJob),
        body: createJobBody(newJob),
      },
      orgEmail
    );
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
    const { state } = req.params;
    const currentJob = await jobModel
      .find({ location: { state: state } })
      .sort({ updatedAt: -1 });
    res.status(200).json(currentJob);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getTypeJobs = async (req, res) => {
  try {
    const { type } = req.params;
    const currentJob = await jobModel.find({ type }).sort({ updatedAt: -1 });
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
    const { reasonToBeHired, jobAvailability } = req.body;
    const { jobid } = req.params;
    const appliedAt = Date.now();
    const getStudent = await studentModel.findById(studentId);
    const newJobApplication = await jobModel.findByIdAndUpdate(
      jobid,
      {
        $push: {
          student: { studentId, reasonToBeHired, jobAvailability, appliedAt },
        },
      },
      { new: true }
    );

    await mailSender(
      {
        title: appliedToJobTitle(newJobApplication, getStudent),
        body: appliedToJobBody(newJobApplication, getStudent),
      },
      getStudent.email
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
      await mailSender(
        {
          title: acceptedForJobTitle(),
          body: acceptedForJobBody(currentJob, getStudent),
        },
        getStudent.email
      );
    } else if (status.toLowerCase() == "declined") {
      await mailSender(
        {
          title: declinedForJobTitle(),
          body: declinedForJobBody(currentJob, getStudent),
        },
        getStudent.email
      );
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
    await mailSender(
      {
        title: reviewedForJobTitle(),
        body: reviewedForJobBody(currentJob),
      },
      getStudent.email
    );
    res.status(200).json(currentJob);
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
};
