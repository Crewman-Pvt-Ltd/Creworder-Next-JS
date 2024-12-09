import React, { useState } from 'react';
import { Box, Typography, Collapse } from '@mui/material';
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: "300",
  subsets: ['latin']
});

const Navitem = ({ name, children, icon, onClick, active }) => {
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
          color: active ? 'white' : 'inherit',
          '&:hover': {
            color: 'white',
          },
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        {icon && <Box sx={{ marginRight: 1 }}>{icon}</Box>}
        <Typography sx={{
          fontSize:"15px",
          fontFamily:"sans-serif",
        }}>{name}</Typography>
      </Box>
      <Collapse in={open}>
        {children}
      </Collapse>
    </Box>
  );
};

export default Navitem;
