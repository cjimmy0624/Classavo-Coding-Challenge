import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
    };

    return (
        <nav>
            <h1>Online Course Platform</h1>
            <div>
                <button onClick={() => navigate('/courses')}>Courses</button>    
                <button onClick={() => navigate('/courses/create')}>Create Course</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
}  
export default Navbar;