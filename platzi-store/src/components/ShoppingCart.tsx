// ShoppingCart.tsx

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { useShoppingCart } from './ShoppingCartContext';

function ShoppingCart() {
  const theme = createTheme();
  const { cartItems, handleIncrement, handleDecrement, handleRemove, handleCheckout } = useShoppingCart();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <ShoppingCartIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Shopping Cart
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Your Shopping Cart
            </Typography>
          </Container>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              {cartItems.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        pt: '56.25%',
                      }}
                      // Replace the image URL with the actual product image URL
                      image={`https://source.unsplash.com/random?${item.name}`}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.name}
                      </Typography>
                      <Typography>
                        Price: ${item.price} | Quantity: {item.quantity}
                      </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => handleDecrement(item.id)}>
                            -
                        </Button>
                        <Button size="small" onClick={() => handleIncrement(item.id)}>
                            +
                        </Button>
                        <Button size="small" onClick={() => handleRemove(item.id)}>
                            Remove
                        </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" align="center" color="text.primary">
                Total Price: ${totalPrice}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button variant="contained" color="primary" size="large" onClick={() => handleCheckout(cartItems)}>
                  Checkout
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}

export default ShoppingCart;

