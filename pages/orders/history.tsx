import NextLink from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import { ShopLayout } from 'components/layout';
import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid/models';
import { getSession } from 'next-auth/react';
import { dbOrders } from 'database';
import { IOrder } from '../../interfaces/order';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullName', headerName: 'Nombre completo', width: 200 },
    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra si la orden está paga',
        width: 200,
        resizable: true,
        renderCell: ( params:GridRenderCellParams ) => {
            
            return (
                params.row.paid 
                    ? <Chip color='success' label='Pagada' variant='outlined' />
                    : <Chip color='error' label='No Pagada' variant='outlined' />
            ) 
            
        }
    },
    {
        field: 'order',
        headerName: 'Ver orden',
        width: 200,
        sortable: false,
        renderCell: ( params:GridRenderCellParams ) => {
            
            return (
                <NextLink href={`/orders/${params.row.orderId}`} passHref legacyBehavior>
                    <Link underline='always'>
                        Ver orden
                    </Link>
                </NextLink>
            ) 
            
        }
    }
] 

interface Props {
    orders: IOrder[]
}

const HistoryPage: NextPage<Props> = ({ orders }) => {

    const rows = orders.map( ( order, index ) => ({
        id: index + 1,  
        paid: order.isPaid , 
        fullName: `${ order.shippingAddress.firstName } ${ order.shippingAddress.lastName }`,
        orderId: order._id
    }))

  return (
    <ShopLayout title='Historial de Ordenes' pageDescription='Historial de ordenes del cliente'>
        <>
            <Typography variant='h1' component='h1'>Historial de órdenes</Typography>
            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid 
                        rows={ rows }
                        columns={ columns }
                        pageSize={ 10 }
                        rowsPerPageOptions={ [ 10 ] }
                    />
                </Grid>
            </Grid>
        </>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    
    const session:any = await getSession({ req });

    if( !session ) {
        return{
            redirect: {
                destination: '/auth/login?p=/orders/history',
                permanent: false
            }
        }
    }

    const orders = await dbOrders.getOrdersByUser( session.user._id );

    return {
        props: {
            orders       
        }
    }
}

export default HistoryPage