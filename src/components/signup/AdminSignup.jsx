import React, { useState } from "react";
import { Grid, Button, Typography, Box } from "@mui/material";
import Image from "next/image";
import creworderLogo from "../../images/creworderlogo.png";
import MainApi from "@/api-manage/MainApi";
import { useRouter } from "next/router";
import bgimage from "../../images/backgroundloginimage.png";
import { Poppins } from "next/font/google";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const inputStyles = {
  width: "100%",

  padding: 1,
  border: "1px solid #ccc",
  borderRadius: 1,
  outline: "none",
  "&:focus": {
    borderColor: "#ccc",
  },
};

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    contact_no: "",
    company: {
      name: "",
      company_email: "",
      company_phone: "",
      company_address: "",
      company_website: "",
    },
  });





  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nameParts = name.split(".");

    if (nameParts.length > 1) {
      setFormData((prevData) => ({
        ...prevData,
        [nameParts[0]]: {
          ...prevData[nameParts[0]],
          [nameParts[1]]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      user: {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        contact_no: formData.contact_no,
        company: formData.company,
      },
    };

    try {
      const response = await MainApi.post("/api/self-signup/", payload);

      if (response.status === 201) {
        router.push("/dashboard");
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("An error occurred during signup", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        overflow: "hidden",
        position: "relative",
        flexDirection: "column",
        fontFamily: poppins.style.fontFamily,
      }}
    >
      <Box
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
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          top: "12vh",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
        }}
      >
        <Image
          src={creworderLogo}
          alt="Creworder Logo"
          width={180}
          height={100}
        />
        <Typography
          sx={{ mt: 2, textAlign: "center", color: "#e3e3e3" }}
          className={poppins.className}
        >
          "Building better customer relationships, one interaction at a time."
        </Typography>
      </Box>

      {/* Overlay */}
      <Box
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
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "90%", md: "50%" },
          bgcolor: "#ffffff",
          padding: 4,
          borderRadius: 1,
          // boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)",
          position: "relative",
          zIndex: 1,
          mt: "30vh",
          fontFamily: poppins.style.fontFamily,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          textAlign="center"
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontWeight: "500",
            color: "#405189",
          }}
        >
          Create New Account
        </Typography>
        <Typography
          gutterBottom
          textAlign="center"
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontSize: "14px",
            color: "#9c9c9c",
            mb: 4,
          }}
        >
          Get your free creworder account now
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <Box>
              <Typography
                variant="body1"
                component="label"
                htmlFor="username"
                required
              >
                Full Name <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box
                component="input"
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                sx={inputStyles}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Box>
              <Typography variant="body1" component="label" htmlFor="email">
                Email <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box
                component="input"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                sx={inputStyles}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Box>
              <Typography variant="body1" component="label" htmlFor="password">
                Password <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box
                component="input"
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                sx={inputStyles}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Box>
              <Typography
                variant="body1"
                component="label"
                htmlFor="contact_no"
              >
                Contact Number <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box
                component="input"
                id="contact_no"
                name="contact_no"
                type="text"
                value={formData.contact_no}
                onChange={handleChange}
                sx={inputStyles}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Box>
              <Typography
                variant="body1"
                component="label"
                htmlFor="company_name"
              >
                Company Name <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box
                component="input"
                id="company_name"
                name="company.name"
                type="text"
                value={formData.company.name}
                onChange={handleChange}
                sx={inputStyles}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Box>
              <Typography
                variant="body1"
                component="label"
                htmlFor="company_email"
              >
                Company Email <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box
                component="input"
                id="company_email"
                name="company.company_email"
                type="email"
                value={formData.company.company_email}
                onChange={handleChange}
                sx={inputStyles}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Box>
              <Typography
                variant="body1"
                component="label"
                htmlFor="company_phone"
              >
                Company Phone <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box
                component="input"
                id="company_phone"
                name="company.company_phone"
                type="text"
                value={formData.company.company_phone}
                onChange={handleChange}
                sx={inputStyles}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Box>
              <Typography
                variant="body1"
                component="label"
                htmlFor="company_website"
              >
                Company Website <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box
                component="input"
                id="company_website"
                name="company.company_website"
                type="url"
                value={formData.company.company_website}
                onChange={handleChange}
                sx={inputStyles}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Box>
              <Typography
                variant="body1"
                component="label"
                htmlFor="company_address"
              >
                Company Address <span style={{ color: "red" }}>*</span>
              </Typography>
              <Box
                component="textarea"
                id="company_address"
                name="company.company_address"
                rows={2}
                value={formData.company.company_address}
                onChange={handleChange}
                required
                sx={{
                  width: "100%",
                  marginTop: 1,
                  padding: 1,
                  border: "1px solid #ccc",
                  borderRadius: 1,
                  outline: "none",
                  resize: "vertical",
                  "&:focus": {
                    borderColor: "#ccc",
                  },
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Typography
              sx={{
                color: "#8c8c8c",
                fontSize: "13px",
              }}
              className={poppins.className}
            >
              By registering you agree to the Velzon Terms of Use
            </Typography>
          </Grid>
        </Grid>
        <Button
          // fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2, backgroundColor: "#0ab39c" }}
        >
          Sign Up
        </Button>
        <Typography mt={2} align="center" gutterBottom>
          <Box component="span" sx={{ color: "lightgray", marginRight: "8px" }}>
            --------------------
          </Box>
          <Box component="span" sx={{ color: "gray" }}>
            Create Account With
          </Box>
          <Box component="span" sx={{ color: "lightgray", marginLeft: "8px" }}>
            -------------------
          </Box>
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mt: 2,
          }}
        >
          <GoogleIcon sx={{ cursor: "pointer", color: "#DB4437" }} />
          <FacebookIcon sx={{ cursor: "pointer", color: "#4267B2" }} />
          <TwitterIcon sx={{ cursor: "pointer", color: "#1DA1F2" }} />
          <InstagramIcon sx={{ cursor: "pointer", color: "#C13584" }} />
        </Box>
        <Typography variant="body1" color="red" mt={2}></Typography>
      </Box>
      <Box
        sx={{
          mb: 6,
        }}
      >
        <Typography
          sx={{
            marginTop: 2,
            fontSize: "13px",
            color: "#303030",
          }}
          className={poppins.className}
        >
          Already have an account ?
          <span
            style={{ color: "#405189", cursor: "pointer" }}
            className={poppins.className}
          >
            <b>Signin</b>
          </span>
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminSignup;
