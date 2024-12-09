// components/CustomLabel.jsx

import React from 'react';
import { Typography } from '@mui/material';
import { Poppins } from "next/font/google";

// Importing the Poppins font with weight 300
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const CustomLabel = ({ htmlFor, children, required = false }) => {
  return (
    <Typography
      variant="body1"
      component="label"
      htmlFor={htmlFor}
      sx={{ fontSize: '13px', color: 'black' ,
        fontFamily: poppins.style.fontFamily 
      }}
    >
      {children} {required && <span style={{ color: 'red' }}>*</span>}
    </Typography>
  );
};

export default CustomLabel;
