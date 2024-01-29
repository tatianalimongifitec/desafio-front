// src/components/CategoryCard.tsx
import React from 'react';

interface CategoryCardProps {
    category: {
        id: number;
        name: string;
        image: string;
    };
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
    return (
        <div className="category-card">
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
        </div>
    );
};

export default CategoryCard;
