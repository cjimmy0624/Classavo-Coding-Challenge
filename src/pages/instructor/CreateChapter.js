import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';

import { Plate, createPlateEditor } from '@udecode/plate/react';

function CreateChapter() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const editor = useMemo(
    () =>
      createPlateEditor({
        value: [
          {
            type: 'p',
            children: [{ text: '' }]
          }
        ]
      }),
    []
  );

  const handleSubmit = async () => {
    try {
      await api.post(`/courses/${id}/chapters/create/`, {
        title,
        content: JSON.stringify(editor.children),
        publicOrPrivate: isPublic
      });

      navigate(`/course/${id}`);
    } catch (err) {
        console.log("FULL ERROR OBJECT:", err);
        console.log("RESPONSE DATA:", err.response?.data);
        console.log("STATUS:", err.response?.status);
        console.log("HEADERS:", err.response?.headers);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Chapter</h1>

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
            border: '1px solid #ccc',
            padding: 10
          }}
        />
      </Plate>

      <br />

      <button onClick={handleSubmit}>
        Save Chapter
      </button>

      <button onClick={() => navigate(`/course/${id}`)} style={{ marginLeft: 10 }}>
        Cancel
      </button>
    </div>
  );
}

export default CreateChapter;