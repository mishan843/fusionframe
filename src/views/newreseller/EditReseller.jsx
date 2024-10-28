import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Paper,
  Button,
} from '@mui/material';
import GeneralInfo from './GeneralInfo';
import EmployeeAssociation from './EmployeeAssociation';
import Documents from './Documents';
import BreadcrumbsCommon from 'ui-component/extended/Breadcrumbs';
import { getResellerDetail } from 'services/ResellerService';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import AddBalance from './AddBalance';
import CircleLoader from 'ui-component/cards/CircleLoader';

const EditReseller = () => {
  const [selectedTab, setSelectedTab] = useState('generalInfo');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams()
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
    {loading && <CircleLoader/>}
      <BreadcrumbsCommon
        heading={'Edit Reseller'}
        breadcrumbs={breadcrumbs}
        typography={'Edit Reseller'}
      />
      <Paper sx={{ margin: '20px', padding: '10px' }}>

        <Box display={{ md: 'flex' }} justifyContent={'space-between'}>
          <Tabs
            value={selectedTab}
            onChange={handleChangeTab}
            sx={{
              '& .MuiTabs-flexContainer': {
                overflow: 'auto'
              }
            }}>
            <Tab label="General Information" value="generalInfo" />
            <Tab label="Employee Association" value="employeeAssociation" />
            <Tab label="Documents" value="documents" />
          </Tabs>
          <Box mt={{ md: 0, xs: 2 }}>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} >
              Add Balance
            </Button>
          </Box>
        </Box>
        <Box sx={{ padding: '10px' }}>
          {selectedTab === 'generalInfo' && <GeneralInfo resellerDetails={resellerDetails} setLoading={setLoading}/>}
          {selectedTab === 'employeeAssociation' && <EmployeeAssociation />}
          {selectedTab === 'documents' && <Documents />}
        </Box>
      </Paper>
      <AddBalance open={open} setOpen={setOpen} />
    </>
  );
};

export default EditReseller;