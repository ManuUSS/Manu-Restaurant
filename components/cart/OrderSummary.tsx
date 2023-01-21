import { Grid, Typography } from "@mui/material"


export const OrderSummary = () => {
  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography color='gray'>No. Productos</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>3  items</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography color='gray'>Subtotal</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>$155.36</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography color='gray'>Impuestos</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>$20.16</Typography>
        </Grid>
        <Grid item xs={6} sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Total</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end' sx={{ mt: 2 }}>
            <Typography variant="subtitle1"><strong>$175.52</strong></Typography>
        </Grid>
    </Grid>
  )
}
