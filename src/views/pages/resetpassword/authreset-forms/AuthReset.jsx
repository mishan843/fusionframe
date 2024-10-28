import { useState } from 'react';

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

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { updatePassword } from 'services/AuthService';
import { useParams, useNavigate } from 'react-router-dom';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthReset = ({ ...others }) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const { userId } = useParams()
  const navigate = useNavigate()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfPassword = () => {
    setShowConfPassword(!showConfPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          userId: userId,
          password: '',
          confirmPassword: '',
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string().max(255).required('Password is required'),
          confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
          
            const response = await updatePassword(values)
            navigate('/auth/login')
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
            <FormControl fullWidth error={Boolean(touched.confirmPassword && errors.confirmPassword)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">confirm Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showConfPassword ? 'text' : 'password'}
                value={values.confirmPassword}
                name="confirmPassword"
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
                      onClick={handleClickShowConfPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showConfPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
                inputProps={{}}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.confirmPassword}
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

export default AuthReset;