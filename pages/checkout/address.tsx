import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Button, FormControl, Grid, InputLabel, MenuItem, TextField, Typography, Box } from '@mui/material';
import { ShopLayout } from "components/layout"
import { jasonwebtoken } from 'utils';
import { countries } from 'utils/countries';
import { useContext, useState } from 'react';
import Cookie from 'js-cookie';
import { CartContext } from 'context';

type FormData = {
    firstName: string;
    lastName: string;
    address: string;
    address2: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
}

const getAddressFromCookies = ():FormData => {
    return {
        firstName  : Cookie.get( 'firstName' ) || '',
        lastName   : Cookie.get( 'lastName' ) || '',
        address    : Cookie.get( 'address' ) || '',
        address2   : Cookie.get( 'address2' ) || '',
        zip        : Cookie.get( 'zip' ) || '',
        city       : Cookie.get( 'city' ) || '',
        country    : Cookie.get( 'country' ) || '',
        phone      : Cookie.get( 'phone' ) || '',
    }
}


const AddressPage = () => {

    const { updatedAdress } = useContext( CartContext );

    const router = useRouter();

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
        defaultValues: getAddressFromCookies()
    }); 

    const onSubmitAdress = ( data: FormData ) => {
        updatedAdress( data );
        console.log( data );
        router.push('/checkout/summary');
    }

  return (
    <ShopLayout title="Dirección" pageDescription="Confirmar dirección del envío">
        <>
            <Typography variant='h1' component='h1'>Dirección</Typography>
            <form onSubmit={ handleSubmit( onSubmitAdress ) }>
                <Grid container spacing={ 2 } sx={{ mt: 2 }}>
                    
                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label='Nombre' 
                            variant="filled" 
                            fullWidth
                            { ...register('firstName', { 
                                    required: 'Este campo es requerido',
                            }) }
                            error = { !!errors.firstName }
                            helperText = { errors.firstName?.message }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label='Apellido' 
                            variant="filled" 
                            fullWidth
                            { ...register('lastName', { 
                                    required: 'Este campo es requerido',
                            }) }
                            error = { !!errors.lastName }
                            helperText = { errors.lastName?.message }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label='Dirección' 
                            variant="filled" 
                            fullWidth
                            { ...register('address', { 
                                    required: 'Este campo es requerido',
                            }) }
                            error = { !!errors.address }
                            helperText = { errors.address?.message }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label='Dirección 2 (opcional)' 
                            variant="filled" 
                            fullWidth
                            { ...register('address2') }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label='Código postal' 
                            variant="filled" 
                            fullWidth
                            { ...register('zip', { 
                                    required: 'Este campo es requerido',
                            }) }
                            error = { !!errors.zip }
                            helperText = { errors.zip?.message }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <TextField 
                            label='Ciudad' 
                            variant="filled" 
                            fullWidth
                            { ...register('city', { 
                                    required: 'Este campo es requerido',
                            }) }
                            error = { !!errors.city }
                            helperText = { errors.city?.message }
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 }>
                        <FormControl fullWidth>
                            <TextField
                                select 
                                variant="filled" 
                                label='País'
                                defaultValue={ Cookie.get('country') || countries[0].code } 
                                { ...register('country', { 
                                    required: 'Este campo es requerido',
                                })}
                                error = { !!errors.country }
                            >
                                {
                                    countries.map( ( country ) => (
                                        <MenuItem 
                                            key={ country.code } 
                                            value={ country.code }
                                        >
                                            { country.name }
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 } >
                        <TextField 
                            label='Télefono' 
                            variant="filled" 
                             { ...register('phone', { 
                                required: 'Este campo es requerido',
                            }) }
                            error = { !!errors.phone }
                            helperText = { errors.phone?.message }
                            fullWidth 
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                    <Button 
                        color='secondary' 
                        className="circular-btn" 
                        type='submit' 
                        fullWidth
                    >
                        Revisar pedido
                    </Button>
                </Box>
            </form>
        </>
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// {/* VALIDACION MEDIANTE SSR*/}
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const { token = '' } = req.cookies;
    let isValidToken = false;

    try {

        await jasonwebtoken.isValidToken( token );
        isValidToken = true; 

    } catch (error) {
        isValidToken = false;
    }

 
    if( !isValidToken ) {
        return {
            redirect: {
                destination: '/auth/login?p=/checkout/address',
                permanent: false
            }
        }
    }


    return {
        props: {
            
        }
    }
}


export default AddressPage