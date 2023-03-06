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

    // undergraduate, freshgraduate, corper
    status: {
      type: String,
    },

    // 
    fieldOfInterest: {
      type: String,
    },

    // current level
    grade: {
      type: String
    },

    schoolName: {
      type: String
    },

    degree: {
      type: String,
    },

    // recent experience

    workName: {
      type: String
    },

    workTitle: {
      type: String
    },

    workDescription: {
      type: String
    },

    //links portfolio works certifications etc
    works: {
      type: String
    },
    skills: {
      type: String
    },

    resume: {
      type: String
    }
    
  },
  { timestamps: true }
);

const studentModel = mongoose.model("student", studentSchema);
module.exports = studentModel;
