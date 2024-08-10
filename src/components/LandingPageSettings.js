import React from "react";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "./CustomLabel";
import CustomCard from "./CustomCard";
import UploadFileIcon from "@mui/icons-material/CloudUpload";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Poppins } from "next/font/google";
import {
  Typography,
  Grid,
  CardContent,
  Divider,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";

const poppins = Poppins({
  weight: "300",
  subsets: ["latin"],
});

const LandingPageSettings = () => {
  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12} md={12} sm={12}>
        <CustomCard>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "600",
                    fontFamily: poppins.style.fontFamily,
                  }}
                >
                  Landing Page Settings
                </Typography>
                <Divider sx={{ my: 2 }} />
              </Grid>

              <Grid item xs={12} sm={6} md={12}>
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

              <Grid item xs={12} sm={12} md={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "600",
                    fontFamily: poppins.style.fontFamily,
                  }}
                >
                  Product features
                </Typography>
              </Grid>

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
              <Grid item xs={12} sm={12} md={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={6} md={12}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    fontFamily: poppins.style.fontFamily,
                  }}
                >
                  Testimonials
                </Typography>
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
              <Grid item xs={12} sm={12} md={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={6} md={12}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    fontFamily: poppins.style.fontFamily,
                  }}
                >
                  Highlights
                </Typography>
              </Grid>

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
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default LandingPageSettings;
