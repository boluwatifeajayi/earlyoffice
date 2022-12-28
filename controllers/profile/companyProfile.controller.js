const companyModel = require("../../models/company.model");


async function updateCompanyProfile(req, res) {
  try {
    const { companyId } = res.locals.decodedToken;
    const { adminFirstName, adminLastName, orgDescription, orgPresence } =
      req.body;

    const updatedCompanyProfile = await companyModel.findOneAndUpdate(
      { _id: companyId },
      {
        adminFirstName,
        adminLastName,
        orgDescription,
        orgPresence,
      },
      {
        new: true,
      }
    );
    return res.status(201).json(updatedCompanyProfile);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
}

async function changeCompanyPassword(req, res) {
  try {
    const { companyId } = res.locals.decodedToken;
    const { orgPassword } = req.body;

    const updatedCompanyProfile = await companyModel.findByIdAndUpdate(
      companyId,
      { orgPassword },
      { new: true }
    );
    return res.status(200).json(updatedCompanyProfile);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
}

module.exports = {
  updateCompanyProfile,
  changeCompanyPassword,
};
