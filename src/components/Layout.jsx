import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Box } from '@mui/material';
const Layout = ({ children }) => {
    return (
        <Box
        sx={{
          display: 'flex',
          height: '100vh',
          flexDirection: 'column', 
        }}
      >
        <Header />
     
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1, 
            backgroundColor:'#f3f3f9',
          }}
        >
          <Sidebar />
          <Box
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflowY: 'hidden', 
          }}
        >
          {children}
        </Box>
        </Box>
        
      </Box>
           
    
    );
};

export default Layout;
