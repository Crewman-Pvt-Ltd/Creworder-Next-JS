import React, { useState } from 'react';
import { Box, Typography, Collapse } from '@mui/material';

const Navitem = ({ name, children, onClick }) => {
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
          '&:hover': {
            backgroundColor: '#c0c0c0',
          },
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        <Typography>{name}</Typography>
      </Box>
      <Collapse in={open}>
        {children}
      </Collapse>
    </Box>
  );
};

export default Navitem;
