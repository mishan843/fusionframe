import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Paper,
  Button,
} from '@mui/material';
import GeneralInfo from './GeneralInfo';
import BreadcrumbsCommon from 'ui-component/extended/Breadcrumbs';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import EmployeeAssociation from './EmployeeAssociation';
import { getLCODetail } from 'services/LCOService';
import CircleLoader from 'ui-component/cards/CircleLoader';

const LCODetails = () => {
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('generalInfo');
  const { userId } = useParams()
  const navigate = useNavigate()
  const [lcoDetails, setLCODetails] = useState([])

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const getLCODetails = async () => {
    try {
      const params = {
        id: userId
      }
      setLoading(true)
      const response = await getLCODetail(params);
      setLCODetails(response?.data);
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLCODetails();
  }, []);

  const breadcrumbs = [
    { label: 'Network Partners' },
    { label: 'LCO Management', link: '/network-partners/lco' },
  ];

  return (
    <>
      {loading && <CircleLoader />}
      <BreadcrumbsCommon
        heading={'LCO Information'}
        breadcrumbs={breadcrumbs}
        typography={'LCO Information'}
      />
      
      <Paper sx={{ margin: '20px', padding: '10px' }}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Tabs value={selectedTab} onChange={handleChangeTab}>
            <Tab label="General Information" value="generalInfo" />
            <Tab label="Employee Association" value="employeeassociation" />
          </Tabs>
          <Box display={'flex'} flexDirection={'row'} gap={1} height={'fit-content'}>
            <Button
              variant="contained"
              onClick={() => navigate(`/network-partners/lco/${userId}`)}
            >
              Edit
            </Button>
          </Box>
        </Box>
        <Box sx={{ p: 2 }}>
          {selectedTab === 'generalInfo' &&
            <GeneralInfo
              lcoDetails={lcoDetails}
            />}
          {selectedTab === 'employeeassociation' &&
            <EmployeeAssociation
              lcoID={userId}
              setLoading={setLoading}
            />}
        </Box>
      </Paper>
    </>
  );
};

export default LCODetails;