import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Paper,
} from '@mui/material';
import GeneralInfo from './GeneralInfo';
import BreadcrumbsCommon from 'ui-component/extended/Breadcrumbs';

const AddInvoiceManagement = () => {
  const [loading, setLoading] = useState()
 
  const breadcrumbs = [
    { label: 'Billing' },
    { label: 'Invoice Management', link: '/billing/invoice-management' },
  ];



  return (
    <>
      <BreadcrumbsCommon
        heading={'Add Invoice'}
        breadcrumbs={breadcrumbs}
        typography={'Add Invoice'}
      />
      <Paper sx={{ margin: '20px', padding: '10px' }}>
        <Box sx={{ p: 2 }}>
            <GeneralInfo
              setLoading={setLoading}
            />
        </Box>
      </Paper>
    </>
  );
};

export default AddInvoiceManagement;