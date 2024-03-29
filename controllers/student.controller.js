const students = require("../models/student.model");
const axios = require("axios"); // Import Axios library

async function getStudents(req, res) {
  try {
    const allStudents = await students.find();
    res.status(200).json(allStudents);
  } catch (error) {
    res.status(404).json({ error: "No students available" });
  }
}

async function getStudent(req, res) {
  try {
    const { studentId } = res.locals.decodedToken;
    if (studentId == null)
      return res
        .status(400)
        .json({ error: "Ensure you are a student to access this route" });
    const oneStudent = await students.findById(studentId).select("-password");
    res.status(200).json(oneStudent);
  } catch (error) {
    res.status(404).json({ error: "No student available" });
  }
}

async function getStudentById(req, res) {
  const id = req.params.id;
  try {
    const oneStudent = await students.findById(id);
    res.status(200).json(oneStudent);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function getStudentByLocation(req, res) {
  const { location } = req.body;
  try {
    const commonLocation = await students.find({ location });
    res.status(200).json(commonLocation);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function getStudentByInterest(req, res) {
  const { interest } = req.body;
  try {
    const commonInterests = await students.find({ interest });
    res.status(200).json(commonInterests);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function activatePayment(req, res) {
  // Replace with your Paystack API key
  const paystackApiKey = "sk_test_6952ba2bf69f4f25313ac7dfebc2b641aedb449b";

  // Replace with the amount and email from the request body
  const { amount, email } = req.body;

  try {
    // Make a POST request to initiate a payment to Paystack API
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount,
      },
      {
        headers: {
          Authorization: `Bearer ${paystackApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Handle the payment response accordingly
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getStudents,
  getStudentById,
  getStudentByLocation,
  getStudentByInterest,
  getStudent,
  activatePayment, // Add the new controller function here
};
