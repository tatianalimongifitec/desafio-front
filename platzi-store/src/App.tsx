// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';
import Review from './components/Review';
import { ShoppingCartProvider } from './components/ShoppingCartContext';

function App() {
  return (
    <Router>
      <ShoppingCartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<Products />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />

        </Routes>
      </ShoppingCartProvider>
    </Router>
  );
}

export default App;
