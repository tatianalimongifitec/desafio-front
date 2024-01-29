// src/pages/Categories.tsx
import React, { useEffect, useState } from 'react';
import CategoryCard from '../components/CategoryCard';

interface Category {
    id: number;
    name: string;
    image: string;
}

const translateCategory = (categoryName: string): string => {
    const translations: Record<string, string> = {
        Ropa: 'Clothes',
        Electronicos: 'Electronics',
        Muebles: 'Furniture',
        Zapatos: 'Shoes',
        Miscelaneos: 'Miscellaneous',
    };

    return translations[categoryName] || categoryName;
};

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const apiUrl = 'https://api.escuelajs.co/api/v1/categories?limit=5';

        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Failed to fetch categories. Please try again later.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="categories-container">
            <h2>Categories</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="category-list">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={{
                                ...category,
                                name: translateCategory(category.name),
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Categories;
