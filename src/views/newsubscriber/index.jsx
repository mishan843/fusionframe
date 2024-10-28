import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Paper,
} from '@mui/material';
import GeneralInfo from './GeneralInfo';
import BreadcrumbsCommon from 'ui-component/extended/Breadcrumbs';
import Network from './Network';
import { useEffect } from 'react';
import CircleLoader from 'ui-component/cards/CircleLoader';

const NewSubscriber = () => {
  const [selectedTab, setSelectedTab] = useState('generalInfo');
  const [loading, setLoading] = useState(false);
  const [subscriber, setSubscriber] = useState('');

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const breadcrumbs = [
    { label: 'User Management' },
    { label: 'Subscribers', link: '/user-management/subscribers/' },
  ];

  useEffect(() => {
    if (subscriber?._id) {
      setSelectedTab('networkInfo')
    }
  }, [subscriber])

  return (
    <>
      {loading && <CircleLoader />}
      <BreadcrumbsCommon
        heading={'New Subscriber'}
        breadcrumbs={breadcrumbs}
        typography={'New Subscriber'}
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
          <Tab disabled={subscriber ? false : true} label="Network Information" value="networkInfo" />
        </Tabs>
        <Box sx={{ p: { md: 2 }, pt: { xs: 1 } }}>
          {selectedTab === 'generalInfo' &&
            <GeneralInfo
              setSubscriber={setSubscriber}
              setLoading={setLoading}
            />}
          {selectedTab === 'networkInfo' &&
            <Network
              subscriber={subscriber}
              setLoading={setLoading}
            />}
        </Box>
      </Paper>
    </>
  );
};

export default NewSubscriber;