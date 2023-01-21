import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'
import { ShopLayout } from "components/layout";
import { ProductList } from 'components/products';
import { initialData } from 'database/products';


export default function Home() {
  return (
    <ShopLayout title='Manu - Shop' pageDescription="Encuentra los mejores productos de Tesla aquí">
      <>
        <Typography variant='h1' component='h1'>Tienda</Typography>
        <Typography variant='h2' component='h2' sx={{ mb: 1 }}>Todos los productos</Typography>
        
        <ProductList  products={ initialData.products as any } />

      </>
    </ShopLayout>
  )
}
