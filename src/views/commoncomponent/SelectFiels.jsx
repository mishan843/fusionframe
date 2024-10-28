import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

const SelectFiels = ({ field, formik, options, handleChange, customProps ,error}) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id={`${field.name}-label`} size="small">
        {field.label}
      </InputLabel>
      <Select
        labelId={`${field.name}-label`}
        id={field.name}
        label={field.label}
        size="small"
        value={formik.values[field.name] || (field.name === 'status' ? 'active' : '')}
        onChange={handleChange}
        name={field.name}
        {...customProps}
        error={error}
      >
        {options?.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {formik.touched[field.name] && formik.errors[field.name] && (
        <FormHelperText error>{formik.errors[field.name]}</FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectFiels;