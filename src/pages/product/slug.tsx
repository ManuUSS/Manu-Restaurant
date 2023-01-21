import { Box, Button, Grid, Typography, Chip } from '@mui/material';
import { ItemCouter } from 'components/cart';
import { ShopLayout } from "components/layout"
import { ProductSlideshow } from 'components/products';
import { initialData } from "database/products"

const product = initialData.products[0];

const ProductPage = () => {
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
            </Box>

            <Button color='secondary' className='circular-btn' id='button-product'>
              Agregar al carrito
            </Button>
            
            <Chip  label='No hay disponibles' color='error' variant='outlined' />

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

export default ProductPage  