import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

function CreateCourse() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            await api.post('/courses/create/', { title, description });
            navigate('/courses');
        }
        catch (err) {
            setError('Course creation failed. Please try again.');
        }
    }
    return (
        <div>
            <h2>Create Course</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Course Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="Course Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type="submit">Create Course</button>
            </form>
        </div>
    );
}
export default CreateCourse;