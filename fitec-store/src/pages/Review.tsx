import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

interface Product {
    name: string;
    desc: string;
    price: string;
}

interface ShoppingCartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface ReviewProps {
    cartItems: ShoppingCartItem[];
    addresses: string[];
    payments: { name: string; detail: string }[];
}

const Review = ({ cartItems, addresses, payments }: ReviewProps) => {
    const products: Product[] = cartItems.map((item) => ({
        name: item.name,
        desc: `Quantity: ${item.quantity}`,
        price: `$${(item.price * item.quantity).toFixed(2)}`,
    }));

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {cartItems.map((item) => (
                    <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
                        <Typography variant="body2">{`$${(item.price * item.quantity).toFixed(2)}`}</Typography>
                    </ListItem>
                ))}
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        ${total.toFixed(2)}
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
                        {payments.map((payment, index) => (
                            <React.Fragment key={index}>
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

export default Review;