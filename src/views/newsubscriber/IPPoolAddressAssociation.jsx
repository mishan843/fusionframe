import React from 'react';
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import IPPoolAddressTable from './IPPoolAddressTable';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import { getNAS } from 'services/NASService';
import { getIPPool } from 'services/IPPoolAddress';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};

const IPPoolAddressAssociation = ({ open, setOpen, }) => {
  const [selectPoolName, setSelectPoolName] = useState(null)
  const [selectNASData, setSelectNASDAta] = useState(null)
  const [nasData, setNASData] = useState([]);
  const [poolNameData, setPoolNameData] = useState([]);
  const [ipAddressData, setIPAddressData] = useState([]);

  const handleClose = () => {
    setOpen(false);
    setSelectNASDAta(null)
    setSelectPoolName(null)
  };

  const getNASData = async () => {
    try {
      const params = {
        skip: 0,
        limit: 0
      };

      const response = await getNAS(params);
      setNASData(response?.nases);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNASData();
  }, []);

  const getPoolNameData = async () => {
    try {
      const params = {
        nasId: selectNASData
      };

      if (selectNASData) {
        const response = await getIPPool(params);
        setPoolNameData(response?.ipPools);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPoolNameData();
  }, [selectNASData]);

  return (
    <>
      {open && <Box sx={style}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography id="modal-modal-title" fontSize={'1.5rem'}>
            IP Address Association
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ padding: '5px', height: 'fit-content' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Grid container columnSpacing={6} rowSpacing={1} mt={1}>
          <Grid item md={12} lg={6} xs={12}>
            <Box sx={{ padding: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
              <Typography variant="body1">NAS :</Typography>
              <Box color={'#364152 !important'} width={'60%'} borderRadius={'05px'}>
                <FormControl fullWidth >
                  <Select
                    labelId="demo-simple-select-label"
                    id="Vendor"
                    size="small"
                    name='vendor'
                    value={selectNASData || ' '}
                    onChange={(option) => { setSelectNASDAta(option.target.value); setIPAddressData([]); setSelectPoolName(null); }}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                          overflowY: 'auto',
                        },
                      },
                    }}
                  >
                    <MenuItem value={' '}>Select</MenuItem>

                    {
                      nasData?.map((item, index) => (
                        <MenuItem key={index} MenuItem value={item?._id}>{item?.name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Grid>
          <Grid item md={12} lg={6} xs={12}>
            <Box sx={{ padding: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
              <Typography variant="body1">Pool Name:</Typography>
              <Box color={'#364152 !important'} width={'60%'} borderRadius={'05px'}>
                <FormControl fullWidth >
                  <Select
                    labelId="demo-simple-select-label"
                    id="Vendor"
                    size="small"
                    name='vendor'
                    value={selectPoolName || ' '}
                    onChange={(option) => setSelectPoolName(option.target.value)}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                          overflowY: 'auto',
                        },
                      },
                    }}
                  >
                    <MenuItem value={' '}>Select</MenuItem>
                    {
                      poolNameData?.map((item, index) => (
                        <MenuItem key={index} value={item?._id}>{item?.poolName}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Grid>
        </Grid>
        {
          selectPoolName && selectNASData &&
          <>
            <IPPoolAddressTable selectPoolName={selectPoolName} ipAddressData={ipAddressData} setIPAddressData={setIPAddressData} />
          </>
        }
      </Box>}
    </>
  );
};

export default IPPoolAddressAssociation;