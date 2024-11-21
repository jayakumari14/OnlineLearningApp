import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "../../styles/CourseDetail.css";

const CourseDetail = () => {
  const { id } = useParams(); // Fetch the course ID from the URL
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(""); // To handle errors
  const [isEnrolled, setIsEnrolled] = useState(false); // To track if the user is enrolled
  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/courses/${id}`
        );
        setCourse(response.data);
      } catch (error) {
        setError("Error fetching course details. Please try again later.");
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) return <p>Loading...</p>;

  // Enroll the user in the course
  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // Redirect to login if not logged in
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/courses/enroll/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsEnrolled(true); // Set the enrollment state to true after successful enrollment
      console.log("Enrolled successfully:", response.data);
    } catch (error) {
      setError("Enrollment failed. Please try again.");
      console.error("Error during enrollment:", error);
    }
  };

  if (error) return <div className="error">{error}</div>; // Show error message

  if (!course) return <p>Loading...</p>; // Show loading state if course is not yet fetched

  return (
    <div className="course-detail">
      <h1>{course.title}</h1>
      <p>{course.description}</p>

      <p>
        <strong>Instructor:</strong> {course.instructor?.name || "N/A"}
      </p>

      <p>
        <strong>Duration:</strong> {course.duration} hours
      </p>

      {/* Conditional rendering for enrollment */}
      {isEnrolled ? (
        <p className="success-message">You are enrolled in this course!</p>
      ) : (
        <button className="btn" onClick={handleEnroll}>
          Enroll Now
        </button>
      )}
    </div>
  );
};

export default CourseDetail;
