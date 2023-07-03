const express = require("express");
const catchAsync = require("../middlewares/catchAsync");
const {
  createApplication,
  //   updateApplicant,
  getAllApplicantions,
  getApplication,
  updateApplication,
  deleteApplication,
  //   getApplicant,
  //   deleteApplicant,
  //   getCampaignApplicants,
  //   uploadFile,
  //   scheduleInterview,
  //   requestInterview,
} = require("../controllers/student-application");
const { verifyAdmin } = require("../middlewares/auth");
const { uploadCv } = require("../utils/multerConfig");

const router = express.Router();
router.post("/", catchAsync(createApplication));
router.put("/:id/update", verifyAdmin, catchAsync(updateApplication));
// router.put("/:id/interview", verifyAdmin, catchAsync(scheduleInterview));
// router.put("/:id/request-interview", verifyAdmin, catchAsync(requestInterview));
// router.post("/upload", uploadCv.single("file"), catchAsync(uploadFile));
router.get("/", verifyAdmin, catchAsync(getAllApplicantions));
router.get("/:id", verifyAdmin, catchAsync(getApplication));
// router.get("/:id/campaign", verifyAdmin, catchAsync(getCampaignApplicants));
router.delete("/:id", verifyAdmin, catchAsync(deleteApplication));

module.exports = router;
