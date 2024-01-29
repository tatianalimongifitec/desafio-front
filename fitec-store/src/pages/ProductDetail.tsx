// src/pages/ProductDetail.tsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Slider from 'react-slick';
import Navbar from '../components/Navbar';

// Importe os estilos CSS específicos para ProductDetail
import '../styles/variables.css';
import '../styles/base.css';
import '../styles/layout.css';
import '../styles/Navbar.css';
import '../styles/ProductDetail.css';
import '../components/Button/Button.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Category {
    id: number;
    name: string;
    image: string;
}

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
}

const ProductDetail: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cartItems, setCartItems] = useState<string[]>([]);

    useEffect(() => {
        const apiUrl = `https://api.escuelajs.co/api/v1/products/${productId}`;

        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                const data = await response.json();
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setError('Failed to fetch product details. Please try again later.');
                setLoading(false);
            }
        };

        fetchData();
    }, [productId]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const handleAddToCart = () => {
        if (product) {
            setCartItems((prevItems: string[]) => {
                const newItems = [...prevItems, product.title];
                console.log('Updated Cart Items:', newItems);
                return newItems;
            });
        }
    };

    return (
        <div className="product-detail-container">
            <Navbar userType="customer" />
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="product-detail">
                    <h2>{product?.title}</h2>
                    <Slider {...settings}>
                        {product?.images.map((image, index) => (
                            <img key={index} src={image} alt={`Product ${index + 1}`} className="product-image" />
                        ))}
                    </Slider>
                    <p>Price: ${product?.price}</p>
                    <p>{product?.description}</p>
                    <button onClick={handleAddToCart}>Add to Cart</button>
                    <Link to="/cart">View Cart</Link>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;