import React, { useState } from 'react';
import {
  Box,
  Paper,
  Button,
  Typography,
  Grid,
  Divider,
} from '@mui/material';
import BreadcrumbsCommon from 'ui-component/extended/Breadcrumbs';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import PoolDetailsTable from './PoolDetailsTable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteIPPool, getIPPoolDetail } from 'services/IPPoolAddress';
import AddIPPool from 'views/nasdetails/AddIPPool';
import { Context } from 'usecontext/ContextProvider';
import { useContext } from 'react';
import DeleteModal from 'views/modal/DeleteModal';

const IPList = () => {
  const [openEdit, setOpenEdit] = useState(false)
  const [open, setOpen] = useState(false)
  const [ipPoolDetail, setIPPoolDatail] = useState([])
  const { userId } = useParams()
  const navigate = useNavigate()
  const { nasId } = useContext(Context);

  const fields = [
    { label: 'Netmask', value: ipPoolDetail?.netMask || '-' },
    { label: 'Network IP', value: ipPoolDetail?.networkIp || '-' },
    { label: 'Broadcast IP', value: ipPoolDetail?.broadcastIp || '-' },
    { label: 'First Host', value: ipPoolDetail?.firstHost || '-' },
    { label: 'Last Host', value: ipPoolDetail?.lastHost || '-' },
    { label: 'Total Host', value: ipPoolDetail?.totalHost || '-' },
  ];

  const getIPPoolDetails = async () => {
    try {
      const params = {
        id: userId
      }
      const response = await getIPPoolDetail(params);
      setIPPoolDatail(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userId !== ' ') {
      getIPPoolDetails();
    }
  }, [userId]);


  const handleOnDelete = async () => {
    try {
      const params = {
        id: userId
      }
      await deleteIPPool(params);
      navigate(`/nas-management/naslist/${nasId}`)
    } catch (error) {
      console.error(error);
    }
  }

  const breadcrumbs = [
    { label: 'NAS Management' },
    { label: 'NAS List', link: '/nas-management/naslist' },
    { label: 'NAS Information', link: `/nas-management/naslist/${nasId}` },
  ];

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <BreadcrumbsCommon
        heading={'Pool Details'}
        breadcrumbs={breadcrumbs}
        typography={'Pool Details'}
      />
      <Paper sx={{ margin: '20px', padding: '10px' }}>
        <Box  >
          <Box padding={1} display={'flex'} justifyContent={'space-between'}>
            <Typography fontSize={'1.5rem'} > IP Pool</Typography>
            <Box>
              <Button variant="text" sx={{ fontSize: '1rem', minWidth: 'auto !important', padding: '0' }} onClick={() => { setOpenEdit(true); }}><EditIcon /></Button>
              <Button variant="text" sx={{ fontSize: '1rem', minWidth: 'auto !important', paddingTop: '0', paddingBottom: '0' }} onClick={() => setOpen(true)}> <DeleteIcon /></Button>
            </Box>
          </Box>
          <Divider />
          <Grid container
            columnSpacing={{
              md: 1,
              lg: 6,
            }}
            rowSpacing={{
              lg: 0.5,
            }}
            p={1}
          >
            <Grid item md={12} lg={6} xs={12}>
              <Box sx={{ padding: 1, display: 'flex', justifyContent: 'space-between', borderRadius: '0' }}>
                <Typography variant="body1">Pool Name :</Typography>
                <Box border={'0.5px solid #364152'} width={'60%'} padding={1} borderRadius={'05px'}>
                  <Typography variant="body1" color={'#364152 !important'}>{ipPoolDetail?.poolName}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item md={12} lg={6} xs={12}>
            </Grid>
            {fields.map((field, index) => (
              <Grid item md={12} lg={6} xs={12} key={index}>
                <Box sx={{ padding: 1, display: 'flex', justifyContent: 'space-between', borderRadius: '0' }}>
                  <Typography variant="body1">{field.label} :</Typography>
                  <Typography variant="body1" color={'#364152 !important'} border={'0.5px solid #364152'} width={'60%'} padding={1} borderRadius={'05px'}>
                    {field.value}
                  </Typography>
                </Box>
              </Grid>
            ))}
            <Grid item md={12} lg={12} xs={12} >
              <Box sx={{ padding: 1, display: 'flex', justifyContent: 'space-between', borderRadius: '0' }}>
                <Typography variant="body1">Remark :</Typography>
                <Typography variant="body1" color={'#364152 !important'} border={'0.5px solid #364152'} width={{
                  lg: '80.8%',
                  md: '60%'
                }} minHeight={'80px'} padding={1} borderRadius={'5px'}>
                  {ipPoolDetail?.remark}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <PoolDetailsTable ipPoolDetail={ipPoolDetail} />
      </Paper>

      <AddIPPool open={openEdit} setOpen={setOpenEdit} ipPoolDetails={ipPoolDetail ? ipPoolDetail : ''} getIPPoolDetails={getIPPoolDetails} />

      <DeleteModal
        open={open}
        handleClose={handleClose}
        message="IP Pool"
        handleOnDelete={handleOnDelete}
      />
    </>
  );
};

export default IPList;