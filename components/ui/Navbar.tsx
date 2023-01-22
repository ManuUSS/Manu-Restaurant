import { useMemo } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

export const Navbar = () => {

    const { pathname } = useRouter(); 

  return (
    <AppBar>

        <Toolbar>
            <NextLink href='/' passHref legacyBehavior>
                <Link display='flex' alignItems='center'>
                    <Typography variant='h6' component='h6'>Manu |</Typography>
                    <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                </Link>
            </NextLink>
            <Box flex={ 1 }/>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <NextLink href='/category/men' passHref legacyBehavior>
                    <Link underline={ pathname === '/category/men' ? 'always' : 'none' } >
                        <Button>Hombres</Button>
                    </Link>
                </NextLink>

                <NextLink href='/category/women' passHref legacyBehavior>
                    <Link underline={ pathname === '/category/women' ? 'always' : 'none' } >
                        <Button>Mujeres</Button>
                    </Link>
                </NextLink>

                <NextLink href='/category/kid' passHref legacyBehavior>
                    <Link underline={ pathname === '/category/kid' ? 'always' : 'none' } >
                        <Button>Niños</Button>
                    </Link>
                </NextLink>
            </Box>

            <Box flex={ 1 }/>

            <IconButton>
                <SearchOutlined />
            </IconButton>

            <NextLink href='/cart' passHref legacyBehavior>
                <Link>
                    <IconButton>
                        <Badge badgeContent={2} color='secondary'>
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                </Link>
            </NextLink>

            <Button>
                Menú
            </Button>
        
        </Toolbar>
    </AppBar>
  )
}
