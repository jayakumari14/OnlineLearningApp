const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model (Instructor)
  },
  enrolledUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the enrolled User(s)
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
