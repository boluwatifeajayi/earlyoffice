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

    orgPassword: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    orgName: {
      type: String,
      unique: true,
    },
    orgDescription: {
      type: String,
    },
    orgPresence: {
      website: {
        type: String,
      },
      socialHandles: {type:Object},
      officalDocs: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const companyModel = mongoose.model("company", companySchema);
module.exports = companyModel;
