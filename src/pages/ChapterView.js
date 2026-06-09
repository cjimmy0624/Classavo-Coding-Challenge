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

  const renderContent = (content) => {
    if (!content) return "";

    try {
      const parsed =
        typeof content === "string" ? JSON.parse(content) : content;

      if (!Array.isArray(parsed)) return content;

      return parsed
        .map((block) =>
          block.children?.map((child) => child.text).join("") || ""
        )
        .join("\n\n");
    } catch (e) {
      return content;
    }
  };

  if (!chapter) return <h3>Loading...</h3>;

  return (
    <div style={{ padding: 20 }}>

      {/* BACK BUTTON */}
      <button onClick={() => navigate(-1)}>
        ← Go Back
      </button>

      {/* TITLE */}
      <h1 style={{ marginTop: 20 }}>{chapter.title}</h1>

      {/* CONTENT */}
      <div
        style={{
          marginTop: 20,
          whiteSpace: "pre-wrap",
          lineHeight: "1.6",
          fontSize: "16px",
        }}
      >
        {renderContent(chapter.content)}
      </div>

    </div>
  );
}

export default ChapterView;