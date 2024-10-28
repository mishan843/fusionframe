import React from 'react';
import {
  Box,
  Grid,
  Typography,
} from '@mui/material';
import moment from 'moment';

const GeneralInfo = ({ invoiceDetails }) => {
  console.log(invoiceDetails, 'details');
  
  const fields = [
    { label: 'Nature of Transactions', value: invoiceDetails?.natureOfTrans || '-' },
    { label: 'Customer Type', value: invoiceDetails?.custType || '-' },
    { label: 'Nature of Supply', value: invoiceDetails?.natureOfSupply || '-' },
    { label: 'Purchase Order No', value: invoiceDetails?.purOrderNo || '-' },
    { label: 'Purchase Order Date', value: invoiceDetails?.purOrderDate || '-' },
    { label: 'Party Name', value: invoiceDetails?.partyName || '-' },
    { label: 'Party Address', value: invoiceDetails?.partyAddress || '-' },
    { label: 'Pincode', value: invoiceDetails?.pincode || '-' },
    { label: 'Company PAN', value: invoiceDetails?.companyPan || '-' },
    { label: 'GST No', value: invoiceDetails?.gstNo || '-' },
    { label: 'Nature of Invoice', value: invoiceDetails?.natureOfInvoice || '-' },
    { label: 'Invoice No', value: invoiceDetails?.invoiceNo || '-' },
    { label: 'Billing Period', value: invoiceDetails?.billingPeriod || '-' },
    { label: 'Invoice Date', value: invoiceDetails?.invoiceDate || '-' },
    { label: 'Credit Terms', value: invoiceDetails?.creditTerms || '-' },
    { label: 'HSN / SAC Code', value: invoiceDetails?.hsnsacCode || '-' },
    // { label: 'Date Of Birth', value: invoiceDetails?.dob ? moment(invoiceDetails?.dob).format('DD/MM/YYYY') : '-' },
    // { label: 'Annyversary Date', value: invoiceDetails?.anniversaryDate ? moment(invoiceDetails?.anniversaryDate).format('DD/MM/YYYY') : '-'  },
    { label: 'Description of Good', value: invoiceDetails?.descOfGood?.planName || '-' },
    { label: 'Quantity', value: invoiceDetails?.qty || '-' },
    { label: 'Rate', value: invoiceDetails?.rate || '-' },
    { label: 'Uasage Price', value: invoiceDetails?.usagePrice || '-' },
    { label: 'UOM', value: invoiceDetails?.uom || '-' },
    { label: 'Delivery Charges', value: invoiceDetails?.deliveryCharges || '-' },
    { label: 'Net Taxable Value', value: invoiceDetails?.netTaxableValue || '-' },
    { label: 'Cgst', value: invoiceDetails?.cgst || '-' },
    { label: 'Sgst', value: invoiceDetails?.sgst || '-' },
    { label: 'Igst', value: invoiceDetails?.igst || '-' },
    { label: 'comment', value: invoiceDetails?.comment || '-' },
    { label: 'Total', value: invoiceDetails?.total || '-' },

    // { label: 'WhatsApp Support No', value: invoiceDetails?.whatsappSupportNo || '-' },
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