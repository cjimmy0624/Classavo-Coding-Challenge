import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../../api/axios";

import { Plate, createPlateEditor, PlateContent } from "@udecode/plate/react";

function CreateChapter() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const editingChapter = location.state?.chapter;
  const isEditMode = !!editingChapter;

  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  // ✅ Correct editor setup
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

  // ✅ Load chapter when editing
  useEffect(() => {
    if (editingChapter) {
      setTitle(editingChapter.title);
      setIsPublic(editingChapter.publicOrPrivate);

      try {
        const parsed =
          typeof editingChapter.content === "string"
            ? JSON.parse(editingChapter.content)
            : editingChapter.content;

        // IMPORTANT: assign safely
        editor.children = parsed;
      } catch (err) {
        console.log("Failed to load content:", err);
      }
    }
  }, [editingChapter, editor]);

  // ✅ Save chapter
  const handleSubmit = async () => {
    try {
      const payload = {
        title,
        content: JSON.stringify(editor.children),
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

      {/* TITLE */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Chapter title"
        style={{ width: 300, padding: 8 }}
      />

      <br /><br />

      {/* PUBLIC CHECKBOX */}
      <label>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        Public Chapter
      </label>

      <br /><br />

      {/*PROPER PLATE EDITOR (FIXED) */}
      <Plate editor={editor}>
        <PlateContent
          style={{
            minHeight: 200,
            border: "1px solid #ccc",
            padding: 10,
            borderRadius: 6,
          }}
        />
      </Plate>

      <br />

      {/* SAVE BUTTON */}
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