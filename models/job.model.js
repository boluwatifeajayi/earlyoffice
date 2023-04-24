const { default: mongoose } = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    // the profile required/category
    jobProfile: {
      type: String,
    },
    // job title 
    jobName: {
      type: String,
    },
    // responsibilities of the intern
    jobDescription: {
      type: String,
    },
    // nature of the job
    jobType: {
      type: String,
    },
    // number of openings
    numberOfOpenings: {
      type: String,
    },
    // application deadline 
    applicationDeadline: {
      type: String,
    },
    // salary range
    salary:{
      type: String
    },
    // application information
    applicationInfo: {
      type: String
    },
    // education level
    educationLevel: {
      type: String
    },
    // required experience
    experienceLevel: {
      type: String
    },
    // required skills
    skillsRequired: {
      type: String
    },
    // required duration
    duration: {
      type: String,
    },
    // location
    place: {
      type: String,
    },
    // internship benefits
    benefits: {
      type: String,
    },

    // organisation info
    org: {
      orgId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      orgName: {
        type: String,
      },
      orgEmail: {
        type: String,
      },
      orgWebsite: {
        type: String
      },
      orgDescription: {
        type: String,
      },
    },

    // student application

    student: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        studentFirstname:{
          type: String
        },
        studentLastname:{
          type: String
        },
        studentEmail:{
          type: String
        },
        studentPhone:{
          type: String
        },
        studentLocation:{
          type: String
        },
        studentDegree:{
          type: String
        },
        studentIntrest:{
          type: String
        },
        studentGrade:{
          type: String
        },
        studentResume:{
          type: String
        },
        studentSchool:{
          type: String
        },
        studentSkills:{
          type: String
        },
        studentStatus:{
          type: String
        },
        studentDescription:{
          type: String
        },
        studentWorkName:{
          type: String
        },
        studentTitle:{
          type: String
        },
        studentWorks:{
          type: String
        },
        // reason to be hired
        coverLetter: {
          type: String,
        },
        appliedAt: {
          type: Date,
        },
        status: { type: String, default: "pending" },
      },
    ],
  },
  
  { timestamps: true }
);

const jobModel = mongoose.model("job", jobSchema);

module.exports = jobModel;
