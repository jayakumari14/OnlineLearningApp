const express = require("express");
const Course = require("../models/Course");
const verifyToken = require("../middleware/auth");
const User = require("../models/User");
const {
  createCourse,
  getAllCourses,
} = require("../controllers/courseController");

const router = express.Router();

// Create a new course (only for admins or instructors)
// router.post("/", verifyToken, async (req, res) => {
//   const { title, description } = req.body;
//   try {
//     const newCourse = new Course({
//       title,
//       description,
//       instructor: req.user.id, // Link course to the logged-in user
//     });
//     await newCourse.save();
//     res.status(201).json(newCourse);
//   } catch (error) {
//     res.status(500).json({ error: "Error creating course" });
//   }
// });
// Route to create a course
router.post("/", createCourse);

// Route to get all courses
router.get("/", getAllCourses);

// Get all courses
// router.get("/", async (req, res) => {
//   try {
//     const courses = new Course.find(); //wrong it should be await course.find()
//     res.json(courses);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching courses" });
//   }
// });

// Enroll in a course
router.post("/enroll/:courseId", verifyToken, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (course.enrolledUsers.includes(req.user.id)) {
      return res.status(400).json({ error: "Already enrolled in this course" });
    }

    // Prevent enrolling again if already in the user's enrolledCourses
    if (user.enrolledCourses.includes(course._id)) {
      return res.status(400).json({ error: "Already enrolled in this course" });
    }

    // Enroll user and update both course and user
    course.enrolledUsers.push(req.user.id);
    user.enrolledCourses.push(course._id);
    await course.save();
    await user.save();

    res.json({ message: "Successfully enrolled in course", course });
  } catch (error) {
    res.status(500).json({ error: "Error enrolling in course" });
  }
});

// Route to get courses enrolled by the logged-in user
router.get("/my", verifyToken, async (req, res) => {
  try {
    // Find courses where the logged-in user is enrolled
    const courses = await Course.find({
      enrolledUsers: req.user.id, // Make sure `req.user.id` matches the enrolledUsers array
    });
    if (!courses) {
      return res.status(404).json({ error: "No enrolled courses found" });
    }
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Error fetching enrolled courses" });
  }
});

module.exports = router;
