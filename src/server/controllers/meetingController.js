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
//   const { email, password } = req.body;

//   // Check for user email
//   const user = await User.findOne({ email });

//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid credentials");
//   }

  const id = req.params.id;

  const meetings = await Meeting.find({creator:id})

  if (meeting){
      res.status(201).json({
        'message' : 'success'
      });
  }
  else{
      res.status(400);
      throw new Error("Invalid credentials");
  }
});


module.exports = {
  createMeeting,
  getMeeting
};
