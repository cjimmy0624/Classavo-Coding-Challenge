import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const res = await api.get(`/courses/${id}/`);
      setCourse(res.data.course);
      setChapters(res.data.chapters);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      {course && (
        <>
          <h1>{course.title}</h1>
          <p>{course.description}</p>

          <button onClick={() => navigate(`/course/${id}/create-chapter`)}>
            + Create Chapter
          </button>

          <button
            style={{ marginLeft: 10 }}
            onClick={() => navigate(`/course/${id}/manage-chapters`)}
          >
            Manage Chapters
          </button>

          <hr />

          <h3>Chapters Preview</h3>

          {chapters.map((ch) => (
            <div
              key={ch.id}
              style={{ border: "1px solid #ccc", padding: 10, marginTop: 10 }}
            >
              <h4>{ch.title}</h4>
              <p>
                Status:{" "}
                {ch.publicOrPrivate ? "Public" : "Private"}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default CourseDetail;