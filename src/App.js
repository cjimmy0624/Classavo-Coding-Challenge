import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import CreateCourse from "./pages/instructor/CreateCourse";
import CourseDetail from "./pages/instructor/CourseDetail";

import CreateChapter from "./pages/instructor/CreateChapter";
import ManageChapters from "./pages/instructor/ManageChapters";
import ChapterView from "./pages/ChapterView";

import StudentCourses from "./pages/student/StudentCourses";
import StudentCourseDetail from "./pages/student/StudentCourseDetail";
import MyCourses from "./pages/student/MyCourses";

function App() {
  return (
    <Routes>
      {/* default */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* instructor */}
      <Route path="/instructor" element={<InstructorDashboard />} />
      <Route path="/create-course" element={<CreateCourse />} />
      <Route path="/course/:id" element={<CourseDetail />} />

      <Route path="/course/:id/create-chapter" element={<CreateChapter />} />
      <Route path="/course/:id/manage-chapters" element={<ManageChapters />} />
      <Route path="/chapter/:id" element={<ChapterView />} />

      {/* student */}
      <Route path="/student/courses" element={<StudentCourses />} />
      <Route path="/student/course/:id" element={<StudentCourseDetail />} />
      <Route path="/student/my-courses" element={<MyCourses />} />
    </Routes>
  );
}

export default App;