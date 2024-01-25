import React, { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { products } from '../data/productsData';
import Card from '@mui/material/Card';
import { CardActions, CardContent, CardMedia } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import isEqual from 'lodash/isEqual';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/Carousel.css';
import ProductCarouselItem from '../components/ProductCarouselItem';
import { useRef } from 'react';

// Definição de interfaces para tipos de dados utilizados no código
interface Product {
    id: number;
    name: string;
    price: number;
}

interface ShoppingCartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

// Componente de Copyright
function Copyright(props: any) {
    // Renderiza informações de copyright com um link para a FITec
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

// Componente de cartão de produto
function ProductCard({
    product,
    onAddToCart
}: {
    product: Product;
    onAddToCart: (product: Product) => void;
}) {
    // Renderiza informações sobre o produto e botões para visualizar ou comprar
    return (
        <Card
            sx={{
                maxWidth: '250px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '10px',
            }}
        >
            {/* Seção da imagem do produto */}
            <CardMedia
                component="div"
                sx={{
                    pt: '56.25%',
                    borderRadius: '8px 8px 0 0',
                }}
                image={`https://source.unsplash.com/random?${product.name}`}
            />
            {/* Seção de detalhes do produto */}
            <CardContent sx={{ flexGrow: 1, padding: '16px' }}>
                <Typography variant="h6" gutterBottom>
                    {product.name}
                </Typography>
                <Typography>${product.price}</Typography>
            </CardContent>
            {/* Botões de ação para visualizar ou comprar */}
            <CardActions>
                <Button size="small">View</Button>
                <Button size="small" onClick={() => onAddToCart(product)}>
                    Buy
                </Button>
            </CardActions>
        </Card>
    );
}

// Componente para renderizar uma seção de produtos de uma determinada categoria
function CategorySection({
    category,
    products,
    onAddToCart
}: {
    category: string;
    products: Product[];
    onAddToCart: (product: Product) => void;
}) {
    // Renderiza uma seção de produtos em uma categoria específica
    return (
        <Grid item xs={12} key={category}>
            <Typography variant="h4" gutterBottom>
                {category}
            </Typography>
            <Grid container spacing={0}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <ProductCard product={product} onAddToCart={onAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
}

// Componente de carrinho de compras
function ShoppingCart({
    items,
    onClose,
    onIncrement,
    onDecrement,
    onRemove,
    onCheckout
}: {
    items: ShoppingCartItem[];
    onClose: () => void;
    onIncrement: (itemId: number) => void;
    onDecrement: (itemId: number) => void;
    onRemove: (itemId: number) => void;
    onCheckout: () => void;
}) {
    // Renderiza o carrinho de compras com itens, quantidades e opções de ação
    const navigate = useNavigate();

    const totalPrice = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <Drawer
            anchor="right"
            open={items.length > 0}
            onClose={onClose}
            PaperProps={{ sx: { width: '400px' } }}
        >
            {/* Cabeçalho do carrinho de compras */}
            <Typography variant="h6" sx={{ p: 2, borderBottom: '1px solid #ccc' }}>
                ShoppingCart
            </Typography>
            {/* Lista de itens no carrinho de compras */}
            <List>
                {items.length > 0 ? (
                    items.map((item) => (
                        <ListItem key={item.id}>
                            {/* Informações do item no carrinho */}
                            <ListItemText
                                primary={item.name}
                                secondary={
                                    <>
                                        {/* Controles de quantidade e ações no item */}
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <IconButton onClick={() => onDecrement(item.id)}>
                                                <RemoveIcon />
                                            </IconButton>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.quantity}
                                            </Typography>
                                            <IconButton onClick={() => onIncrement(item.id)}>
                                                <AddIcon />
                                            </IconButton>
                                            <IconButton onClick={() => onRemove(item.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Stack>
                                        {/* Subtotal do item no carrinho */}
                                        <Typography variant="body2" color="text.secondary">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </Typography>
                                    </>
                                }
                            />
                        </ListItem>
                    ))
                ) : (
                    // Mensagem quando o carrinho está vazio
                    <ListItem>
                        <Stack direction="column" alignItems="center" spacing={1}>
                            <DeleteIcon sx={{ fontSize: 100, color: 'gray' }} />
                            <ListItemText
                                primary="Your shopping cart is empty"
                                secondary="Add some items to see them here!"
                            />
                        </Stack>
                    </ListItem>
                )}
            </List>
            {/* Resumo e botão de checkout */}
            {items.length > 0 && (
                <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Typography variant="subtitle1" sx={{ marginBottom: 1, fontSize: '1.2rem' }}>
                        Total: ${totalPrice.toFixed(2)}
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{ width: 'fit-content', marginLeft: 'auto', marginRight: '8px' }}
                        onClick={() => {
                            onCheckout();
                            navigate('/checkout');
                        }}
                    >
                        Checkout
                    </Button>
                </Box>
            )}
        </Drawer>
    );
}

// Componente de pontos personalizados para o Slider
function CustomDots({
    dots,
    activeIndex,
    onClickDot
}: {
    dots: number[];
    activeIndex: number;
    onClickDot: (index: number) => void;
}) {
    // Renderiza pontos que representam os slides no Slider
    return (
        <div className="custom-dots">
            {dots.map((_, index) => (
                <span
                    key={index}
                    className={`dot ${index === activeIndex ? 'active' : ''}`}
                    onClick={() => onClickDot(index)}
                />
            ))}
        </div>
    );
}

// Criação do tema padrão do Material-UI
const defaultTheme = createTheme();

// Componente principal que renderiza a aplicação
export default function Products() {
    // Estados do componente
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [cartItems, setCartItems] = useState<ShoppingCartItem[]>([]);
    const navigate = useNavigate();
    const [activeDotIndex, setActiveDotIndex] = useState(0);

    // Configurações do Slider
    const sliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        beforeChange: (_: any, next: number) => {
            setActiveDotIndex(next);
        },
    };

    // Manipulador de evento para clicar nos pontos (dots)
    const handleClickDot = (index: number) => {
        setActiveDotIndex(index);
        // Navega para o slide correspondente ao índice clicado
        sliderRef.current?.slickGoTo(index);
    };

    // Referência para o componente Slider
    const sliderRef = useRef<Slider>(null);

    // Estilo de conteúdo do Slider
    const contentStyle: React.CSSProperties = {
        height: '200px',
        color: '#fff',
        lineHeight: '200px',
        textAlign: 'center',
        background: '#364d79',
    };

    // Efeito colateral para carregar itens do carrinho do armazenamento local
    useEffect(() => {
        try {
            const storedCartItems = localStorage.getItem('cartItems');
            if (storedCartItems) {
                const parsedItems = JSON.parse(storedCartItems);
                if (!isEqual(parsedItems, cartItems)) {
                    setCartItems(parsedItems);
                }
            }
        } catch (error) {
            console.error('Error loading cart items from localStorage:', error);
        }
    }, []);

    // Funções de manipulação do carrinho
    const handleDrawerOpen = () => {
        console.log("Opening drawer");
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const updateCartItems = (newItems: ShoppingCartItem[]) => {
        setCartItems(newItems);
        localStorage.setItem('cartItems', JSON.stringify(newItems));
    };

    const handleAddToCart = (product: Product) => {
        const existingItem = cartItems.find((item) => item.id === product.id);

        if (existingItem) {
            updateCartItems(
                cartItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
        } else {
            updateCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    const handleIncrement = (itemId: number) => {
        updateCartItems(
            cartItems.map((item) =>
                item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecrement = (itemId: number) => {
        updateCartItems(
            cartItems.map((item) =>
                item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    };

    const handleRemove = (itemId: number) => {
        updateCartItems(cartItems.filter((item) => item.id !== itemId));
    };

    const handleCheckout = () => {
        console.log('Checkout clicked!');
        navigate('/checkout', { state: { cartItems } });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            {/* Configuração inicial e reset de estilos */}
            <CssBaseline />
            {/* Barra de navegação superior */}
            <AppBar position="fixed">
                <Toolbar>
                    <CameraIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Product Catalog
                    </Typography>
                    <IconButton color="inherit" onClick={handleDrawerOpen} sx={{ ml: 'auto' }}>
                        <ShoppingCartIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {/* Carrinho de compras (Drawer) */}
            <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
                <ShoppingCart
                    items={cartItems}
                    onClose={handleDrawerClose}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                    onRemove={handleRemove}
                    onCheckout={handleCheckout}
                />
                {/* Mensagem quando o carrinho está vazio */}
                {!cartItems.length && (
                    <Box
                        sx={{
                            width: '400px',
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <RemoveShoppingCartIcon sx={{ fontSize: 100, color: 'gray' }} />
                        <ListItemText
                            primary="Your shopping cart is empty"
                            secondary="Add some items to see them here!"
                        />
                    </Box>
                )}
            </Drawer>
            {/* Conteúdo principal */}
            <main>
                {/* Seção de destaque (Slider) */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="xl">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            FITec Store
                        </Typography>
                        {/* Componente de Slider com produtos em destaque */}
                        <Slider
                            ref={sliderRef as React.RefObject<Slider>}
                            {...sliderSettings}
                            className="product-carousel"
                        >
                            {Object.entries(products).map(([category, categoryProducts]) => (
                                <div key={category} className="carousel-slide">
                                    <ProductCarouselItem
                                        product={categoryProducts[0]}
                                        onAddToCart={handleAddToCart}
                                    />
                                </div>
                            ))}
                        </Slider>
                        {/* Pontos personalizados para navegação no Slider */}
                        <>
                            <CustomDots dots={Array.from({ length: Object.keys(products).length }, (_, i) => i)} activeIndex={activeDotIndex} onClickDot={handleClickDot} />
                        </>
                    </Container>
                </Box>
                {/* Seção principal com categorias de produtos */}
                <Container sx={{ py: 8 }} maxWidth="xl">
                    <Grid container spacing={4}>
                        {Object.entries(products).map(([category, categoryProducts]) => (
                            <CategorySection
                                key={category}
                                category={category}
                                products={categoryProducts}
                                onAddToCart={handleAddToCart}
                            />
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Rodapé */}
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


