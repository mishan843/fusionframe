import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  FormControl,
  FormControlLabel,
  InputLabel,
  FormHelperText
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import IPPoolAddressTable from './IPPoolAddressTable';
import { getIPPool, UpdateIPAddress } from 'services/IPPoolAddress';
import { getNAS } from 'services/NASService';
import { UpdateSubscriber } from 'services/SubscribersService';
import { useNavigate } from 'react-router-dom';

const validationSchema = (isIpType) =>
  Yup.object().shape({
    ipAddress: Yup.string().test(
      'is-required-if-isIpType-true',
      'Select checkbox for assign IP Address',
      function (value) {
        return !isIpType || !!value;
      }
    ),
    dynamicIp: Yup.string().test(
      'is-required-if-isIpType-false',
      'Select dynamic IP',
      function (value) {
        return isIpType || !!value;
      }
    ),
  });

const Network = ({ subscriber, setLoading }) => {
  const [ipAddress, setIpAddress] = useState(subscriber?.ipAddress || null);
  const [isIpType, setIsIpType] = useState(subscriber?.isIpType || false);
  const [selectNASData, setSelectNASDAta] = useState(subscriber?.nas || null);
  const [selectPoolName, setSelectPoolName] = useState(subscriber?.pool || null);
  const [nasData, setNASData] = useState([]);
  const [poolNameData, setPoolNameData] = useState([]);
  const [ipAddressData, setIPAddressData] = useState([]);
  const navigate = useNavigate()

  const getNASData = async () => {
    try {
      setLoading(true)
      if (subscriber?.resellerId) {
        const params = {
          skip: 0,
          limit: 0,
          resellerId: subscriber?.resellerId
        };
        const response = await getNAS(params);
        setNASData(response?.nases);
      }
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNASData();
  }, [subscriber?.resellerId]);

  const formik = useFormik({
    initialValues: {
      networkType: '',
      isIpType: false,
      nas: '',
      pool: '',
      dynamicIp: '',
      ipAddress: ''
    },
    validationSchema: (() => validationSchema(isIpType)),
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true)
        const data = {
          poolId: selectPoolName,
          ipId: ipAddress,
          updates: {
            subscriberId: subscriber?._id,
            associatedUser: subscriber?.name
          }
        };

        const subscriberData = {
          networkType: values.networkType,
          isIpType: values.isIpType,
          ...(values.isIpType
            ? {
              nas: values.nas,
              pool: values.pool,
              ipAddress: values.ipAddress,
            }
            : {
              dynamicIp: values.dynamicIp,
            }),
        };
        await UpdateIPAddress(data, false);
        await UpdateSubscriber(subscriberData, subscriber?._id);

        resetForm();
        setLoading(false)
        navigate('/user-management/subscribers/')
      } catch (error) {
        console.error(error);
      }
    }
  });

  const getPoolNameData = async () => {
    try {
      setLoading(true)
      const params = {
        nasId: selectNASData,
        tagIpPool: formik.values.networkType === 'pppoe' ? '' : formik.values.networkType === 'hotspot' ? 'private' : formik.values.networkType === 'lease line' ? 'public' : ''
      };
      if (selectNASData) {
        const response = await getIPPool(params);
        setPoolNameData(response?.ipPools);
      }
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setPoolNameData([])
    getPoolNameData();
  }, [selectNASData, formik.values.networkType]);

  useEffect(() => {
    if (ipAddress) {
      formik.setFieldValue('ipAddress', ipAddress);
    }
  }, [ipAddress]);

  useEffect(() => {
    if ((formik.values.networkType === 'hotspot') || (formik.values.networkType === 'lease line')) {
      formik.setFieldValue('isIpType', true);
      setIsIpType(true)
    }
  }, [formik.values.networkType]);

  useEffect(() => {
    if (subscriber) {
      formik.setValues({
        networkType: subscriber?.networkType || '',
        isIpType: subscriber?.isIpType || false,
        nas: subscriber?.nas || '',
        pool: subscriber?.pool || '',
        dynamicIp: subscriber?.dynamicIp || '',
        ipAddress: subscriber?.ipAddress || ''
      });
    }
  }, [subscriber]);

  return (
    <>
      <Paper sx={{ padding: '15px' }}>
        <Grid container columnSpacing={6} rowSpacing={1} my={1}>
          <Grid item lg={6} xl={5} xs={12}>
            <Box sx={{ padding: 1, display: { xs: 'block', lg: 'flex' }, justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
              <Typography variant="body1">Network Type :</Typography>
              <Box color={'#364152 !important'} sx={{ width: { md: '60%', xs: '100%' } }} borderRadius={'05px'}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">
                    Select Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="networkType"
                    size="small"
                    label='Select Type'
                    name="networkType"
                    value={formik.values.networkType || ''}
                    onChange={(event) => {
                      formik.handleChange(event); // Pass the event to handleChange
                      formik.setFieldValue('pool', '');
                      formik.setFieldValue('nas', '');
                      formik.setFieldValue('ipAddress', '');
                    }}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="pppoe">pppoe</MenuItem>
                    <MenuItem value="hotspot">hotspot</MenuItem>
                    <MenuItem value="lease line">lease line</MenuItem>
                  </Select>
                </FormControl>
              </Box>

            </Box>
          </Grid>
          <Grid item lg={6} xl={5} xs={12}>
            {
              formik.values.networkType && <Box sx={{ padding: 1, display: { xs: 'block', lg: 'flex' }, justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
                <Box color={'#364152 !important'} width={'60%'} borderRadius={'05px'} >
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="ip-type-group-label"
                      name="isIpType"
                      value={formik.values.isIpType}
                      onChange={(e) => {
                        formik.setFieldValue('isIpType', e.target.value === 'true');
                        setIsIpType(e.target.value === 'true');
                        formik.setFieldValue('pool', '')
                        formik.setFieldValue('nas', '')
                        formik.setFieldValue('ipAddress', '')
                        formik.setErrors({});
                      }}
                    >
                      <FormControlLabel value={true} control={<Radio />} label="Static IP" />
                      {(formik.values.networkType === 'pppoe') && (
                        <FormControlLabel value={false} control={<Radio />} label="Dynamic IP" />
                      )}
                    </RadioGroup>
                  </FormControl>
                </Box>
                {!formik.values.isIpType ?
                  <FormControl sx={{ width: { md: '60%', xs: '100%' } }}>
                    <InputLabel id="demo-simple-select-label" size="small">
                      Select NAS
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      label='Select NAS'
                      id="dynamicIp"
                      size="small"
                      name='dynamicIp'
                      value={formik.values.dynamicIp}
                      onChange={() => {
                        formik.handleChange();
                        formik.setFieldValue('pool', '')
                        formik.setFieldValue('nas', '')
                        formik.setFieldValue('ipAddress', '')
                      }}
                    >
                      <MenuItem value="">Select NAS Port</MenuItem>
                    </Select>
                  </FormControl> :
                  <TextField
                    id="ipAddress"
                    variant="outlined"
                    name="ipAddress"
                    size="small"
                    sx={{ width: { md: '60%', xs: '100%' } }}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                }
              </Box>
            }
          </Grid>
        </Grid>

        {formik.values.isIpType &&
          <Box>
            <Box>
              <Typography id="modal-modal-title" fontSize={'1.3rem'} px={1}>
                IP Address Association
              </Typography>
            </Box>
            <Grid container columnSpacing={6} rowSpacing={1} mt={1}>
              <Grid item lg={6} xl={5} xs={12}>
                <Box sx={{ padding: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
                  <Typography variant="body1">NAS :</Typography>
                  <Box color={'#364152 !important'} width={'60%'} borderRadius={'05px'}>
                    <FormControl fullWidth >
                      <Select
                        id="nas"
                        size="small"
                        name='nas'
                        value={formik.values.nas}
                        onChange={(option) => {
                          formik.setFieldValue('nas', option.target.value);
                          formik.setFieldValue('pool', '');
                          setSelectNASDAta(option.target.value);
                          setIPAddressData([]);
                        }}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 200,
                              overflowY: 'auto',
                            },
                          },
                        }}
                      >
                        <MenuItem value="">Select</MenuItem>
                        {nasData.map((item, index) => (
                          <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={6} xl={5} xs={12}>
                <Box sx={{ padding: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
                  <Typography variant="body1">Pool Name :</Typography>
                  <Box color={'#364152 !important'} width={'60%'} borderRadius={'05px'}>
                    <FormControl fullWidth >
                      <Select
                        id="pool"
                        size="small"
                        name='pool'
                        value={formik.values.pool}
                        onChange={(e) => { formik.handleChange(e); setSelectPoolName(e.target.value) }}
                      >
                        <MenuItem value="">Select Pool</MenuItem>
                        {poolNameData?.map((item, index) => (
                          <MenuItem key={index} value={item._id}>{item.poolName}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            {
              formik.values.pool && selectNASData &&
              <>
                <IPPoolAddressTable
                  setLoading={setLoading}
                  selectPoolName={formik.values.pool}
                  ipAddressData={ipAddressData}
                  setIPAddressData={setIPAddressData}
                  setIpAddress={setIpAddress}
                  ipAddress={ipAddress}
                  subscriber={subscriber}
                />
                {formik.touched.ipAddress && formik.errors.ipAddress && (
                  <FormHelperText error>{formik.errors.ipAddress}</FormHelperText>
                )}
                <Box mt={2}>
                  <Button type="submit" variant="contained" color="primary" onClick={formik.handleSubmit}>
                    Submit
                  </Button>
                </Box>
              </>
            }
          </Box>
        }
        {formik.touched.dynamicIp && formik.errors.dynamicIp && (
          <FormHelperText error>{formik.errors.dynamicIp}</FormHelperText>
        )}
        {
          !formik.values.isIpType && formik.values.networkType &&
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" onClick={formik.handleSubmit}>
              Save
            </Button>
          </Box>
        }
      </Paper >
    </>
  );
};

export default Network;