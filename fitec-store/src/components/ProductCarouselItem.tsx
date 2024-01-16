// ProductCarouselItem.tsx

import React from 'react';
import Typography from '@mui/material/Typography';

interface Product {
    id: number;
    name: string;
    price: number;
}

interface ProductCarouselItemProps {
    product: Product;
    onAddToCart?: (product: Product) => void;
}

const ProductCarouselItem: React.FC<ProductCarouselItemProps> = ({ product }) => {
    return (
        <div className="product-carousel-item">
            <img
                src={`https://source.unsplash.com/random?${product.name}`}
                alt={product.name}
                style={{
                    width: '100%',
                    maxHeight: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                }}
            />
            <div style={{ padding: '16px', textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                    {product.name}
                </Typography>
                <Typography>${product.price}</Typography>
            </div>
        </div>
    );
};

export default ProductCarouselItem;
