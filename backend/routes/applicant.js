const express = require("express");
const catchAsync = require("../middlewares/catchAsync");
const {
  createApplicant,
  updateApplicant,
  getAllApplicants,
  getApplicant,
  deleteApplicant,
  getCampaignApplicants,
  uploadFile,
  scheduleInterview,
} = require("../controllers/applicant");
const { verifyAdmin } = require("../middlewares/auth");
const { upload } = require("../utils/multerConfig");

const router = express.Router();
router.post("/", catchAsync(createApplicant));
router.put("/:id", verifyAdmin, catchAsync(updateApplicant));
router.put("/:id/interview", verifyAdmin, catchAsync(scheduleInterview));
router.post("/upload", upload.single("file"), catchAsync(uploadFile));
router.get("/", verifyAdmin, catchAsync(getAllApplicants));
router.get("/:id", verifyAdmin, catchAsync(getApplicant));
router.get("/:id/campaign", verifyAdmin, catchAsync(getCampaignApplicants));
router.delete("/:id", verifyAdmin, catchAsync(deleteApplicant));

module.exports = router;
