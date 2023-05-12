const express = require("express");
const catchAsync = require("../middlewares/catchAsync");
const {
  createKnowledgebase,
  updateKnowledgebase,
  deleteKnowledgebase,
  getAllKnowledgeBase,
  getKnowledgebase,
} = require("../controllers/knowlege-base");
const { verifyAdmin } = require("../middlewares/auth");

const router = express.Router();
router.post("/", verifyAdmin, catchAsync(createKnowledgebase));
router.put("/:id", verifyAdmin, catchAsync(updateKnowledgebase));
router.get("/", catchAsync(getAllKnowledgeBase));
router.get("/:id", catchAsync(getKnowledgebase));
router.delete("/:id", verifyAdmin, catchAsync(deleteKnowledgebase));

module.exports = router;
