import React, { useEffect, useState } from 'react';
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
import CircleLoader from 'ui-component/cards/CircleLoader';

const NewLco = () => {
  const [selectedTab, setSelectedTab] = useState('generalInfo');
  const [lcoID, setLCOId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    if (lcoID !== '') {
      setSelectedTab('employeeAssociation')
    }
  }, [lcoID])

  const breadcrumbs = [
    { label: 'Network Partners' },
    { label: 'LCO Management', link: '/network-partners/lco' },
  ];

  return (
    <>
      {loading && <CircleLoader />}
      <BreadcrumbsCommon
        heading={'New LCO'}
        breadcrumbs={breadcrumbs}
        typography={'New LCO'}
      />
      <Paper sx={{ margin: '20px', padding: '10px' }}>
        <Tabs value={selectedTab} onChange={handleChangeTab}>
          <Tab label="General Information" value="generalInfo" />
          <Tab disabled={lcoID ? false : true} label="Employee Association" value="employeeAssociation" />
          <Tab disabled={lcoID ? false : true} label="Documents" value="documents" />
        </Tabs>
        <Box>
          {selectedTab === 'generalInfo' &&
            <GeneralInfo
              setLCOId={setLCOId}
              setLoading={setLoading}
            />}
          {selectedTab === 'employeeAssociation' &&
            <EmployeeAssociation
              lcoID={lcoID}
              setLoading={setLoading}
            />}
          {selectedTab === 'documents' && <Documents />}
        </Box>
      </Paper>
    </>
  );
};

export default NewLco;