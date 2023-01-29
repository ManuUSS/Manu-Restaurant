import { FC, useContext } from 'react';
import { Grid, Typography } from "@mui/material"
import { CartContext } from '../../context/cart/CartContext';
import { currency } from 'utils';

interface Props {
    orderValues? : {
        numberOfItems   : number; 
        subTotal        : number; 
        total           : number; 
        taxRate         : number;
    }
}


export const OrderSummary: FC<Props> = ({ orderValues  }) => {

    const { numberOfItems, subTotal, total, taxRate } = useContext( CartContext );

    const summaryValues = orderValues ? orderValues : { numberOfItems, subTotal, total, taxRate };



  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography color='gray'>Compra</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{ summaryValues.numberOfItems } { summaryValues.numberOfItems > 1 ? 'productos' : 'producto' }</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography color='gray'>Subtotal</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{ currency.format( summaryValues.subTotal ) }</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography color='gray'>Impuestos ({ Number( process.env.NEXT_PUBLIC_TAX_RATE ) * 100 }%)</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{ currency.format( summaryValues.taxRate ) }</Typography>
        </Grid>
        <Grid item xs={6} sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Total</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end' sx={{ mt: 2 }}>
            <Typography variant="subtitle1"><strong>{ currency.format( summaryValues.total ) }</strong></Typography>
        </Grid>
    </Grid>
  )
}
