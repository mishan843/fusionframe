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
import { getResellerDetail } from 'services/ResellerService';
import EmployeeAssociation from './EmployeeAssociation';
import CircleLoader from 'ui-component/cards/CircleLoader';

const ResellerDetails = () => {
  const [selectedTab, setSelectedTab] = useState('generalInfo');
  const [loading, setLoading] = useState(false);
  const { userId } = useParams()
  const navigate = useNavigate()
  const [resellerDetails, setResellerDetails] = useState([])

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const getResellerDetails = async () => {
    try {
      const params = {
        id: userId
      }
      setLoading(true)
      const response = await getResellerDetail(params);
      setResellerDetails(response?.data);
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getResellerDetails();
  }, []);

  const breadcrumbs = [
    { label: 'Network Partners' },
    { label: 'Reseller Management', link: '/network-partners/reseller' },
  ];

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
          <Tabs value={selectedTab} onChange={handleChangeTab}>
            <Tab label="General Information" value="generalInfo" />
            <Tab label="Employee Association" value="employeeassociation" />
          </Tabs>
          <Box display={'flex'} flexDirection={'row'} gap={1} height={'fit-content'}>
            <Button variant="contained" onClick={() => navigate(`/network-partners/reseller/${userId}`)} >Edit</Button>
          </Box>
        </Box>
        <Box sx={{ p: 2 }}>
          {selectedTab === 'generalInfo' && <GeneralInfo resellerDetails={resellerDetails} />}
          {selectedTab === 'employeeassociation' && <EmployeeAssociation resellerID={userId} setLoading={setLoading} />}
        </Box>
      </Paper>
    </>
  );
};

export default ResellerDetails;