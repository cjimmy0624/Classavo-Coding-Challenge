import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function QuestionBlock({ question }) {
  return (
    <div style={{
      border: "1px solid #e5e7eb", borderRadius: 8, padding: 16,
      margin: "12px 0", backgroundColor: "#f9fafb",
    }}>
      <p style={{ fontWeight: "bold", marginTop: 0 }}>{question.questionText}</p>
      {question.choices.map((choice, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          <div style={{
            width: 18, height: 18, borderRadius: "50%",
            border: `2px solid #d1d5db`,
            backgroundColor: "white",
            marginRight: 10, flexShrink: 0,
          }} />
          <span>{choice}</span>
        </div>
      ))}
    </div>
  );
}

function renderContent(nodes) {
  if (!Array.isArray(nodes)) return null;
  return nodes.map((node, i) => {
    if (node.type === "p") {
      return (
        <p key={i}>
          {node.children.map((child, j) => (
            <span key={j}>{child.text}</span>
          ))}
        </p>
      );
    }
    return null;
  });
}

function ChapterView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [chapter, setChapter] = useState(null);
<<<<<<< HEAD
  const [textContent, setTextContent] = useState(null);
  const [questions, setQuestions] = useState([]);
=======
>>>>>>> fd6e9a221cea24033ef3ac5da85bc0a19f4fd0fc

  useEffect(() => {
    fetchChapter();
  }, [id]);

  const fetchChapter = async () => {
    try {
      const res = await api.get(`/chapters/${id}/`);
<<<<<<< HEAD
      const data = res.data.chapter || res.data;
      setChapter(data);

      try {
        const parsed = JSON.parse(data.content);

        // new format: { text: [...], questions: [...] }
        if (parsed?.text && parsed?.questions !== undefined) {
          setTextContent(parsed.text);
          setQuestions(parsed.questions);
        }
        // old format: just an array of nodes
        else if (Array.isArray(parsed)) {
          setTextContent(parsed);
          setQuestions([]);
        }
      } catch {
        setTextContent(null);
        setQuestions([]);
      }

=======
      setChapter(res.data.chapter || res.data);
>>>>>>> fd6e9a221cea24033ef3ac5da85bc0a19f4fd0fc
    } catch (err) {
      console.log(err);
    }
  };

<<<<<<< HEAD
  if (!chapter) return <h3>Loading...</h3>;

  return (
    <div style={{ padding: 20, maxWidth: 800 }}>
      <button onClick={() => navigate(-1)}>← Go Back</button>

      <h1>{chapter.title}</h1>

      <div style={{ marginTop: 20 }}>
        {textContent ? renderContent(textContent) : (
          <p style={{ whiteSpace: "pre-wrap" }}>{chapter.content}</p>
        )}
      </div>

      {questions.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <h2>Questions</h2>
          {questions.map((q, i) => (
            <QuestionBlock key={i} question={q} />
          ))}
        </div>
      )}
=======
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

>>>>>>> fd6e9a221cea24033ef3ac5da85bc0a19f4fd0fc
    </div>
  );
}

export default ChapterView;