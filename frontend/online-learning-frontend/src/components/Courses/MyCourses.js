import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/MyCourses.css";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/courses/my`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to fetch your courses");
      }
    };

    fetchMyCourses();
  }, []);

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="my-courses-container">
      <h2>My Courses</h2>
      <div className="courses-grid">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course._id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button className="btn">Go to Course</button>
            </div>
          ))
        ) : (
          <p>You have not enrolled in any courses yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
