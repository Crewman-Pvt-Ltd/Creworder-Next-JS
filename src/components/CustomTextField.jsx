// components/CustomTextField.jsx

import React from 'react';
import { TextField } from '@mui/material';

const CustomTextField = (props) => {
  return (
    <TextField
      defaultValue="68585"
      {...props}
      InputProps={{
        style: { lineHeight: 1.5 }, // Default line height
      }}
      InputLabelProps={{
        style: { lineHeight: 1.5 }, // Default line height for the label
      }}
      sx={{
        '& .MuiInputBase-input': {
          padding: '8px 12px', // Default padding
        },
        '& .MuiFormLabel-root': {
          lineHeight: 1.5, // Default line height for the label
        },
      }}
    />
  );
};

export default CustomTextField;
