import React, { useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const FormTextField = ({
  id,
  label,
  name,
  value,
  onChange,
  variant = 'outlined',
  fullWidth = true,
  margin = 'normal',
  size = 'small',
  type = 'text',
  error,
  helperText,
  showError = false,
  InputLabelProps,
  customProps = {},
  va
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <TextField
        id={id}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        variant={variant}
        fullWidth={fullWidth}
        margin={margin}
        size={size}
        type={type === 'password' && showPassword ? 'text' : type}
        error={showError && Boolean(error)}
        helperText={showError ? helperText : ''}
        InputLabelProps={InputLabelProps}
        {...customProps}
        InputProps={{
          endAdornment: (
            type === 'password' && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          ),
        }}
      />
    </>
  );
};

export default FormTextField;