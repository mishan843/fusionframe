import React from 'react';
import {  Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Connection = () => {
  const fields = [
    { label: 'Zone', value: '' },
    { label: 'Node', value: ''},
    { label: 'Distance From Node', value: '' },
    { label: 'Fix IP Address', value: '' },
    { label: 'Bind MAC Address', value: ''},
    { label: 'Allow Devices', value: ''},
    { label: 'Reset MAC Address', value: '' },
    { label: 'Leased Line Subscriber', value: '' },
  ];
  return (
    <Box p={2} >
      <Grid container spacing={1}>
        {fields.map((field, index) => (
          <Grid item xs={12} sm={12} key={index}>
            <Box sx={{ padding: 1, display: 'flex', justifyContent: 'space-between', borderRadius: '0' }}>
              <Typography variant="body1">{field.label} :</Typography>
              <Typography variant="h6" align="right">
                {field?.value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Connection;