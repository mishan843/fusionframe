import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

import { sendForgotEmail } from 'services/AuthService';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthForgot = ({ ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate()


  return (
    <>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            const response = await sendForgotEmail(values)

            if (response?.error) {
              setErrors({ submit: response.error });
              setSubmitting(false);
              return;
            }
          } catch (error) {
            console.error('Login error:', error);
            setErrors({ submit: error.message || 'Something went wrong' });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others} >
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address / Username"
                inputProps={{}}
                sx={{
                  width: {
                    xs: '100%',
                    md: '75%',
                    lg: '70%',
                  },
                }}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{
              my: 5,
              width: {
                xs: '100%',
                md: '75%',
                lg: '70%',
              },
            }} display={'flex'} justifyContent={'space-between'} alignItems={'center'} >
              <Typography variant="subtitle1" color="#555c5f" sx={{ textDecoration: 'none', cursor: 'pointer' }} onClick={() => navigate('/auth/login')}>
                Back to login
              </Typography>
              <Button disabled={isSubmitting}
                size="large"
                type="submit"
                sx={{
                  backgroundColor: '#262626',
                  color: 'white',
                  width: '50%',
                  '&:hover': {
                    backgroundColor: '#262626 !important',
                    color: 'white',
                  },
                  '&.Mui-disabled': {
                    backgroundColor: '#262626', // Keep the background color when disabled
                    color: 'white',             // Keep the text color white when disabled
                  }
                }}>
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthForgot;