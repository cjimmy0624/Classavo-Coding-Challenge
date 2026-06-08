import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';

import { Plate, PlateContent, createPlateEditor } from '@udecode/plate-common';

import { createParagraphPlugin } from '@udecode/plate-paragraph';
import { createHeadingPlugin } from '@udecode/plate-heading';
import { createBasicMarksPlugin } from '@udecode/plate-basic-marks';

function CreateChapter() {
    const { id } = useParams(); // course id
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    // Plate editor setup
    const editor = useMemo(() =>
        createPlateEditor({
            plugins: [
                createParagraphPlugin(),
                createHeadingPlugin(),
                createBasicMarksPlugin()
            ],
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

            // go back to course page
            navigate(`/course/${id}`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Create Chapter</h1>

            {/* TITLE */}
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Chapter title"
                style={{ width: '300px', padding: '8px' }}
            />

            <br /><br />

            {/* VISIBILITY */}
            <label>
                <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                />
                Public Chapter
            </label>

            <br /><br />

            {/* EDITOR */}
            <div style={{ border: '1px solid #ccc', padding: '10px' }}>
                <Plate editor={editor}>
                    <PlateContent
                        placeholder="Write your chapter content..."
                        style={{ minHeight: '200px' }}
                    />
                </Plate>
            </div>

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