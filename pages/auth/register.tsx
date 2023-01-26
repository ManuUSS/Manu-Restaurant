import { useState, useContext } from 'react';
import NextLink from 'next/link'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Box, Button, Grid, Link, TextField, Typography, Chip } from '@mui/material';
import { AuthLayout } from "components/layout"
import { ErrorOutline } from '@mui/icons-material';
import { validations } from 'utils';
import shopApi from '../../api/shopApi';
import { AuthContext } from 'context';

type FormData = {
    name: string;
    email: string;
    password: string;
}

const RegisterPage = () => {

    const { registerUser } = useContext( AuthContext );
    const [ showError, setShowError ] = useState( false );
    const [ errorMessage, setErrorMessage ] = useState('');

    const router = useRouter();

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

    const onRegisterForm = async ( { name, email, password }: FormData ) => {

        setShowError( false );

        const { hasError, message } = await registerUser( name, email, password );

        if( hasError ) {
            setShowError( true );
            setErrorMessage( message! );
            setTimeout( () => setShowError( false ), 3000);
            return;
        }
        
        const destination = router.query.p?.toString() || '/';
        router.replace( destination );

    }

  return (
    <AuthLayout title="Ingresar">
        <Box sx={{ width: 350, padding: '10px 20px' }}>
            <form onSubmit={ handleSubmit( onRegisterForm ) } noValidate>
                <Grid container spacing={ 2 }>
                    <Grid item xs={12}>
                        <Typography variant="h1" component="h1" textAlign='center'>Crear cuenta</Typography>
                        <Chip 
                                label="Ya hay un usuario con estos datos" 
                                color='error' 
                                variant='outlined'
                                icon={ <ErrorOutline /> } 
                                className='fadeIn'
                                sx={{ display: showError ? 'block' : ' none', marginY: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label='Nombre completo' 
                            variant="filled" 
                            fullWidth
                            error={ !!errors.name }
                            helperText={ errors.name?.message } 
                            { ...register( 'name', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 carácteres' }
                            }) }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label='Correo' 
                            variant="filled" 
                            fullWidth
                            error={ !!errors.email }
                            helperText={ errors.email?.message }
                            { ...register( 'email', {
                                required: 'Este campo es requerido',
                                validate: validations.isEmail
                            })} 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label='Contraseña' 
                            type='password' 
                            variant="filled" 
                            fullWidth
                            error={ !!errors.password }
                            helperText={ errors.password?.message }
                            { ...register( 'password', {
                                required: 'Este campo es requerido',
                                minLength: { value: 6, message: 'Mínimo 6 carácteres' }
                            })} 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="secondary" className="circular-btn" type='submit' fullWidth>
                            Ingresar
                        </Button>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent='center'>
                        <NextLink 
                            href={ router.query.p ? `/auth/login${ router.query.p }` : '/auth/login' }  
                            passHref 
                            legacyBehavior
                        >
                            <Link underline='always'>
                                ¿Ya tienes una cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </form>
        </Box>
    </AuthLayout>
  )
}

export default RegisterPage