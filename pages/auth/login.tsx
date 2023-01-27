import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next'
import { getSession, getProviders, signIn } from 'next-auth/react';
import NextLink from 'next/link'
import { useRouter } from 'next/router';
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from "@mui/material"
import { useForm } from 'react-hook-form';
import { AuthLayout } from "components/layout"
import { validations } from 'utils';
import { ErrorOutline } from '@mui/icons-material';

type FormData = {
    email: string,
    password: string,
  };

const LoginPage = () => {

    const [ showError, setShowError ] = useState( false );
    const [ providers, setProviders ] = useState<any>({});
    const router = useRouter();

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

    useEffect(() => {
        
        getProviders().then( prov => {
            setProviders( prov );
        });

    }, [])
    

    const onLoginUser = async ({ email, password }: FormData) => {
        setShowError( false );
        
        // const isValidLogin = await loginUser( email, password );

        // if( !isValidLogin ) {
        //     setShowError( true );
        //     setTimeout( () => setShowError( false ), 3000);
        //     return;
        // }
        // const destination = router.query.p?.toString() || '/';
        // router.replace( destination );
        
        await signIn('credentials', { email, password });
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
                        <NextLink 
                            href={ router.query.p ? `/auth/register${ router.query.p }` : '/auth/register' } 
                            passHref 
                            legacyBehavior
                        >
                            <Link underline='always'>
                                ¿No tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                    <Grid item xs={12} display='flex' flexDirection='column' justifyContent='center'>
                        <Divider sx={{ width: '100%', mb: 2 }} />
                            {
                                Object.values( providers ).map(( provider:any ) => {

                                    if( provider.id === 'credentials' ) return (<></>)

                                    return (
                                        <Button
                                            key={ provider.id }
                                            variant='outlined'
                                            color='primary'
                                            sx={{ mb: 1 }}
                                            fullWidth
                                            onClick={ () => signIn( provider.id ) }
                                        >
                                            { provider.name }
                                        </Button>
                                    )

                                })
                            }
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const session = await getSession({ req }) 
    const { p = '/' } = query; 

    if( session ) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return {
        props: {
            
        }
    }
}

export default LoginPage