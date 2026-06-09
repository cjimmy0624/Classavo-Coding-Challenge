import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function StudentCourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const res = await api.get(`/courses/${id}/`);
      setCourse(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!course) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      
      {/* BACK BUTTONS */}
      <div style={{ marginBottom: 20, display: "flex", gap: 10 }}>
        <button onClick={() => navigate("/student/my-courses")}>
          ← My Courses
        </button>

        <button onClick={() => navigate("/student/courses")}>
          ← All Courses
        </button>

        <button onClick={() => navigate(-1)}>
          ⬅ Go Back
        </button>
      </div>

      {/* COURSE INFO */}
      <h1>{course.course.title}</h1>
      <p>{course.course.description}</p>

      {/* CHAPTERS */}
      <h3 style={{ marginTop: 20 }}>Public Chapters</h3>

      {course.chapters?.length === 0 ? (
        <p>No public chapters available.</p>
      ) : (
        course.chapters
          .filter((ch) => ch.publicOrPrivate)
          .map((ch) => (
            <div
              key={ch.id}
              style={{
                border: "1px solid #ccc",
                padding: 10,
                marginTop: 10,
                borderRadius: 8,
              }}
            >
              <h4>{ch.title}</h4>
            </div>
          ))
      )}
    </div>
  );
}

export default StudentCourseDetail;