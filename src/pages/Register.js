import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/users/register/', { username, email, password, role });
            navigate('/');
        } catch (err) {
            console.log("FULL ERROR:", err.response?.data);
            console.log("STATUS:", err.response?.status);

            setError(
                JSON.stringify(err.response?.data) ||
                "Registration failed. Please try again."
            );
        } 
    };

    const styles = {
        page: {
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            fontFamily: 'Arial, sans-serif'
        },
        card: {
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            width: '320px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        },
        title: {
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '22px',
            fontWeight: 'bold'
        },
        input: {
            width: '100%',
            padding: '10px',
            margin: '8px 0',
            borderRadius: '6px',
            border: '1px solid #ddd',
            outline: 'none'
        },
        button: {
            width: '100%',
            padding: '10px',
            marginTop: '10px',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
        },
        buttonHover: {
            opacity: 0.9
        },
        error: {
            color: 'red',
            fontSize: '14px',
            textAlign: 'center'
        },
        link: {
            textAlign: 'center',
            marginTop: '10px',
            fontSize: '14px'
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2 style={styles.title}>Create Account</h2>

                {error && <p style={styles.error}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        style={styles.input}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        style={styles.input}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <select
                        style={styles.input}
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="student">student</option>
                        <option value="instructor">instructor</option>
                    </select>

                    <button style={styles.button} type="submit">
                        Register
                    </button>
                </form>

                <p style={styles.link}>
                    Already have an account?{' '}
                    <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
}

export default Register;