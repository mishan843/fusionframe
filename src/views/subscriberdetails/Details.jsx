import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Details = ({ subscriberDetail }) => {
  const fields = [
    { label: 'Account #', value: subscriberDetail?.accountNo || '-' },
    { label: 'Name', value: subscriberDetail?.name || '-' },
    { label: 'Username', value: subscriberDetail?.userName || '-' },
    { label: 'Hotspot Subscriber', value: '-' },
    { label: 'Blocked', value: '-' },
    { label: 'Auto Renew', value: '-' },
    { label: 'Sticky Password', value: '-' },
    { label: 'Subscriber Since', value: '-' },
    { label: 'Type', value: subscriberDetail?.networkType || '-' },
    { label: 'Discount', value: subscriberDetail?.discount || '-' },
    { label: 'Note', value: subscriberDetail?.note || '-' },
    { label: 'Billing Address', value: subscriberDetail?.billingAddress || '-' },
    { label: 'Installation Address', value: subscriberDetail?.installationAddress || '-' },
    { label: 'City', value: subscriberDetail?.city || '-' },
    { label: 'State', value: subscriberDetail?.state || '-' },
    { label: 'Country', value: subscriberDetail?.country || '-' },
    { label: 'Zip', value: subscriberDetail?.zipCode || '-' },
    { label: 'Phone1', value: subscriberDetail?.phone || '-' },
    { label: 'Mobile1', value: subscriberDetail?.mobile || '-' },
    { label: 'Email', value: subscriberDetail?.email || '-' },
    { label: 'Aadhar Card', value: subscriberDetail?.aadharNo || '-' },
    { label: 'GST Number', value: subscriberDetail?.gstNo || '-' },
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

export default Details;