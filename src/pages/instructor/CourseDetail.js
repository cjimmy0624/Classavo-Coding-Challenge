import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useParams, useNavigate } from 'react-router-dom';

function CourseDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourse();
    }, []);

    const fetchCourse = async () => {
        try {
            const res = await api.get(`/courses/${id}/`);
            setCourse(res.data.course);
            setChapters(res.data.chapters);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    if (loading) {
        return <h3 style={{ padding: "20px" }}>Loading...</h3>;
    }

    return (
        <div style={{ padding: "20px" }}>
            
            {/* COURSE HEADER */}
            <h1>{course?.title}</h1>
            <p>{course?.description}</p>

            <hr />

            {/* ACTION BUTTONS */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                
                <button onClick={() => navigate(`/course/${id}/create-chapter`)}>
                    + Create Chapter
                </button>

                <button onClick={() => navigate(`/course/${id}/manage-chapters`)}>
                    Manage Chapters
                </button>

                <button onClick={() => navigate('/instructor')}>
                    ← Back to Dashboard
                </button>

            </div>

            {/* CHAPTER LIST */}
            <h2>Chapters</h2>

            {chapters.length === 0 ? (
                <p>No chapters yet. Create your first one.</p>
            ) : (
                chapters.map((ch) => (
                    <div
                        key={ch.id}
                        style={{
                            border: "1px solid #ddd",
                            padding: "12px",
                            marginTop: "10px",
                            borderRadius: "6px",
                            background: "#fafafa"
                        }}
                    >
                        <h3>{ch.title}</h3>

                        <p>
                            Visibility:{" "}
                            <strong>
                                {ch.publicOrPrivate ? "Public" : "Private"}
                            </strong>
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}

export default CourseDetail;