import React from "react";
import CourseList from "../components/Courses/CourseList"; // Importing the CourseList component
import "../styles/CoursePage.css";

const CoursePage = () => {
  return (
    <div className="course-page">
      <h1>Explore Our Courses</h1>
      {/* Use CourseList component to display the courses */}
      <CourseList />
    </div>
  );
};

export default CoursePage;
