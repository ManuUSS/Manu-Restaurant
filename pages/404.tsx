import { Box, Typography } from "@mui/material"
import { ShopLayout } from "components/layout"

const NotFoundPage = () => {
  return (
    <ShopLayout title="Page not found" pageDescription="No hay nada por mostrar">
        <Box display='flex'  flexDirection={{ xs: 'column', md: 'row' }} justifyContent='center' alignItems='center' height='calc(100vh - 200px)'>
            <Typography variant='h1' component='h1' fontSize={60} fontWeight={200}>404 |</Typography>
            <Typography marginLeft={2} variant='h3' component='h3' fontSize={40}>No encontramos ninguna página aquí</Typography>
        </Box>
    </ShopLayout>
  )
}

export default NotFoundPage