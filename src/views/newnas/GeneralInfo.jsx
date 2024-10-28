import React from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  MenuItem,
  Paper,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from '@mui/material';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { addNAS, UpdateNAS } from 'services/NASService';
import FormTextField from 'views/commoncomponent/FormTextField';
import SelectFiels from 'views/commoncomponent/SelectFiels';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  apiPort: Yup.string().required('API Port is required'),
  vendor: Yup.string().required('Vendor is required'),
  ipAddress: Yup.string(),
  gatewayIPAdress: Yup.string()
    .matches(
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      'Enter a valid Gateway IP address'
    ),
  sharedSecret: Yup.string().required('Shared secret is required'),
});

const GeneralInfo = ({ nasrDetails, setLoading }) => {
  const userdata = localStorage.getItem("userdata");
  const userId = JSON.parse(userdata)?._id;
  const navigate = useNavigate();
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: nasrDetails?.name || '',
      apiPort: nasrDetails?.apiPort || '',
      apiUserName: nasrDetails?.apiUserName || '',
      vendor: nasrDetails?.vendor || '',
      ipAddress: nasrDetails?.ipAddress || '',
      sharedSecret: nasrDetails?.sharedSecret || '',
      apiPassword: nasrDetails?.apiPassword || '',
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        setLoading(true)
        if (nasrDetails) {
          const data = {
            ...values,
            created_by: userId,
            updated_by: userId,
          };
          await UpdateNAS(data, nasrDetails._id);
        } else {
          const data = {
            ...values,
            created_by: userId,
          };
          await addNAS(data);
        }
        setLoading(false)
        navigate('/nas-management/naslist')
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (nasrDetails) {
      formik.setValues({
        name: nasrDetails?.name || '',
        apiPort: nasrDetails?.apiPort || '',
        apiUserName: nasrDetails?.apiUserName || '',
        vendor: nasrDetails?.vendor || '',
        ipAddress: nasrDetails?.ipAddress || '',
        sharedSecret: nasrDetails?.sharedSecret || '',
        apiPassword: nasrDetails?.apiPassword || '',
      });
    }
  }, [nasrDetails]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitAttempted(true);
    await formik.submitForm();
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Paper sx={{ padding: '15px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormTextField
                id="name"
                label="Name"
                name="name"
                value={formik.values.name || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.name && Boolean(formik.errors.name)}
                error={Boolean(formik.errors.name)}
                helperText={formik.errors.name}
              />
              <FormTextField
                id="apiPort"
                label="API Port"
                name="apiPort"
                value={formik.values.apiPort || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.apiPort && Boolean(formik.errors.apiPort)}
                error={Boolean(formik.errors.apiPort)}
                helperText={formik.errors.apiPort}
              />
              <FormTextField
                id="apiUserName"
                label="API Username"
                name="apiUserName"
                value={formik.values.apiUserName || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.apiUserName && Boolean(formik.errors.apiUserName)}
                error={Boolean(formik.errors.apiUserName)}
                helperText={formik.errors.apiUserName}
              />
              <SelectFiels
                field={{ name: 'vendor', label: 'Vendor' }}
                formik={formik}
                options={[
                  { label: "Select", value: "" },
                  { label: "Cisco", value: "Cisco" },
                  { label: "Milkrotik", value: "Milkrotik" },
                ]}
                handleChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTextField
                id="ipAddress"
                label="Ip Address"
                name="ipAddress"
                value={formik.values.ipAddress || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.ipAddress && Boolean(formik.errors.ipAddress)}
                error={Boolean(formik.errors.ipAddress)}
                helperText={formik.errors.ipAddress}
              />
              <FormTextField
                id="sharedSecret"
                label="Shared Secret"
                name="sharedSecret"
                value={formik.values.sharedSecret || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.sharedSecret && Boolean(formik.errors.sharedSecret)}
                error={Boolean(formik.errors.sharedSecret)}
                helperText={formik.errors.sharedSecret}
              />
              <FormTextField
                id="apiPassword"
                label="API Password"
                name="apiPassword"
                value={formik.values.apiPassword || ''}
                onChange={formik.handleChange}
                type='password'
              />
            </Grid>
          </Grid>
          <Box display={'flex'} gap={2} mt={2}>
            <Button variant="contained" sx={{ width: '100px' }} type='submit'>
              Save
            </Button>
            <Button variant="contained" sx={{ width: '100px' }} onClick={() => navigate('/nas-management/naslist')} >
              Cancel
            </Button>
          </Box>
        </Paper>
      </form>
    </Box>
  );
};

export default GeneralInfo;