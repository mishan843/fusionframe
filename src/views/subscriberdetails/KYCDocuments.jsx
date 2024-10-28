import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const KYCDocuments = () => {
  return (
    <Box>
        <Box sx={{ padding: 1.5, textAlign:'center', borderRadius: '0' }}>
          <Typography variant="body1">No KYC Documents available</Typography>
        </Box>
      </Box>
  )
}

export default KYCDocuments