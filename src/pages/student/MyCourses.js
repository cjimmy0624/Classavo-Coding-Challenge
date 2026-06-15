import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyCourses = async () => {
    try {
      setLoading(true);
      const res = await api.get("/student/courses/");
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>My Courses</h1>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => navigate("/student/courses")}>
          ← Browse All Courses
        </button>

        <button onClick={fetchMyCourses}>
          Refresh
        </button>
      </div>

      {/* LOADING */}
      {loading ? (
        <p style={{ marginTop: 20 }}>Loading courses...</p>
      ) : courses.length === 0 ? (
        <p style={{ marginTop: 20 }}>
          You are not enrolled in any courses yet.
        </p>
      ) : (
        courses.map((course) => (
          <div
            key={course.id}
            style={{
              border: "1px solid #ccc",
              marginTop: 10,
              padding: 10,
              borderRadius: 8,
            }}
          >
            <h3>{course.title}</h3>
            <p>{course.description}</p>

            <button
              onClick={() => navigate(`/student/course/${course.id}`)}
            >
              Open Course
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyCourses;