import React from "react";
import { Box, Button, Typography } from "@mui/material";
/* import { getToken } from "../../api-manage/getToken";
import MainApi from "../../api-manage/MainApi";
import login from "../../api-manage/ApiRoutes"; */
import axios from "axios";

const LoginPage = () => {
    const data = axios.post( "http://127.0.0.1:8000/dj-rest-auth/login/" ,{
        username : "priya",
        password : "Admin@123"
    });
    console.log("Data", data);

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
                <Box sx={{ marginTop: 2 }}>
                    <Typography
                        variant="body1"
                        component="label"
                        htmlFor="username-email"
                    >
                        Email
                    </Typography>
                    <Box
                        component="input"
                        id="username-email"
                        name="username-email"
                        type="email"
                        fullWidth
                        sx={{
                            width: "100%",
                            marginTop: 1,
                            padding: 1,
                            border: "1px solid #ccc",
                            borderRadius: 1,
                        }}
                    />
                </Box>
                <Box sx={{ marginTop: 2 }}>
                    <Typography
                        variant="body1"
                        component="label"
                        htmlFor="password"
                    >
                        Password
                    </Typography>
                    <Box
                        component="input"
                        id="password"
                        name="password"
                        type="password"
                        fullWidth
                        sx={{
                            width: "100%",
                            marginTop: 1,
                            padding: 1,
                            border: "1px solid #ccc",
                            borderRadius: 1,
                        }}
                    />
                </Box>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                >
                    Login
                </Button>
            </Box>
        </Box>
    );
};

export default LoginPage;
