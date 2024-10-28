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
import { getLCODetail } from 'services/LCOService';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import CircleLoader from 'ui-component/cards/CircleLoader';

const EditLCO = () => {
  const [selectedTab, setSelectedTab] = useState('generalInfo');
  const [loading, setLoading] = useState(false);
  const { userId } = useParams()
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
        heading={'Edit LCO'}
        breadcrumbs={breadcrumbs}
        typography={'Edit LCO'}
      />
      <Paper sx={{ margin: '20px', padding: '10px' }}>
        <Tabs value={selectedTab} onChange={handleChangeTab}>
          <Tab label="General Information" value="generalInfo" />
          <Tab label="Employee Association" value="employeeAssociation" />
          <Tab label="Documents" value="documents" />
        </Tabs>
        <Box sx={{ p: 2 }}>
          {selectedTab === 'generalInfo' && <GeneralInfo lcoDetails={lcoDetails} setLoading={setLoading} />}
          {selectedTab === 'employeeAssociation' && <EmployeeAssociation setLoading={setLoading} />}
          {selectedTab === 'documents' && <Documents />}
        </Box>
      </Paper>
    </>
  );
};

export default EditLCO;