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
        <div style={{ padding: "20px" }}>
            {course && (
                <div>
                    <h1>{course.title}</h1>
                    <p>{course.description}</p>
                </div>
            )}

            <hr />

            <h2>Chapters</h2>

            {chapters.length === 0 && (
                <p>No chapters available yet</p>
            )}

            {chapters.map((ch) => (
                <div
                    key={ch.id}
                    onClick={() => navigate(`/chapters/${ch.id}`)}
                    style={{
                        cursor: "pointer",
                        margin: "10px 0",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "6px"
                    }}
                >
                    <strong>{ch.title}</strong>
                </div>
            ))}
        </div>
    );
}

export default CourseDetail;