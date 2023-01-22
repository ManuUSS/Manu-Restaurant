import { Box, CircularProgress, Typography } from "@mui/material"

export const Loader = () => {
  return (
    <Box 
        display='flex' 
        flexDirection='column'
        justifyContent='center' 
        alignItems='center' 
    >
        <Typography fontSize={ 40 } fontWeight={ 200 } sx={{ mb: 3 }}>Cargando...</Typography>
        <CircularProgress thickness={ 2 } />
    </Box>
  )
}
