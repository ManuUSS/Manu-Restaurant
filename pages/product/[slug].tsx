import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { Box, Button, Grid, Typography, Chip } from '@mui/material';
import { ItemCouter } from 'components/cart';
import { ShopLayout } from "components/layout";
import { ProductSlideshow, SizeSelector } from 'components/products';

import { dbProducts } from 'database';
import { IProduct } from '../../interfaces/products';


interface Props {
  product: IProduct
}

const ProductPage:NextPage<Props> = ({ product }) => {

  return (
    <ShopLayout title={ product.title } pageDescription={ product.description }>
      <Grid container spacing={ 3 }>
        
        <Grid item xs={ 12 } sm={ 7 }>
          <ProductSlideshow images={ product.images } />
        </Grid>
        
        <Grid item xs={ 12 } sm={ 5 }>
          <Box display='flex' flexDirection='column'>
            <Typography variant='h1' component='h1'>{ product.title }</Typography>
            <Typography variant='subtitle1' component='h2'>${ product.price }</Typography>

            <Box sx={{ marginY: 2 }}>
              <Typography variant='subtitle2' component='h3'>Cantidad</Typography>
              <ItemCouter />
              <SizeSelector sizes={ product.sizes }  />
            </Box>

            {
              ( product.inStock > 0 ) 
              ? 
              ( 
                <Button color='secondary' className='circular-btn' id='button-product'>
                  Agregar al carrito
                </Button> 
              )
              : 
              (
                <Chip  label='No hay disponibles' color='error' variant='outlined' />
              ) 
            }
            
            

            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2'>Descripción</Typography>
              <Typography variant='body2'>{ product.description }</Typography>
            </Box>


          </Box>
        </Grid>

      </Grid>
    </ShopLayout>
  )
}


export const getStaticPaths: GetStaticPaths = async ( ctx ) => {
  
  const slugs = await dbProducts.getAllProductsSlug();

  return {
    paths: slugs.map( ({ slug }) => ({
      params: { slug }
    })),
    fallback: "blocking"
  }

}


export const getStaticProps: GetStaticProps = async ({ params }) => {
  
  const { slug } = params as { slug: string };

  const product = await dbProducts.getProductBySlug( slug );

  if( !product ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    }
  }
}

//Server side-rendering
// export const getServerSideProps: GetServerSideProps = async({ params }) => {

//   const { slug = '' } = params as { slug: string };

//   const product = await dbProducts.getProductBySlug( slug );

//   if( !product ) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     }
//   }

// } 

export default ProductPage  