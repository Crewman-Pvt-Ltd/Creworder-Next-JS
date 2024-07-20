import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Box } from '@mui/material';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Sidebar isOpen={isSidebarOpen} />
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header onMenuClick={handleMenuClick} />
        <Box
          sx={{
            flexGrow: 1,
            // padding: 2,
            overflowY: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;

