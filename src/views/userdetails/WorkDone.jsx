import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const WorkDone = () => {
  return (
    <Box>
        <Box sx={{ padding: 1.5, textAlign:'center', borderRadius: '0' }}>
          <Typography variant="body1">User have not Work done</Typography>
        </Box>
      </Box>
  )
}

export default WorkDone