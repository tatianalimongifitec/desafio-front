// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

interface NavbarProps {
    userType: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ userType }) => {
    return (
        <nav className="navbar">
            <Link to="/products" className="navbar-logo">FITec Store</Link>
            <ul className="navbar-links">
                <li><Link to="/cart" className="navbar-link">Shoppingcart</Link></li>
                {userType === 'admin' && (
                    <li><Link to="/admin-panel" className="navbar-link">Admin Panel</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
