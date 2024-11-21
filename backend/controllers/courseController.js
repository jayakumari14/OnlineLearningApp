// In courseController.js
const Course = require("../models/Course");
const User = require("../models/User");

exports.getMyCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // req.user.id is populated by verifyToken middleware
    const enrolledCourses = await Course.find({
      _id: { $in: user.enrolledCourses }, // Assuming `enrolledCourses` stores course IDs
    });

    res.json(enrolledCourses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enrolled courses." });
  }
};
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses." });
  }
};
