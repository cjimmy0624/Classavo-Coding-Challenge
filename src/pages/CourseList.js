import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

function CourseList() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await api.get('/courses/');
                setCourses(response.data);
            } catch (err) {
                setError('Failed to fetch courses. Please try again.');
            }
        };
        fetchCourses();
    }, []);

    const handleCourseClick = async(courseId) => {
        try {
            await api.post(`/courses/${courseId}/enroll/`);
            alert('Enrolled successfully!');
        } catch (err) {
            alert('Enrollment failed. Please try again.');
        }
    };

    return (
        <div className="container">
    <h1>Courses</h1>

    {courses.map(course => (
        <div
            key={course.id}
            className="card"
            onClick={() => navigate(`/courses/${course.id}`)}
            style={{ cursor: "pointer" }}
        >
            <h3>{course.title}</h3>
            <p>{course.description}</p>
        </div>
    ))}
</div>
    );
}   
export default CourseList;