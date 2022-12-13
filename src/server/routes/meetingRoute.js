const express = require("express");
const router = express.Router();
const {
  createMeeting,
  getMeeting,
  getMeetingById,
} = require("../controllers/meetingController");

router.post("/", createMeeting);
router.get("/:id", getMeeting);
router.get("/:id/get", getMeetingById);

module.exports = router;
