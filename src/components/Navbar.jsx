import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">MediConnect</Link>
            </div>

            <div className="navbar-links">
                <Link to="/login">Login</Link>
                <Link to="/locations">Locations</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/more-info">Request More Info</Link>
                <Link to="/donate">Donate Today</Link>
                <Link to="/appointments">Appointments</Link>
            </div>
        </nav>
    );
};

export default Navbar;