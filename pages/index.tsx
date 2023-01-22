import { Typography } from '@mui/material'
import { ShopLayout } from "components/layout";
import { ProductList } from 'components/products';
import { initialData } from 'database/products';
import { useProducts } from 'hooks';


export default function Home() {

  const { products, isLoading } = useProducts('/products');
  return (
    <ShopLayout title='Manu - Shop' pageDescription="Encuentra los mejores productos de Tesla aquí">
      <>
        <Typography variant='h1' component='h1'>Tienda</Typography>
        <Typography variant='h2' component='h2' sx={{ mb: 1 }}>Todos los productos</Typography>
        
        {
          isLoading ? <h1>Cargando</h1> : <ProductList  products={ products } />
        }

      </>
    </ShopLayout>
  )
}
