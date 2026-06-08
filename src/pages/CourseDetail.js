import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function CourseDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCourse();
    }, [id]);

    const fetchCourse = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await api.get(`/courses/${id}/`);

            setCourse(res.data.course);
            setChapters(res.data.chapters);

        } catch (err) {
            console.log(err);
            setError("Failed to load course");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading course...</p>;

    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="container">
    {course && (
        <div className="card">
            <h1>{course.title}</h1>
            <p>{course.description}</p>
        </div>
    )}

    <h2>Chapters</h2>

    {chapters.map(ch => (
        <div
            key={ch.id}
            className="card"
            onClick={() => navigate(`/chapters/${ch.id}`)}
            style={{ cursor: "pointer" }}
        >
            <h3>{ch.title}</h3>
        </div>
    ))}
</div>
    );
}

export default CourseDetail;