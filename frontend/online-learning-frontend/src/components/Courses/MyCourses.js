import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/MyCourses.css";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/courses/my`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch your courses");
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  if (loading) {
    return (
      <div className="loader"></div> // Display loading spinner
    );
  }

  if (error) {
    return <div className="error">{error}</div>; // Error handling
  }

  return (
    <div className="my-courses-container">
      <h2>My Courses</h2>
      <div className="courses-grid">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course._id} className="course-card">
              <img
                src={course.image || "/default-course-image.jpg"} // Add a default image in case there is no course image
                alt={course.title}
                className="course-image"
              />
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
