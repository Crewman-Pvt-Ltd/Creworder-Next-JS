import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";

const Layout = ({ children, type }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      
      }}
    >
      <Sidebar isOpen={isSidebarOpen} type={type}/>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header onMenuClick={handleMenuClick} type={type}/>
        <Box
          sx={{
            flexGrow: 1,           
            overflowY: "scroll",
            transition: "width 0.2s ease",
            "&::-webkit-scrollbar": {
              overflow: "hidden",
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
