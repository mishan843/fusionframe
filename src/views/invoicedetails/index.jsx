import React, { useRef, useState } from 'react';
import {
  Box,
  Paper,
  Button,
} from '@mui/material';
import GeneralInfo from './GeneralInfo';
import BreadcrumbsCommon from 'ui-component/extended/Breadcrumbs';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import CircleLoader from 'ui-component/cards/CircleLoader';
import { getInvoiceDetail } from 'services/BillingService';
import InvoicePage from 'views/invoicemanagement/InvoicePrint';
import { useReactToPrint } from 'react-to-print';

const InvoiceDetails = () => {
  const [loading, setLoading] = useState(false);
  // const [hasPrinted, setHasPrinted] = useState(false);
  const { invoiceId } = useParams()
  const navigate = useNavigate()
  const [invoiceDetails, setInvoiceDetails] = useState([])
  const invoiceRef = useRef();


  const getResellerDetails = async () => {
    try {
      const params = {
        id: invoiceId
      }
      setLoading(true)
      const response = await getInvoiceDetail(params);
      setInvoiceDetails(response?.data);
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // const printedStatus = localStorage.getItem(`invoice-${invoiceId}-printed`);
    // if (printedStatus === 'true') {
    //   setHasPrinted(true);
    // }
    getResellerDetails();
  }, []);

  const breadcrumbs = [
    { label: 'Edit Invoice' },
    { label: 'Invoice Management', link: `/billing/invoice-management` },
  ];

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    // onAfterPrint: () => {
    //   setHasPrinted(true); // Set the state to true after printing
    //   // Save print status to local storage
    //   localStorage.setItem(`invoice-${invoiceId}-printed`, 'true');
    // },
  });

  return (
    <>
      {loading && <CircleLoader />}
      <BreadcrumbsCommon
        heading={'Reseller Information'}
        breadcrumbs={breadcrumbs}
        typography={'Reseller Information'}
      />
      <Paper sx={{ margin: '20px', padding: '10px' }}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box display={'flex'} flexDirection={'row'} gap={1} height={'fit-content'}>
            <Button variant="contained" onClick={() => navigate(`/billing/invoice/${invoiceId}`)}>Edit</Button>
            <Button variant="contained" onClick={handlePrint} >Print</Button>
          </Box>
        </Box>
        <Box sx={{ p: 2 }}>
          <GeneralInfo invoiceDetails={invoiceDetails} />
        </Box>
        <div ref={invoiceRef}>
          <InvoicePage invoiceDetails={invoiceDetails} />
        </div>
      </Paper>
    </>
  );
};

export default InvoiceDetails;