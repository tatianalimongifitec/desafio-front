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
import InputBase from '@mui/material/InputBase';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/productsData';
import Products, { Product } from './Products';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.fitec.org.br/home">
                FITec
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function AdminPanel() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState(Object.keys(products));
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [editingCategory, setEditingCategory] = useState<string | null>(null);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const handleEditCategory = (category: string) => {
        setEditingCategory(category);
    };

    const handleSaveCategory = () => {
        // Implemente a lógica para salvar a categoria editada
        setEditingCategory(null);
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
    };

    const handleSaveProduct = () => {
        // Implemente a lógica para salvar o produto editado
        setEditingProduct(null);
    };

    const handleAddCategory = () => {
        console.log('Adding a new category');
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
                            sx={{ borderRadius: 4, marginBottom: 1, backgroundColor: '#87CEEB' }}
                        >
                            {editingCategory === category ? (
                                <>
                                    <InputBase
                                        value={category}
                                        onChange={(e) => setCategories((prevCategories) => (
                                            prevCategories.map((prevCategory) => (
                                                prevCategory === category ? e.target.value : prevCategory
                                            ))
                                        ))}
                                    />
                                    <IconButton edge="end" onClick={handleSaveCategory}>
                                        <EditIcon />
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    <ListItemText primary={category} />
                                    <IconButton edge="end" onClick={() => handleEditCategory(category)}>
                                        <EditIcon />
                                    </IconButton>
                                </>
                            )}
                        </ListItem>
                    ))}
                </List>
                {selectedCategory && (
                    <List>
                        {products[selectedCategory].map((product) => (
                            <ListItem
                                key={product.id}
                                button
                                sx={{ borderRadius: 4, marginBottom: 1, backgroundColor: '#98FB98' }}
                            >
                                {editingProduct?.id === product.id ? (
                                    <>
                                        <InputBase
                                            value={product.name}
                                            onChange={(e) => {
                                                // Implemente a lógica para atualizar o nome do produto em edição
                                            }}
                                        />
                                        <IconButton edge="end" onClick={handleSaveProduct}>
                                            <EditIcon />
                                        </IconButton>
                                    </>
                                ) : (
                                    <>
                                        <ListItemText primary={product.name} />
                                        <IconButton edge="end" onClick={() => handleEditProduct(product)}>
                                            <EditIcon />
                                        </IconButton>
                                    </>
                                )}
                            </ListItem>
                        ))}
                    </List>
                )}
            </Container>
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Made with love
                    <FavoriteIcon sx={{ color: 'pink' }} />
                </Typography>
                <Copyright />
            </Box>
        </ThemeProvider>
    );
}