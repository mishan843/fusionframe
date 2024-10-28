import React from 'react';
import {
  Box,
  Grid,
  Typography,
} from '@mui/material';
import moment from 'moment';

const GeneralInfo = ({ resellerDetails }) => {
  const fields = [
    { label: 'Reseller Name', value: resellerDetails?.resellerName || '-' },
    { label: 'House No', value: resellerDetails?.houseNo || '-' },
    { label: 'Address', value: resellerDetails?.address || '-' },
    { label: 'Email', value: resellerDetails?.email || '-' },
    { label: 'Taluka', value: resellerDetails?.taluka || '-' },
    { label: 'District', value: resellerDetails?.district || '-' },
    { label: 'Pincode', value: resellerDetails?.pincode || '-' },
    { label: 'Area', value: resellerDetails?.area || '-' },
    { label: 'Sub Area', value: resellerDetails?.subArea || '-' },
    { label: 'State', value: resellerDetails?.state || '-' },
    { label: 'Country', value: resellerDetails?.country || '-' },
    { label: 'Telephone No', value: resellerDetails?.telephone || '-' },
    { label: 'Mobile', value: resellerDetails?.mobile || '-' },
    { label: 'Fax', value: resellerDetails?.fax || '-' },
    { label: 'Messager Id', value: resellerDetails?.messangerId || '-' },
    { label: 'Website', value: resellerDetails?.webSite || '-' },
    { label: 'Date Of Birth', value: resellerDetails?.dob ? moment(resellerDetails?.dob).format('DD/MM/YYYY') : '-' },
    { label: 'Annyversary Date', value: resellerDetails?.anniversaryDate ? moment(resellerDetails?.anniversaryDate).format('DD/MM/YYYY') : '-'  },
    { label: 'Longitude', value: resellerDetails?.longitude || '-' },
    { label: 'Latitude', value: resellerDetails?.latitude || '-' },
    { label: 'LCO Balance', value: resellerDetails?.lcoBalance || '-' },
    { label: 'GST Number', value: resellerDetails?.gstNo || '-' },
    { label: 'Contact Person Name', value: resellerDetails?.contactPersonName || '-' },
    { label: 'Contact Person Mobile', value: resellerDetails?.contactPersonMobile || '-' },
    { label: 'Support Email', value: resellerDetails?.supportEmail || '-' },
    { label: 'WhatsApp Support No', value: resellerDetails?.whatsappSupportNo || '-' },
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