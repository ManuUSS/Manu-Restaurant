import { FC, useContext } from 'react';
import NextLink from 'next/link'
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material";
import { initialData } from "database/products"
import { ItemCouter } from './';
import { CartContext } from '../../context/cart/CartContext';

interface Props {
    editable?: boolean
}

export const CartList: FC<Props> = ({ editable = false }) => {

    const { cart } = useContext( CartContext );

  return (
    <>
        {
            cart.map( ( p ) => (
                <Grid container spacing={ 2 } key={p.slug} sx={{ mb: 1 }}>
                    <Grid item xs={ 3 }>
                        <NextLink href="/product/slug" passHref legacyBehavior>
                            <Link>
                                <CardActionArea>
                                    <CardMedia 
                                        image={ `/products/${ p.image }` }
                                        component='img'
                                        alt={ p.title }
                                        sx={{ borderRadius: '5px' }}
                                    />
                                </CardActionArea>
                            </Link>
                        </NextLink>
                    </Grid>
                    <Grid item xs={ 7 }>
                        <Box display='flex' flexDirection='column'>
                            <Typography variant='body1'>{ p.title }</Typography>
                            <Typography variant='body1'>Talla: <strong>{ p.size }</strong></Typography> 
                        </Box>
                        {
                            editable
                            ? <ItemCouter  currentValue={ p.quantity }  maxValue={ 10 }  updatedQuantity={ () => {} }/>
                            : <Typography variant='h5' component='h5'>{ p.quantity } { p.quantity > 1 ? 'productos' : 'producto' }</Typography>
                             
                        }
                    </Grid>
                    <Grid item xs={ 2 } display='flex' alignItems='center' flexDirection='column'>
                        <Typography variant='subtitle1' fontWeight={400}>${ p.price }</Typography>
                        {
                            editable && (
                                <Button variant='text' color='secondary'>
                                    Remover
                                </Button>
                            )
                        }
                    </Grid>
                </Grid>
            ))
        }
    </>
  )
}
