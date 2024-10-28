import { useContext, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { login, resellerLogin } from 'services/AuthService';
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from 'usecontext/ContextProvider';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = ({ ...others }) => {
  const { setRole } = useContext(Context);
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const URL = useLocation()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            const response = URL?.pathname === '/auth/login' ? await login(values) : await resellerLogin(values)

            if (response?.error) {
              setErrors({ submit: response.error });
              setSubmitting(false);
              return;
            }
            else {
              localStorage.setItem('role', response?.role);
              setRole(response?.role)
              localStorage.setItem('token', response?.token);
              localStorage.setItem('userdata', JSON.stringify(response?.data));
              if (URL?.pathname === '/auth/login') {
                localStorage.setItem('role', 'admin');
                setRole('admin')
              }
              navigate('/');
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

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                sx={{
                  width: {
                    xs: '100%',
                    md: '75%',
                    lg: '70%',
                  },
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
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
              <Typography variant="subtitle1" color="#555c5f" sx={{ textDecoration: 'none', cursor: 'pointer' }} onClick={() => navigate('/auth/forgot-password')}>
                Forgot Password?
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
                Sign in
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;