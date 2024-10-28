import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import GeneralInfo from './GeneralInfo';
import BreadcrumbsCommon from 'ui-component/extended/Breadcrumbs';
import { useParams } from 'react-router-dom';
import { getNASDetail } from 'services/NASService';
import { useEffect } from 'react';
import CircleLoader from 'ui-component/cards/CircleLoader';

const EditNAS = () => {
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('generalInfo');
  const { userId } = useParams()
  const [nasrDetails, setNASDetails] = useState([])

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const getNASDetails = async () => {
    try {
      const params = {
        id: userId
      }
      setLoading(true)
      const response = await getNASDetail(params);
      setNASDetails(response?.data);
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNASDetails();
  }, []);

  const breadcrumbs = [
    { label: 'NAS Management' },
    { label: 'NAS List', link: '/nas-management/naslist' },
    { label: 'NAS Information', link: `/nas-management/naslist/${userId}` },
  ];

  return (
    <>
      {loading && <CircleLoader />}
      <BreadcrumbsCommon
        heading={'Edit NAS'}
        breadcrumbs={breadcrumbs}
        typography={'Edit NAS'}
      />
      <Box sx={{ width: '100%' }} p={2}>
        <Tabs value={selectedTab} onChange={handleChangeTab}>
          <Tab label="General Information" value="generalInfo" />
        </Tabs>
        <Box sx={{ p: 2 }}>
          {selectedTab === 'generalInfo' && <GeneralInfo nasrDetails={nasrDetails} setLoading={setLoading} />}
        </Box>
      </Box>
    </>
  );
};

export default EditNAS;