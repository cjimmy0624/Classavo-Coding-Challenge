import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

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

      {courses.map((course) => (
        <div key={course.id} style={{ border: "1px solid #ccc", marginTop: 10, padding: 10 }}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>

          <button onClick={() => joinCourse(course.id)}>
            Join
          </button>

          <button
            style={{ marginLeft: 10 }}
            onClick={() => navigate(`/student/course/${course.id}`)}
          >
            Open
          </button>
        </div>
      ))}
    </div>
  );
}

export default StudentCourses;