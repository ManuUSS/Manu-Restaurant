import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Link, Chip } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { CartList, OrderSummary } from 'components/cart';
import { ShopLayout } from 'components/layout';
import { getSession } from 'next-auth/react';
import { dbOrders } from 'database';
import { IOrder } from '../../interfaces/order';

interface Props {
    order: IOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {

    const { shippingAddress } = order;

  return (
    <ShopLayout title="Resumen de la orden 1223" pageDescription="Resumen de la orden">
        <>
            <Typography variant="h1" component="h1">Orden: { order._id }</Typography>

            <Chip 
                sx={{ my: 2}} 
                label='Pendiente de pago' 
                variant='outlined' 
                color='error' 
                icon={ <CreditCardOffOutlined />}
            />
            

            <Grid container>
                <Grid item xs={ 12 } sm={ 7 }>
                    <CartList products={ order.orderItems }/>
                </Grid>
                <Grid item xs={ 12 } sm={ 5 }>
                    <Card className="summary-card">
                        <CardContent>
                            
                            <Typography variant="h2" sx={{ mb: 1 }}>Resumen ({ order.numberOfItems } { order.numberOfItems === 1 ? 'producto' : 'productos' })</Typography>
                            <Divider sx={{ my: 1 }} />
                            
                            <Box display='flex' justifyContent='space-between' alignItems='center'>
                                <Typography fontWeight={500}>Dirección de entrega</Typography>
                            </Box>

                            <Typography>{ shippingAddress.firstName } { shippingAddress.lastName }</Typography>
                            <Typography>{ shippingAddress.address } { shippingAddress.address2 ? `, ${ shippingAddress.address2 }` : '' }</Typography>
                            <Typography>{ shippingAddress.city }, { shippingAddress.zip }</Typography>
                            <Typography>{ shippingAddress.country }</Typography>
                            <Typography>{ shippingAddress.phone }</Typography>

                            <Divider sx={{ my: 1 }} />

                            <OrderSummary orderValues={{
                                numberOfItems: order.numberOfItems,
                                subTotal: order.subTotal,
                                total: order.total,
                                taxRate: order.tax,
                            }} />

                            
                            <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                                {
                                    order.isPaid 
                                    ? (
                                        <Chip 
                                            sx={{ my: 2}} 
                                            label='Orden pagada' 
                                            variant='outlined' 
                                            color='success' 
                                            icon={ <CreditScoreOutlined />}
                                        />
                                    )
                                    : (
                                        <h1>Pagar</h1>
                                    )
                                }
                                
                            </Box>

                        </CardContent>

                    </Card>
                </Grid>
            </Grid>
        </>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { id = '' } = query; 
    const session:any = await getSession({ req });

    if( !session ) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${ id }`,
                permanent: false
            }
        }
    }

    const order = await dbOrders.getOrderById( id.toString() );

    if( !order ) {
        return {
            redirect: {
                destination: 'orders/history',
                permanent: false
            }
        }
    }

    if( order.user !== session.user._id ) {
        return {
            redirect: {
                destination: 'orders/history',
                permanent: false
            }
        }
    }



    return {
        props: {
            order
        }
    }
}

export default OrderPage