import { Box, Button, Card, Divider, Grid, Typography } from "@mui/material"
import { CartList } from "components/cart"
import { ShopLayout } from "components/layout"

const CartPage = () => {
  return (
    <ShopLayout title="Carrito - " pageDescription="Carrito de compras de la tienda">
        <>
            <Typography variant="h1" component="h1">Carrito de compras</Typography>

            <Grid container>
                <Grid item xs={ 12 } sm={ 7 }>
                    <CartList />
                </Grid>
                <Grid item xs={ 12 } sm={ 5 }>
                    <Card className="summary-card">
                        <Typography variant="h2">Orden</Typography>
                        <Divider sx={{ my: 1 }} />

                        <Box sx={{ mt: 3 }}>
                            <Button color="secondary" className="circular-btn" fullWidth>
                                Realiza la compra
                            </Button>
                        </Box>

                    </Card>
                </Grid>
            </Grid>
        </>
    </ShopLayout>
  )
}

export default CartPage