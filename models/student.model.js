const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    currentLocation: {
      type: String,
    },
    preferredLanguage: {
      type: String,
    },
    status: {
      type: String,
    },
    fieldOfInterest: {
      type: [String],
    },
    graduation: [
      {
        status: {
          type: String,
        },
        schoolName: {
          type: String,
        },
        startYear: {
          type: String,
        },
        degree: {
          type: String,
        },
        gpa: {
          type: String,
        },
        gpaScale: {
          type: String,
        },
      },
    ],
    workExperience: [
      {
        company: {
          type: String,
        },
        jobTitle: {
          type: String,
        },
        certifications: [
          {
            issuerName: {
              type: String,
            },
            issuingOrg: {
              type: String,
            },
            issueDate: {
              type: String,
            },
            credentialId: {
              type: String,
            },
          },
        ],
      },
    ],
    skills: {
      type: [String],
    },
    workSamples: [
      {
        sampleLink: {
          type: String,
        },
        coverLetter: {
          type: String,
        },
        cv: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const studentModel = mongoose.model("student", studentSchema);
module.exports = studentModel;
