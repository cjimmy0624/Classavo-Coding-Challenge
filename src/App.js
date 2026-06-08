import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InstructorPage from "./pages/InstructorPage";
import StudentPage from "./pages/StudentPage";

function App() {
  return (
    <Routes>
      {/* default page */}
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/instructor" element={<InstructorPage />} />
      <Route path="/student" element={<StudentPage />} />
    </Routes>
  );
}

export default App;