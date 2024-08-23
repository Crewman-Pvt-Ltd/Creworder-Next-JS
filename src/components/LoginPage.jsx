// src/components/LoginPage.js
import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import creworderLogo from "../images/crewordernewlogo.png";

const LoginPage = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        minHeight: "100vh",
        backgroundColor: "#f3f3f9",
        overflow: "hidden", // Ensure no overflow issues
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: { xs: "100%", md: "30%" }, // Responsive width
          backgroundColor: "#ffffff",
          padding: 3,
          boxShadow: 3,
          borderRadius: 1,
        }}
      >
        <Image
          src={creworderLogo}
          alt="Creworder Logo"
          width={370}
          height={100} // Ensure the height is appropriate for your design
        />
        <Typography mt={2} gutterBottom color="#a6a6a6">
          Please Signin to continue.
        </Typography>
        {children}
      </Box>
     
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: 'url("https://affiman.com/login/resources/assets/img/login.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          margin:8,
        //   width: { xs: "100%", md: "70%" }, 
        }}
      >
 
      </Box>
    </Box>
  );
};

export default LoginPage;
