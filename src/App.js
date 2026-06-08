import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CourseList from "./pages/CourseList";
import CourseDetail from "./pages/CourseDetail";
import ChapterDetail from "./pages/ChapterDetail";

function App() {
  return (
    <Router>
      <Routes>

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* LMS */}
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/chapters/:id" element={<ChapterDetail />} />

      </Routes>
    </Router>
  );
}

export default App;