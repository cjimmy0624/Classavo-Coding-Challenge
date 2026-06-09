import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../../api/axios";

import { Plate, createPlateEditor } from "@udecode/plate/react";

function CreateChapter() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const editingChapter = location.state?.chapter; // 👈 KEY FIX
  const isEditMode = !!editingChapter;

  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  // Initialize editor
  const editor = useMemo(
    () =>
      createPlateEditor({
        value: [
          {
            type: "p",
            children: [{ text: "" }],
          },
        ],
      }),
    []
  );

  // Load data when editing
  useEffect(() => {
    if (editingChapter) {
      setTitle(editingChapter.title);
      setIsPublic(editingChapter.publicOrPrivate);

      // If content exists, load it into editor
      try {
        const parsed = JSON.parse(editingChapter.content);
        editor.children = parsed;
      } catch (err) {
        console.log("Failed to load editor content:", err);
      }
    }
  }, [editingChapter, editor]);

  const handleSubmit = async () => {
    try {
      const payload = {
        title,
        content: JSON.stringify(editor.children),
        publicOrPrivate: isPublic,
      };

      if (isEditMode) {
        // ✅ UPDATE
        await api.patch(`/chapters/${editingChapter.id}/`, payload);
      } else {
        // ✅ CREATE
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
        <div
          contentEditable
          suppressContentEditableWarning
          style={{
            minHeight: 200,
            border: "1px solid #ccc",
            padding: 10,
          }}
        />
      </Plate>

      <br />

      <button onClick={handleSubmit}>
        {isEditMode ? "Update Chapter" : "Save Chapter"}
      </button>

      <button
        onClick={() => navigate(`/course/${id}/manage-chapters`)}
        style={{ marginLeft: 10 }}
      >
        Cancel
      </button>
    </div>
  );
}

export default CreateChapter;