import { GetServerSideProps, NextPage } from 'next';
import { Typography } from "@mui/material";
import { ShopLayout } from "components/layout";
import { ProductList } from "components/products";
import { dbProducts } from 'database';
import { IProduct } from '../../interfaces/products';

interface Props {
    products: IProduct[] 
}

const SearchPage:NextPage<Props> = ({ products }) => {
    return (
      <ShopLayout title='Manu - Shop Búsqueda' pageDescription="Encuentra los mejores productos de Tesla aquí">
        <>
          <Typography variant='h1' component='h1'>Buscar productos</Typography>
          <Typography fontSize={ 14 } sx={{ mb: 1 }} component='h2'>Todos los productos</Typography>
          
           <ProductList  products={ products } />
  
        </>
      </ShopLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    const { query = '' } = params as { query: string };  

    if ( query.length === 0 ) {
        return {
            redirect: {
                destination: '/',
                permanent: 'false'
            }
        }
    }

    let products = await dbProducts.getProductsByTerm( query );

    return {
        props: {
            products
        }
    }
}

export default SearchPage