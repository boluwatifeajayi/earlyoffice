const companyModel = require("../models/company.model");

async function getCompanies(req, res) {
  try {
    const allcompany = await companyModel.find();
    res.status(200).json(allcompany);
  } catch (error) {
    res.status(404).json({ error: "No company available" });
  }
}

async function getCompanyById(req, res) {
  const id = req.params.id;
  try {
    const oneCompany = await companyModel.findById(id);
    res.status(200).json(oneCompany);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
async function getCompany(req, res) {
  try {
    const { companyId } = res.locals.decodedToken;
    if (companyId == null)
      return res
        .status(400)
        .json({
          error: "Ensure you are a registered company to access this route",
        });
    const oneStudent = await companyModel
      .findById(companyId)
      .select("-orgPassword");
    res.status(200).json(oneStudent);
  } catch (error) {
    res.status(404).json({ error: "No student available" });
  }
}
module.exports = { getCompanyById, getCompanies, getCompany };
