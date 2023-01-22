import { Typography } from "@mui/material";
import { ShopLayout } from "components/layout";
import { ProductList } from "components/products";
import { Loader } from "components/ui";
import { useProducts } from "hooks";

const SearchPage = () => {
    const { products, isLoading } = useProducts('/products');
    return (
      <ShopLayout title='Manu - Shop Búsqueda' pageDescription="Encuentra los mejores productos de Tesla aquí">
        <>
          <Typography variant='h1' component='h1'>Buscar productos</Typography>
          <Typography fontSize={ 14 } sx={{ mb: 1 }} component='h2'>Todos los productos</Typography>
          
          {
            isLoading ? <Loader /> : <ProductList  products={ products } />
          }
  
        </>
      </ShopLayout>
    )
}

export default SearchPage