// components/CustomTextField.jsx

import React from 'react';
import { TextField } from '@mui/material';

const CustomTextField = (props) => {
  return (
    <TextField
      // defaultValue="68585"
      {...props}
      InputProps={{
        style: { lineHeight: 1.5 }, 
      }}
      InputLabelProps={{
        style: { lineHeight: 1.5 },
      }}
      sx={{
        '& .MuiInputBase-input': {
          padding: '6px 12px',
        },
        '& .MuiFormLabel-root': {
          lineHeight: 1.5, 
        },
      }}
    />
  );
};

export default CustomTextField;
