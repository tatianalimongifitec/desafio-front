// src/pages/Cart.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

import '../styles/variables.css';
import '../styles/base.css';
import '../styles/layout.css';
import '../styles/Navbar.css';
import '../styles/Cart.css';

interface CartProps {
    cartItems: string[];
}

const Cart: React.FC<CartProps> = ({ cartItems }) => {
    console.log('Cart items in Cart component:', cartItems);
    return (
        <div className="cart-container">
            <Navbar userType="customer" />
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>Item: {item}</li>
                    ))}
                </ul>
            )}
            <Link to="/products">Continue Shopping</Link>
            <Link to="/checkout"> or Checkout</Link>
            <div style={{ marginBottom: '120px' }}></div>
            <Footer />
        </div>
    );
};

export default Cart;
