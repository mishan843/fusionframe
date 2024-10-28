import React from 'react';
import {
  Box,
  Grid,
  Typography,
} from '@mui/material';
import moment from 'moment';

const GeneralInfo = ({ lcoDetails}) => {
  const fields = [
    { label: 'LCO Name', value: lcoDetails?.lcoName || '-' },
    { label: 'House No', value: lcoDetails?.houseNo || '-' },
    { label: 'Address', value: lcoDetails?.address || '-' },
    { label: 'Email', value: lcoDetails?.email || '-' },
    { label: 'Taluka', value: lcoDetails?.taluka || '-' },
    { label: 'District', value: lcoDetails?.district || '-' },
    { label: 'Pincode', value: lcoDetails?.pincode || '-' },
    { label: 'Area', value: lcoDetails?.area || '-' },
    { label: 'Sub Area', value: lcoDetails?.subArea || '-' },
    { label: 'State', value: lcoDetails?.state || '-' },
    { label: 'Country', value: lcoDetails?.country || '-' },
    { label: 'Telephone No', value: lcoDetails?.telephone || '-' },
    { label: 'Mobile', value: lcoDetails?.mobile || '-' },
    { label: 'Fax', value: lcoDetails?.fax || '-' },
    { label: 'Messager Id', value: lcoDetails?.messangerId || '-' },
    { label: 'Website', value: lcoDetails?.webSite || '-' },
    { label: 'Date Of Birth', value: lcoDetails?.dob ? moment(lcoDetails?.dob).format('DD/MM/YYYY') : '-' },
    { label: 'Annyversary Date', value: lcoDetails?.anniversaryDate ? moment(lcoDetails?.anniversaryDate).format('DD/MM/YYYY') : '-' },
    { label: 'Longitude', value: lcoDetails?.longitude || '-' },
    { label: 'Latitude', value: lcoDetails?.latitude || '-' },
    { label: 'LCO Balance', value: lcoDetails?.lcoBalance || '-' },
    { label: 'GST Number', value: lcoDetails?.gstNo || '-' },
    { label: 'Contact Person Name', value: lcoDetails?.contactPersonName || '-' },
    { label: 'Contact Person Mobile', value: lcoDetails?.contactPersonMobile || '-' },
    { label: 'Support Email', value: lcoDetails?.supportEmail || '-' },
    { label: 'WhatsApp Support No', value: lcoDetails?.whatsappSupportNo || '-' },
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