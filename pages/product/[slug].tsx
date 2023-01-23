import { MouseEvent, useState, useContext } from 'react';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { Box, Button, Grid, Typography, Chip } from '@mui/material';
import { ItemCouter } from 'components/cart';
import { ShopLayout } from "components/layout";
import { ProductSlideshow, SizeSelector } from 'components/products';

import { dbProducts } from 'database';
import { IProduct, ICartProduct } from '../../interfaces';
import { ISize } from '../../interfaces/products';
import { useRouter } from 'next/router';
import { CartContext } from '../../context/cart/CartContext';

interface Props {
  product: IProduct
}

const ProductPage:NextPage<Props> = ({ product }) => {

  const router = useRouter();
  const { addProductToCart } = useContext( CartContext );

  const [ tempCartProduct, setTempCartProduct ] = useState<ICartProduct>({
    _id : product._id,
    image : product.images[0],
    price : product.price,
    size : undefined,
    slug : product.slug,
    title : product.title,
    gender : product.gender,
    quantity : 1
  });

  const onSelectedSize = ( size: ISize ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      size
    }) )
  }

  const updatedQuantity = ( newQuantity: number ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      quantity: newQuantity
    }))
  }

  const onAddProduct = () => {
    if( !tempCartProduct.size ) return;
    addProductToCart( tempCartProduct );
  }

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
              <ItemCouter 
                currentValue={ tempCartProduct.quantity }
                updatedQuantity={ updatedQuantity }
                maxValue={ product.inStock }
              />
              <SizeSelector
                onSelectedSize={ onSelectedSize }
                sizes={ product.sizes } 
                selectedSize={ tempCartProduct.size } 
              />
            </Box>

            {
              ( product.inStock > 0 ) 
              ? 
              ( 
                <Button 
                  color='secondary' 
                  className='circular-btn' 
                  id='button-product'
                  onClick={ onAddProduct }
                >
                  {
                    tempCartProduct.size
                    ? 'Agregar al carrito'
                    : 'Seleccione una talla'
                  }
                </Button> 
              )
              : 
              (
                <Chip  label='No hay disponibles' color='error' variant='outlined' />
              ) 
            }

            <Button 
              color='success'
              className='circular-btn success'
              onClick={ () => router.push('/cart')}
            >
              Ver el carrito de compras
            </Button> 

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