import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

function InstructorDashboard() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await api.get('/courses/');
            setCourses(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Instructor Dashboard</h1>

            <button onClick={() => navigate('/create-course')}>
                + Create Course
            </button>

            <div style={{ marginTop: "20px" }}>
                {courses.map(course => (
                    <div
                        key={course.id}
                        style={{
                            padding: "10px",
                            border: "1px solid #ccc",
                            marginTop: "10px",
                            cursor: "pointer"
                        }}
                        onClick={() => navigate(`/course/${course.id}`)}
                    >
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InstructorDashboard;