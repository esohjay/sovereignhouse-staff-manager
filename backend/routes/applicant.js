const express = require("express");
const catchAsync = require("../middlewares/catchAsync");
const {
  createApplicant,
  updateApplicant,
  getAllApplicants,
  getApplicant,
  deleteApplicant,
  getCampaignApplicants,
} = require("../controllers/applicant");
const { verifyAdmin } = require("../middlewares/auth");

const router = express.Router();
router.post("/", catchAsync(createApplicant));
router.put("/:id", verifyAdmin, catchAsync(updateApplicant));
router.get("/", verifyAdmin, catchAsync(getAllApplicants));
router.get("/:id", verifyAdmin, catchAsync(getApplicant));
router.get("/:id/campaign", verifyAdmin, catchAsync(getCampaignApplicants));
router.delete("/:id", verifyAdmin, catchAsync(deleteApplicant));

module.exports = router;
