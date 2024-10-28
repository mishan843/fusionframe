import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Details = ({ userDetails }) => {
  return (
    <>
      <Box>
        <Box sx={{ padding: 1.5, display: 'flex', justifyContent: 'space-between', borderRadius: '0' }}>
          <Typography variant="body1">email :</Typography>
          <Typography variant="h6" align="right">
            {userDetails?.email}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ padding: 1.5, display: 'flex', justifyContent: 'space-between', borderRadius: '0' }}>
          <Typography variant="body1">User Type :</Typography>
          <Typography variant="h6" align="right">
            {userDetails?.user_type}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ padding: 1.5, display: 'flex', justifyContent: 'space-between', borderRadius: '0' }}>
          <Typography variant="body1">Designation:</Typography>
          <Typography variant="h6" align="right">
            {userDetails?.designation}
          </Typography>
        </Box>
        <Divider />
      </Box>
    </>
  )
}

export default Details