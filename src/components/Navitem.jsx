import React, { useState } from 'react';
import { Box, Typography, Collapse } from '@mui/material';
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: "300",
  subsets: ['latin']
});


const Navitem = ({ name, children, icon, onClick }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
    if (onClick) {
      onClick();
    }
  };
  return (
    <Box>
      <Box
        sx={{
          padding: 1,
          marginBottom: 1,
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          '&:hover': {
            backgroundColor: '#c0c0c0',
          },
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        {icon && <Box sx={{ marginRight: 1 }}>{icon}</Box>}
        <Typography>{name}</Typography>
      </Box>
      <Collapse in={open}>
        {children}
      </Collapse>
    </Box>
  );
};

export default Navitem;
