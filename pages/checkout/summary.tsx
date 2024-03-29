import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link, Chip } from '@mui/material';
import Cookie from 'js-cookie';
import { CartList, OrderSummary } from 'components/cart';
import { ShopLayout } from 'components/layout';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/cart/CartContext';

const SummaryPage = () => {

    const router = useRouter();
    const { shippingAddress, numberOfItems, createOrder } = useContext( CartContext );
    
    const [ isPosting, setIsPosting ] = useState( false );
    const [ errorMessage, setErrorMessage ] = useState('');

    useEffect(() => {
      
        if( !Cookie.get('firstName') ) {
            router.push('/checkout/address');
        } 

    }, [ router ]);
    
    const onCreateOrder = async () => {
        setIsPosting( true );
        const { hasError, message } = await createOrder();
        if( hasError ) {
            setIsPosting( false );
            setErrorMessage( message );
        }

        router.replace(`/order/${ message }`)
    }

    if( !shippingAddress ) {
        return <></>
    }

    const { firstName,  lastName,  address,  city, phone, address2, zip, country } = shippingAddress;

  return (
    <ShopLayout title="Resumen de la compra" pageDescription="Resumen de la orden">
        <>
            <Typography variant="h1" component="h1">Resumen de la orden</Typography>

            <Grid container>
                <Grid item xs={ 12 } sm={ 7 }>
                    <CartList />
                </Grid>
                <Grid item xs={ 12 } sm={ 5 }>
                    <Card className="summary-card">
                        <CardContent>
                            
                            <Typography variant="h2" sx={{ mb: 1 }}>Resumen ({ numberOfItems } { numberOfItems === 1 ? 'proudcto' : 'productos' })</Typography>
                            <Divider sx={{ my: 1 }} />
                            
                            <Box display='flex' justifyContent='space-between' alignItems='center'>
                                <Typography fontWeight={500}>Dirección de entrega</Typography>
                                <NextLink href='/checkout/address' passHref legacyBehavior>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography>{ firstName } { lastName }</Typography>
                            <Typography>{ address }{ address2 ? `, ${address2}` : '' }</Typography>
                            <Typography>{ city }, { zip }</Typography>

                            <Typography>{ country }</Typography>
                            <Typography>{ phone }</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='end'>
                                <NextLink href='/cart' passHref legacyBehavior>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>
                            
                            <OrderSummary />

                            
                            <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                                <Button 
                                    color="secondary" 
                                    className="circular-btn" 
                                    fullWidth
                                    onClick={ onCreateOrder }
                                    disabled={ isPosting }
                                >
                                    Confirmar orden
                                </Button>
                                <Chip 
                                    color='error'
                                    variant='outlined'
                                    label={ errorMessage }
                                    sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
                                />
                            </Box>

                        </CardContent>

                    </Card>
                </Grid>
            </Grid>
        </>
    </ShopLayout>
  )
}

export default SummaryPage