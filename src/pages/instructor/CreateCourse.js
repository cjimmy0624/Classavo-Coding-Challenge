import React, { useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

function CreateCourse() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post('/api/courses/', {
                title,
                description
            });

            // go back to dashboard after creation
            navigate('/instructor');

        } catch (err) {
            console.log(err);
            setError('Failed to create course');
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Create Course</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Course Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ display: "block", marginBottom: "10px", padding: "8px", width: "300px" }}
                />

                <textarea
                    placeholder="Course Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ display: "block", marginBottom: "10px", padding: "8px", width: "300px", height: "100px" }}
                />

                <button type="submit">
                    Create Course
                </button>
            </form>
        </div>
    );
}

export default CreateCourse;