import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

function ChapterView() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [chapter, setChapter] = useState(null);

    useEffect(() => {
        fetchChapter();
    }, [id]);

    const fetchChapter = async () => {
        try {
            const res = await api.get(`/chapters/${id}/`);
            setChapter(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    if (!chapter) return <h3>Loading...</h3>;

    return (
        <div style={{ padding: 20 }}>
            
            <button onClick={() => navigate(-1)}>
                ← Go Back
            </button>

            <h1>{chapter.title}</h1>

            <p style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
                {chapter.content}
            </p>
        </div>
    );
}

export default ChapterView;