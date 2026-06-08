import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CourseList from "./pages/CourseList";
import CourseDetail from "./pages/CourseDetail";
import ChapterDetail from "./pages/ChapterDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/courses" element={<CourseList />} />
      <Route path="/courses/:id" element={<CourseDetail />} />

      <Route path="/chapters/:id" element={<ChapterDetail />} />

      <Route path="/instructor" element={<InstructorPage />} />
      <Route path="/student" element={<StudentPage />} /> 
    </Routes>
  );
}

export default App;