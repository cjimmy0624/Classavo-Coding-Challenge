import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

function ManageChapters() {
  const { id } = useParams();

  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    fetchChapters();
  }, []);

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

  return (
    <div style={{ padding: 20 }}>
      <h1>Manage Chapters</h1>

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
            Visibility:{" "}
            <b>{ch.publicOrPrivate ? "Public" : "Private"}</b>
          </p>

          <button
            onClick={() =>
              toggleVisibility(ch.id, ch.publicOrPrivate)
            }
          >
            Toggle Visibility
          </button>
        </div>
      ))}
    </div>
  );
}

export default ManageChapters;