const express = require("express");
const Course = require("../models/Course");
const verifyToken = require("../middleware/auth");

const router = express.Router();

// Create a new course (only for admins or instructors)
router.post("/", verifyToken, async (req, res) => {
  const { title, description } = req.body;
  try {
    const newCourse = new Course({
      title,
      description,
      instructor: req.user.id, // Link course to the logged-in user
    });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: "Error creating course" });
  }
});

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = new Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Error fetching courses" });
  }
});

// Enroll in a course
router.post("/enroll/:courseId", verifyToken, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    if (course.enrolledUsers.includes(req.user.id)) {
      return res.status(400).json({ error: "Already enrolled in this course" });
    }
    course.enrolledUsers.push(req.user.id);
    await course.save();
    res.json({ message: "Successfully enrolled in course", course });
  } catch (error) {
    res.status(500).json({ error: "Error enrolling in course" });
  }
});

module.exports = router;
