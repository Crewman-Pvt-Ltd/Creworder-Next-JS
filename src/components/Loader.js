import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #3498db30, #8e44ad5e)', 
        color: '#fff', 
        textAlign: 'center',
        p: 3, 
      }}
    >
      <CircularProgress
        size={70}
        thickness={3}
        sx={{
          color: '#fff', 
          mb: 3,
          animation: 'spin 1.5s linear infinite', 
        }}
      />
      <Typography
        variant="h4"
        component="div"
        sx={{
          fontSize: '24px',
          fontWeight: 'bold',
          mb: 2,
        }}
      >
        Please wait...
      </Typography>
     
    </Box>
  );
}

export default Loader;
