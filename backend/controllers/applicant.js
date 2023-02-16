const Applicant = require("../models/applicant");

module.exports.createApplicant = async (req, res) => {
  const applicant = await Applicant.create(req.body);
  res.status(201).json(applicant);
};
module.exports.updateApplicant = async (req, res) => {
  const { id } = req.params;
  const applicant = await Applicant.update(req.body, { where: { id } });
  res.status(201).json(applicant);
};
module.exports.getAllApplicants = async (req, res) => {
  const applicants = await Applicant.findAll();
  res.status(200).json(applicants);
};
module.exports.getApplicant = async (req, res) => {
  const { id } = req.params;
  const applicant = await Applicant.findByPk(id);
  res.status(200).json(applicant);
};
module.exports.getCampaignApplicants = async (req, res) => {
  const { id } = req.params;
  const applicants = await Applicant.findAll({
    where: {
      CampaignId: id,
    },
  });
  res.status(200).json(applicants);
};
module.exports.deleteApplicant = async (req, res) => {
  const { id } = req.params;
  await Applicant.destroy({ where: { id } });
  res.status(204).json({ message: "Applicant deleted" });
};
