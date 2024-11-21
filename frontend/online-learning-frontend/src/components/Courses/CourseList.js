import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/courses`
        );
        setCourses(response.data);
        setFilteredCourses(response.data); // Default display all courses
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
    setFilteredCourses(
      courses.filter((course) =>
        course.title.toLowerCase().includes(searchTerm)
      )
    );
  };

  return (
    <div className="course-list">
      <h2>Available Courses</h2>
      <input
        type="text"
        placeholder="Search courses..."
        value={search}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="courses-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div key={course._id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p>
                <strong>Instructor:</strong> {course.instructor?.name || "N/A"}
              </p>
              <Link to={`/courses/${course._id}`} className="btn">
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default CourseList;
