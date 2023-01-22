import NextLink from 'next/link'
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "components/layout"


const RegisterPage = () => {
  return (
    <AuthLayout title="Ingresar">
        <Box sx={{ width: 350, padding: '10px 20px' }}>
            <Grid container spacing={ 2 }>
                <Grid item xs={12}>
                    <Typography variant="h1" component="h1" textAlign='center'>Crear cuenta</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Nombre completo' variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Correo' variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Contraseña' type='password' variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <Button color="secondary" className="circular-btn" fullWidth>
                        Ingresar
                    </Button>
                </Grid>
                <Grid item xs={12} display='flex' justifyContent='center'>
                    <NextLink href='/auth/login' passHref legacyBehavior>
                        <Link underline='always'>
                            ¿Ya tienes una cuenta?
                        </Link>
                    </NextLink>
                </Grid>
            </Grid>
        </Box>
    </AuthLayout>
  )
}

export default RegisterPage