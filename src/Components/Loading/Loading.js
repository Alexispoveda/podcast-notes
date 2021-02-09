import React from 'react'

//Material UI
import { Box, CircularProgress } from '@material-ui/core'

const Loading = () =>
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" width="100vw" height="100vh">
        <h1 style={{color:'white'}}>Cargando</h1>
        <CircularProgress style={{color:'white'}}/>
    </Box>

export default Loading