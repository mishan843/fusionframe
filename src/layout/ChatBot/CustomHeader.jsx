// CustomHeader.jsx
import React from 'react';
import { IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const CustomHeader = ({ onBackClick }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px', backgroundColor: '#007bff', color: 'white', borderRadius: '4px 4px 0 0' }}>
      <IconButton onClick={onBackClick} style={{ color: 'white', marginRight: '10px' }}>
        <ArrowBackIosIcon />
      </IconButton>
      <Typography>Chat with Our Team</Typography>
    </div>
  );
};

export default CustomHeader;