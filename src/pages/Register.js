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
            await api.post('/users/register', { username, email, password, role });
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Please try again.');
        }  
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                </select>
                <button type="submit">Register</button>
            </form>
            <p> Already have an account with us? <a href="/login">Login here</a></p>
        </div>
    );
}   

export default Register;