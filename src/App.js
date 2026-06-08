import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import CreateCourse from "./pages/instructor/CreateCourse";
import CourseDetail from "./pages/instructor/CourseDetail";

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

      {/* student */}
      <Route path="/student" element={<StudentPage />} />
    </Routes>
  );
}

export default App;