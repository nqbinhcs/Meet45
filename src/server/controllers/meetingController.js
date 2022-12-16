const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Meeting = require("../models/meetingModel");

// @desc    Create a new meeting
// @route   POST /api/meetings
// @access  Public
const createMeeting = asyncHandler(async (req, res) => {
  const { title, uid, creator } = req.body;

  if (!title || !uid || !creator) {
    res.status(400);
    throw new Error("Please provide all fields");
  }

  // Check if meeting exists
  const meetingExists = await Meeting.findOne({ uid });

  if (meetingExists) {
    res.status(400);
    throw new Error("Meeting already exists");
  }

  // Create meeting
  const meeting = await Meeting.create({
    title: title,
    uid: uid,
    creator: creator,
  });

  if (meeting) {
    res.status(201).json({
      _id: meeting.id,
      title: meeting.title,
      uid: meeting.uid,
      creator: meeting.creator,
    });
  } else {
    res.status(404);
    throw new Error("Invalid meeting id");
  }
});

// @desc    List meetings of user
// @route   GET /api/meetings/:id
// @access  Public
const getMeeting = asyncHandler(async (req, res) => {
  const uid = req.params.id;

  const meeting = await Meeting.find({ creator: uid });

  if (meeting) {
    res.status(200).json(meeting);
  } else {
    res.status(400);
    throw new Error("Invalid User id");
  }
});

// @desc    Get meeting by uid (or check meeting exits in database)
// @route   GET /api/meetings/:id/get
// @access  Public
const getMeetingById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const meeting = await Meeting.findOne({ uid: id });

  if (meeting) {
    res.status(200).json(meeting);
  } else {
    res.status(404);
    throw new Error("Invalid UID meeting");
  }
});

module.exports = {
  createMeeting,
  getMeeting,
  getMeetingById,
};
