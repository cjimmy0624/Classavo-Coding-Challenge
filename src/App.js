import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import CreateCourse from "./pages/instructor/CreateCourse";
import CourseDetail from "./pages/instructor/CourseDetail";

import CreateChapter from "./pages/instructor/CreateChapter";
import ManageChapters from "./pages/instructor/ManageChapters";

import StudentPage from "./pages/StudentPage";

function App() {
  return (
    <Routes>
      {/* default route */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* instructor */}
      <Route path="/instructor" element={<InstructorDashboard />} />
      <Route path="/create-course" element={<CreateCourse />} />
      <Route path="/course/:id" element={<CourseDetail />} />

      {/* chapters */}
      <Route path="/course/:id/create-chapter" element={<CreateChapter />} />
      <Route path="/course/:id/manage-chapters" element={<ManageChapters />} />

      {/* student */}
      <Route path="/student/courses" element={<StudentCourses />} />
      <Route path="/student/course/:id" element={<StudentCourseDetail />} />
    </Routes>
  );
}

export default App;