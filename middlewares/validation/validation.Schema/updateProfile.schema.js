// const joi = require("joi");

// const updateStudentProfileSchema = joi.object().keys({
//   graduation: joi
//     .array()
//     .items({
//       status: joi.string(),
//       schoolName: joi.string(),
//       startYear: joi.string(),
//       degree: joi.string(),
//       gpa: joi.string(),
//       gpaScale: joi.string(),
//     })
//     .label("Graduation"),

//   workExperience: joi
//     .array()
//     .items({
//       company: joi.string(),
//       jobTitle: joi.string(),
//       certifications: joi.array().items({
//         issuerName: joi.string(),
//         issuingOrg: joi.string(),
//         issueDate: joi.string(),
//         credentialId: joi.string(),
//       }),
//     })
//     .label("Work Experience"),

//   workSamples: joi
//     .array()
//     .items({
//       sampleLink: joi.string(),
//       coverLetter: joi.string(),
//       cv: joi.string(),
//     })
//     .label("Work Samples"),

//   skills: joi.array().items(joi.string()).label("Student skills"),

//   fieldOfInterest: joi.array().items(joi.string()).label("Field of interest"),

//   currentLocation: joi.string().label("Student current location"),
//   preferredLanguage: joi.string().label("Student preferred language"),
//   status: joi.string().label("Student status"),
// });

// const updateCompanyProfileSchema = joi.object().keys({
//   orgDescription: joi.string().required(),
//   orgPresence: joi.object().keys({
//     website: joi.string(),
//     socialHandles: joi.object(),
//     officalDocs: joi.string(),
//   }),
// });

// module.exports = { updateStudentProfileSchema, updateCompanyProfileSchema };


const joi = require("joi");

const updateStudentProfileSchema = "hello"
const updateCompanyProfileSchema = "hi"

module.exports = { updateStudentProfileSchema, updateCompanyProfileSchema };
