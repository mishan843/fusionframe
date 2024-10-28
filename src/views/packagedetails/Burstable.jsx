import React from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

const Burstable = ({ packageDetail }) => {
  const fields = [
    { label: 'Burstable', value: packageDetail?.note || '-' }
  ];
  return (
    <Box p={2} >
      {fields.map((field, index) => (
        <Box key={index} sx={{ padding: 1, display: 'flex', justifyContent: 'space-between', borderRadius: '0' }}>
          <Typography variant="body1">{field.label} :</Typography>
          <Typography variant="h6" align="right">
            {field.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default Burstable;