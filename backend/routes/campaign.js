const express = require("express");
const catchAsync = require("../middlewares/catchAsync");
const {
  createCampaign,
  updateCampaign,
  getAllCampaigns,
  getCampaign,
  deleteCampaign,
} = require("../controllers/campaign");
const { verifyAdmin } = require("../middlewares/auth");

const router = express.Router();
router.post("/", verifyAdmin, catchAsync(createCampaign));
router.put("/:id", verifyAdmin, catchAsync(updateCampaign));
router.get("/", catchAsync(getAllCampaigns));
router.get("/:id", catchAsync(getCampaign));
router.delete("/:id", verifyAdmin, catchAsync(deleteCampaign));

module.exports = router;
