import React, { useMemo, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";

import { Plate, createPlateEditor, PlateContent } from "@udecode/plate/react";

function QuestionModal({ onSave, onClose }) {
  const [questionText, setQuestionText] = useState("");
  const [choices, setChoices] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(null);

  const handleChoiceChange = (index, value) => {
    const updated = [...choices];
    updated[index] = value;
    setChoices(updated);
  };

  const handleSave = () => {
    if (!questionText.trim()) return alert("Please enter a question.");
    if (choices.some(c => !c.trim())) return alert("Please fill in all 4 choices.");
    if (correctIndex === null) return alert("Please select the correct answer.");
    onSave({ questionText, choices, correctIndex });
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: "white", borderRadius: 12, padding: 30,
        width: 500, maxWidth: "90%",
      }}>
        <h2 style={{ marginTop: 0 }}>Create Question</h2>

        <label style={{ fontWeight: "bold" }}>Question</label>
        <input
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Enter your question"
          style={{ width: "100%", padding: 8, marginTop: 6, marginBottom: 16, boxSizing: "border-box" }}
        />

        <label style={{ fontWeight: "bold" }}>Answer Choices</label>
        <p style={{ fontSize: 12, color: "#666", margin: "4px 0 10px" }}>
          Click the circle next to the correct answer
        </p>

        {choices.map((choice, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
            <div
              onClick={() => setCorrectIndex(i)}
              style={{
                width: 20, height: 20, borderRadius: "50%",
                border: "2px solid #7c3aed",
                backgroundColor: correctIndex === i ? "#7c3aed" : "white",
                cursor: "pointer", marginRight: 10, flexShrink: 0,
              }}
            />
            <input
              value={choice}
              onChange={(e) => handleChoiceChange(i, e.target.value)}
              placeholder={`Choice ${i + 1}`}
              style={{ flex: 1, padding: 8 }}
            />
          </div>
        ))}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
          <button onClick={onClose} style={{ padding: "8px 16px" }}>Cancel</button>
          <button
            onClick={handleSave}
            style={{ padding: "8px 16px", backgroundColor: "#7c3aed", color: "white", border: "none", borderRadius: 6, cursor: "pointer" }}
          >
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
}

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
            border: `2px solid ${i === question.correctIndex ? "#7c3aed" : "#d1d5db"}`,
            backgroundColor: i === question.correctIndex ? "#7c3aed" : "white",
            marginRight: 10, flexShrink: 0,
          }} />
          <span>{choice}</span>
        </div>
      ))}
    </div>
  );
}

function CreateChapter() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const editingChapter = location.state?.chapter;
  const isEditMode = !!editingChapter;

  const [title, setTitle] = useState(editingChapter ? editingChapter.title : "");
  const [isPublic, setIsPublic] = useState(editingChapter ? editingChapter.publicOrPrivate : false);
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [questions, setQuestions] = useState(() => {
    try {
      const parsed = editingChapter ? JSON.parse(editingChapter.content) : null;
      return parsed?.questions || [];
    } catch {
      return [];
    }
  });

  const initialValue = useMemo(() => {
    try {
      const parsed = editingChapter ? JSON.parse(editingChapter.content) : null;
      return parsed?.text || [{ type: "p", children: [{ text: "" }] }];
    } catch {
      return [{ type: "p", children: [{ text: "" }] }];
    }
  }, [editingChapter]);

  const editor = useMemo(
    () => createPlateEditor({ value: initialValue }),
    [initialValue]
  );

  const handleAddQuestion = (question) => {
    setQuestions([...questions, question]);
    setShowQuestionModal(false);
    setShowPlusMenu(false);
  };

  const handleRemoveQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        title,
        content: JSON.stringify({
          text: editor.children,
          questions,
        }),
        publicOrPrivate: isPublic,
      };

      if (isEditMode) {
        await api.patch(`/chapters/${editingChapter.id}/`, payload);
      } else {
        await api.post(`/courses/${id}/chapters/create/`, payload);
      }

      navigate(`/course/${id}/manage-chapters`);
    } catch (err) {
      console.log("ERROR:", err.response?.data || err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>{isEditMode ? "Edit Chapter" : "Create Chapter"}</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Chapter title"
        style={{ width: 300, padding: 8 }}
      />

      <br /><br />

      <label>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        Public Chapter
      </label>

      <br /><br />

      <Plate editor={editor}>
        <PlateContent
          placeholder="Write your chapter..."
          style={{
            minHeight: 200,
            border: "1px solid #ccc",
            padding: 10,
            borderRadius: 6,
          }}
        />
      </Plate>

      {/* Questions list */}
      {questions.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <h3>Questions</h3>
          {questions.map((q, i) => (
            <div key={i} style={{ position: "relative" }}>
              <QuestionBlock question={q} />
              <button
                onClick={() => handleRemoveQuestion(i)}
                style={{
                  position: "absolute", top: 8, right: 8,
                  background: "none", border: "none",
                  color: "#ef4444", cursor: "pointer", fontSize: 16,
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* + button and menu */}
      <div style={{ marginTop: 16, position: "relative", display: "inline-block" }}>
        <button
          onClick={() => setShowPlusMenu(!showPlusMenu)}
          style={{
            width: 36, height: 36, borderRadius: "50%",
            backgroundColor: "#7c3aed", color: "white",
            border: "none", fontSize: 20, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {showPlusMenu ? "✕" : "+"}
        </button>

        {showPlusMenu && (
          <div style={{
            position: "absolute", top: 44, left: 0,
            backgroundColor: "white", border: "1px solid #e5e7eb",
            borderRadius: 8, padding: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            zIndex: 100,
          }}>
            <button
              onClick={() => { setShowQuestionModal(true); }}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "8px 16px", background: "none", border: "none",
                cursor: "pointer", whiteSpace: "nowrap", fontSize: 14,
              }}
            >
              ❓ Question
            </button>
          </div>
        )}
      </div>

      <br /><br />

      <button onClick={handleSubmit}>
        {isEditMode ? "Update Chapter" : "Save Chapter"}
      </button>

      <button
        onClick={() => navigate(`/course/${id}/manage-chapters`)}
        style={{ marginLeft: 10 }}
      >
        Cancel
      </button>

      {showQuestionModal && (
        <QuestionModal
          onSave={handleAddQuestion}
          onClose={() => { setShowQuestionModal(false); setShowPlusMenu(false); }}
        />
      )}
    </div>
  );
}

export default CreateChapter;