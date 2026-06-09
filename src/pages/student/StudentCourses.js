import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function StudentCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses/");
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    // optional: clear auth token if you use one
    localStorage.removeItem("token");

    navigate("/login");
  };

  const joinCourse = async (courseId) => {
    try {
      await api.post(`/courses/${courseId}/enroll/`);
      alert("Joined course!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Available Courses</h1>

      {/* TOP BUTTONS */}
      <div style={{ marginBottom: 20, display: "flex", gap: 10 }}>
        <button onClick={handleLogout} style={{ background: "red", color: "white" }}>
          Logout
        </button>
      </div>

      {/* COURSE LIST */}
      {courses.map((course) => (
        <div
          key={course.id}
          style={{
            border: "1px solid #ccc",
            marginTop: 10,
            padding: 10,
            borderRadius: 8
          }}
        >
          <h3>{course.title}</h3>
          <p>{course.description}</p>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => joinCourse(course.id)}>
              Join
            </button>

            <button onClick={() => navigate(`/student/course/${course.id}`)}>
              Open
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StudentCourses;