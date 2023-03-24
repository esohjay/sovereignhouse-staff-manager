const Campaign = require("../models/campaign");
const Applicants = require("../models/applicant");

module.exports.createCampaign = async (req, res) => {
  const campaign = await Campaign.create(req.body);
  res.status(201).json(campaign);
};
module.exports.updateCampaign = async (req, res) => {
  const { id } = req.params;
  const campaign = await Campaign.update(req.body, { where: { id } });
  res.status(201).json(campaign);
};
module.exports.getAllCampaigns = async (req, res) => {
  const campaigns = await Campaign.findAll({ include: Applicants });
  res.status(200).json(campaigns);
};
module.exports.getCampaign = async (req, res) => {
  const { id } = req.params;
  const campaign = await Campaign.findByPk(id, { include: Applicants });
  res.status(200).json(campaign);
};

module.exports.deleteCampaign = async (req, res) => {
  const { id } = req.params;
  await Campaign.destroy({ where: { id } });
  res.status(204).json({ message: "Campaign deleted" });
};
