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
    title,
    uid,
    creator,
  });

  if (meeting) {
    res.status(201).json({
      _id: meeting.id,
      title: meeting.title,
      uid: meeting.uid,
      creator: meeting.creator,
    });
  } else {
    res.status(400);
    throw new Error("Invalid meeting id");
  }
});

// @desc    List meetings of user
// @route   GET /api/meetings/:id
// @access  Public
const getMeeting = asyncHandler(async (req, res) => {

  const id = req.params.id;

  const meetings = await Meeting.find({ creator: id }, function (err, docs) {
    if (err) {
       res.status(400);
       throw new Error(err);
    } else {
       res.status(201).jsonp(docs);
    }
  });

});


module.exports = {
  createMeeting,
  getMeeting
};
