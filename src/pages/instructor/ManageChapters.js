import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

function ManageChapters() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    fetchChapters();
  }, [id]);

  const fetchChapters = async () => {
    try {
      const res = await api.get(`/courses/${id}/`);
      setChapters(res.data.chapters);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleVisibility = async (chapterId, currentValue) => {
    try {
      await api.patch(`/chapters/${chapterId}/`, {
        publicOrPrivate: !currentValue,
      });

      fetchChapters();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteChapter = async (chapterId) => {
    try {
      await api.delete(`/chapters/${chapterId}/delete/`);
      fetchChapters();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Manage Chapters</h1>

      {/* GO BACK */}
      <button onClick={() => navigate(`/course/${id}`)}>
        ⬅ Go Back
      </button>

      <div style={{ marginTop: 20 }}>
        {chapters.map((ch) => (
          <div
            key={ch.id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginTop: 10,
            }}
          >
            <h3>{ch.title}</h3>

            <p>
              Visibility: <b>{ch.publicOrPrivate ? "Public" : "Private"}</b>
            </p>

            <div style={{ display: "flex", gap: 10 }}>
              
              <button
                onClick={() =>
                  toggleVisibility(ch.id, ch.publicOrPrivate)
                }
              >
                Toggle Visibility
              </button>

              {/* EDIT → reuse create page */}
              <button
                onClick={() =>
                  navigate(`/course/${id}/create-chapter`, {
                    state: { chapter: ch }
                  })
                }
              >
                ✏️ Edit
              </button>

              <button
                onClick={() => deleteChapter(ch.id)}
                style={{ color: "red" }}
              >
                🗑 Delete
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageChapters;