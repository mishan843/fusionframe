import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const AudiTrail = () => {
  return (
    <Box>
        <Box sx={{ padding: 1.5, textAlign:'center', borderRadius: '0' }}>
          <Typography variant="body1">Package have not audit trail</Typography>
        </Box>
      </Box>
  )
}

export default AudiTrail