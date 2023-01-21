import { Typography } from '@mui/material'
import { ShopLayout } from "components/layout";

export default function Home() {
  return (
    <ShopLayout title='Manu - Shop' pageDescription="Encuentra los mejores productos de Tesla aquí">
      <>
        <Typography variant='h1' component='h1'>Tienda</Typography>
        <Typography variant='h2' component='h2' sx={{ mb: 1 }}>Todos los productos</Typography>
      </>
    </ShopLayout>
  )
}
