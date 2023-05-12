const KnowledgeBase = require("../models/knowledge-base");

module.exports.createKnowledgebase = async (req, res) => {
  const knowledgebase = await KnowledgeBase.create(req.body);
  res.status(201).json(knowledgebase);
};
module.exports.updateKnowledgebase = async (req, res) => {
  const { id } = req.params;
  const knowledgebase = await KnowledgeBase.update(req.body, { where: { id } });
  res.status(201).json(knowledgebase);
};
module.exports.getAllKnowledgeBase = async (req, res) => {
  const knowledgeBase = await KnowledgeBase.findAll();
  res.status(200).json(knowledgeBase);
};
module.exports.getKnowledgebase = async (req, res) => {
  const { id } = req.params;
  const knowledgebase = await KnowledgeBase.findOne({ where: { id } });
  res.status(200).json(knowledgebase);
};
module.exports.deleteKnowledgebase = async (req, res) => {
  const { id } = req.params;
  await KnowledgeBase.destroy({ where: { id } });
  res.status(204).json({ message: "Knowledgebase deleted" });
};
