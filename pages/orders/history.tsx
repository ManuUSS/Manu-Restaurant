import NextLink from 'next/link';
import { ShopLayout } from 'components/layout';
import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid/models';

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
                <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
                    <Link underline='always'>
                        Ver orden
                    </Link>
                </NextLink>
            ) 
            
        }
    }
] 

const rows = [
    { id: 1, paid: false , fullName: 'Manuel Ulate Sancho' },
    { id: 2, paid: true , fullName: 'Leo Chaves Barrientos' },
    { id: 3, paid: false , fullName: 'Joshua Villegas Bolaños' },
    { id: 4, paid: true , fullName: 'Juan Peréz Jacitno' },
    { id: 5, paid: false , fullName: 'Seanecio Herrera' },
]

const HistoryPage = () => {
  return (
    <ShopLayout title='Historial de Ordenes' pageDescription='Historial de ordenes del cliente'>
        <>
            <Typography variant='h1' component='h1'>Historial de órdenes</Typography>
            <Grid container>
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

export default HistoryPage