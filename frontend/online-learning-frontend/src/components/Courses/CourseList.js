import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Courses.css";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/courses`
        );
        setCourses(response.data);
      } catch (error) {
        console.log("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      <div className="course-list">
        <h2>Available Courses</h2>
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course._id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button className="btn">Enroll</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseList;
