import NextLink from 'next/link';
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link } from '@mui/material';
import { CartList, OrderSummary } from 'components/cart';
import { ShopLayout } from 'components/layout';
import { useContext } from 'react';
import { CartContext } from '../../context/cart/CartContext';
import { countries } from 'utils/countries';

const SummaryPage = () => {

    const { shippingAddress, numberOfItems } = useContext( CartContext );
    
    if( !shippingAddress ) {
        return <></>
    }

    const countryName = countries.find( ( c ) => c.code === shippingAddress.country )?.name ;

    const { firstName,  lastName,  address,  city, phone, address2, zip } = shippingAddress;

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

                            <Typography>{ countryName  }</Typography>
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

                            
                            <Box sx={{ mt: 3 }}>
                                <Button color="secondary" className="circular-btn" fullWidth>
                                    Confirmar orden
                                </Button>
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