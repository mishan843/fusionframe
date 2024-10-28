import React from 'react';
import {
  Box,
  Grid,
  Typography,
} from '@mui/material';
import moment from 'moment';

const GeneralInfo = ({ nasDetails }) => {
  const fields = [
    { label: 'Name', value: nasDetails?.name || '-' },
    { label: 'IP Address', value: nasDetails?.ipAddress || '-' },
    { label: 'API Port', value: nasDetails?.apiPort || '-' },
    { label: 'API Username', value: nasDetails?.apiUserName || '-' },
    { label: 'Shared Secret', value: nasDetails?.sharedSecret || '-' },
    { label: 'Vendor', value: nasDetails?.vendor || '-' },
    { label: 'Created By', value: nasDetails?.createdByName || '-' },
    { label: 'Created Date', value: moment(nasDetails?.createdAt).format('DD/MM/YYYY') || '-' },
    { label: 'Last Modified By', value: nasDetails?.updatedByName || '-' },
    { label: 'Last Modified Date', value: moment(nasDetails?.updatedAt).format('DD/MM/YYYY') || '-' },
  ];

  return (
    <>
      <Box p={2} >
        <Grid container columnSpacing={6} rowSpacing={1}>
          {fields.map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box sx={{ padding: 1, display: 'flex', justifyContent: 'space-between', borderRadius: '0' }}>
                <Typography variant="body1">{field.label} :</Typography>
                <Typography variant="body1" color={'#364152 !important'} border={'0.5px solid #364152'} width={'60%'} padding={1} borderRadius={'05px'}>
                  {field.value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default GeneralInfo;