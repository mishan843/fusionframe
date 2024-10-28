import React from 'react';
import {  Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Limits = () => {
  const fields = [
    { label: 'Data Limited', value: '' },
    { label: 'Time Limited', value: ''},
    { label: 'Has Daily Limit', value: '' },
    { label: 'Has Monthly Limit', value: '' },
    { label: 'Fair Usage Policy', value: ''},
  ];
  return (
    <Box p={2} >
      <Grid container spacing={1}>
        {fields.map((field, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Box sx={{ padding: 1, display: 'flex', justifyContent: 'space-between', borderRadius: '0' }}>
              <Typography variant="body1">{field.label} :</Typography>
              <Typography variant="h6" align="right">
                {field.value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Limits;