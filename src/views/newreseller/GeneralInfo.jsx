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
  Checkbox,
  ListItemText,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { addReseller, UpdateReseller } from 'services/ResellerService';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useState } from 'react';
import { getNAS } from 'services/NASService';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SelectFiels from 'views/commoncomponent/SelectFiels';
import FormTextField from 'views/commoncomponent/FormTextField';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  resellerName: Yup.string().required('Reseller Name is required'),
  mobile: Yup.string().required('Mobile No is required'),
  country: Yup.string().required('Country No is required'),
  nas: Yup.array()
    .min(1, 'NAS is required')
    .of(Yup.string().required('NAS item is required')),
  password: Yup.string().required('Password is required'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const editValidationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  resellerName: Yup.string().required('LCO Name is required'),
  mobile: Yup.string().required('Mobile No is required'),
  country: Yup.string().required('Country No is required'),
  nas: Yup.array()
    .min(1, 'NAS is required')
    .of(Yup.string().required('NAS item is required')),
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

const GeneralInfo = ({ resellerDetails, setResellerId, setLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const userdata = localStorage.getItem("userdata");
  const userId = JSON.parse(userdata)?._id;
  const navigate = useNavigate();
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [nasData, setNASData] = useState([]);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      resellerName: "",
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
      panNo: "",
      resellerCode: "",
      contactPersonName: "",
      contactPersonMobile: "",
      supportEmail: "",
      whatsappSupportNo: "",
      description: "",
      nas: [],
      password: ''
    },
    validationSchema: resellerDetails ? editValidationSchema : validationSchema,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        const data = {
          ...values,
          created_by: userId,
          anniversaryDate: values?.anniversaryDate ? moment(values?.anniversaryDate).format('DD-MM-YYYY') : '',
          dob: values?.dob ? moment(values?.dob).format('DD-MM-YYYY') : '',
        };
        let response;
        setLoading(true)
        if (resellerDetails) {
          response = await UpdateReseller(data, resellerDetails._id);
        } else {
          response = await addReseller(data);

          if (!response?.error) {
            setResellerId(response?.reseller?._id)
          }
        }
        setLoading(false)
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (resellerDetails) {
      formik.setValues({
        resellerName: resellerDetails.resellerName,
        title: resellerDetails.title,
        houseNo: resellerDetails.houseNo,
        address: resellerDetails.address,
        email: resellerDetails.email,
        taluka: resellerDetails.taluka,
        district: resellerDetails.district,
        pincode: resellerDetails.pincode,
        area: resellerDetails.area,
        subArea: resellerDetails.subArea,
        state: resellerDetails.state,
        country: resellerDetails.country,
        telephone: resellerDetails.telephone,
        mobile: resellerDetails.mobile,
        fax: resellerDetails.fax,
        messangerId: resellerDetails.messangerId,
        webSite: resellerDetails.webSite,
        dob: resellerDetails.dob,
        anniversaryDate: resellerDetails.anniversaryDate,
        longitude: resellerDetails.longitude,
        latitude: resellerDetails.latitude,
        lcoBalance: resellerDetails.lcoBalance,
        gstNo: resellerDetails.gstNo,
        dashboard: resellerDetails.dashboard,
        status: resellerDetails.status,
        panNo: resellerDetails.panNo,
        resellerCode: resellerDetails.resellerCode,
        contactPersonName: resellerDetails.contactPersonName,
        contactPersonMobile: resellerDetails.contactPersonMobile,
        supportEmail: resellerDetails.supportEmail,
        whatsappSupportNo: resellerDetails.whatsappSupportNo,
        description: resellerDetails.description,
        nas: resellerDetails?.nas || []
      });
    }
  }, [resellerDetails]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitAttempted(true);
    await formik.submitForm();
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
              {!resellerDetails &&
                <>
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
                </>
              }
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
              <FormTextField
                id="gstNo"
                label="GSTIN"
                name="gstNo"
                value={formik.values.gstNo || ''}
                onChange={formik.handleChange}
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
              {
                resellerDetails &&
                <FormControl fullWidth margin="normal">
                  <InputLabel id="demo-simple-select-label" size="small">
                    NAS
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="nas"
                    label="NAS"
                    name="nas"
                    size="small"
                    multiple
                    value={formik.values.nas}
                    onChange={formik.handleChange}
                    renderValue={(selected) =>
                      selected.map(value => {
                        const selectedItem = nasData.find(item => item._id === value);
                        return selectedItem ? selectedItem.name : '';
                      }).join(', ')
                    }
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                          overflowY: 'auto',
                        },
                      },
                    }}
                  >
                    {nasData?.map((item, index) => (
                      <MenuItem key={index} value={item?._id}>
                        <Checkbox
                          sx={{ padding: '5px' }}
                          checked={formik.values.nas.includes(item?._id)}
                        />
                        <ListItemText primary={item?.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              }
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTextField
                id="resellerName"
                label="Reseller Name"
                name="resellerName"
                value={formik.values.resellerName || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.resellerName}
                error={formik.errors.resellerName}
                helperText={formik.errors.resellerName}
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
                id="longitude"
                label="Longitude"
                name="longitude"
                value={formik.values.longitude || ''}
                onChange={formik.handleChange}
              />
              <FormTextField
                id="lcoBalance"
                label="LCO Balance"
                name="lcoBalance"
                value={formik.values.lcoBalance || ''}
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
              <FormTextField
                id="panNo"
                label="PAN NO."
                name="panNo"
                value={formik.values.panNo || ''}
                onChange={formik.handleChange}
              />

              <FormTextField
                id="resellerCode"
                label="Reseller Code"
                name="resellerCode"
                value={formik.values.resellerCode || ''}
                onChange={formik.handleChange}
              />

              {
                !resellerDetails && <FormControl fullWidth margin="normal">
                  <InputLabel id="demo-simple-select-label" size="small">
                    NAS
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="nas"
                    label="NAS"
                    name="nas"
                    size="small"
                    multiple
                    value={formik.values.nas}
                    error={submitAttempted && formik.touched.nas && Boolean(formik.errors.nas)}
                    onChange={formik.handleChange}
                    renderValue={(selected) =>
                      selected.map(value => {
                        const selectedItem = nasData.find(item => item._id === value);
                        return selectedItem ? selectedItem.name : '';
                      }).join(', ')
                    }
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                          overflowY: 'auto',
                        },
                      },
                    }}
                  >
                    {nasData?.map((item, index) => (
                      <MenuItem key={index} value={item?._id}>
                        <Checkbox
                          sx={{ padding: '5px' }}
                          checked={formik.values.nas.includes(item?._id)}
                        />
                        <ListItemText primary={item?.name} />
                      </MenuItem>
                    ))}
                  </Select>
                  {submitAttempted && formik.touched.nas && formik.errors.nas && (
                    <FormHelperText error>{formik.errors.nas}</FormHelperText>
                  )}
                </FormControl>
              }
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
            value={formik.values?.description || ''}
            onChange={formik.handleChange}
            multiline rows={4}
          />
          <Box display={'flex'} gap={2}>
            <Button variant="contained" sx={{ width: '100px' }} type='submit'>
              Save
            </Button>
            <Button variant="contained" sx={{ width: '100px' }} onClick={() => navigate('/network-partners/reseller')} >
              Cancel
            </Button>
          </Box>
        </Paper>
      </form>
    </Box>
  );
};

export default GeneralInfo;