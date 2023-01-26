import { useState, useContext } from 'react';
import NextLink from 'next/link'
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material"
import { useForm } from 'react-hook-form';
import { AuthLayout } from "components/layout"
import { validations } from 'utils';
import { shopApi } from '../../api';
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from 'context';
import { useRouter } from 'next/router';

type FormData = {
    email: string,
    password: string,
  };

const LoginPage = () => {

    const { loginUser } = useContext( AuthContext );
    const [ showError, setShowError ] = useState( false );

    const router = useRouter();

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

    const onLoginUser = async ({ email, password }: FormData) => {
        setShowError( false );
        
        const isValidLogin = await loginUser( email, password );

        if( !isValidLogin ) {
            setShowError( true );
            setTimeout( () => setShowError( false ), 3000);
        }

        router.replace('/');
        
    }

  return (
    <AuthLayout title="Ingresar">
        <form onSubmit={ handleSubmit( onLoginUser ) } noValidate >
            <Box sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container spacing={ 2 }>
                    <Grid item xs={12}>
                        <Typography variant="h1" component="h1" textAlign='center'>Iniciar sesión</Typography>
                        <Chip 
                            label="No conocemos ese usuario/contraseña" 
                            color='error' 
                            variant='outlined'
                            icon={ <ErrorOutline /> } 
                            className='fadeIn'
                            sx={{ display: showError ? 'block' : ' none', marginY: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type='email' 
                            label='Correo' 
                            variant="filled" 
                            fullWidth 
                            error = { !!errors.email }
                            helperText = { errors.email?.message }
                            { ...register('email', { 
                                required: 'Este campo es requerido',
                                validate: validations.isEmail
                            }) }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            type='password' 
                            label='Contraseña' 
                            variant="filled" 
                            fullWidth 
                            error = { !!errors.password }
                            helperText = { errors.password?.message }
                            { ...register('password', {
                                required: 'Este campo es requerido',
                                minLength: { value: 6, message: 'Mínimo 6 carácteres' }
                            }) }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="secondary" className="circular-btn" type='submit' fullWidth>
                            Ingresar
                        </Button>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent='center'>
                        <NextLink href='/auth/register' passHref legacyBehavior>
                            <Link underline='always'>
                                ¿No tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}

export default LoginPage