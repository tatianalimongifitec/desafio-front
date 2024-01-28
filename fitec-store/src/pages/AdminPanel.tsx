// AdminPanel.tsx
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/productsData';
import Products, { Product } from './Products';
import Footer from '../components/Footer';

const defaultTheme = createTheme();

export default function AdminPanel() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState(Object.keys(products));
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleEditCategory = (category: string) => {
        console.log('Editing category:', category);
    };

    const handleAddCategory = () => {
        console.log('Adding a new category');
    };

    const handleEditProduct = (product: Product) => {
        console.log('Editing product:', product);
    };

    const handleAddProduct = () => {
        console.log('Adding a new product');
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton color="inherit" onClick={() => navigate('/products')}>
                        <ArrowBackIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container sx={{ pt: 12, paddingLeft: 2, paddingRight: 2 }}>
                <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                    <Button variant="outlined" onClick={handleAddCategory}>
                        Add Category
                    </Button>
                    <Button variant="outlined" onClick={handleAddProduct}>
                        Add Product
                    </Button>
                </Stack>
                <List sx={{ marginBottom: 2 }}>
                    {categories.map((category) => (
                        <ListItem
                            key={category}
                            button
                            onClick={() => setSelectedCategory(category)}
                            selected={category === selectedCategory}
                            sx={{ borderRadius: 4, marginBottom: 1, backgroundColor: '#87CEEB' }} // Cor de fundo para categorias
                        >
                            <ListItemText primary={category} />
                            <IconButton edge="end" onClick={() => handleEditCategory(category)}>
                                <EditIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
                {selectedCategory && (
                    <List>
                        {products[selectedCategory].map((product) => (
                            <ListItem
                                key={product.id}
                                button
                                onClick={() => setSelectedProduct(product)}
                                selected={product === selectedProduct}
                                sx={{ borderRadius: 4, marginBottom: 1, backgroundColor: '#98FB98' }} // Cor de fundo para produtos
                            >
                                <ListItemText primary={product.name} />
                                <IconButton edge="end" onClick={() => handleEditProduct(product)}>
                                    <EditIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Container>
            <Footer />
        </ThemeProvider>
    );
}
