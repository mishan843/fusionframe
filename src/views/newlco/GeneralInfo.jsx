import React from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { addLCO, UpdateLCO } from 'services/LCOService';
import moment from 'moment';
import { useState } from 'react';
import { useContext } from 'react';
import { Context } from 'usecontext/ContextProvider';
import { getReseller } from 'services/ResellerService';
import { getNAS } from 'services/NASService';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SelectFiels from 'views/commoncomponent/SelectFiels';
import FormTextField from 'views/commoncomponent/FormTextField';

const validationSchema = (role, isEdit) =>
  Yup.object().shape({
    email: Yup.string().required('Email is required'),
    lcoName: Yup.string().required('LCO Name is required'),
    mobile: Yup.string().required('Mobile No is required'),
    country: Yup.string().required('Country is required'),
    status: Yup.string().required('Status is required'),
    nas: Yup.array().required('NAS is required'),
    ...(isEdit ? {} : {
      password: Yup.string().required('Password is required'),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    resellerId: Yup.string().test(
      'is-required-if-admin',
      'Reseller ID is required for admin',
      function (value) {
        return role !== 'admin' || !!value;
      }
    ),
  });

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Lakshadweep",
  "Puducherry"
]

const GeneralInfo = ({ lcoDetails, setLCOId, setLoading }) => {
  const userdata = localStorage.getItem("userdata");
  const userId = JSON.parse(userdata)?._id;
  const navigate = useNavigate();
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [resellerData, setResellerData] = useState([]);
  const { role } = useContext(Context);
  const [nasData, setNASData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      lcoName: "",
      title: "",
      houseNo: "",
      address: "",
      email: "",
      taluka: "",
      district: "",
      pincode: "",
      area: "",
      subArea: "",
      state: "",
      country: "",
      telephone: "",
      mobile: "",
      fax: "",
      messangerId: "",
      webSite: "",
      dob: "",
      anniversaryDate: "",
      longitude: "",
      latitude: "",
      lcoBalance: "",
      gstNo: "",
      dashboard: "",
      status: "active",
      contactPersonName: "",
      contactPersonMobile: "",
      supportEmail: "",
      whatsappSupportNo: "",
      description: "",
      resellerId: role === 'admin' ? '' : userId,
      nas: '',
      password: ''
    },
    validationSchema: validationSchema(role, Boolean(lcoDetails)),
    onSubmit: async (values) => {
      try {
        const data = {
          ...values,
          created_by: userId,
          anniversaryDate: values?.anniversaryDate ? moment(values?.anniversaryDate).format('DD-MM-YYYY') : '',
          dob: values?.dob ? moment(values?.dob).format('DD-MM-YYYY') : '',
        };
        setLoading(true);
        let response;
        if (lcoDetails) {
          response = await UpdateLCO(data, lcoDetails._id);
        } else {
          response = await addLCO(data);
          if (!response?.error) {
            setLCOId(response?.lco?._id);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
  });


  useEffect(() => {
    if (lcoDetails) {
      formik.setValues({
        lcoName: lcoDetails.lcoName || '',
        title: lcoDetails.title || '',
        houseNo: lcoDetails.houseNo || '',
        address: lcoDetails.address || '',
        email: lcoDetails.email || '',
        taluka: lcoDetails.taluka || '',
        district: lcoDetails.district || '',
        pincode: lcoDetails.pincode || '',
        area: lcoDetails.area || '',
        subArea: lcoDetails.subArea || '',
        state: lcoDetails.state || '',
        country: lcoDetails.country || '',
        telephone: lcoDetails.telephone || '',
        mobile: lcoDetails.mobile || '',
        fax: lcoDetails.fax || '',
        messangerId: lcoDetails.messangerId || '',
        webSite: lcoDetails.webSite || '',
        dob: lcoDetails.dob || '',
        anniversaryDate: lcoDetails.anniversaryDate || '',
        longitude: lcoDetails.longitude || '',
        latitude: lcoDetails.latitude || '',
        lcoBalance: lcoDetails.lcoBalance || '',
        gstNo: lcoDetails.gstNo || '',
        dashboard: lcoDetails.dashboard || '',
        status: lcoDetails.status || 'active',
        contactPersonName: lcoDetails.contactPersonName || '',
        contactPersonMobile: lcoDetails.contactPersonMobile || '',
        supportEmail: lcoDetails.supportEmail || '',
        whatsappSupportNo: lcoDetails.whatsappSupportNo || '',
        description: lcoDetails.description || '',
        resellerId: lcoDetails.resellerId || '',
        nas: lcoDetails?.nas || ''
      });
    }
  }, [lcoDetails]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitAttempted(true);
    await formik.submitForm();
  };

  const getResellerData = async () => {
    try {
      const params = {
        skip: 0,
        limit: 0
      };
      setLoading(true)
      const response = await getReseller(params);
      setResellerData(response?.resellers);
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getResellerData();
  }, []);

  const getNASData = async () => {
    try {
      if (formik.values.resellerId || (role === 'reseller')) {
        const params = {
          skip: 0,
          limit: 0,
          resellerId: formik.values.resellerId || userId
        };
        const response = await getNAS(params);
        setNASData(response?.nases);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNASData();
  }, [formik.values.resellerId, userId]);

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Paper sx={{ padding: '15px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <SelectFiels
                field={{ name: 'title', label: 'Title' }}
                formik={formik}
                options={[
                  { label: 'Mr.', value: 'Mr.' },
                  { label: 'Ms', value: 'Ms' },
                  { label: 'Mrs', value: 'Mrs' },
                  { label: 'Miss', value: 'Miss' },
                  { label: 'M/s', value: 'M/s' },
                ]}
                handleChange={formik.handleChange}
              />
              {!lcoDetails && <>
                <TextField
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  size="small"
                  value={formik.values.password || ''}
                  onChange={formik.handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          className='p-0'
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={submitAttempted && formik.touched.password && Boolean(formik.errors.password)}
                  helperText={submitAttempted && formik.touched.password && formik.errors.password}
                />

                <TextField
                  label="Password confirmation"
                  variant="outlined"
                  fullWidth
                  name="password_confirmation"
                  type={showConfirmPassword ? 'text' : 'password'}
                  margin="normal"
                  size="small"
                  value={formik.values.password_confirmation || ''}
                  onChange={formik.handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          className='p-0'
                        >
                          {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={submitAttempted && Boolean(formik.errors.password_confirmation)}
                  helperText={submitAttempted && formik.errors.password_confirmation}
                />
              </>}

              <FormTextField
                id="address"
                label="Address"
                name="address"
                value={formik.values.address || ''}
                onChange={formik.handleChange}
              />

              <FormTextField
                id="taluka"
                label="Taluka"
                name="taluka"
                value={formik.values.taluka || ''}
                onChange={formik.handleChange}
              />

              <FormTextField
                id="district"
                label="District"
                name="district"
                value={formik.values.district || ''}
                onChange={formik.handleChange}
              />

              <SelectFiels
                field={{ name: 'state', label: 'State' }}
                formik={formik}
                options={indianStates.map((state) => ({
                  label: state,
                  value: state,
                }))}
                handleChange={formik.handleChange}
              />

              <FormTextField
                id="country"
                label="Country"
                name="country"
                value={formik.values.country || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.country && Boolean(formik.errors.country)}
                error={Boolean(formik.errors.country)}
                helperText={formik.errors.country}
              />

              <FormTextField
                id="telephone"
                label="Telephone no"
                name="telephone"
                value={formik.values.telephone || ''}
                onChange={formik.handleChange}
              />

              <FormTextField
                id="email"
                label="E-mail"
                name="email"
                value={formik.values.email || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.email}
                error={formik.errors.email}
                helperText={formik.errors.email}
              />

              <FormTextField
                id="webSite"
                label="Web site"
                name="webSite"
                value={formik.values.webSite || ''}
                onChange={formik.handleChange}
              />

              <FormTextField
                id="anniversaryDate"
                label="Anniversary Date"
                name="anniversaryDate"
                value={moment(formik.values?.anniversaryDate).format('YYYY-MM-DD') || ''}
                onChange={formik.handleChange}
                type="date"
                InputLabelProps={{ shrink: true }}
              />

              <FormTextField
                id="latitude"
                label="Latitude"
                name="latitude"
                value={formik.values.latitude || ''}
                onChange={formik.handleChange}
              />

              {role === 'admin' &&
                <SelectFiels
                  field={{ name: 'resellerId', label: 'Reseller' }}
                  formik={formik}
                  options={resellerData?.map((item) => ({
                    label: item?.resellerName,
                    value: item?._id,
                  }))}
                  handleChange={formik.handleChange}
                />}

              <SelectFiels
                field={{ name: 'nas', label: 'NAS' }}
                formik={formik}
                options={nasData?.map((item) => ({
                  label: item?.name,
                  value: item?._id,
                }))}
                handleChange={formik.handleChange}
              />

            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTextField
                id="lcoName"
                label="LCO Name"
                name="lcoName"
                value={formik.values.lcoName || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.lcoName}
                error={formik.errors.lcoName}
                helperText={formik.errors.lcoName}
              />

              <FormTextField
                id="houseNo"
                label="House No."
                name="houseNo"
                value={formik.values.houseNo || ''}
                onChange={formik.handleChange}
              />

              <FormTextField
                id="pincode"
                label="Pincode"
                name="pincode"
                value={formik.values.pincode || ''}
                onChange={formik.handleChange}
              />

              <FormTextField
                id="area"
                label="Area"
                name="area"
                value={formik.values.area || ''}
                onChange={formik.handleChange}
              />

              <FormTextField
                id="subArea"
                label="Sub Area"
                name="subArea"
                value={formik.values.subArea || ''}
                onChange={formik.handleChange}
              />

              <FormTextField
                id="mobile"
                label="Mobile No."
                name="mobile"
                value={formik.values.mobile || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.mobile}
                error={formik.errors.mobile}
                helperText={formik.errors.mobile}
              />

              <FormTextField
                id="fax"
                label="Fax"
                name="fax"
                value={formik.values.fax || ''}
                onChange={formik.handleChange}
              />

              <FormTextField
                id="messangerId"
                label="Messenger Id"
                name="messangerId"
                value={formik.values.messangerId || ''}
                onChange={formik.handleChange}
              />

              <FormTextField
                id="dob"
                label="Birth Date"
                name="dob"
                value={moment(formik.values?.dob).format('YYYY-MM-DD') || ''}
                onChange={formik.handleChange}
                type="date"
                InputLabelProps={{ shrink: true }}
              />

              <FormTextField
                id="lcoBalance"
                label="LCO Balance"
                name="lcoBalance"
                value={formik.values.lcoBalance || ''}
                onChange={formik.handleChange}
              />

              <FormTextField
                id="longitude"
                label="Longitude"
                name="longitude"
                value={formik.values.longitude || ''}
                onChange={formik.handleChange}
              />

              <SelectFiels
                field={{ name: 'dashboard', label: 'Dashboard' }}
                formik={formik}
                options={[
                  { label: 'Dashboard1', value: 'Dashboard1' },
                  { label: 'Dashboard2', value: 'Dashboard2' },
                ]}
                handleChange={formik.handleChange}
              />

              <SelectFiels
                field={{ name: 'status', label: 'Status' }}
                formik={formik}
                options={[
                  { label: 'Active', value: 'active' },
                  { label: 'InActive', value: 'inactive' },
                ]}
                handleChange={formik.handleChange}
              />

              <FormTextField
                id="gstNo"
                label="GSTIN"
                name="gstNo"
                value={formik.values.gstNo || ''}
                onChange={formik.handleChange}
              />

            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormTextField
                id="contactPersonName"
                label="Contact Person Name"
                name="contactPersonName"
                value={formik.values.contactPersonName || ''}
                onChange={formik.handleChange}
              />

              <FormTextField
                id="supportEmail"
                label="Support Email"
                name="supportEmail"
                value={formik.values.supportEmail || ''}
                onChange={formik.handleChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormTextField
                id="contactPersonMobile"
                label="Contact Person Number"
                name="contactPersonMobile"
                value={formik.values.contactPersonMobile || ''}
                onChange={formik.handleChange}
              />

              <FormTextField
                id="whatsappSupportNo"
                label="WhatsApp Support Number"
                name="whatsappSupportNo"
                value={formik.values.whatsappSupportNo || ''}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            fullWidth
            name="description"
            margin="normal"
            size="small"
            value={formik.values.description || ''}
            onChange={formik.handleChange}
            multiline rows={4}
          />
          <Box display={'flex'} gap={2}>
            <Button variant="contained" sx={{ width: '100px' }} type='submit'>
              Save
            </Button>
            <Button variant="contained" sx={{ width: '100px' }} onClick={() => navigate('/network-partners/lco')} >
              Cancel
            </Button>
          </Box>
        </Paper>
      </form>
    </Box>
  );
};

export default GeneralInfo;