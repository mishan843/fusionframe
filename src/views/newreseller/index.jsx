import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Paper,
} from '@mui/material';
import GeneralInfo from './GeneralInfo';
import EmployeeAssociation from './EmployeeAssociation';
import Documents from './Documents';
import BreadcrumbsCommon from 'ui-component/extended/Breadcrumbs';
import { useEffect } from 'react';

const NewReseller = () => {
  const [selectedTab, setSelectedTab] = useState('generalInfo');
  const [loading, setLoading] = useState(false);
  const [resellerID, setResellerId] = useState('');

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const breadcrumbs = [
    { label: 'Network Partners' },
    { label: 'Reseller Management', link: '/network-partners/reseller' },
  ];

  useEffect(() => {
    if (resellerID !== '') {
      setSelectedTab('employeeAssociation')
    }
  }, [resellerID])


  return (
    <>
      <BreadcrumbsCommon
        heading={'New Reseller'}
        breadcrumbs={breadcrumbs}
        typography={'New Reseller'}
      />
      <Paper sx={{ margin: '20px', padding: '10px' }}>
        <Tabs
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
        </Tabs>
        <Box sx={{ p: 2 }}>
          {selectedTab === 'generalInfo' &&
            <GeneralInfo
              setResellerId={setResellerId}
              setLoading={setLoading}
            />}
          {selectedTab === 'employeeAssociation' &&
            <EmployeeAssociation
              resellerID={resellerID}
            />}
          {selectedTab === 'documents' &&
            <Documents />}
        </Box>
      </Paper>
    </>
  );
};

export default NewReseller;