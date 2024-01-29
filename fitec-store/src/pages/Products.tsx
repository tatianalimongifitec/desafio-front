// src/pages/Products.tsx
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Estilos CSS
import '../styles/variables.css';
import '../styles/base.css';
import '../styles/layout.css';
import '../styles/Products.css'
import '../styles/ProductCard.css'
import '../styles/Navbar.css';
import '../components/Button/Button.css';
import { useLocation } from 'react-router-dom';

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
    category: {
        id: number;
        name: string;
        image: string;
    };
    images: string[];
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>('');
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const categoriesToExclude = ['Musica', 'Categoria de P1'];

    const { state } = useLocation();
    const userType = state ? state.userType : null;

    useEffect(() => {
        const apiUrl = buildApiUrl();

        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to fetch products. Please try again later.');
                setLoading(false);
            }
        };

        fetchData();
    }, [filter, minPrice, maxPrice, categoryId]);

    // Construir a URL da API com base nos filtros
    const buildApiUrl = (): string => {
        let apiUrl = 'https://api.escuelajs.co/api/v1/products';

        const queryParams: string[] = [];
        if (filter) {
            queryParams.push(`title=${encodeURIComponent(filter)}`);
        }
        if (minPrice !== null) {
            queryParams.push(`price_min=${minPrice}`);
        }
        if (maxPrice !== null) {
            queryParams.push(`price_max=${maxPrice}`);
        }
        if (categoryId !== null) {
            queryParams.push(`categoryId=${categoryId}`);
        }

        if (queryParams.length > 0) {
            apiUrl += `?${queryParams.join('&')}`;
        }

        return apiUrl;
    };

    // Agrupa os produtos por categoria
    const productsByCategory: { [categoryId: number]: Product[] } = {};
    products.forEach((product) => {
        const categoryId = product.category.id;
        if (!productsByCategory[categoryId]) {
            productsByCategory[categoryId] = [];
        }
        productsByCategory[categoryId].push(product);
    });
    let displayedCategoriesCount = 0;

    return (
        <div className="products-container">
            <Navbar userType={userType || null} />
            <h2>Product Showcase</h2>
            <div className="filters-container">
                {/* ... (códigos de filtro) */}
                <label>
                    Filter by Title:
                    <input
                        type="text"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </label>
                <label>
                    Min Price:
                    <input
                        type="number"
                        value={minPrice !== null ? minPrice : ''}
                        onChange={(e) => setMinPrice(e.target.value !== '' ? Number(e.target.value) : null)}
                    />
                </label>
                <label>
                    Max Price:
                    <input
                        type="number"
                        value={maxPrice !== null ? maxPrice : ''}
                        onChange={(e) => setMaxPrice(e.target.value !== '' ? Number(e.target.value) : null)}
                    />
                </label>
                <label>
                    Category ID:
                    <input
                        type="number"
                        value={categoryId !== null ? categoryId : ''}
                        onChange={(e) => setCategoryId(e.target.value !== '' ? Number(e.target.value) : null)}
                    />
                </label>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    {/* Itera sobre as categorias e exibe os produtos de cada categoria */}
                    {Object.keys(productsByCategory).map((categoryId) => {
                        const category = productsByCategory[Number(categoryId)][0]?.category;
                        // Verifica se a categoria está na lista de exclusão
                        // Verifica se a categoria está na lista de exclusão
                        if (
                            !categoriesToExclude.includes(category?.name || '') &&
                            displayedCategoriesCount < 5
                        ) {
                            displayedCategoriesCount++;
                            return (
                                <div key={categoryId} className="category-products">
                                    <h3>{category?.name || `Category ID ${categoryId}`}</h3>
                                    <div className="product-list">
                                        {productsByCategory[Number(categoryId)].slice(0, 4).map((product) => (
                                            <div key={product.id} className="product-card">
                                                <ProductCard product={product} showDetails={false} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        }
                        return null; // Não renderiza nada para categorias excluídas
                    })}
                    <Footer />
                </div>
            )}
        </div>
    );
};

export default Products;