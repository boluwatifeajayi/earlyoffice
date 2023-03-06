const mongoose = require("mongoose");

const companySchema = mongoose.Schema(
  {
    adminFirstName: {
      type: String,
    },
    adminLastName: {
      type: String,
    },
    orgEmail: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
    },
    orgPassword: {
      type: String,
    },
    orgName: {
      type: String,
      unique: true,
    },
    orgDescription: {
      type: String,
    },
    orgWebsite: {
      type: String
    },
    orgMission: {
      type: String
    },
    orgIndustry: {
      type: String
    },
    orgLocation: {
      type: String
    },
    orgSize: {
      type: String
    },
    orgBenefits: {
      type: String
    },
    orgLogo:{
      type: String
    }
  },
  { timestamps: true }
);

const companyModel = mongoose.model("company", companySchema);
module.exports = companyModel;
