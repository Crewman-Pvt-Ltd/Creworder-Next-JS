import React, { useState } from "react";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "./CustomLabel";
import CustomCard from "./CustomCard";
import UploadFileIcon from "@mui/icons-material/CloudUpload";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ReviewsIcon from "@mui/icons-material/Reviews";
import HighlightIcon from "@mui/icons-material/Highlight";
import HandshakeIcon from "@mui/icons-material/Handshake";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import DeleteIcon from "@mui/icons-material/Delete";
import { Poppins } from "next/font/google";
import {
  Typography,
  Grid,
  CardContent,
  Divider,
  Tabs,
  Tab,
  Box,
  Tooltip,
  IconButton,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
const poppins = Poppins({
  weight: "300",
  subsets: ["latin"],
});

const initialData = [
  {
    id: 1,
    heading:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer",
    created: "2023-07-14",
  },
];

const LandingPageSettings = () => {
  const [activeSection, setActiveSection] = useState("slider");
  const [selectedFile, setSelectedFile] = useState(null);
  const [sliderFile, setSliderFile] = useState(null);
  const [featuresFile, setFeaturesFile] = useState(null);
  const [testimonialsFile, setTestimonialsFile] = useState(null);
  const [highlightsFile, setHighlightsFile] = useState(null);
  const [clientsFile, setClientsFile] = useState(null);
  const [settingsFile, setSettingsFile] = useState(null);
  const [data, setData] = useState(initialData);
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (activeSection === "slider") {
        setSliderFile(file);
      } else if (activeSection === "features") {
        setFeaturesFile(file);
      } else if (activeSection === "testimonials") {
        setTestimonialsFile(file);
      } else if (activeSection === "highlights") {
        setHighlightsFile(file);
      } else if (activeSection === "clients") {
        setClientsFile(file);
      } else if (activeSection === "settings") {
        setSettingsFile(file);
      }
    }
  };

  const HeaderCell = (props) => (
    <TableCell
      sx={{
        fontSize: "1rem",
        whiteSpace: "nowrap",
        fontWeight: "500",
        textTransform: "capitalize",
        color: "black",
      }}
      {...props}
    />
  );

  const DataCell = (props) => (
    <TableCell
      sx={{
        color: "#999999",
        fontSize: "14px",
        whiteSpace: "nowrap",
        fontWeight: "500",
        textTransform: "capitalize",
      }}
      {...props}
    />
  );

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12} sm={12} md={12}>
        <CustomCard>
          <CardContent>
            <Grid container spacing={2}>
              <Tabs
                value={activeSection}
                onChange={(event, newValue) => handleSectionChange(newValue)}
                TabIndicatorProps={{
                  style: { display: "none" },
                }}
                sx={{
                  display: "flex",
                  // m: 2,
                  alignItems: "center",
                  "& .MuiTabs-flexContainer": {
                    display: "flex",
                  },
                }}
              >
                <Tab
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <HomeWorkIcon sx={{ fontSize: 20 }} />
                      <Typography>Home</Typography>
                    </Box>
                  }
                  value="slider"
                  sx={{
                    fontSize: "14px",
                    color: activeSection === "slider" ? "#00796b" : "black",
                    backgroundColor:
                      activeSection === "slider" ? "#eff2f7" : "transparent",
                    borderTop:
                      activeSection === "slider" ? "3px solid #00796b" : "none",
                    borderBottom:
                      activeSection !== "slider" ? "1px solid #d6d6d6" : "none",
                    textTransform: "none",
                    "& .MuiSvgIcon-root": {
                      color: activeSection === "slider" ? "#00796b" : "black", // Color for icon
                    },
                    "& .MuiTypography-root": {
                      color: activeSection === "slider" ? "#00796b" : "black", // Color for text
                    },
                    "&:hover": {
                      color: "#405189",
                    },
                  }}
                />
                <Tab
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <ProductionQuantityLimitsIcon sx={{ fontSize: 20 }} />
                      <Typography>Product Features</Typography>
                    </Box>
                  }
                  value="features"
                  sx={{
                    fontSize: "14px",
                    color: activeSection === "features" ? "#00796b" : "black",
                    backgroundColor:
                      activeSection === "features" ? "#eff2f7" : "transparent",
                    borderTop:
                      activeSection === "features"
                        ? "3px solid #00796b"
                        : "none",
                    borderBottom:
                      activeSection !== "features"
                        ? "1px solid #d6d6d6"
                        : "none",
                    textTransform: "none",
                    "& .MuiSvgIcon-root": {
                      color: activeSection === "features" ? "#00796b" : "black", // Color for icon
                    },
                    "& .MuiTypography-root": {
                      color: activeSection === "features" ? "#00796b" : "black", // Color for text
                    },
                    "&:hover": {
                      color: "#405189",
                    },
                  }}
                />
                <Tab
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <ReviewsIcon sx={{ fontSize: 20 }} />
                      <Typography>Testimonials</Typography>
                    </Box>
                  }
                  value="testimonials"
                  sx={{
                    fontSize: "14px",
                    color:
                      activeSection === "testimonials" ? "#00796b" : "black",
                    backgroundColor:
                      activeSection === "testimonials"
                        ? "#eff2f7"
                        : "transparent",
                    borderTop:
                      activeSection === "testimonials"
                        ? "3px solid #00796b"
                        : "none",
                    borderBottom:
                      activeSection !== "testimonials"
                        ? "1px solid #d6d6d6"
                        : "none",
                    textTransform: "none",
                    "& .MuiSvgIcon-root": {
                      color:
                        activeSection === "testimonials" ? "#00796b" : "black", // Color for icon
                    },
                    "& .MuiTypography-root": {
                      color:
                        activeSection === "testimonials" ? "#00796b" : "black", // Color for text
                    },
                    "&:hover": {
                      color: "#405189",
                    },
                  }}
                />
                <Tab
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <HandshakeIcon sx={{ fontSize: 20 }} />
                      <Typography>Clients</Typography>
                    </Box>
                  }
                  value="clients"
                  sx={{
                    fontSize: "14px",
                    color: activeSection === "clients" ? "#00796b" : "black",
                    backgroundColor:
                      activeSection === "clients" ? "#eff2f7" : "transparent",
                    borderTop:
                      activeSection === "clients"
                        ? "3px solid #00796b"
                        : "none",
                    borderBottom:
                      activeSection !== "clients"
                        ? "1px solid #d6d6d6"
                        : "none",
                    textTransform: "none",
                    "& .MuiSvgIcon-root": {
                      color: activeSection === "clients" ? "#00796b" : "black", // Color for icon
                    },
                    "& .MuiTypography-root": {
                      color: activeSection === "clients" ? "#00796b" : "black", // Color for text
                    },
                    "&:hover": {
                      color: "#405189",
                    },
                  }}
                />
                <Tab
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <SettingsSuggestIcon sx={{ fontSize: 20 }} />
                      <Typography>Settings</Typography>
                    </Box>
                  }
                  value="settings"
                  sx={{
                    fontSize: "14px",
                    color: activeSection === "settings" ? "#00796b" : "black",
                    backgroundColor:
                      activeSection === "settings" ? "#eff2f7" : "transparent",
                    borderTop:
                      activeSection === "settings"
                        ? "3px solid #00796b"
                        : "none",
                    borderBottom:
                      activeSection !== "settings"
                        ? "1px solid #d6d6d6"
                        : "none",
                    textTransform: "none",
                    "& .MuiSvgIcon-root": {
                      color: activeSection === "settings" ? "#00796b" : "black", // Color for icon
                    },
                    "& .MuiTypography-root": {
                      color: activeSection === "settings" ? "#00796b" : "black", // Color for text
                    },
                    "&:hover": {
                      color: "#405189",
                    },
                  }}
                />
              </Tabs>

              <Grid item xs={12} md={12} sm={12}>
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

                          <div
                            style={{
                              border: "1px solid #ddd",
                              padding: "10px",
                              borderRadius: "4px",
                            }}
                          >
                            <input
                              type="file"
                              style={{ display: "none" }}
                              id="upload-slider-file"
                              onChange={handleFileChange}
                            />
                            <label
                              htmlFor="upload-slider-file"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100px",
                                border: "2px dashed #ddd",
                                cursor: "pointer",
                                borderRadius: "4px",
                              }}
                            >
                              <UploadFileIcon
                                sx={{ fontSize: 48, color: "#aaa" }}
                              />
                              <Typography>
                                {sliderFile ? sliderFile.name : "Choose a file"}
                              </Typography>
                            </label>
                          </div>
                        </Box>
                      </Grid>
                      <Button
                        type="submit"
                        sx={{
                          marginLeft: "20px",
                          padding: "8px 16px",
                          fontSize: "14px",
                          fontWeight: "bold",
                          backgroundColor: "#405189",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#334a6c",
                          },
                        }}
                      >
                        Submit
                      </Button>
                    </Grid>

                    <Grid>
                      <br></br>
                      <CustomCard>
                        <CardContent>
                          <TableContainer>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <HeaderCell>ID</HeaderCell>
                                  <HeaderCell>Heading</HeaderCell>
                                  <HeaderCell>Created Date</HeaderCell>
                                  <HeaderCell>Action</HeaderCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {data.map((row, index) => (
                                  <TableRow key={row.id}>
                                    <DataCell>{index + 1}.</DataCell>
                                    <DataCell>{row.heading}</DataCell>
                                    <DataCell>{row.created}</DataCell>
                                    <TableCell>
                                      <IconButton
                                        onClick={() => handleDelete(row.id)}
                                        aria-label="delete"
                                        sx={{ color: "red" }}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </CardContent>
                      </CustomCard>
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

                          <div
                            style={{
                              border: "1px solid #ddd",
                              padding: "10px",
                              borderRadius: "4px",
                            }}
                          >
                            <input
                              type="file"
                              style={{ display: "none" }}
                              id="upload-features-file"
                              onChange={handleFileChange}
                            />
                            <label
                              htmlFor="upload-features-file"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100px",
                                border: "2px dashed #ddd",
                                cursor: "pointer",
                                borderRadius: "4px",
                              }}
                            >
                              <UploadFileIcon
                                sx={{ fontSize: 48, color: "#aaa" }}
                              />
                              <Typography>
                                {featuresFile
                                  ? featuresFile.name
                                  : "Choose a file"}
                              </Typography>
                            </label>
                          </div>
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

                          <div
                            style={{
                              border: "1px solid #ddd",
                              padding: "10px",
                              borderRadius: "4px",
                            }}
                          >
                            <input
                              type="file"
                              style={{ display: "none" }}
                              id="upload-features-file"
                              onChange={handleFileChange}
                            />
                            <label
                              htmlFor="upload-features-file"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100px",
                                border: "2px dashed #ddd",
                                cursor: "pointer",
                                borderRadius: "4px",
                              }}
                            >
                              <UploadFileIcon
                                sx={{ fontSize: 48, color: "#aaa" }}
                              />
                              <Typography>
                                {featuresFile
                                  ? featuresFile.name
                                  : "Choose a file"}
                              </Typography>
                            </label>
                          </div>
                        </Box>
                      </Grid>
                      <Button
                        type="submit"
                        sx={{
                          marginLeft: "20px",
                          padding: "8px 16px",
                          fontSize: "14px",
                          fontWeight: "bold",
                          backgroundColor: "#405189",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#334a6c",
                          },
                        }}
                      >
                        Submit
                      </Button>
                    </Grid>
                    <Grid>
                      <br></br>
                      <CustomCard>
                        <CardContent>
                          <TableContainer>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <HeaderCell>ID</HeaderCell>
                                  <HeaderCell>Heading</HeaderCell>
                                  <HeaderCell>Created Date</HeaderCell>
                                  <HeaderCell>Action</HeaderCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {data.map((row, index) => (
                                  <TableRow key={row.id}>
                                    <DataCell>{index + 1}.</DataCell>
                                    <DataCell>{row.heading}</DataCell>
                                    <DataCell>{row.created}</DataCell>
                                    <TableCell>
                                      <IconButton
                                        onClick={() => handleDelete(row.id)}
                                        aria-label="delete"
                                        sx={{ color: "red" }}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </CardContent>
                      </CustomCard>
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

                          <div
                            style={{
                              border: "1px solid #ddd",
                              padding: "10px",
                              borderRadius: "4px",
                            }}
                          >
                            <input
                              type="file"
                              style={{ display: "none" }}
                              id="upload-testimonials-file"
                              onChange={handleFileChange}
                            />
                            <label
                              htmlFor="upload-testimonials-file"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100px",
                                border: "2px dashed #ddd",
                                cursor: "pointer",
                                borderRadius: "4px",
                              }}
                            >
                              <UploadFileIcon
                                sx={{ fontSize: 48, color: "#aaa" }}
                              />
                              <Typography>
                                {testimonialsFile
                                  ? testimonialsFile.name
                                  : "Choose a file"}
                              </Typography>
                            </label>
                          </div>
                        </Box>
                      </Grid>
                      <Button
                        type="submit"
                        sx={{
                          marginLeft: "20px",
                          padding: "8px 16px",
                          fontSize: "14px",
                          fontWeight: "bold",
                          backgroundColor: "#405189",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#334a6c",
                          },
                        }}
                      >
                        Submit
                      </Button>
                    </Grid>
                    <Grid>
                      <br></br>
                      <CustomCard>
                        <CardContent>
                          <TableContainer>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <HeaderCell>ID</HeaderCell>
                                  <HeaderCell>Heading</HeaderCell>
                                  <HeaderCell>Created Date</HeaderCell>
                                  <HeaderCell>Action</HeaderCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {data.map((row, index) => (
                                  <TableRow key={row.id}>
                                    <DataCell>{index + 1}.</DataCell>
                                    <DataCell>{row.heading}</DataCell>
                                    <DataCell>{row.created}</DataCell>
                                    <TableCell>
                                      <IconButton
                                        onClick={() => handleDelete(row.id)}
                                        aria-label="delete"
                                        sx={{ color: "red" }}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </CardContent>
                      </CustomCard>
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

                          <div
                            style={{
                              border: "1px solid #ddd",
                              padding: "10px",
                              borderRadius: "4px",
                            }}
                          >
                            <input
                              type="file"
                              style={{ display: "none" }}
                              id="upload-highlights-file"
                              onChange={handleFileChange}
                            />
                            <label
                              htmlFor="upload-highlights-file"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100px",
                                border: "2px dashed #ddd",
                                cursor: "pointer",
                                borderRadius: "4px",
                              }}
                            >
                              <UploadFileIcon
                                sx={{ fontSize: 48, color: "#aaa" }}
                              />
                              <Typography>
                                {highlightsFile
                                  ? highlightsFile.name
                                  : "Choose a file"}
                              </Typography>
                            </label>
                          </div>
                        </Box>
                      </Grid>
                      <Button
                        type="submit"
                        sx={{
                          marginLeft: "20px",
                          padding: "8px 16px",
                          fontSize: "14px",
                          fontWeight: "bold",
                          backgroundColor: "#405189",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#334a6c",
                          },
                        }}
                      >
                        Submit
                      </Button>
                    </Grid>
                    <Grid>
                      <br></br>
                      <CustomCard>
                        <CardContent>
                          <TableContainer>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <HeaderCell>ID</HeaderCell>
                                  <HeaderCell>Heading</HeaderCell>
                                  <HeaderCell>Created Date</HeaderCell>
                                  <HeaderCell>Action</HeaderCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {data.map((row, index) => (
                                  <TableRow key={row.id}>
                                    <DataCell>{index + 1}.</DataCell>
                                    <DataCell>{row.heading}</DataCell>
                                    <DataCell>{row.created}</DataCell>
                                    <TableCell>
                                      <IconButton
                                        onClick={() => handleDelete(row.id)}
                                        aria-label="delete"
                                        sx={{ color: "red" }}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </CardContent>
                      </CustomCard>
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

                          <div
                            style={{
                              border: "1px solid #ddd",
                              padding: "10px",
                              borderRadius: "4px",
                            }}
                          >
                            <input
                              type="file"
                              style={{ display: "none" }}
                              id="upload-clients-file"
                              onChange={handleFileChange}
                            />
                            <label
                              htmlFor="upload-clients-file"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100px",
                                border: "2px dashed #ddd",
                                cursor: "pointer",
                                borderRadius: "4px",
                              }}
                            >
                              <UploadFileIcon
                                sx={{ fontSize: 48, color: "#aaa" }}
                              />
                              <Typography>
                                {clientsFile
                                  ? clientsFile.name
                                  : "Choose a file"}
                              </Typography>
                            </label>
                          </div>
                        </Box>
                      </Grid>
                      <Button
                        type="submit"
                        sx={{
                          marginLeft: "20px",
                          padding: "8px 16px",
                          fontSize: "14px",
                          fontWeight: "bold",
                          backgroundColor: "#405189",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#334a6c",
                          },
                        }}
                      >
                        Submit
                      </Button>
                    </Grid>
                    <Grid>
                      <br></br>
                      <CustomCard>
                        <CardContent>
                          <TableContainer>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <HeaderCell>ID</HeaderCell>
                                  <HeaderCell>Heading</HeaderCell>
                                  <HeaderCell>Created Date</HeaderCell>
                                  <HeaderCell>Action</HeaderCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {data.map((row, index) => (
                                  <TableRow key={row.id}>
                                    <DataCell>{index + 1}.</DataCell>
                                    <DataCell>{row.heading}</DataCell>
                                    <DataCell>{row.created}</DataCell>
                                    <TableCell>
                                      <IconButton
                                        onClick={() => handleDelete(row.id)}
                                        aria-label="delete"
                                        sx={{ color: "red" }}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </CardContent>
                      </CustomCard>
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

                          <div
                            style={{
                              border: "1px solid #ddd",
                              padding: "10px",
                              borderRadius: "4px",
                            }}
                          >
                            <input
                              type="file"
                              style={{ display: "none" }}
                              id="upload-settings-file"
                              onChange={handleFileChange}
                            />
                            <label
                              htmlFor="upload-settings-file"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100px",
                                border: "2px dashed #ddd",
                                cursor: "pointer",
                                borderRadius: "4px",
                              }}
                            >
                              <UploadFileIcon
                                sx={{ fontSize: 48, color: "#aaa" }}
                              />
                              <Typography>
                                {settingsFile
                                  ? settingsFile.name
                                  : "Choose a file"}
                              </Typography>
                            </label>
                          </div>
                        </Box>
                      </Grid>
                      <Button
                        type="submit"
                        sx={{
                          marginLeft: "20px",
                          padding: "8px 16px",
                          fontSize: "14px",
                          fontWeight: "bold",
                          backgroundColor: "#405189",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#334a6c",
                          },
                        }}
                      >
                        Submit
                      </Button>
                    </Grid>
                    <Grid>
                      <br></br>
                      <CustomCard>
                        <CardContent>
                          <TableContainer>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <HeaderCell>ID</HeaderCell>
                                  <HeaderCell>Heading</HeaderCell>
                                  <HeaderCell>Created Date</HeaderCell>
                                  <HeaderCell>Action</HeaderCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {data.map((row, index) => (
                                  <TableRow key={row.id}>
                                    <DataCell>{index + 1}.</DataCell>
                                    <DataCell>{row.heading}</DataCell>
                                    <DataCell>{row.created}</DataCell>
                                    <TableCell>
                                      <IconButton
                                        onClick={() => handleDelete(row.id)}
                                        aria-label="delete"
                                        sx={{ color: "red" }}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </CardContent>
                      </CustomCard>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default LandingPageSettings;
