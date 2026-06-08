import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

function CreateChapter() {
    const { courseId } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [publicOrPrivate, setPublicOrPrivate] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/courses/${courseId}/chapters/create/`, { title, content, publicOrPrivate});
            navigate(`/courses/${courseId}`);
        } catch (err) {
            setError('Chapter creation failed. Please try again.');
        }   
    };

    return (
        <div>
            <h2>Create Chapter</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Chapter Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="Chapter Content" value={content} onChange={(e) => setContent(e.target.value)} />
                <label>
                    <input type="checkbox" checked={publicOrPrivate} onChange={(e) => setPublicOrPrivate(e.target.checked)} />
                    Public
                </label>
                <button type="submit">Create Chapter</button>
            </form>
        </div>
    );
}   
export default CreateChapter;