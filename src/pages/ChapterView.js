import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function QuestionBlock({ question }) {
  const [selected, setSelected] = React.useState(null);
  const [result, setResult] = React.useState(null);

  if (!question) return null;

  const handleSelect = (i) => {
    setSelected(i);

    if (i === question.correctIndex) {
      setResult("correct");
    } else {
      setResult("wrong");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: 16,
        margin: "12px 0",
        backgroundColor: "#f9fafb",
      }}
    >
      <p style={{ fontWeight: "bold", marginTop: 0 }}>
        {question.questionText}
      </p>

      {question.choices.map((choice, i) => {
        const isSelected = selected === i;

        let bg = "white";
        let border = "1px solid #d1d5db";

        if (isSelected && result === "correct") {
          bg = "#dcfce7"; // green
          border = "1px solid #22c55e";
        }

        if (isSelected && result === "wrong") {
          bg = "#fee2e2"; // red
          border = "1px solid #ef4444";
        }

        return (
          <div
            key={i}
            onClick={() => handleSelect(i)}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 8,
              padding: 8,
              borderRadius: 6,
              cursor: "pointer",
              backgroundColor: bg,
              border,
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                border: "2px solid #d1d5db",
                marginRight: 10,
                flexShrink: 0,
              }}
            />

            <span>{choice}</span>
          </div>
        );
      })}

      {/* feedback */}
      {result === "correct" && (
        <p style={{ color: "#16a34a", fontWeight: "bold" }}>
          ✅ Correct!
        </p>
      )}

      {result === "wrong" && (
        <p style={{ color: "#dc2626", fontWeight: "bold" }}>
          ❌ Wrong. Correct answer:{" "}
          <b>{question.choices[question.correctIndex]}</b>
        </p>
      )}
    </div>
  );
}

function renderContent(nodes) {
  if (!Array.isArray(nodes)) return null;
  return nodes.map((node, i) => {
    if (node.type === "p") {
      return (
        <p key={i}>
          {node.children.map((child, j) => {
            if (child.bold) {
              return <strong key={j}>{child.text}</strong>;
            }
            return <span key={j}>{child.text}</span>;
          })}
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
  const [textContent, setTextContent] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchChapter();
  }, [fetchChapter]);

  const fetchChapter = useCallback(async () => {
  try {
    const res = await api.get(`/chapters/${id}/`);
    const data = res.data.chapter || res.data;
    setChapter(data);

    try {
      const parsed = JSON.parse(data.content);

      if (parsed?.text && parsed?.questions !== undefined) {
        setTextContent(parsed.text);
        setQuestions(parsed.questions);
      } else if (Array.isArray(parsed)) {
        setTextContent(parsed);
        setQuestions([]);
      }
    } catch {
      setTextContent(null);
      setQuestions([]);
    }

  } catch (err) {
    console.log(err);
  }
}, [id]);

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
    </div>
  );
}

export default ChapterView;