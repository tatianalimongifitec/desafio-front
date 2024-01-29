// AdminPanel.tsx

import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../styles/AdminPanel.css';

interface Product {
    name: string;
    price: number;
    category: string;
}

interface AdminPanelState {
    productName: string;
    productPrice: number;
    productCategory: string;
    categoryName: string;
    categories: string[];
    products: Product[];
    selectedProduct: Product | null;
    selectedCategory: string | null;
}

const AdminPanel = () => {
    const [adminPanelState, setAdminPanelState] = useState<AdminPanelState>({
        productName: '',
        productPrice: 0,
        productCategory: '',
        categoryName: '',
        categories: ['Electronics', 'Clothing', 'Books'],
        products: [
            { name: 'Laptop', price: 999, category: 'Electronics' },
            { name: 'T-Shirt', price: 19.99, category: 'Clothing' },
            { name: 'JavaScript Book', price: 29.99, category: 'Books' },
        ],
        selectedProduct: null,
        selectedCategory: null,
    });

    const handleInputChange = (key: keyof AdminPanelState, value: string | number) => {
        setAdminPanelState((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleAddProduct = (e: FormEvent) => {
        e.preventDefault();
        const { productName, productPrice, productCategory } = adminPanelState;
        if (!productName || productPrice <= 0 || !productCategory) {
            return;
        }

        const newProduct: Product = {
            name: productName,
            price: productPrice,
            category: productCategory,
        };

        setAdminPanelState((prevState) => ({
            ...prevState,
            products: [...prevState.products, newProduct],
            productName: '',
            productPrice: 0,
            productCategory: '',
        }));
    };

    const handleAddCategory = () => {
        const { categoryName } = adminPanelState;
        if (!categoryName) {
            return;
        }

        setAdminPanelState((prevState) => ({
            ...prevState,
            categories: [...prevState.categories, categoryName],
            categoryName: '',
        }));
    };

    const handleEditProduct = (product: Product) => {
        setAdminPanelState((prevState) => ({
            ...prevState,
            selectedProduct: product,
            productName: product.name,
            productPrice: product.price,
            productCategory: product.category,
        }));
    };

    const handleEditCategory = (category: string) => {
        setAdminPanelState((prevState) => ({
            ...prevState,
            selectedCategory: category,
            categoryName: category,
        }));
    };

    const handleUpdateProduct = () => {
        const { selectedProduct, productName, productPrice, productCategory } = adminPanelState;
        if (!selectedProduct) {
            return;
        }

        const updatedProduct: Product = {
            name: productName,
            price: productPrice,
            category: productCategory,
        };

        setAdminPanelState((prevState) => ({
            ...prevState,
            products: prevState.products.map((product) =>
                product === selectedProduct ? updatedProduct : product
            ),
            selectedProduct: null,
            productName: '',
            productPrice: 0,
            productCategory: '',
        }));
    };

    const handleUpdateCategory = () => {
        const { selectedCategory, categoryName } = adminPanelState;
        if (!selectedCategory) {
            return;
        }

        setAdminPanelState((prevState) => ({
            ...prevState,
            categories: prevState.categories.map((category) =>
                category === selectedCategory ? categoryName : category
            ),
            selectedCategory: null,
            categoryName: '',
        }));
    };

    const handleDeleteProduct = (product: Product) => {
        setAdminPanelState((prevState) => ({
            ...prevState,
            products: prevState.products.filter((p) => p !== product),
        }));
    };

    const handleDeleteCategory = (category: string) => {
        setAdminPanelState((prevState) => ({
            ...prevState,
            categories: prevState.categories.filter((c) => c !== category),
            products: prevState.products.filter((product) => product.category !== category),
        }));
    };

    return (
        <div className="admin-panel-container">
            <h1>Painel de Controle</h1>
            <div>
                <h2>Adicionar Produto</h2>
                <form onSubmit={handleAddProduct}>
                    <label>
                        Nome do Produto:
                        <input
                            type="text"
                            value={adminPanelState.productName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleInputChange('productName', e.target.value)
                            }
                        />
                    </label>
                    <label>
                        Preço do Produto:
                        <input
                            type="number"
                            value={adminPanelState.productPrice}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handleInputChange('productPrice', parseFloat(e.target.value))
                            }
                        />
                    </label>
                    <label>
                        Categoria do Produto:
                        <select
                            value={adminPanelState.productCategory}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                handleInputChange('productCategory', e.target.value)
                            }
                        >
                            {adminPanelState.categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button type="submit">Adicionar Produto</button>
                </form>
            </div>
            <div>
                <h2>Adicionar Categoria</h2>
                <label>
                    Nome da Categoria:
                    <input
                        type="text"
                        value={adminPanelState.categoryName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange('categoryName', e.target.value)
                        }
                    />
                </label>
                <button onClick={handleAddCategory}>Adicionar Categoria</button>
            </div>
            <div>
                <h2>Produtos</h2>
                <ul>
                    {adminPanelState.products.map((product, index) => (
                        <li key={index}>
                            {product.name} - ${product.price} - {product.category}
                            <button onClick={() => handleEditProduct(product)}>Editar</button>
                            <button onClick={() => handleDeleteProduct(product)}>Excluir</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Categorias</h2>
                <ul>
                    {adminPanelState.categories.map((category, index) => (
                        <li key={index}>
                            {category}
                            <button onClick={() => handleEditCategory(category)}>Editar</button>
                            <button onClick={() => handleDeleteCategory(category)}>Excluir</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminPanel;
