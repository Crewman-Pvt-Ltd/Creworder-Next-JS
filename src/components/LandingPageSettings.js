import React, { useState } from "react";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "./CustomLabel";
import CustomCard from "./CustomCard";
import UploadFileIcon from "@mui/icons-material/CloudUpload";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import KeyOffIcon from "@mui/icons-material/KeyOff";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { Poppins } from "next/font/google";
import {
  Typography,
  Grid,
  CardContent,
  Divider,
  Box,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";

import {
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  LockOpen as LockOpenIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

const poppins = Poppins({
  weight: "300",
  subsets: ["latin"],
});

const LandingPageSettings = () => {
  const [activeSection, setActiveSection] = useState("slider");

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12} sm={12} md={12} m={2} sx={{ display: "flex", gap: 2 }}>
        <Button
          onClick={() => handleSectionChange("slider")}
          sx={{
            padding: "8px 16px",
            fontSize: "14px",
            backgroundColor: activeSection === "slider" ? "#405189" : "white",
            color: activeSection === "slider" ? "white" : "#405189",
            border: activeSection === "slider" ? "none" : "2px solid #405189",
            "&:hover": {
              backgroundColor:
                activeSection === "slider" ? "#334a6c" : "#f0f0f0",
            },
            display: "flex",
            alignItems: "center",
            gap: 1,
            textTransform: "none",
          }}
        >
          <AddIcon sx={{ fontSize: 20 }} />
          Slider Section
        </Button>
        <Button
          onClick={() => handleSectionChange("features")}
          sx={{
            padding: "8px 16px",
            fontSize: "14px",
            border: activeSection === "features" ? "none" : "2px solid #405189",
            color: activeSection === "features" ? "#405189" : "white",
            backgroundColor: activeSection === "features" ? "white" : "#405189",
            "&:hover": {
              backgroundColor:
                activeSection === "features" ? "#f0f0f0" : "#334a6c",
            },
            display: "flex",
            alignItems: "center",
            gap: 1,
            textTransform: "none",
          }}
        >
          <AddIcon sx={{ fontSize: 20 }} />
          Product features
        </Button>
        <Button
          onClick={() => handleSectionChange("testimonials")}
          sx={{
            padding: "8px 16px",
            fontSize: "14px",
            border:
              activeSection === "testimonials" ? "none" : "2px solid #405189",
            color: activeSection === "testimonials" ? "#405189" : "white",
            backgroundColor:
              activeSection === "testimonials" ? "white" : "#405189",
            "&:hover": {
              backgroundColor:
                activeSection === "testimonials" ? "#f0f0f0" : "#334a6c",
            },
            display: "flex",
            alignItems: "center",
            gap: 1,
            textTransform: "none",
          }}
        >
          <ImportExportIcon sx={{ fontSize: 20 }} />
          Testimonials
        </Button>

        <Button
          onClick={() => handleSectionChange("highlights")}
          sx={{
            padding: "8px 16px",
            fontSize: "14px",
            border:
              activeSection === "highlights" ? "none" : "2px solid #405189",
            color: activeSection === "highlights" ? "#405189" : "white",
            backgroundColor:
              activeSection === "highlights" ? "white" : "#405189",
            "&:hover": {
              backgroundColor:
                activeSection === "highlights" ? "#f0f0f0" : "#334a6c",
            },
            display: "flex",
            alignItems: "center",
            gap: 1,
            textTransform: "none",
          }}
        >
          <ImportExportIcon sx={{ fontSize: 20 }} />
          Highlights
        </Button>

        <Button
          onClick={() => handleSectionChange("clients")}
          sx={{
            padding: "8px 16px",
            fontSize: "14px",
            border: activeSection === "clients" ? "none" : "2px solid #405189",
            color: activeSection === "clients" ? "#405189" : "white",
            backgroundColor: activeSection === "clients" ? "white" : "#405189",
            "&:hover": {
              backgroundColor:
                activeSection === "clients" ? "#f0f0f0" : "#334a6c",
            },
            display: "flex",
            alignItems: "center",
            gap: 1,
            textTransform: "none",
          }}
        >
          <KeyOffIcon sx={{ fontSize: 20 }} />
          Clients
        </Button>

        <Button
          onClick={() => handleSectionChange("settings")}
          sx={{
            padding: "8px 16px",
            fontSize: "14px",
            border: activeSection === "settings" ? "none" : "2px solid #405189",
            color: activeSection === "settings" ? "#405189" : "white",
            backgroundColor: activeSection === "settings" ? "white" : "#405189",
            "&:hover": {
              backgroundColor:
                activeSection === "settings" ? "#f0f0f0" : "#334a6c",
            },
            display: "flex",
            alignItems: "center",
            gap: 1,
            textTransform: "none",
          }}
        >
          <DeleteForeverIcon sx={{ fontSize: 20 }} />
          Settings
        </Button>
      </Grid>

      <Grid item xs={12} md={12} sm={12}>
        <CustomCard>
          <CardContent>
            {activeSection === "slider" && (
              <>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "600",
                    fontFamily: poppins.style.fontFamily,
                  }}
                >
                  Slider Section
                </Typography>
                <Divider sx={{ my: 2 }} />

                {/* Slider Section Content */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "600",
                        fontFamily: poppins.style.fontFamily,
                      }}
                    >
                      First Section
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <CustomLabel htmlFor="heading" required>
                      Heading
                    </CustomLabel>
                    <CustomTextField
                      id="heading"
                      name="heading"
                      placeholder="e.g. heading"
                      type="text"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <CustomLabel htmlFor="subheading" required>
                      Subheading
                    </CustomLabel>
                    <CustomTextField
                      id="subheading"
                      name="subheading"
                      type="text"
                      placeholder="e.g. subheading"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <CustomLabel htmlFor="emailtextbutton" required>
                      Email Text Button
                    </CustomLabel>
                    <CustomTextField
                      id="emailtextbutton"
                      name="emailtextbutton"
                      type="text"
                      placeholder="e.g. button text"
                      fullWidth
                    />
                    <CustomLabel htmlFor="belowtextheading" required>
                      Below Text Heading
                    </CustomLabel>
                    <CustomTextField
                      id="belowtextheading"
                      name="belowtextheading"
                      type="text"
                      placeholder="e.g. Heading"
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ fontFamily: poppins.style.fontFamily }}
                      >
                        Image
                        <Tooltip title="Upload your front website logo here">
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
                        sx={{ cursor: "pointer" }}
                      >
                        <UploadFileIcon fontSize="large" />
                        <Typography
                          variant="body2"
                          sx={{ ml: 1, fontFamily: poppins.style.fontFamily }}
                        >
                          Choose a file
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </>
            )}

            {activeSection === "features" && (
              <>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "600",
                    fontFamily: poppins.style.fontFamily,
                  }}
                >
                  Product features
                </Typography>
                <Divider sx={{ my: 2 }} />

                {/* Product Features Content */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6}>
                    <CustomLabel htmlFor="secondsectiontitle" required>
                      Title
                    </CustomLabel>
                    <CustomTextField
                      id="secondsectiontitle"
                      name="secondsectiontitle"
                      type="text"
                      placeholder="e.g. secondsectiontitle"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <CustomLabel htmlFor="subtitle" required>
                      Sub Title
                    </CustomLabel>
                    <CustomTextField
                      id="subtitle"
                      name="subtitle"
                      type="text"
                      placeholder="e.g. subtitle"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <CustomLabel htmlFor="featureonetitle" required>
                      Feature 1 title
                    </CustomLabel>
                    <CustomTextField
                      id="featureonetitle"
                      name="featureonetitle"
                      type="text"
                      placeholder="e.g. featureonetitle"
                      fullWidth
                    />
                    <CustomLabel htmlFor="featureonesubtitle" required>
                      Feature 1 Subtitle
                    </CustomLabel>
                    <CustomTextField
                      id="featureonesubtitle"
                      name="featureonesubtitle"
                      type="text"
                      placeholder="e.g. featureonesubtitle"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ fontFamily: poppins.style.fontFamily }}
                      >
                        Image
                        <Tooltip title="Upload your front website logo here">
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
                        sx={{ cursor: "pointer" }}
                      >
                        <UploadFileIcon fontSize="large" />
                        <Typography
                          variant="body2"
                          sx={{ ml: 1, fontFamily: poppins.style.fontFamily }}
                        >
                          Choose a file
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <CustomLabel htmlFor="featuretwotitle" required>
                      Feature 2 title
                    </CustomLabel>
                    <CustomTextField
                      id="featuretwotitle"
                      name="featuretwotitle"
                      type="text"
                      placeholder="e.g. featuretwotitle"
                      fullWidth
                    />
                    <CustomLabel htmlFor="featuretwosubtitle" required>
                      Feature 2 Subtitle
                    </CustomLabel>
                    <CustomTextField
                      id="featuretwosubtitle"
                      name="featuretwosubtitle"
                      type="text"
                      placeholder="e.g. featuretwosubtitle"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ fontFamily: poppins.style.fontFamily }}
                      >
                        Image
                        <Tooltip title="Upload your front website logo here">
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
                        sx={{ cursor: "pointer" }}
                      >
                        <UploadFileIcon fontSize="large" />
                        <Typography
                          variant="body2"
                          sx={{ ml: 1, fontFamily: poppins.style.fontFamily }}
                        >
                          Choose a file
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <CustomLabel htmlFor="featurethirdtitle" required>
                      Feature 3 title
                    </CustomLabel>
                    <CustomTextField
                      id="featurethirdtitle"
                      name="featurethirdtitle"
                      type="text"
                      placeholder="e.g. Title"
                      fullWidth
                    />
                    <CustomLabel htmlFor="featurethirdtitle" required>
                      Feature 3 Subtitle
                    </CustomLabel>
                    <CustomTextField
                      id="featurethirdsubtitle"
                      name="featurethirdsubtitle"
                      type="text"
                      placeholder="e.g. Sub title"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ fontFamily: poppins.style.fontFamily }}
                      >
                        Image 3
                        <Tooltip title="Upload your front website logo here">
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
                        sx={{ cursor: "pointer" }}
                      >
                        <UploadFileIcon fontSize="large" />
                        <Typography
                          variant="body2"
                          sx={{ ml: 1, fontFamily: poppins.style.fontFamily }}
                        >
                          Choose a file
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </>
            )}

            {activeSection === "testimonials" && (
              <>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    fontFamily: poppins.style.fontFamily,
                  }}
                >
                  Testimonials
                </Typography>
                <Divider sx={{ my: 2 }} />

                {/* Testimonials Content */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6}>
                    <CustomLabel htmlFor="testimonialtitle" required>
                      Title
                    </CustomLabel>
                    <CustomTextField
                      id="testimonialtitle"
                      name="testimonialtitle"
                      type="text"
                      placeholder="e.g. testimonialtitle"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <CustomLabel htmlFor="testimonial" required>
                      Testimonial
                    </CustomLabel>
                    <CustomTextField
                      id="testimonial"
                      name="testimonial"
                      type="text"
                      placeholder="e.g. testimonial"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <CustomLabel htmlFor="headingtestimonial" required>
                      Heading
                    </CustomLabel>
                    <CustomTextField
                      id="headingtestimonial"
                      name="headingtestimonial"
                      type="text"
                      placeholder="e.g. headingtestimonial"
                      fullWidth
                    />
                    <CustomLabel htmlFor="testimonialsubheading" required>
                      Subheading
                    </CustomLabel>
                    <CustomTextField
                      id="testimonialsubheading"
                      name="testimonialsubheading"
                      type="text"
                      placeholder="e.g. Sub title"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ fontFamily: poppins.style.fontFamily }}
                      >
                        Testimonial Image
                        <Tooltip title="Upload your front website logo here">
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
                        sx={{ cursor: "pointer" }}
                      >
                        <UploadFileIcon fontSize="large" />
                        <Typography
                          variant="body2"
                          sx={{ ml: 1, fontFamily: poppins.style.fontFamily }}
                        >
                          Choose a file
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </>
            )}

            {activeSection === "highlights" && (
              <>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "600",
                    fontFamily: poppins.style.fontFamily,
                  }}
                >
                  Highlights
                </Typography>
                <Divider sx={{ my: 2 }} />

                {/* Highlights Content */}
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                <CustomLabel htmlFor="highlightsheading" required>
                  Heading
                </CustomLabel>
                <CustomTextField
                  id="highlightsheading"
                  name="highlightsheading"
                  type="text"
                  placeholder="e.g. heading"
                  fullWidth
                />
                <CustomLabel htmlFor="highlightssubheading" required>
                  Subheading
                </CustomLabel>
                <CustomTextField
                  id="highlightssubheading"
                  name="highlightssubheading"
                  type="text"
                  placeholder="e.g. Sub title"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Box>
                  <Typography
                    variant="body1"
                    sx={{ fontFamily: poppins.style.fontFamily }}
                  >
                    Highlights Image
                    <Tooltip title="Upload your front website logo here">
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
                    sx={{ cursor: "pointer" }}
                  >
                    <UploadFileIcon fontSize="large" />
                    <Typography
                      variant="body2"
                      sx={{ ml: 1, fontFamily: poppins.style.fontFamily }}
                    >
                      Choose a file
                    </Typography>
                  </Box>
                </Box>
              </Grid>
                </Grid>
              </>
            )}

            {activeSection === "clients" && (
              <>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "600",
                    fontFamily: poppins.style.fontFamily,
                  }}
                >
                  Clients
                </Typography>
                <Divider sx={{ my: 2 }} />

                {/* Clients Content */}
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                <CustomLabel htmlFor="highlightsheading" required>
                  Heading
                </CustomLabel>
                <CustomTextField
                  id="highlightsheading"
                  name="highlightsheading"
                  type="text"
                  placeholder="e.g. heading"
                  fullWidth
                />
                <CustomLabel htmlFor="highlightssubheading" required>
                  Subheading
                </CustomLabel>
                <CustomTextField
                  id="highlightssubheading"
                  name="highlightssubheading"
                  type="text"
                  placeholder="e.g. Sub title"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Box>
                  <Typography
                    variant="body1"
                    sx={{ fontFamily: poppins.style.fontFamily }}
                  >
                    Clients Image
                    <Tooltip title="Upload your front website logo here">
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
                    sx={{ cursor: "pointer" }}
                  >
                    <UploadFileIcon fontSize="large" />
                    <Typography
                      variant="body2"
                      sx={{ ml: 1, fontFamily: poppins.style.fontFamily }}
                    >
                      Choose a file
                    </Typography>
                  </Box>
                </Box>
              </Grid>
                </Grid>
              </>
            )}

            {activeSection === "settings" && (
              <>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "600",
                    fontFamily: poppins.style.fontFamily,
                  }}
                >
                  Social Media Settings
                </Typography>
                <Divider sx={{ my: 2 }} />

                {/* Deleted Users Content */}
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                <CustomLabel htmlFor="highlightsheading" required>
                  About Company Heading
                </CustomLabel>
                <CustomTextField
                  id="highlightsheading"
                  name="highlightsheading"
                  type="text"
                  placeholder="e.g. heading"
                  fullWidth
                />
                <CustomLabel htmlFor="highlightssubheading" required>
                  Tag Lines for company
                </CustomLabel>
                <CustomTextField
                  id="highlightssubheading"
                  name="highlightssubheading"
                  type="text"
                  placeholder="e.g. Sub title"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Box>
                  <Typography
                    variant="body1"
                    sx={{ fontFamily: poppins.style.fontFamily }}
                  >
                    logo Image
                    <Tooltip title="Upload your front website logo here">
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
                    sx={{ cursor: "pointer" }}
                  >
                    <UploadFileIcon fontSize="large" />
                    <Typography
                      variant="body2"
                      sx={{ ml: 1, fontFamily: poppins.style.fontFamily }}
                    >
                      Choose a file
                    </Typography>
                  </Box>
                </Box>
              </Grid>
                </Grid>
              </>
            )}
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default LandingPageSettings;
