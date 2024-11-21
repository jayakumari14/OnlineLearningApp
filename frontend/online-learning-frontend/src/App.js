import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import CourseDetail from "./components/Courses/CourseDetail";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import MyCourses from "./components/Courses/MyCourses";
import CourseList from "./components/Courses/CourseList";

const App = () => {
  return (
    <>
      <Router>
        <ToastContainer position="top-center" autoClose={3000} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route exact path="/courses/:id" component={CourseDetail} />{" "}
          {/* Route for individual course */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-courses"
            element={
              <ProtectedRoute>
                <MyCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <CourseList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
