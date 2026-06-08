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
        <div>
            <h2>Available Courses</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {courses.map(course => (
                <div key={course.id}>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <button onClick={() => navigate(`/courses/${course.id}`)}>View Details</button>
                    <button onClick={() => handleCourseClick(course.id)}>Enroll</button>
                </div>
            ))}
        </div>
    );
}   
export default CourseList;