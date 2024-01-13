import React, { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import ShoppingCartOutlined from '@ant-design/icons/ShoppingCartOutlined';
import Badge from 'antd/lib/badge';
import Drawer from 'antd/lib/drawer';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useShoppingCart } from './ShoppingCartContext';
import Toolbar from '@mui/material/Toolbar';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Box from '@mui/material/Box';
import { QuantityInput } from './QuantityInput';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © FITec Store '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  quantity?: number;
}

type ProductWithQuantity = Product & { quantity: number };

const Products: React.FC = () => {
    const {
      handleAddToCart,
      handleIncrement,
      handleDecrement,
      handleRemove,
      cartItems,
      handleUpdateCartItem,
      handleCheckout,
    } = useShoppingCart();
    const [drawerVisible, setDrawerVisible] = useState(false);
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  

  const products: Product[] = [
    { id: 1, name: 'Notebook A', price: 1200, category: 'Notebooks' },
    { id: 2, name: 'Notebook B', price: 900, category: 'Notebooks' },
    { id: 9, name: 'Notebook C', price: 1500, category: 'Notebooks' },
    { id: 3, name: 'Gaming Keyboard X', price: 80, category: 'Keyboards' },
    { id: 4, name: 'Office Keyboard Y', price: 40, category: 'Keyboards' },
    { id: 10, name: 'Mechanical Keyboard Z', price: 120, category: 'Keyboards' },
    { id: 5, name: 'Wireless Mouse Z', price: 30, category: 'Mice' },
    { id: 6, name: 'Gamer Mouse W', price: 50, category: 'Mice' },
    { id: 11, name: 'Bluetooth Mouse X', price: 35, category: 'Mice' },
    { id: 7, name: 'Pro Headset', price: 100, category: 'Headsets' },
    { id: 8, name: 'Basic Headset', price: 40, category: 'Headsets' },
    { id: 12, name: 'Wireless Earphones Y', price: 60, category: 'Headsets' },
  ];

  const categories = Array.from(new Set(products.map((product) => product.category)));
  const navigate = useNavigate();

  const handleAddToCartClick = (item: Product) => {
    const itemWithQuantity: ProductWithQuantity = {
      ...item,
      quantity: item.quantity !== undefined ? item.quantity : 1,
    };

    handleAddToCart(itemWithQuantity);
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  const handleUpdatePrice = (itemId: number, newQuantity: number, updatedPrice: number) => {
    // Utilize a função no contexto para atualizar o carrinho com o item atualizado
    if (handleUpdateCartItem) {
      handleUpdateCartItem(itemId, newQuantity, updatedPrice);
    } else {
      console.error("A função 'handleUpdateCartItem' não está disponível no contexto.");
    }
  };
     

  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <AppBar position="fixed" style={{ zIndex: 1000 }}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            FITec Store
          </Typography>
          <Stack direction="row" spacing={2} sx={{ marginLeft: 'auto', alignItems: 'center' }}>
            <Button color="inherit" onClick={showDrawer}>
              <Badge count={cartItemCount} showZero>
                <ShoppingCartOutlined style={{ fontSize: '24px', color: 'white' }} />
              </Badge>
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <main>
        {categories.map((category) => (
          <Box
            key={category}
            sx={{
              bgcolor: 'background.paper',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <Container maxWidth="sm" sx={{ py: 4 }}>
              <Typography
                component="h1"
                variant="h4"
                align="center"
                color="text.primary"
                gutterBottom
              >
                {category}
              </Typography>
            </Container>
            <Container sx={{ py: 4 }} maxWidth="md">
              <Grid container spacing={4}>
                {products
                  .filter((product) => product.category === category)
                  .map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                      <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                      >
                        <CardMedia
                          component="div"
                          sx={{
                            pt: '56.25%',
                          }}
                          image={`https://source.unsplash.com/random?${product.name}`}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {product.name}
                          </Typography>
                          <Typography>
                            Price: ${product.price}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small">View</Button>
                          <Button size="small" onClick={() => handleAddToCartClick(product)}>
                            Add to Cart
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </Container>
          </Box>
        ))}
      </main>
       
       {/* DRAWER */}
       
      <Drawer
  title="Shopping Cart"
  placement="right"
  onClose={onCloseDrawer}
  visible={drawerVisible}
  width={400}
>
  {cartItems.length > 0 ? (
    <>
      {cartItems.map((item) => (
  <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
    <div style={{ flex: 1 }}>
      <p>{item.name}</p>
      <p>Price: ${item.price * item.quantity}</p>
    </div>
    <QuantityInput
  defaultValue={item.quantity}
  onDecrement={() => handleDecrement(item.id)}
  onIncrement={() => handleIncrement(item.id)}
  updatePrice={(newQuantity) => handleUpdatePrice(item.id, newQuantity, item.price)}
/>

    <IconButton aria-label="delete" onClick={() => handleRemove(item.id)}>
      <DeleteIcon />
    </IconButton>
  </div>
))}
      <div style={{ borderTop: '2px solid #ccc', paddingTop: '10px' }}>
        <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          Total Price: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
        </p>

        {/* Botão de Checkout */}
  {/* Botão de Checkout */}
  <Button
  variant="contained"
  color="primary"
  onClick={() => {

    navigate('/checkout'); 
  }}
  style={{ marginTop: '10px' }}
>
  Checkout
</Button>

</div>
    </>
  ) : (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <RemoveShoppingCartIcon style={{ fontSize: '80px', color: '#ccc', marginBottom: '10px' }} />
      <p>Your shopping cart is empty.</p>
    </div>
  )}
</Drawer>


      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
};

export default Products;