import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/CourseDetail.css";

const CourseDetail = () => {
  const { id } = useParams(); // Fetch the course ID from the URL
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/courses/${id}`
        );
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (!course) return <p>Loading...</p>;

  return (
    <div className="course-detail">
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <p>
        <strong>Instructor:</strong> {course.instructor}
      </p>
      <button className="btn">Enroll Now</button>
    </div>
  );
};

export default CourseDetail;
