import React from 'react';
import { Link } from 'react-router-dom';

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

interface ProductCardProps {
    product: Product;
    showDetails?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showDetails = true }) => {
    return (
        <Link to={`/products/${product.id}`} className="product-card-link">
            <img src={product.images[0]} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            {showDetails && (
                <div>
                    <p>{product.description}</p>
                </div>
            )}
        </Link>
    );
};

export default ProductCard;
