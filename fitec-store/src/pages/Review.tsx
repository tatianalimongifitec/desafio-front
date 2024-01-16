import React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useLocation } from 'react-router-dom';
import addresses from './AddressForm';
import payments from './PaymentForm';
import { ShoppingCartItem } from './Products';

export default function Review() {
    const location = useLocation();
    const { state } = location;

    if (!state || !state.cartItems) {
        return (
            <Typography variant="h6" gutterBottom>
                No items in the cart.
            </Typography>
        );
    }

    const cartItems: ShoppingCartItem[] = state.cartItems;

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {cartItems.map((item: ShoppingCartItem) => (
                    <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={item.name} />
                        <Typography variant="body2">{(item.price * item.quantity).toFixed(2)}</Typography>
                    </ListItem>
                ))}
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        ${cartItems.reduce((total: number, item: ShoppingCartItem) => total + item.price * item.quantity, 0).toFixed(2)}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>John Smith</Typography>
                    <Typography gutterBottom>{addresses.join(', ')}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
