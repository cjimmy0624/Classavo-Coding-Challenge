import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function ChapterDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [chapter, setChapter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchChapter();
    }, [id]);

    const fetchChapter = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await api.get(`/chapters/${id}/`);
            setChapter(res.data);

        } catch (err) {
            console.log(err);
            setError("Failed to load chapter");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading chapter...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    if (!chapter) return <p>No chapter found</p>;

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
            
            <button onClick={() => navigate(-1)}>
                ← Back to Course
            </button>

            <h1 style={{ marginTop: "20px" }}>
                {chapter.title}
            </h1>

            {/* Optional access control display */}
            {chapter.publicOrPrivate === false && (
                <p style={{ color: "gray" }}>
                    🔒 Private Chapter
                </p>
            )}

            <hr />

            <div style={{ lineHeight: "1.8", fontSize: "16px" }}>
                {chapter.content}
            </div>
        </div>
    );
}

export default ChapterDetail;