import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormControlLabel, IconButton, InputAdornment, Paper, Switch } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import countries from 'world-countries';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addSubscriber, UpdateSubscriber } from 'services/SubscribersService';
import { useContext } from 'react';
import { Context } from 'usecontext/ContextProvider';
import { getReseller } from 'services/ResellerService';
import { getLCO } from 'services/LCOService';
import FormTextField from 'views/commoncomponent/FormTextField';
import SelectFiels from 'views/commoncomponent/SelectFiels';
import { getPackageS } from 'services/PackageService';

const validationSchema = (role, isLco) =>
  Yup.object().shape({
    name: Yup.string().required('Name is required'),
    userName: Yup.string().required('UserName is required'),
    password: Yup.string().required('Password is required'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    billingAddress: Yup.string().required('Billing Address is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    mobile: Yup.string().required('Mobile is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    plan: Yup.string().required('Plan is required'),
    resellerId: Yup.string().test(
      'is-required-if-admin',
      'Reseller ID is required for admin',
      function (value) {
        return role !== 'admin' || !!value;
      }
    ),

    lcoId: Yup.string().test(
      'is-required-if-lco',
      'LCO ID is required if Create Subscriber with LCO is checked',
      function (value) {
        return (role === 'admin' || role === 'reseller') ? (!isLco || !!value) : (role === 'lco' || !!value);
      }
    ),
  });

const editValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  userName: Yup.string().required('UserName is required'),
  billingAddress: Yup.string().required('Billing Address is required'),
  state: Yup.string().required('State is required'),
  country: Yup.string().required('Country is required'),
  mobile: Yup.string().required('Mobile is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

export default function GeneralInfo({ subscriberDetail, setSubscriber, setLoading }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [addAlternativePhone, setAddAlternativePhone] = useState(false);
  const [addAlternativeMobile, setAddAlternativeMobile] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const userdata = localStorage.getItem('userdata')
  const userId = JSON.parse(userdata)?._id
  const resellerID = JSON.parse(userdata)?.resellerId
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const navigate = useNavigate()
  const { role } = useContext(Context);
  const [resellerData, setResellerData] = useState([]);
  const [lcoData, setLCOData] = useState([]);
  const [isLco, setISLCO] = useState(false);
  const isEdit = Boolean(subscriberDetail);
  const [packageData, setPackageData] = useState([])

  const getPackageData = async () => {
    try {
      setLoading(true);
      const response = await getPackageS();
      setLoading(false);

      const options = response?.packages?.map((pkg) => ({
        label: pkg.name,
        value: pkg._id,
      }));

      setPackageData(options);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPackageData()
  }, [])

  useEffect(() => {
    const countryNames = countries.map((country) => country.name.common);
    setCountryList(countryNames);
  }, []);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  let initialValues = {
    name: '',
    password: '',
    accountNo: '',
    billingAddress: '',
    userName: '',
    email: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    phone: '',
    mobile: '',
    subscriberType: ' ',
    plan: '',
    allowDevices: '1',
    discount: '',
    aadharNo: '',
    gstNo: '',
    description: '',
    resellerId: role === 'admin' ? '' : role === 'reseller' ? userId : resellerID,
    installationAddress: '',
    isInstallationAddress: false,
    isLco: role === 'lco' ? true : false
  };

  if (addAlternativeMobile) {
    initialValues = {
      ...initialValues,
      mobile2: ''
    };
  }

  if (addAlternativePhone) {
    initialValues = {
      ...initialValues,
      phone2: ''
    };
  }

  const formik = useFormik({
    initialValues,
    validationSchema: (() => subscriberDetail ? editValidationSchema : validationSchema(role, isLco)),
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        const data = {
          ...values,
          installationAddress: values.isInstallationAddress ? values.installationAddress : '',
          lcoId: values?.isLco ? (role === 'lco' ? userId : values?.lcoId) : null,
          created_by: userId
        }
        setLoading(true)
        let response;

        if (subscriberDetail) {
          response = await UpdateSubscriber(data, subscriberDetail?._id);
          navigate(`/user-management/subscribers/${subscriberDetail?._id}`)
        } else {
          response = await addSubscriber(data);
        }
        if (!response?.error) {
          if (!isEdit) {
            setSubscriber(response?.subscriber)
          }
        }
        setLoading(false)
        setAddAlternativeMobile(false)
        setAddAlternativePhone(false)
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitAttempted(true);
    await formik.submitForm();
  };

  useEffect(() => {
    if (subscriberDetail) {
      formik.setValues({
        name: subscriberDetail?.name || '',
        password: subscriberDetail?.password || '',
        accountNo: subscriberDetail?.accountNo || '',
        billingAddress: subscriberDetail?.billingAddress || '',
        userName: subscriberDetail?.userName || '',
        email: subscriberDetail?.email || '',
        city: subscriberDetail?.city || '',
        state: subscriberDetail?.state || '',
        country: subscriberDetail?.country || '',
        zipCode: subscriberDetail?.zipCode || '',
        phone: subscriberDetail?.phone || '',
        phone2: subscriberDetail?.phone2 || '',
        mobile: subscriberDetail?.mobile || '',
        mobile2: subscriberDetail?.mobile2 || '',
        subscriberType: subscriberDetail?.subscriberType || ' ',
        allowDevices: subscriberDetail?.allowDevices || '1',
        discount: subscriberDetail?.discount || '',
        aadharNo: subscriberDetail?.aadharNo || '',
        gstNo: subscriberDetail?.gstNo || '',
        description: subscriberDetail?.description || '',
        lcoId: subscriberDetail?.lcoId || '',
        resellerId: subscriberDetail?.resellerId || '',
        plan: subscriberDetail?.plan?.planId || '',
        isInstallationAddress: subscriberDetail?.isInstallationAddress || false,
        isLco: subscriberDetail?.isLco || false,
        installationAddress: subscriberDetail?.installationAddress || '',
      });
    }
    if (subscriberDetail?.phone2) {
      setAddAlternativePhone(true)
    }
    if (subscriberDetail?.mobile2) {
      setAddAlternativeMobile(true)
    }
  }, [subscriberDetail]);

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

  const getLCOData = async () => {
    try {
      const params = {
        skip: 0,
        limit: 0,
        resellerId: formik.values.resellerId || userId
      };
      setLoading(true)
      const response = await getLCO(params);
      setLCOData(response?.Lcos);
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (role === 'admin') {
      getResellerData();
    }
  }, [role]);

  useEffect(() => {
    if ((formik.values.isLco && role !== 'lco') || role === 'reseller') {
      getLCOData();
    }
  }, [formik.values.isLco, formik.values.resellerId]);


  const options = [
    { label: "None", value: " " },
    { label: "Commercial", value: "Commercial" },
    { label: "Residential", value: "Residential" },
    { label: "Fiber", value: "Fiber" },
    { label: "Wireless", value: "Wireless" },
    { label: "Premium I", value: "Premium I" },
    { label: "Premium II", value: "Premium II" },
  ];

  return (
    <>
      <Paper sx={{ padding: '15px' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormTextField
                id="accountNo"
                label="Account no"
                name="accountNo"
                value={formik.values.accountNo || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.accountNo && Boolean(formik.errors.accountNo)}
              />
              <FormTextField
                id="name"
                label="Name"
                name="name"
                value={formik.values.name || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.name && Boolean(formik.errors.name)}
              />
              <FormTextField
                id="userName"
                label="UserName"
                name="userName"
                value={formik.values.userName || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.userName && Boolean(formik.errors.userName)}
                error={Boolean(formik.errors.userName)}
                helperText={formik.errors.userName}
              />
              {
                !subscriberDetail &&
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
              <SelectFiels
                field={{ name: 'subscriberType', label: 'Subscriber Type' }}
                formik={formik}
                options={options}
                handleChange={formik.handleChange}
                error={Boolean(formik.errors.subscriberType)}
              />
              <SelectFiels
                field={{ name: 'plan', label: 'Plan' }}
                formik={formik}
                options={[
                  ...packageData
                ]}
                value={formik.values.plan.planId ? formik.values.plan.planId : ''}
                handleChange={formik.handleChange}
                error={Boolean(formik.errors.plan)}
              />
              <SelectFiels
                field={{ name: 'allowDevices', label: 'Allow Devices' }}
                formik={formik}
                options={
                  [{ label: "1", value: "1" },]
                }
                handleChange={formik.handleChange}
                error={Boolean(formik.errors.allowDevices)}
              />

              {
                role === 'admin' &&
                <SelectFiels
                  field={{ name: 'resellerId', label: 'Reseller' }}
                  formik={formik}
                  options={resellerData?.map((item) => ({
                    label: item?.resellerName,
                    value: item?._id,
                  }))}
                  handleChange={formik.handleChange}
                  error={Boolean(formik.errors.resellerId)}
                />
              }
              {formik.values.resellerId && role !== 'lco' &&
                <FormControlLabel
                  control={
                    <Switch
                      checked={formik.values.isLco}
                      onChange={(e) => {
                        setISLCO(e.target.checked);
                        formik.setFieldValue('isLco', e.target.checked);
                      }}
                      aria-label="create with LCO"
                      name="isLco"
                    />
                  }
                  label="Create Subscriber with LCO"
                />
              }
              {formik.values.isLco && role !== 'lco' &&
                <SelectFiels
                  field={{ name: 'lcoId', label: 'LCO' }}
                  formik={formik}
                  options={lcoData?.map((item) => ({
                    label: item?.lcoName,
                    value: item?._id,
                  }))}
                  handleChange={formik.handleChange}
                  error={Boolean(formik.errors.lcoId)}
                />
              }
              <TextField
                label="discount"
                variant="outlined"
                fullWidth
                name="discount"
                type="number"
                margin="normal"
                size="small"
                value={formik.values.discount || ''}
                onChange={formik.handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                name="description"
                margin="normal"
                size="small"
                value={formik.values.description || ''}
                onChange={formik.handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTextField
                id="billingAddress"
                label="Billing Address (Installation Address is same)"
                name="billingAddress"
                value={formik.values.billingAddress || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.billingAddress && Boolean(formik.errors.billingAddress)}
                error={Boolean(formik.errors.billingAddress)}
                helperText={formik.errors.billingAddress}
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={formik.values.isInstallationAddress}
                    value={formik.values.isInstallationAddress}
                    onChange={formik.handleChange}
                    aria-label="view invoices"
                    name='isInstallationAddress'
                  />
                }
                label="Use different Installation Address"
              />
              {formik.values.isInstallationAddress && (
                <FormTextField
                  id="installationAddress"
                  label="Installation Address"
                  name="installationAddress"
                  value={formik.values.installationAddress || ''}
                  onChange={formik.handleChange}
                  showError={submitAttempted && formik.touched.installationAddress && Boolean(formik.errors.installationAddress)}
                  error={Boolean(formik.errors.installationAddress)}
                  helperText={formik.errors.installationAddress}
                />
              )}
              <FormTextField
                id="city"
                label="City"
                name="city"
                value={formik.values.city || ''}
                onChange={formik.handleChange}
              />
              <FormTextField
                id="state"
                label="State"
                name="state"
                value={formik.values.state || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.state && Boolean(formik.errors.state)}
                error={Boolean(formik.errors.state)}
                helperText={formik.errors.state}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label" size="small">
                  Country
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="country"
                  value={formik.values.country || ''}
                  label="Country"
                  onChange={formik.handleChange}
                  size="small"
                  name='country'
                  error={formik.touched.country && Boolean(formik.errors.country)}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                        overflowY: 'auto',
                      },
                    },
                  }}
                >
                  {countryList.map((country, index) => (
                    <MenuItem key={index} value={country}>{country}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormTextField
                id="zipCode"
                label="ZIP Code"
                name="zipCode"
                value={formik.values.zipCode || ''}
                onChange={formik.handleChange}
              />
              <FormTextField
                id="phone"
                label="Phone"
                name="phone"
                value={formik.values.phone || ''}
                onChange={formik.handleChange}
              />
              {
                !addAlternativePhone && <Button type='text' className='py-0' onClick={() => setAddAlternativePhone(true)}>
                  Add alternative
                </Button>
              }
              {addAlternativePhone && (
                <FormTextField
                  id="phone2"
                  label="Phone2"
                  name="phone2"
                  value={formik.values.phone2 || ''}
                  onChange={formik.handleChange}
                />
              )}
              <FormTextField
                id="mobile"
                label="Mobile"
                name="mobile"
                value={formik.values.mobile || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.mobile && Boolean(formik.errors.mobile)}
                error={Boolean(formik.errors.mobile)}
                helperText={formik.errors.mobile}
              />
              {
                !addAlternativeMobile && <Button type='text' className='py-0' onClick={() => setAddAlternativeMobile(true)}>
                  Add alternative
                </Button>
              }
              {addAlternativeMobile && (
                <FormTextField
                  id="mobile2"
                  label="Mobile2"
                  name="mobile2"
                  value={formik.values.mobile2 || ''}
                  onChange={formik.handleChange}
                />
              )}
              <FormTextField
                id="email"
                label="Email"
                name="email"
                value={formik.values.email || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.email && Boolean(formik.errors.email)}
                error={Boolean(formik.errors.email)}
                helperText={formik.errors.email}
              />
              <FormTextField
                id="aadharNo"
                label="Aadhar no"
                name="aadharNo"
                value={formik.values.aadharNo || ''}
                onChange={formik.handleChange}
                showError={submitAttempted && formik.touched.aadharNo && Boolean(formik.errors.aadharNo)}
                error={Boolean(formik.errors.aadharNo)}
                helperText={formik.errors.aadharNo}
              />
              <FormTextField
                id="gstNo"
                label="GST Number"
                name="gstNo"
                value={formik.values.gstNo || ''}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Box display={'flex'} gap={2} mt={2}  >
            <Button variant="contained" type="submit" sx={{ width: '100px' }}>
              Save
            </Button>
            <Button variant="contained" onClick={() => navigate(`/user-management/subscribers/${subscriberDetail?._id}`)} sx={{ width: '100px' }}>
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </>
  );
}