const createJobBody = (job) =>
  `The job: <a>${job.role}</a> has been created successfully`;

const appliedToJobBody = (job, student) =>
  `Hey ${student.firstname} <br>
  Your application for ${job.role} has been sent to ${job.org.orgName}.`;

const studentSignUpBody = (student) =>
  `Congratulations <br> We're happy to have you here. `;
const companySignUpBody = (company) =>
  `Congratulations <br> We're happy to have you here.`;
const acceptedForJobBody = (job, student) =>
  `Congratulations! <br>You have been accepted for the role of ${job.role} at ${job.org.orgName}`;
const declinedForJobBody = (job, student) =>
  `We appreciate the effort you put in applying for the role of ${job.role} at ${job.org.orgName} but your application was declined`;
const reviewedForJobBody = (job) =>
  `Hey <br>
${job.org.orgName} just reviewed your application for ${job.role} <br>
Best of luck .`;
module.exports = {
  createJobBody,
  appliedToJobBody,
  studentSignUpBody,
  companySignUpBody,
  acceptedForJobBody,
  declinedForJobBody,
  reviewedForJobBody,
};
