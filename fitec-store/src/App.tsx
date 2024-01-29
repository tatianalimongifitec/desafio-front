// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import AdminPanel from './pages/AdminPanel';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/checkout/*" element={<Checkout />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/cart" element={<Cart cartItems={[]} />} />
      </Routes>
    </Router>
  );
}

export default App;
