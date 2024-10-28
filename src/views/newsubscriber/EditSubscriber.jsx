import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Paper,
} from '@mui/material';
import GeneralInfo from './GeneralInfo';
import BreadcrumbsCommon from 'ui-component/extended/Breadcrumbs';
import { useParams } from 'react-router-dom';
import { getSubscriberDetail } from 'services/SubscribersService';
import { useEffect } from 'react';
import Network from './Network';
import CircleLoader from 'ui-component/cards/CircleLoader';

const EditSubscriber = () => {
  const [selectedTab, setSelectedTab] = useState('generalInfo');
  const [loading, setLoading] = useState('generalInfo');
  const { userId } = useParams()
  const [subscriberDetail, setSubscriberDetail] = useState([]);

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const breadcrumbs = [
    { label: 'User Management' },
    { label: 'Subscribers', link: '/user-management/subscribers/' },
    { label: 'Subscriber Details', link: `/user-management/subscribers/${userId}` },
  ];

  const getSubscriberDetails = async () => {
    try {
      const params = {
        id: userId
      }
      setLoading(true)
      const response = await getSubscriberDetail(params);
      setSubscriberDetail(response?.data);
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSubscriberDetails();
  }, []);

  return (
    <>
      {loading && <CircleLoader />}
      <BreadcrumbsCommon
        heading={'Edit Subscriber'}
        breadcrumbs={breadcrumbs}
        typography={'Edit Subscriber'}
      />
      <Paper sx={{ margin: '20px', padding: '10px' }}>
        <Tabs value={selectedTab} onChange={handleChangeTab}>
          <Tab label="General Information" value="generalInfo" />
          <Tab label="Network Information" value="networkInfo" />
        </Tabs>
        <Box sx={{ p: 2 }}>
          {selectedTab === 'generalInfo' && <GeneralInfo setLoading={setLoading} subscriberDetail={subscriberDetail} />}
          {selectedTab === 'networkInfo' && <Network setLoading={setLoading} subscriber={subscriberDetail} />}
        </Box>
      </Paper>
    </>
  );
};

export default EditSubscriber;