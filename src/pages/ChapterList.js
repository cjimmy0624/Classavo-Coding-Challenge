import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import {useParams } from 'react-router-dom';

function ChapterList() {
    const { courseId } = useParams();
    const [chapters, setChapters] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const response = await api.get(`/courses/${courseId}/chapters/`);
                setChapters(response.data);
            } catch (err) {
                setError('Failed to fetch chapters. Please try again.');
            }
        };
        fetchChapters();
    }, [courseId]);

    return (
        <div>
            <h2>Chapters</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {chapters.map(chapter => (
                <div key={chapter.id}>
                    <h3>{chapter.title}</h3>
                    <p>{chapter.content}</p>
                </div>
            ))}
        </div>
    );
}
export default ChapterList;