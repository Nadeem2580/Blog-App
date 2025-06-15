import { Stack, Typography } from '@mui/material'
import React from 'react'

const NotFound = () => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"} sx={{minHeight:"100vh"}}>
<Typography variant='h1' color='error'>404! Page not found</Typography>
    </Stack>
  )
}

export default NotFound