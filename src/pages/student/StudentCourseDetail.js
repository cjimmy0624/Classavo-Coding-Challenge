import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

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

  if (!course) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      
      {/* GO BACK BUTTON */}
      <button onClick={() => navigate("/student/courses")}>
        ⬅ Go Back
      </button>

      <h1>{course.course.title}</h1>
      <p>{course.course.description}</p>

      <h3>Public Chapters</h3>

      {course.chapters
        .filter((ch) => ch.publicOrPrivate)
        .map((ch) => (
          <div
            key={ch.id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginTop: 10,
              borderRadius: 8
            }}
          >
            <h4>{ch.title}</h4>
          </div>
        ))}
    </div>
  );
}

export default StudentCourseDetail;