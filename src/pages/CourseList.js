import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

function CourseList() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    console.log("COURSES:", courses);
    console.log("USER ROLE:", role);

    useEffect(() => {
    const fetchCourses = async () => {
        try {
            const response = await api.get('/courses/');

            console.log("API RESPONSE:", response.data); // 👈 ADD THIS LINE

            setCourses(response.data);
        } catch (err) {
            console.log(err);
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
                {role === "instructor" && (
                    <button
                        onClick={() => navigate("/instructor/courses")}
                        style={{
                        marginBottom: "20px",
                        padding: "10px",
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                        }}
                    >
                        Manage Courses
                    </button>
                )}

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