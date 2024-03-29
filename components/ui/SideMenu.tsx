import { SearchOutlined, AccountCircleOutlined, ConfirmationNumberOutlined, MaleOutlined, FemaleOutlined, EscalatorWarningOutlined, VpnKeyOutlined, LoginOutlined, CategoryOutlined, AdminPanelSettings, DashboardOutlined } from '@mui/icons-material';
import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { useContext, useState } from 'react';
import { UIContext, AuthContext } from '../../context';
import { useRouter } from 'next/router';

export const SideMenu = () => {

    const { isMenuOpen, toggleSideMenu } = useContext( UIContext );
    const { isLogin, user, logoutUser } = useContext( AuthContext );
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const navigateTo = ( url:string ) => {
        toggleSideMenu();
        router.push( url );
    }   

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;

        navigateTo(`/search/${ searchTerm }`)
    }


  return (
    <Drawer
        open={ isMenuOpen }
        anchor="right"
        sx={{ backdropFilter: 'blur(4px)', transition: 'all .5s ease-out' }}
        onClose={ toggleSideMenu }
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

                <ListItem>
                    <Input
                        autoFocus
                        value={ searchTerm }
                        onChange={( (e) => setSearchTerm( e.target.value ))}
                        onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                onClick={ onSearchTerm }
                                aria-label="search button"
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>

                <ListItemButton
                    sx={{ display: isLogin ? 'flex' : 'none' }}
                >
                    <ListItemIcon>
                        <AccountCircleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Perfil'} />
                </ListItemButton>

                <ListItemButton
                    sx={{ display: isLogin ? 'flex' : 'none' }}
                    onClick={ () => navigateTo('/orders/history') }
                >
                    <ListItemIcon>
                        <ConfirmationNumberOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mis Ordenes'} />
                </ListItemButton>


                <ListItemButton onClick={ () => navigateTo('/category/men') } 
                    sx={{ display: { xs: '', sm: 'none' } }}
                >
                    <ListItemIcon>
                        <MaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Hombres'} />
                </ListItemButton>

                <ListItemButton onClick={ () => navigateTo('/category/women') } 
                    sx={{ display: { xs: '', sm: 'none' } }}
                >
                    <ListItemIcon>
                        <FemaleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mujeres'} />
                </ListItemButton>

                <ListItemButton onClick={ () => navigateTo('/category/kid') } 
                    sx={{ display: { xs: '', sm: 'none' } }}
                >
                    <ListItemIcon>
                        <EscalatorWarningOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Niños'} />
                </ListItemButton>

                {
                    isLogin 
                    ? (
                        <ListItemButton
                            onClick={ logoutUser }
                        >
                            <ListItemIcon>
                                <LoginOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Salir'} />
                        </ListItemButton>
                    )
                    : (
                        <ListItemButton
                            onClick={ () => navigateTo(`auth/login?p=${ router.asPath }`) }
                        >
                            <ListItemIcon>
                                <VpnKeyOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Ingresar'} />
                        </ListItemButton>
                       
                    )
                }



                {/* Admin */}
                <Divider />
                
                {
                    user?.role === 'admin' && (
                        <>
                            <ListSubheader>Admin Panel</ListSubheader>

                            <ListItemButton
                                onClick={ () => navigateTo('/admin/') }
                            >
                                <ListItemIcon>
                                    <DashboardOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Dasboard'} />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <CategoryOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Productos'} />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Ordenes'} />
                            </ListItemButton>

                            <ListItemButton>
                                <ListItemIcon>
                                    <AdminPanelSettings/>
                                </ListItemIcon>
                                <ListItemText primary={'Usuarios'} />
                            </ListItemButton>
                        </>
                    )
                }
            </List>
        </Box>
    </Drawer>
  )
}
