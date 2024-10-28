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
import { getNASDetail } from 'services/NASService';
import { useEffect } from 'react';
import PoolTable from './PoolTable';
import { Context } from 'usecontext/ContextProvider';
import { useContext } from 'react';
import ConfigureSRCNATTable from './ConfigureSRCNATTable';
import CircleLoader from 'ui-component/cards/CircleLoader';

const NASDetails = () => {
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('generalInfo');
  const [open, setOpen] = useState(false);
  const [openIP, setOpenIP] = useState(false);
  const { userId } = useParams()
  const navigate = useNavigate()
  const [nasDetails, setNASDetails] = useState([])
  const { setNASID } = useContext(Context);

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
    setNASID(userId)
  }, []);

  const breadcrumbs = [
    { label: 'NAS Management' },
    { label: 'NAS List', link: '/nas-management/naslist' },
  ];

  return (
    <>
      {loading && <CircleLoader />}
      <BreadcrumbsCommon
        heading={'NAS Information'}
        breadcrumbs={breadcrumbs}
        typography={'NAS Information'}
      />
      <Paper sx={{ margin: '20px', padding: '10px' }}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Tabs value={selectedTab} onChange={handleChangeTab}>
            <Tab label="General Information" value="generalInfo" />
            <Tab label="Pool Details" value="pooldetails" />
            <Tab label="Configure SRC-NAT" value="configuresrcnat" />
          </Tabs>
          {
            selectedTab === 'generalInfo' &&
            <Box display={'flex'} flexDirection={'row'} gap={1} height={'fit-content'}>
              <Button variant="contained" >History</Button>
              <Button variant="contained" onClick={() => navigate(`/nas-management/naslist/editnas/${userId}`)} >Edit</Button>
            </Box>
          }
          {
            selectedTab === 'configuresrcnat' &&
            <Box display={'flex'} flexDirection={'row'} gap={1} height={'fit-content'}>
              <Button variant="contained" onClick={() => setOpen(true)}>Configure SRC-NAT</Button>
            </Box>
          }
          {
            selectedTab === 'pooldetails' &&
            <Box display={'flex'} flexDirection={'row'} gap={1} height={'fit-content'}>
              <Button variant="contained" onClick={() => { setOpenIP(true); }}>Add IP-Pool</Button>
            </Box>
          }
        </Box>
        <Box sx={{ p: 2 }}>
          {selectedTab === 'generalInfo' &&
            <GeneralInfo
              nasDetails={nasDetails}
            />}
          {selectedTab === 'pooldetails' &&
            <PoolTable
              open={openIP}
              setOpen={setOpenIP}
              nasId={userId}
              setLoading={setLoading}
            />}
          {selectedTab === 'configuresrcnat' &&
            <ConfigureSRCNATTable
              open={open}
              setOpen={setOpen}
              nasDetails={nasDetails}
              setLoading={setLoading}
            />}
        </Box>
      </Paper>
    </>
  );
};

export default NASDetails;