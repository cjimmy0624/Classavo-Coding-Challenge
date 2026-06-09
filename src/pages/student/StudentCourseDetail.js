import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

function StudentCourseDetail() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const res = await api.get(`/courses/${id}/`);

      setCourse(res.data.course);

      // filter public chapters
      const publicChapters = res.data.chapters.filter(
        (ch) => ch.publicOrPrivate
      );

      setChapters(publicChapters);
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

          <hr />

          <h3>Chapters</h3>

          {chapters.map((ch) => (
            <div key={ch.id} style={{ border: "1px solid #ccc", marginTop: 10, padding: 10 }}>
              <h4>{ch.title}</h4>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default StudentCourseDetail;