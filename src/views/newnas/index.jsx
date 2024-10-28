import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import GeneralInfo from './GeneralInfo';
import BreadcrumbsCommon from 'ui-component/extended/Breadcrumbs';
import CircleLoader from 'ui-component/cards/CircleLoader';

const NewNAS = () => {
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('generalInfo');

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const breadcrumbs = [
    { label: 'NAS Management' },
    { label: 'NAS List', link: '/nas-management/naslist' },
  ];

  return (
    <>
      {loading && <CircleLoader />}
      <BreadcrumbsCommon
        heading={'New NAS'}
        breadcrumbs={breadcrumbs}
        typography={'New NAS'}
      />
      <Box sx={{ width: '100%' }} p={2}>
        <Tabs value={selectedTab} onChange={handleChangeTab}>
          <Tab label="General Information" value="generalInfo" />
        </Tabs>
        <Box sx={{ p: 2 }}>
          {selectedTab === 'generalInfo' && <GeneralInfo setLoading={setLoading} />}
        </Box>
      </Box>
    </>
  );
};

export default NewNAS;