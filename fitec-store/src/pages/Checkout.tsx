// Checkout.tsx

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Footer from '../components/Footer';

interface Payment {
    name: string;
    detail: string;
}
interface ShoppingCartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(
    step: number,
    updateCartItems: (newItems: ShoppingCartItem[]) => void,
    cartItems: ShoppingCartItem[],
    addresses: string[],
    payments: Payment[]
) {
    switch (step) {
        case 0:
            return <AddressForm updateCartItems={updateCartItems} />;
        case 1:
            return <PaymentForm updateCartItems={updateCartItems} />;
        case 2:
            return <Review cartItems={cartItems} addresses={addresses} payments={payments} />;
        default:
            throw new Error('Unknown step');
    }
}

export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [cartItems, setCartItems] = React.useState<ShoppingCartItem[]>([]);
    const [addresses, setAddresses] = React.useState<string[]>([]);
    const [payments, setPayments] = React.useState<{ name: string; detail: string }[]>([]);
    const [orderComplete, setOrderComplete] = React.useState(false);

    const updateCartItems = (newItems: ShoppingCartItem[]) => {
        setCartItems(newItems);
    };

    const updateAddresses = (newAddresses: string[]) => {
        setAddresses(newAddresses);
    };

    const updatePayments = (newPayments: { name: string; detail: string }[]) => {
        setPayments(newPayments);
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/products');
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                    <ShoppingCartIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        FITec Store
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                            </Typography>
                            <Typography variant="subtitle1">
                                Your order number is #2001539. We have emailed your order confirmation, and will
                                send you an update when your order has shipped.
                            </Typography>
                            {/* Adicione um botão para a página de produtos */}
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setOrderComplete(true);
                                    navigate('/products');
                                }}
                                sx={{ mt: 3, ml: 1, '&:focus': { backgroundColor: '#1976D2' } }}
                            >
                                Complete Order
                            </Button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep, updateCartItems, cartItems, addresses, payments)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}
                                {activeStep === 0 && (
                                    <Button
                                        variant="outlined"
                                        onClick={handleGoBack}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        Back to Products
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
            </Container>
            <Footer />
        </React.Fragment>
    );
}