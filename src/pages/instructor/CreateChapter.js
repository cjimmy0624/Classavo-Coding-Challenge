import React, { useMemo, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../../api/axios";

import { BoldPlugin } from "@udecode/plate-basic-marks/react";
import { Plate, createPlateEditor, PlateContent } from "@udecode/plate/react";

/* ---------------- QUESTION MODAL ---------------- */

function QuestionModal({ onSave, onClose }) {
  const [questionText, setQuestionText] = useState("");
  const [choices, setChoices] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(null);

  const handleChoiceChange = (i, value) => {
    const copy = [...choices];
    copy[i] = value;
    setChoices(copy);
  };

  const handleSave = () => {
    if (!questionText.trim()) return alert("Enter question");
    if (choices.some((c) => !c.trim())) return alert("Fill all choices");
    if (correctIndex === null) return alert("Select correct answer");

    onSave({ questionText, choices, correctIndex });
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2>Create Question</h2>

        <input
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Question"
          style={input}
        />

        <br /><br />

        {choices.map((c, i) => (
          <div key={i} style={{ display: "flex", marginBottom: 10 }}>
            <div
              onClick={() => setCorrectIndex(i)}
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                border: "2px solid #7c3aed",
                background: correctIndex === i ? "#7c3aed" : "white",
                marginRight: 10,
                cursor: "pointer",
              }}
            />
            <input
              value={c}
              onChange={(e) => handleChoiceChange(i, e.target.value)}
              placeholder={`Choice ${i + 1}`}
            />
          </div>
        ))}

        <button onClick={handleSave} style={saveBtn}>
          Add Question
        </button>

        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

/* ---------------- QUESTION BLOCK ---------------- */

function QuestionBlock({ question, onRemove }) {
  return (
    <div style={block}>
      <b>{question.questionText}</b>
      {question.choices.map((c, i) => (
        <div key={i}>{c}</div>
      ))}
      <button onClick={onRemove}>Delete</button>
    </div>
  );
}

/* ---------------- MAIN ---------------- */

function CreateChapter() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const editingChapter = location.state?.chapter;
  const isEditMode = !!editingChapter;

  const [title, setTitle] = useState(editingChapter?.title || "");
  const [isPublic, setIsPublic] = useState(
    editingChapter?.publicOrPrivate || false
  );

  const [questions, setQuestions] = useState(() => {
    try {
      const parsed = JSON.parse(editingChapter.content);
      return parsed.questions || [];
    } catch {
      return [];
    }
  });

  const [showModal, setShowModal] = useState(false);

  /* ---------------- AI STATE ---------------- */

  const [showAIModal, setShowAIModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  /* ---------------- CURSOR POSITION ---------------- */

  const [plusPos, setPlusPos] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    const rect = sel.getRangeAt(0).getBoundingClientRect();

    setPlusPos({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX - 35,
    });
  };

  /* ---------------- EDITOR ---------------- */

  const initialValue = useMemo(() => {
    try {
      return JSON.parse(editingChapter.content).text;
    } catch {
      return [{ type: "p", children: [{ text: "" }] }];
    }
  }, [editingChapter]);

  const editor = useMemo(
    () =>
      createPlateEditor({
        plugins: [BoldPlugin],
        value: initialValue,
        override: {
          components: {
            bold: ({ children }) => <strong>{children}</strong>,
          },
        },
      }),
    [initialValue]
  );

  /* ---------------- HANDLERS ---------------- */

  const handleAddQuestion = (q) => {
    setQuestions((prev) => [...prev, q]);
    setShowModal(false);
  };

  const handleSubmit = async () => {
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
  };

  /* ---------------- UI ---------------- */

  return (
    <div style={{ padding: 20 }}>
      <h1>{isEditMode ? "Edit" : "Create"} Chapter</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Chapter title"
      />

      <label>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        Public Chapter
      </label>

      {/* ---------------- EDITOR ---------------- */}
      <div style={{ position: "relative" }}>
        <Plate editor={editor}>
          <PlateContent
            placeholder="Write your chapter..."
            onSelect={handleSelect}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
                e.preventDefault();
                editor.tf.toggleMark({ key: "bold" });
              }
            }}
            style={{
              minHeight: 200,
              border: "1px solid #ccc",
              padding: 20,
              borderRadius: 8,
            }}
          />
        </Plate>

        {/* ---------------- + BUTTON ---------------- */}
        {plusPos && (
          <button
            onClick={() => setShowDropdown(true)}
            style={{
              position: "absolute",
              top: plusPos.top,
              left: plusPos.left,
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#7c3aed",
              color: "white",
              border: "none",
              cursor: "pointer",
              zIndex: 1000,
            }}
          >
            +
          </button>
        )}

        {/* ---------------- DROPDOWN ---------------- */}
        {showDropdown && plusPos && (
          <>
            <div
              onClick={() => setShowDropdown(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />

            <div
              style={{
                position: "absolute",
                top: plusPos.top + 30,
                left: plusPos.left,
                background: "white",
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                borderRadius: 8,
                width: 180,
                zIndex: 1001,
              }}
            >
              <button
                onClick={() => {
                  setShowModal(true);
                  setShowDropdown(false);
                }}
                style={dropdownItem}
              >
                ➕ Add Question
              </button>

              <button
                onClick={() => {
                  setShowAIModal(true);
                  setShowDropdown(false);
                }}
                style={dropdownItem}
              >
                🤖 Ask AI
              </button>
            </div>
          </>
        )}
      </div>

      {/* ---------------- QUESTIONS ---------------- */}
      <h3>Questions</h3>

      {questions.map((q, i) => (
        <QuestionBlock
          key={i}
          question={q}
          onRemove={() =>
            setQuestions((prev) => prev.filter((_, idx) => idx !== i))
          }
        />
      ))}

      <button onClick={handleSubmit}>Save Chapter</button>

      <button onClick={() => navigate(`/course/${id}/manage-chapters`)}>
        Cancel
      </button>

      {/* ---------------- QUESTION MODAL ---------------- */}
      {showModal && (
        <QuestionModal
          onSave={handleAddQuestion}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* ---------------- AI MODAL ---------------- */}
      {showAIModal && (
        <div style={overlay}>
          <div style={modal}>
            <h2>Ask AI</h2>

            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Ask something about this chapter..."
              style={{ width: "100%", height: 120, padding: 10 }}
            />

            <button
              onClick={async () => {
                setAiLoading(true);
                setAiResponse("");

                try {
                  const res = await api.post("/ai/ask/", {
                    prompt: aiPrompt,
                    context: JSON.stringify(editor.children),
                  });

                  setAiResponse(res.data.answer);
                } catch {
                  setAiResponse("Error getting AI response");
                }

                setAiLoading(false);
              }}
              style={saveBtn}
            >
              {aiLoading ? "Thinking..." : "Ask"}
            </button>

            {aiResponse && (
              <div style={{ marginTop: 10, padding: 10, background: "#f3f4f6" }}>
                {aiResponse}
              </div>
            )}

            <button onClick={() => setShowAIModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2000,
};

const modal = {
  background: "white",
  padding: 30,
  borderRadius: 12,
  width: 500,
};

const input = {
  width: "100%",
  padding: 8,
};

const saveBtn = {
  background: "#7c3aed",
  color: "white",
  padding: 10,
  border: "none",
};

const block = {
  border: "1px solid #ddd",
  padding: 15,
  borderRadius: 8,
  margin: 10,
};

const dropdownItem = {
  width: "100%",
  padding: 10,
  border: "none",
  background: "transparent",
  textAlign: "left",
  cursor: "pointer",
};

export default CreateChapter;