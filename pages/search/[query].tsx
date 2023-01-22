import { GetServerSideProps, NextPage } from 'next';
import { Typography } from "@mui/material";
import { ShopLayout } from "components/layout";
import { ProductList } from "components/products";
import { dbProducts } from 'database';
import { IProduct } from '../../interfaces/products';

interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: string; 
}

const SearchPage:NextPage<Props> = ({ products, foundProducts, query }) => {
    return (
      <ShopLayout title='Manu - Shop Búsqueda' pageDescription="Encuentra los mejores productos de Tesla aquí">
        <>
          <Typography variant='h1' component='h1'>Buscar productos</Typography>
          {
            foundProducts 
            ? <Typography fontSize={ 14 } sx={{ mb: 1 }} component='h2' textTransform='capitalize'>Resultados de la búsqueda {query}</Typography>
            : <Typography fontSize={ 14 } sx={{ mb: 1 }} component='h2' textTransform='capitalize'>No se encontraron productos con: { query }</Typography>
          }
          
          
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

    const foundProducts = products.length > 0;

    if( !foundProducts ) {
        products = await dbProducts.getAllProducts();
    }

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}

export default SearchPage