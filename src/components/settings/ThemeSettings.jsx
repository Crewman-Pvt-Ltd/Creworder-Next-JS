import React, { useState } from "react";
import CustomCard from "../CustomCard";
import {
  Typography,
  Divider,
  Grid,
  Button,
  CardContent,
  Tooltip,
  IconButton,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import UploadFileIcon from "@mui/icons-material/CloudUpload";
import CustomLabel from "../CustomLabel";
import CustomTextField from "../CustomTextField";

const sampleImages = [
  "https://demo-saas.worksuite.biz/img/square-logo-header.png",
  "https://demo-saas.worksuite.biz/img/full-logo-header.png",
];

const ThemeSettings = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [lightModeLogo, setLightModeLogo] = useState(null);
  const [darkModeLogo, setDarkModeLogo] = useState(null);
  const [invoiceLogo, setInvoiceLogo] = useState(null);
  const [signatureLogo, setSignatureLogo] = useState(null);
  const handleLightModeChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLightModeLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDarkModeChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setDarkModeLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const [logo, setLogo] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handleTemplateSelect = (index) => {
    setSelectedTemplate(index);
  };

  const handleInvoiceLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setInvoiceLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSignatureLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };
  return (
    <CustomCard>
      <CardContent>
        <Typography variant="h5">Theme Settings</Typography>
        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <CustomLabel htmlFor="appname" required>
                  App Name
                </CustomLabel>
                <CustomTextField
                  id="appname"
                  name="appname"
                  placeholder="e.g. creworder"
                  type="text"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={4}>
            <Typography variant="h6" gutterBottom>
              Template
            </Typography>
            <Grid container spacing={1}>
              {sampleImages.map((image, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box
                    border={1}
                    borderColor={
                      selectedTemplate === index ? "blue" : "grey.300"
                    }
                    borderRadius="4px"
                    p={1}
                    textAlign="center"
                    onClick={() => handleTemplateSelect(index)}
                    sx={{
                      cursor: "pointer",
                      border:
                        selectedTemplate === index
                          ? "2px solid blue"
                          : "1px solid grey.300",
                    }}
                  >
                    <img
                      src={image}
                      alt={`Template ${index + 1}`}
                      style={{ width: "100%", height: "130px" }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Box>
              <Typography variant="body1">
                Front Website Logo
                <Tooltip title="Upload your logo here">
                  <IconButton>
                    <HelpOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="150px"
                border="1px solid grey"
                borderRadius="4px"
                mt={2}
                overflow="hidden"
                position="relative"
                sx={{ cursor: "pointer" }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                />
                {logo ? (
                  <img
                    src={logo}
                    alt="Uploaded Logo"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <UploadFileIcon fontSize="large" />
                    <Typography variant="body2" color="textSecondary">
                      Choose a file
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Box>
              <Typography variant="body1">
                Light Mode Logo
                <Tooltip title="Upload the authorised signatory's signature here">
                  <IconButton>
                    <HelpOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="150px"
                border="1px dashed grey"
                borderRadius="4px"
                mt={2}
                sx={{ cursor: "pointer", position: "relative" }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLightModeChange}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                />
                {lightModeLogo ? (
                  <img
                    src={lightModeLogo}
                    alt="Light Mode Logo"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <>
                    <UploadFileIcon fontSize="large" />
                    <Typography variant="body2">Choose a file</Typography>
                  </>
                )}
              </Box>
            </Box>
          </Grid>

          {/* Dark Mode Logo */}
          <Grid item xs={12} sm={4} md={4}>
            <Box>
              <Typography variant="body1">
                Dark Mode Logo
                <Tooltip title="Upload the authorised signatory's signature here">
                  <IconButton>
                    <HelpOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="150px"
                border="1px dashed grey"
                borderRadius="4px"
                mt={2}
                sx={{ cursor: "pointer", position: "relative" }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleDarkModeChange}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                />
                {darkModeLogo ? (
                  <img
                    src={darkModeLogo}
                    alt="Dark Mode Logo"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <>
                    <UploadFileIcon fontSize="large" />
                    <Typography variant="body2">Choose a file</Typography>
                  </>
                )}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant="body1">
                Invoice Logo
                <Tooltip title="Upload your invoice logo here">
                  <IconButton>
                    <HelpOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="150px"
                border="1px dashed grey"
                borderRadius="4px"
                mt={2}
                sx={{ cursor: "pointer", position: "relative" }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleInvoiceLogoChange}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                />
                {invoiceLogo ? (
                  <img
                    src={invoiceLogo}
                    alt="Invoice Logo"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <>
                    <UploadFileIcon fontSize="large" />
                    <Typography variant="body2">Choose a file</Typography>
                  </>
                )}
              </Box>
            </Box>
          </Grid>

          {/* Authorised Signatory Signature */}
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant="body1">
                Authorised Signatory Signature
                <Tooltip title="Upload the authorised signatory's signature here">
                  <IconButton>
                    <HelpOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="150px"
                border="1px dashed grey"
                borderRadius="4px"
                mt={2}
                sx={{ cursor: "pointer", position: "relative" }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSignatureChange}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                />
                {signatureLogo ? (
                  <img
                    src={signatureLogo}
                    alt="Signatory Signature"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <>
                    <UploadFileIcon fontSize="large" />
                    <Typography variant="body2">Choose a file</Typography>
                  </>
                )}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <CustomLabel htmlFor="logobgcolor" required>
                  Login Screen Logo's background Color
                </CustomLabel>
                <CustomTextField
                  id="logobgcolor"
                  name="logobgcolor"
                  placeholder="e.g. creworder"
                  type="text"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  Public Pages Theme
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <CustomLabel htmlFor="primarycolor" required>
                  Primary Color
                </CustomLabel>
                <CustomTextField
                  id="primarycolor"
                  name="primarycolor"
                  placeholder="e.g. creworder"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <CustomLabel htmlFor="publicpagetheme" required>
                  Public Pages Theme
                </CustomLabel>
                <div style={{}}>
                  <FormControlLabel
                    control={<Checkbox name="dark" />}
                    label="Dark"
                  />
                  <FormControlLabel
                    control={<Checkbox name="light" />}
                    label="Light"
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item xs={12} sm={12} md={12} mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  Super Admin Panel Theme
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <CustomLabel htmlFor="primarycolor" required>
                  Primary Color
                </CustomLabel>
                <CustomTextField
                  id="primarycolor"
                  name="primarycolor"
                  placeholder="e.g. creworder"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <CustomLabel htmlFor="sidebartheme" required>
                  Sidebar Theme
                </CustomLabel>
                <div style={{}}>
                  <FormControlLabel
                    control={<Checkbox name="dark" />}
                    label="Dark"
                  />
                  <FormControlLabel
                    control={<Checkbox name="light" />}
                    label="Light"
                  />
                </div>
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
            sx={{
              backgroundColor: "#405189",
              color: "white",
              "&:hover": {
                backgroundColor: "#405189",
              },
            }}
          >
            Save
          </Button>
          <Button
            sx={{
              ml: 1,
              backgroundColor: "#405189",
              color: "white",
              "&:hover": {
                backgroundColor: "#405189",
              },
            }}
          >
            Use Default Theme
          </Button>
        </Box>
      </CardContent>
    </CustomCard>
  );
};

export default ThemeSettings;
