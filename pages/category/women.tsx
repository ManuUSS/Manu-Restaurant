import { Typography } from "@mui/material";
import { ShopLayout } from "components/layout";
import { ProductList } from "components/products";
import { Loader } from "components/ui";
import { useProducts } from "hooks";

const WomenPage = () => {
    const { products, isLoading } = useProducts('/products?gender=women');
    return (
        <ShopLayout title='Manu - Shop Women' pageDescription="Página con artículos de ropa para mujeres">
        <>
            <Typography variant='h1' component='h1'>Tienda</Typography>
            <Typography fontSize={ 14 } sx={{ mb: 1 }} component='h2'>Todos los productos para ellas</Typography>
            
            {
            isLoading ? <Loader /> : <ProductList  products={ products } />
            }

        </>
        </ShopLayout>
    )
}

export default WomenPage