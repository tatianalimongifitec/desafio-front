import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import MaskedInput from 'react-text-mask';
import Footer from './Footer';

interface MaskedInputProps {
  inputRef: React.RefObject<HTMLInputElement>;
  props: React.InputHTMLAttributes<HTMLInputElement>;
}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © FITec Store '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const [phone, setPhone] = React.useState('');
  const [cep, setCep] = React.useState('');
  const [cpf, setCpf] = React.useState('');
  const [cnpj, setCnpj] = React.useState('');
  const [userType, setUserType] = React.useState('user');
  const [formData, setFormData] = React.useState({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    country: '',
  });

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleCepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCep(event.target.value);
  };

  const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(event.target.value);
  };

  const handleCnpjChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCnpj(event.target.value);
  };

  const handleUserTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUserType(event.target.value as string);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      passwordConfirm: data.get('passwordConfirm'),
      nickname: data.get('nickname'),
      phone: data.get('phone'),
      cep: data.get('cep'),
      street: data.get('street'),
      number: data.get('number'),
      complement: data.get('complement'),
      neighborhood: data.get('neighborhood'),
      city: data.get('city'),
      country: data.get('country'),
      userType: data.get('userType'),
      cpf: userType === 'user' ? data.get('cpf') : '',
      cnpj: userType === 'seller' ? data.get('cnpj') : '',
    });
  };

  const handleCepBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const cepValue = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
  
    if (cepValue.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cepValue}/json/`);
        const addressData = response.data;
  
        if (!addressData.erro) {
          setFormData((prevData) => ({
            ...prevData,
            street: addressData.logradouro || '',
            neighborhood: addressData.bairro || '',
            city: addressData.localidade || '',
            country: addressData.uf || '',
          }));
        } else {
          console.error('CEP não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar informações de endereço:', error);
      }
    }
  };
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordConfirm"
                  label="Confirm Password"
                  type="password"
                  id="passwordConfirm"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="nickname"
                  label="Nickname"
                  id="nickname"
                  helperText="What do you want others to call you?"
                  autoComplete="nickname"
                />
              </Grid>
              <Grid item xs={12}>
                <MaskedInput
                  mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                  placeholder="(xx) xxxxx-xxxx"
                  value={phone}
                  onChange={handlePhoneChange}
                  id="phone"
                  name="phone"
                  render={(ref, props) => (
                    <TextField
                      required
                      fullWidth
                      inputRef={ref}
                      {...props}
                      label="Phone"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <MaskedInput
                  mask={[' ', /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                  placeholder="xx.xxx-xx"
                  value={cep}
                  onChange={handleCepChange}
                  onBlur={handleCepBlur}
                  id="cep"
                  name="cep"
                  render={(ref, props) => (
                    <TextField
                      required
                      fullWidth
                      inputRef={ref}
                      {...props}
                      label="CEP"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="street"
                  label="Street"
                  id="street"
                  value={formData.street}
                  onChange={(event) => setFormData({ ...formData, street: event.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="number"
                  label="Number"
                  id="number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="complement"
                  label="Complement"
                  id="complement"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="neighborhood"
                  label="Neighborhood"
                  id="neighborhood"
                  value={formData.neighborhood}
                  onChange={(event) => setFormData({ ...formData, neighborhood: event.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  label="City"
                  id="city"
                  value={formData.city}
                  onChange={(event) => setFormData({ ...formData, city: event.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="country"
                  label="Country"
                  id="country"
                  value={formData.country}
                  onChange={(event) => setFormData({ ...formData, country: event.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="userType"
                  label="User Type"
                  id="userType"
                  select
                  SelectProps={{ native: true }}
                  value={userType}
                  onChange={handleUserTypeChange}
                >
                  <option value="user">User</option>
                  <option value="seller">Seller</option>
                </TextField>
              </Grid>

              <Grid item xs={12} style={{ display: userType === 'user' ? 'block' : 'none' }}>
                <MaskedInput
                  mask={[' ', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                  placeholder="xxx.xxx.xxx-xx"
                  value={cpf}
                  onChange={handleCpfChange}
                  id="cpf"
                  name="cpf"
                  render={(ref, props) => (
                    <TextField
                      required={userType === 'user'}
                      fullWidth
                      inputRef={ref}
                      {...props}
                      label="CPF"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} style={{ display: userType === 'seller' ? 'block' : 'none' }}>
                <MaskedInput
                  mask={[' ', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                  placeholder="xx.xxx.xxx/xxxx-xx"
                  value={cnpj}
                  onChange={handleCnpjChange}
                  id="cnpj"
                  name="cnpj"
                  render={(ref, props) => (
                    <TextField
                      required={userType === 'seller'}
                      fullWidth
                      inputRef={ref}
                      {...props}
                      label="CNPJ"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="http://localhost:3000/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <Footer />
    </ThemeProvider>
  );
}