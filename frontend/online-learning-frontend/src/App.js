import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import CourseDetail from "./components/Courses/CourseDetail";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route exact path="/courses/:id" component={CourseDetail} />{" "}
          {/* Route for individual course */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
