// Footer.tsx
import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import '../styles/Footer.css';

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

function Footer() {
    return (
        <Box sx={{ flexShrink: 0, width: 'fit', marginTop: 'auto', bgcolor: 'background.paper', p: 6 }} component="footer">
            <Typography variant="h6" align="center" gutterBottom color="text.secondary">
                Made with love
                <FavoriteIcon sx={{ color: 'pink' }} />
            </Typography>
            <Copyright />
        </Box>
    );
}

export default Footer;
