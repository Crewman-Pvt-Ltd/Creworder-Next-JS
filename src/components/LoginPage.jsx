import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import creworderLogo from "../images/crewordernewlogo.png";
import bgimage from "../images/backgroundloginimage.png";
import { Poppins } from "next/font/google"; // Importing the Poppins font

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const LoginPage = ({ children }) => {
  return (
    <Box
    className={poppins.className}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
       className={poppins.className}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "50vh",
          backgroundImage: `url(${bgimage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
        }}
      />

      <Box
       className={poppins.className}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "50vh",
          backgroundColor: "rgba(64, 81, 137, 0.7)", 
          zIndex: 0,
        }}
      />

      <Box
       className={poppins.className}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "100%", md: "30%" },
          backgroundColor: "#ffffff",
          padding: 3,
          borderRadius: 1,
          // boxShadow: 3,
          zIndex: 1,
        }}
      >
        <Image
          src={creworderLogo}
          alt="Creworder Logo"
          width={140}
          height={100}
        />
        <Typography mt={2} gutterBottom color="#a6a6a6" fontSize="14px" className={poppins.className}>
          Please Sign in to continue.
        </Typography>
        {children}
      </Box>

      <Typography
        sx={{
          marginTop: 2,
          fontSize: "13px",
          color:"#303030",
        }} className={poppins.className}
      >
        Don't have an account?
        <span style={{ color: "#405189", cursor: "pointer" }} className={poppins.className}>
       
          <b>Signup</b>
        </span>
      </Typography>
    </Box>
  );
};

export default LoginPage;
