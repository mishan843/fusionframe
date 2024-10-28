import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Details = ({ packageDetail }) => {
  const fields1 = [
    { label: 'Name', value: packageDetail?.name || '-' },
    { label: 'Valid for', value: `${packageDetail?.validFor || '-'} ${packageDetail?.validForTime}` || '-' },
    { label: 'Bandwidth (Upload)', value: `${packageDetail?.bandWidth || '-'} / ${packageDetail?.bandWidthSpeed}` || '-' },
    { label: 'Bandwidth (Download)', value: `${packageDetail?.bandWidthDownload || '-'} / ${packageDetail?.bandWidthDownloadSpeed}` || '-' },
    { label: 'Description', value: packageDetail?.description || '-' },
  ];

  const fields2 = [
    { label: 'Type', value: packageDetail?.package_type || '-' },
    { label: 'Price to Subscriber', value: packageDetail?.price || '-' },
    { label: 'Tax', value: packageDetail?.isChargeTax ? 'Do not Charge Tax' : 'Charge Tax' || '' },
    { label: 'Taxes', value: 'No taxes' },
    ...(packageDetail?.isRoundAppplicable
      ? [
        { label: 'Round Off', value: 'Applicable' || '-' },
      ]
      : []
    ),
    { label: 'Price after Tax', value: packageDetail?.priceAfterTax || '-' },
    { label: 'Hotspot Subscribers', value: packageDetail?.isHotspot ? 'Yes' : 'No' || '-' },
    ...(packageDetail?.isHotspot
      ? [
        { label: 'Advertisement Url', value: packageDetail?.advertisementUrl || '-' },
        { label: 'Advertisement Interval', value: packageDetail?.advertisementInternal || '-' },
      ]
      : []
    ),
    { label: 'Online Payment', value: packageDetail?.onlinePayment ? 'Yes' : 'No' || '-' },
    { label: 'Bind IP Pool', value: packageDetail?.isBindPool ? 'Yes' : 'No' || '-' },
    ...(packageDetail?.isBindPool
      ? [
        { label: 'IP Pool Name', value: packageDetail?.ipPoolName || '-' },
        { label: 'FUP IP Pool Name', value: packageDetail?.fupIpPoolName || '-' },
      ]
      : []
    ),
  ];

  return (
    <Box p={2} >
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          {fields1.map((field, index) => (
            <Box key={index} sx={{ padding: 1, display: 'flex', justifyContent: 'space-between', borderRadius: '0' }}>
              <Typography variant="body1">{field.label} :</Typography>
              <Typography variant="h6" align="right">
                {field.value}
              </Typography>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} sm={6} >
          {fields2.map((field, index) => (
            <Box key={index} sx={{ padding: 1, display: 'flex', justifyContent: 'space-between', borderRadius: '0' }}>
              <Typography variant="body1">{field.label} :</Typography>
              <Typography
                variant="h6"
                align="right"
                sx={{
                  backgroundColor: field.value === 'Yes' || field.value === 'Do not Charge Tax' || field.value === 'Applicable' ? 'green' : field.value === 'No' || field.value === 'Charge Tax' ? '#db4437' : '',
                  color: field.value === 'Yes' || field.value === 'No' || field.value === 'Do not Charge Tax' || field.value === 'Applicable' || field.value === 'Charge Tax' ? 'white' : 'black',
                  width: field.value === 'Yes' || field.value === 'No' ? '40px' : field.value === 'Do not Charge Tax' || field.value === 'Charge Tax' ? '140px' : 'auto',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '12px',
                  height: '24px',
                  padding:'5px'
                }}
              >
                {field.value}
              </Typography>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Details;