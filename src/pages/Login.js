import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/users/login/', { username, password });
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            localStorage.setItem('role', role);
            navigate('/courses');
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: "#f4f6f8"
        }}>
            <div style={{
                background: "white",
                padding: "30px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                width: "320px"
            }}>
                <h2 style={{ textAlign: "center" }}>Login</h2>

                {error && (
                    <p style={{ color: "red", textAlign: "center" }}>
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <input
                        style={{
                            width: "100%",
                            padding: "10px",
                            margin: "10px 0",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            boxSizing: "border-box"
                        }}
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        style={{
                            width: "100%",
                            padding: "10px",
                            margin: "10px 0",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            boxSizing: "border-box"
                        }}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            margin: "10px 0",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            boxSizing: "border-box"
                        }}
                    >
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                    </select>

                    <button
                        style={{
                            width: "100%",
                            padding: "10px",
                            background: "#2563eb",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginTop: "10px"
                        }}
                        type="submit"
                    >
                        Login
                    </button>
                </form>

                <p style={{ textAlign: "center", marginTop: "10px" }}>
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
                <p style={{ textAlign: "center", marginTop: "5px", fontSize: "13px", color: "gray" }}>
                    Not a student? Select <strong>Instructor</strong> above before logging in.
                </p>
            </div>
        </div>
    );
}

export default Login;