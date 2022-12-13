const express = require("express");
const router = express.Router();
const {
  createMeeting,
  getMeeting
} = require("../controllers/meetingController");

router.post("/", createMeeting);
router.get("/:id", getMeeting);

module.exports = router;
