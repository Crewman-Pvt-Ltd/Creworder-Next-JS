// src/components/LoginPage.js
import React from "react";
import { Box, Button, Typography } from "@mui/material";

const LoginPage = ({ children }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundColor: "#f3f3f9",
                padding: 3,
            }}
        >
            <Box
                sx={{
                    width: 300,
                    padding: 3,
                    backgroundColor: "white",
                    boxShadow: 3,
                    borderRadius: 2,
                }}
            >
                <Typography
                    variant="h5"
                    component="h1"
                    align="center"
                    gutterBottom
                >
                    Login
                </Typography>
                {children}
            </Box>
        </Box>
    );
};

export default LoginPage;
