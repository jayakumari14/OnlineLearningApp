// In courseController.js

const User = require("../models/User");

const Course = require("../models/Course");

// Create a new course
exports.createCourse = async (req, res) => {
  const { title, description, instructor } = req.body;

  try {
    const newCourse = new Course({
      title,
      description,
      instructor,
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Error creating course" });
  }
};

// Fetch all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("instructor", "name email")
      .populate("enrolledUsers", "name email");
    console.log("courses", courses);

    if (!courses) {
      return res.status(404).json({ message: "No courses found." });
    }
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error.message, error.stack);
    res
      .status(500)
      .json({ message: "Error fetching courses.", error: error.message });
  }
};

exports.getMyCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // req.user.id is populated by verifyToken middleware
    const enrolledCourses = await Course.find({
      _id: { $in: user.enrolledCourses }, //  `enrolledCourses` stores course IDs
    });

    res.json(enrolledCourses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enrolled courses." });
  }
};
// exports.getAllCourses = async (req, res) => {
//   try {
//     const courses = await Course.find()
//       .populate("instructor")
//       .populate("enrolledUsers");

//     res.json(courses);
//   } catch (error) {
//     console.error("Error fetching courses:", error); // Log error details
//     res.status(500).json({ message: "Error fetching courses." });
//   }
// };
