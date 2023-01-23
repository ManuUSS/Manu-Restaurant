import { useContext, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { UIContext } from 'context';

export const Navbar = () => {

    const { toggleSideMenu } = useContext( UIContext );

    const [ searchTerm, setSearchTerm ] = useState( '' );
    const [ isSearchVisible, setIsSearchVisible ] = useState( false );

    const { pathname, push } = useRouter(); 

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        push( `/search/${ searchTerm }` );
    }

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

            <Box className='fadeIn' sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}>
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

            
            {
                isSearchVisible
                ? (

                    <Input
                        className='fadeIn'
                        autoFocus
                        value={ searchTerm }
                        onChange={( (e) => setSearchTerm( e.target.value ))}
                        onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                        type='text'
                        placeholder="Buscar..."
                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                onClick={ () => setIsSearchVisible( false ) }
                                aria-label="clear button"
                                >
                                    <ClearOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                )
                : (
                    <IconButton
                        sx={{ display: { xs: 'none', sm:'flex' } }}
                        className='fadeIn'
                        onClick={ () => setIsSearchVisible( true ) }
                    >
                        <SearchOutlined />
                    </IconButton>
                )
            }
            <IconButton
                sx={{ display: { xs: 'flex', sm:'none' } }}
                onClick={ toggleSideMenu }
            >
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

            <Button onClick={ toggleSideMenu }>
                Menú
            </Button>
        
        </Toolbar>
    </AppBar>
  )
}
