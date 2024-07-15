// components/CustomLabel.jsx

import React from 'react';
import { Typography } from '@mui/material';

const CustomLabel = ({ htmlFor, children, required = false }) => {
  return (
    <Typography
      variant="body1"
      component="label"
      htmlFor={htmlFor}
      sx={{ fontSize: '14px', color: 'black' }}
    >
      {children} {required && <span style={{ color: 'red' }}>*</span>}
    </Typography>
  );
};

export default CustomLabel;
