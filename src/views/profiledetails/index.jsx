import React, { useContext, useState } from 'react';
import { Avatar, Box, Button, Divider, Grid, IconButton, Paper, Tooltip, Typography, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Context } from 'usecontext/ContextProvider';
import backgroundImage from '../../assets/images/profilebackground.jpg';
import profile from '../../assets/images/user-profile.png'; // Default profile image
import { LoginOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Updateuser } from 'services/UsersService';

const ProfileDetails = () => {
  const userdata = JSON.parse(localStorage.getItem('userdata')) || {}; // Fallback to empty object if userdata is null/undefined
  const { role } = useContext(Context);
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState(); // State for selected image

  const validationSchema = Yup.object().shape(
    role === 'reseller'
      ? {
        resellerName: Yup.string().required('Reseller Name is required'),
        houseNo: Yup.string().required('House No is required'),
        address: Yup.string().required('Address is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        taluka: Yup.string().required('Taluka is required'),
        district: Yup.string().required('District is required'),
        pincode: Yup.string().required('Pincode is required'),
        state: Yup.string().required('State is required'),
        country: Yup.string().required('Country is required'),
        telephone: Yup.string().required('Telephone No is required'),
        messangerId: Yup.string().required('Messenger Id is required'),
        webSite: Yup.string().url('Invalid URL').required('Website is required'),
        dob: Yup.string().required('Date Of Birth is required'),
        lcoBalance: Yup.string().required('LCO Balance is required'),
      }
      : {
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        designation: Yup.string().required('Designation is required'),
      }
  );

  const formik = useFormik({
    initialValues: userdata,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          formData.append(key, values[key]);
        });
        if (role !== 'reseller') {
          formData.append('isAdmin', true);
        }
        const response = await Updateuser(formData, userdata?._id);

        localStorage.setItem('userdata', JSON.stringify(response?.user));
        setIsEditMode(false);
        setSelectedImage(null);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    },
  });

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setSelectedImage(file);
      formik.setFieldValue('profile_picture', file);
    }
  };

  const fields =
    role === 'reseller'
      ? [
        { label: 'Reseller Name', value: formik.values.resellerName, key: 'resellerName' },
        { label: 'House No', value: formik.values.houseNo, key: 'houseNo' },
        { label: 'Address', value: formik.values.address, key: 'address' },
        { label: 'Email', value: formik.values.email, key: 'email' },
        { label: 'Taluka', value: formik.values.taluka, key: 'taluka' },
        { label: 'District', value: formik.values.district, key: 'district' },
        { label: 'Pincode', value: formik.values.pincode, key: 'pincode' },
        { label: 'State', value: formik.values.state, key: 'state' },
        { label: 'Country', value: formik.values.country, key: 'country' },
        { label: 'Telephone No', value: formik.values.telephone, key: 'telephone' },
        { label: 'Messager Id', value: formik.values.messangerId, key: 'messangerId' },
        { label: 'Website', value: formik.values.webSite, key: 'webSite' },
        { label: 'Date Of Birth', value: formik.values.dob, key: 'dob' },
        { label: 'LCO Balance', value: formik.values.lcoBalance, key: 'lcoBalance' },
      ]
      : [
        { label: 'Name', value: formik.values.name, key: 'name' },
        { label: 'Email', value: formik.values.email, key: 'email' },
        { label: 'Designation', value: formik.values.designation, key: 'designation' },
      ];

  const handleCancel = () => {
    formik.resetForm();
    setIsEditMode(false);
    setSelectedImage(null);
  };

  return (
    <form onSubmit={formik.handleSubmit} className='h-100'>
      <Box
        sx={{
          backgroundImage: `url(${userdata?.profile_background?.url || backgroundImage})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          padding: 5,
          height: '100%',
          width: '100%',
          objectFit: 'cover'
        }}
      >
        <Paper sx={{ width: { lg: role === 'admin' ? '30%' : '50%', md: role === 'admin' ? '40%' : '80%', sm: '80%', xs: '100%' } }}>
          <Box display="flex" gap={1} alignItems="center" justifyContent='space-between' m={2}>
            <Box position="relative">
              <Avatar
                alt="User Name"
                src={selectedImage ? URL.createObjectURL(selectedImage) : userdata?.profile_picture?.url || profile}
                sx={{ height: '60px', width: '60px', cursor: 'pointer' }}
              />
              {isEditMode && (
                <input
                  accept="image/*"
                  type="file"
                  onChange={handleImageChange}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                  }}
                />
              )}
            </Box>
            <Box sx={{ display: 'flex', gap: 3 }}>
              {isEditMode ? (
                <>
                  <Button variant='contained' size='small' type='submit'>
                    Save
                  </Button>
                  <Button variant='outlined' size='small' onClick={handleCancel}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button variant='contained' size='small' onClick={() => setIsEditMode(true)}>
                  Edit
                </Button>
              )}
              <Tooltip title="Log Out" slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [0, -14],
                      },
                    },
                  ],
                },
              }}>
                <IconButton sx={{ padding: '5px' }} onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('role');
                  localStorage.removeItem('userdata');
                  navigate('/')
                }}>
                  <LoginOutlined sx={{ width: 20, height: 20, color: '#99abb4' }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Divider />
          <Grid container columnSpacing={4} rowSpacing={1} p={3}>
            {fields.map((field, index) => (
              <Grid item xs={12} sm={role === 'admin' ? 12 : 6} key={index}>
                <Box sx={{ borderRadius: '0' }}>
                  <Typography variant="body1" my={1}>
                    {field.label} :
                  </Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      size='small'
                      name={field.key}
                      value={field.value}
                      onChange={formik.handleChange}
                      error={formik.touched[field.key] && Boolean(formik.errors[field.key])}
                      helperText={formik.touched[field.key] && formik.errors[field.key]}
                    />
                  ) : (
                    <Typography variant="body1" fontWeight={600}>
                      {field.value || '-'}
                    </Typography>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </form>
  );
};

export default ProfileDetails;