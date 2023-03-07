const companyModel = require("../../models/company.model");


async function updateCompanyProfile(req, res) {
  try {
    const { companyId } = res.locals.decodedToken;
    const { 
      adminFirstName,
      adminLastName,   
      orgLocation,
      orgIndustry,
      orgMission,
      orgSize,
      orgDescription,
      orgWebsite,
      orgBenefits, 
      orgLogo, } =
      req.body;

    const updatedCompanyProfile = await companyModel.findOneAndUpdate(
      { _id: companyId },
      {
        adminFirstName,
        adminLastName,
        orgLocation,
        orgIndustry,
        orgMission,
        orgSize,
        orgDescription,
        orgWebsite,
        orgBenefits, 
        orgLogo,
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

async function getCompanyProfile(req, res) {
  try {
    const { companyId } = res.locals.decodedToken;
    if (!companyId) {
      return res.status(400).json({ error: "Ensure you are a company to access this route" });
    }

    const companyProfile = await companyModel.findById(companyId);
    if (!companyProfile) {
      return res.status(404).json({ error: "Company profile not found" });
    }

    return res.json(companyProfile);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
}


module.exports = {
  updateCompanyProfile,
  changeCompanyPassword,
  getCompanyProfile
};
