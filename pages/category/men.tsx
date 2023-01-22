import { Typography } from '@mui/material';
import { ShopLayout } from 'components/layout';
import { ProductList } from 'components/products';
import { Loader } from 'components/ui';
import { useProducts } from 'hooks';

const MenPage = () => {
    const { products, isLoading } = useProducts('/products?gender=men');
    return (
        <ShopLayout title='Manu - Shop Men' pageDescription="Página con artículos de ropa para hombres">
        <>
            <Typography variant='h1' component='h1'>Tienda</Typography>
            <Typography fontSize={ 14 } sx={{ mb: 1 }} component='h2'>Todos los productos para ellos</Typography>
            
            {
            isLoading ? <Loader /> : <ProductList  products={ products } />
            }

        </>
        </ShopLayout>
    )
}

export default MenPage