import React, { useState } from 'react';
import {
  Box,
  Paper,
} from '@mui/material';
import GeneralInfo from './GeneralInfo';
// import EmployeeAssociation from './EmployeeAssociation';
// import Documents from './Documents';
import BreadcrumbsCommon from 'ui-component/extended/Breadcrumbs';
import { useEffect } from 'react';
import { getInvoiceDetail } from 'services/BillingService';
import { useParams } from 'react-router-dom';


const EditInvoiceManagement = () => {
  const [selectedTab, setSelectedTab] = useState('generalInfo');
  const [loading, setLoading] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState()
  const { invoiceId } = useParams()

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const breadcrumbs = [
    { label: 'Billing' },
    { label: 'Invoice Management', link: '/billing/invoice' },
  ];

//   useEffect(() => {
//     if (resellerID !== '') {
//       setSelectedTab('employeeAssociation')
//     }
//   }, [resellerID])

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
  getResellerDetails();
}, []);


  return (
    <>
      <BreadcrumbsCommon
        heading={'Edit Invoice'}
        breadcrumbs={breadcrumbs}
        typography={'Edit Invoice'}
      />
      <Paper sx={{ margin: '20px', padding: '10px' }}>
        {/* <Tabs
          value={selectedTab}
          onChange={handleChangeTab}
          sx={{
            '& .MuiTabs-flexContainer': {
              overflow: 'auto'
            }
          }}>
          <Tab label="General Information" value="generalInfo" />
          <Tab disabled={resellerID ? false : true} label="Employee Association" value="employeeAssociation" />
          <Tab disabled={resellerID ? false : true} label="Documents" value="documents" />
        </Tabs> */}
        <Box sx={{ p: 2 }}>
          {/* {selectedTab === 'generalInfo' &&
            } */}
          {/* {selectedTab === 'employeeAssociation' &&
            <EmployeeAssociation
              resellerID={resellerID}
            />}
          {selectedTab === 'documents' &&
            <Documents />} */}
            <GeneralInfo
              invoiceDetails={invoiceDetails}
              setLoading={setLoading}
            />
        </Box>
      </Paper>
    </>
  );
};

export default EditInvoiceManagement;