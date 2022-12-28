const createJobTitle = (job) => `You just created a job`;
const appliedToJobTitle = (job, student) =>
  `You applied for ${job.role} at ${job.org.orgName} `;

const studentSignUpTitle = () => `Sign up successful`;
const companySignUpTitle = () => `Sign up successful`;

const acceptedForJobTitle = () => `Application Status update`;
const declinedForJobTitle = () => `Application Status update`;
const reviewedForJobTitle = () => `Your application has been reviewed!`;
module.exports = {
  createJobTitle,
  appliedToJobTitle,
  studentSignUpTitle,
  companySignUpTitle,
  acceptedForJobTitle,
  declinedForJobTitle,
  reviewedForJobTitle,
};
