import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function ChapterView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [chapter, setChapter] = useState(null);

  useEffect(() => {
    fetchChapter();
  }, [id]);

  const fetchChapter = async () => {
    try {
      const res = await api.get(`/chapters/${id}/`);
      setChapter(res.data.chapter || res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!chapter) return <h3>Loading...</h3>;

  return (
    <div style={{ padding: 20 }}>

      {/* BACK BUTTON */}
      <button onClick={() => navigate(-1)}>← Go Back</button>

      {/* CHAPTER TITLE */}
      <h1 style={{ marginTop: 20 }}>{chapter.title}</h1>

      {/* CHAPTER CONTENT */}
      {/* dangerouslySetInnerHTML handles Plate.js rich text HTML */}
      {/* whiteSpace fallback handles plain text if content is not HTML */}
      <div
        style={{ marginTop: 20, whiteSpace: "pre-wrap", lineHeight: "1.6" }}
        dangerouslySetInnerHTML={{ __html: chapter.content }}
      />

    </div>
  );
}

export default ChapterView;