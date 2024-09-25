import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Pinterest as PinterestIcon,
} from "@mui/icons-material";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const ForgotPassword = () => {
  const [formValues, setFormValues] = useState({
    mainTitle: "Change Password Request",
    icon: null,
    bodyMessage:
      "The following user has forgotten his password & requested to change/reset their password.",
    footerText:
      "Please contact us for any queries; we’re always happy to help.",
    pageLinks: {
      privacyPolicy: true,
      refundPolicy: true,
      cancelationPolicy: true,
      contactUs: false,
    },
    socialMedia: {
      facebook: true,
      instagram: true,
      twitter: true,
      linkedin: true,
      pinterest: false,
    },
    copyRight: "© 2024 Creworder. All rights reserved.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormValues((prevValues) => ({
          ...prevValues,
          icon: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuillChange = (content) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      bodyMessage: content,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const { pageLinks, socialMedia } = formValues;

    if (name in pageLinks) {
      setFormValues((prevValues) => ({
        ...prevValues,
        pageLinks: { ...pageLinks, [name]: checked },
      }));
    } else if (name in socialMedia) {
      setFormValues((prevValues) => ({
        ...prevValues,
        socialMedia: { ...socialMedia, [name]: checked },
      }));
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={5}>
          <Box
            sx={{
              padding: 5,
              borderRadius: 2,
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",

              height: "auto",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <img
                src={formValues.icon || "/mnt/data/ss1.png"}
                alt="Profile Icon"
                style={{ width: 80, height: 80, borderRadius: "50%" }}
              />
            </Box>
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <Typography variant="h6">{formValues.mainTitle}</Typography>
            </Box>

            <Box mt={2}>
              <Typography
                sx={{
                  color: "#75868f",
                  fontSize: "14px",
                }}
                dangerouslySetInnerHTML={{ __html: formValues.bodyMessage }}
              />
            </Box>
            <Box mt={2}>
              <Typography
                className={poppins.className}
                sx={{
                  color: "blue",
                  fontSize: "12px",
                }}
              >
                Generate Links
              </Typography>
            </Box>
            <Box mt={2}>
              <Divider />
            </Box>
            <Box mt={3}>
              <Typography
                className={poppins.className}
                sx={{
                  fontSize: "13px",
                  color: "#75868f",
                }}
              >
                {formValues.footerText}
              </Typography>
              <Typography
                className={poppins.className}
                sx={{
                  fontSize: "13px",
                  color: "#75868f",
                }}
              >
                Thanks & Regards, <br />
                Creworder - Your Daily Needs App
              </Typography>

              <Box textAlign="center">
                <List style={{ padding: 0 }}>
                  {formValues.pageLinks.privacyPolicy && (
                    <ListItem style={{ display: "inline", padding: 0 }}>
                      <span style={{ marginRight: 4, fontSize: "30px" }}>•</span>
                      <Typography variant="caption">Privacy Policy</Typography>
                    </ListItem>
                  )}
                  {formValues.pageLinks.refundPolicy && (
                    <ListItem style={{ display: "inline", padding: 0 }}>
                      <span style={{ marginRight: 4, fontSize: "30px" }}>•</span>
                      <Typography variant="caption">Refund Policy</Typography>
                    </ListItem>
                  )}
                  {formValues.pageLinks.cancelationPolicy && (
                    <ListItem style={{ display: "inline", padding: 0 }}>
                      <span style={{ marginRight: 4, fontSize: "30px" }}>•</span>
                      <Typography variant="caption">
                        Cancelation Policy
                      </Typography>
                    </ListItem>
                  )}
                  {formValues.pageLinks.contactUs && (
                    <ListItem style={{ display: "inline", padding: 0 }}>
                      <span style={{ marginRight: 4, fontSize: "30px" }}>•</span>
                      <Typography variant="caption">Contact Us</Typography>
                    </ListItem>
                  )}
                </List>
              </Box>

              <Box mt={3} display="flex" justifyContent="center">
                {formValues.socialMedia.facebook && (
                  <IconButton
                    aria-label="Facebook"
                    component="a"
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon />
                  </IconButton>
                )}
                {formValues.socialMedia.instagram && (
                  <IconButton
                    aria-label="Instagram"
                    component="a"
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon />
                  </IconButton>
                )}
                {formValues.socialMedia.twitter && (
                  <IconButton
                    aria-label="Twitter"
                    component="a"
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TwitterIcon />
                  </IconButton>
                )}
                {formValues.socialMedia.linkedin && (
                  <IconButton
                    aria-label="LinkedIn"
                    component="a"
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedInIcon />
                  </IconButton>
                )}
                {formValues.socialMedia.pinterest && (
                  <IconButton
                    aria-label="Pinterest"
                    component="a"
                    href="https://www.pinterest.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <PinterestIcon />
                  </IconButton>
                )}
              </Box>
              <Box display="flex" justifyContent="center">
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#75868f",
                  }}
                  className={poppins.className}
                  mt={2}
                >
                  {formValues.copyRight}
                </Typography>
              </Box>
            </Box>
          </Box>
      </Grid>

      <Grid item xs={12} md={7}>
        <Box
          component="form"
          sx={{
            // backgroundColor: "#fff",
            padding: 3,
            borderRadius: 2,
            // boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box>
          <Typography
                className={poppins.className}
                sx={{
                  color: "#4f4f4f",
                  fontWeight: "500",
                  padding: 1,
                }}
              >
               Icon
              </Typography>
          <input
            type="file"
            accept="*"
            onChange={handleFileChange}
            style={{ marginTop: "16px", width: "100%" }}
          />
          </Box>
       

          <Box mt={2}>
            <Box>
              <Typography
                className={poppins.className}
                sx={{
                  color: "#4f4f4f",
                  fontWeight: "500",
                  padding: 1,
                }}
              >
                Header Content
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#f8f9fc",
                  borderRadius: "10px",
                  padding: "18px",
                }}
              >
                <Typography
                  className={poppins.className}
                  sx={{
                    color: "#4f4f4f",
                    fontWeight: "400",
                    fontSize: "15px",
                  }}
                >
                  Main Title(Default)
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="mainTitle"
                  value={formValues.mainTitle}
                  onChange={handleChange}
                  sx={{
                    backgroundColor: "white",
                  }}
                />

                <Box mt={2}>
                  <Typography
                    sx={{
                      color: "#4f4f4f",
                      fontWeight: "400",
                      fontSize: "15px",
                    }}
                  >
                    Mail Body Message (Default)
                  </Typography>
                  <ReactQuill
                    value={formValues.bodyMessage}
                    onChange={handleQuillChange}
                    placeholder="Enter your mail body content..."
                    style={{
                      height: "",
                      marginBottom: "20px",
                      backgroundColor: "white",
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography
                className={poppins.className}
                sx={{
                  color: "#4f4f4f",
                  fontWeight: "500",
                  padding: 1,
                }}
              >
                Footer Content
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#f8f9fc",
                  borderRadius: "10px",
                  padding: "18px",
                }}
              >
                <Typography
                  className={poppins.className}
                  sx={{
                    color: "#4f4f4f",
                    fontWeight: "400",
                    fontSize: "15px",
                  }}
                >
                  Section Text (Default)
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="footerText"
                  value={formValues.footerText}
                  onChange={handleChange}
                  sx={{
                    backgroundColor: "white",
                  }}
                />

                <Box>
                  <Typography
                    className={poppins.className}
                    sx={{
                      color: "#4f4f4f",
                      fontWeight: "400",
                      fontSize: "13px",
                    }}
                  >
                    Page Links
                  </Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formValues.pageLinks.privacyPolicy}
                        onChange={handleCheckboxChange}
                        name="privacyPolicy"
                        sx={{ transform: "scale(0.8)" }}
                      />
                    }
                    label={
                      <Typography
                        className={poppins.className}
                        sx={{ fontSize: "13px" }}
                      >
                        Privacy Policy
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formValues.pageLinks.refundPolicy}
                        onChange={handleCheckboxChange}
                        name="refundPolicy"
                        sx={{ transform: "scale(0.8)" }}
                      />
                    }
                    label={
                      <Typography
                        className={poppins.className}
                        sx={{ fontSize: "13px" }}
                      >
                        Refund Policy
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formValues.pageLinks.cancelationPolicy}
                        onChange={handleCheckboxChange}
                        name="cancelationPolicy"
                        sx={{ transform: "scale(0.8)" }}
                      />
                    }
                    label={
                      <Typography
                        className={poppins.className}
                        sx={{ fontSize: "13px" }}
                      >
                        Cancelation Policy
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formValues.pageLinks.contactUs}
                        onChange={handleCheckboxChange}
                        name="contactUs"
                        sx={{ transform: "scale(0.8)" }}
                      />
                    }
                    label={
                      <Typography
                        className={poppins.className}
                        sx={{ fontSize: "13px" }}
                      >
                        Contact Us
                      </Typography>
                    }
                  />
                </Box>

                <Box mt={2}>
                  <Typography
                    className={poppins.className}
                    variant="body1"
                    mb={1}
                    sx={{ fontSize: "13px" }}
                  >
                    Social Media Links
                  </Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formValues.socialMedia.facebook}
                        onChange={handleCheckboxChange}
                        name="facebook"
                        sx={{ transform: "scale(0.8)" }}
                      />
                    }
                    label={
                      <Typography
                        className={poppins.className}
                        sx={{ fontSize: "13px" }}
                      >
                        Facebook
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formValues.socialMedia.instagram}
                        onChange={handleCheckboxChange}
                        name="instagram"
                        sx={{ transform: "scale(0.8)" }}
                      />
                    }
                    label={
                      <Typography
                        className={poppins.className}
                        sx={{ fontSize: "13px" }}
                      >
                        Instagram
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formValues.socialMedia.twitter}
                        onChange={handleCheckboxChange}
                        name="twitter"
                        sx={{ transform: "scale(0.8)" }}
                      />
                    }
                    label={
                      <Typography
                        className={poppins.className}
                        sx={{ fontSize: "13px" }}
                      >
                        Twitter
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formValues.socialMedia.linkedin}
                        onChange={handleCheckboxChange}
                        name="linkedin"
                        sx={{ transform: "scale(0.8)" }}
                      />
                    }
                    label={
                      <Typography
                        className={poppins.className}
                        sx={{ fontSize: "13px" }}
                      >
                        LinkedIn
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formValues.socialMedia.pinterest}
                        onChange={handleCheckboxChange}
                        name="pinterest"
                        sx={{ transform: "scale(0.8)" }}
                      />
                    }
                    label={
                      <Typography
                        className={poppins.className}
                        sx={{ fontSize: "13px" }}
                      >
                        Pinterest
                      </Typography>
                    }
                  />
                </Box>

                <Box>
                  <Typography
                    className={poppins.className}
                    variant="body1"
                    sx={{ fontSize: "13px" }}
                  >
                    Copyright Content (Default)
                  </Typography>
                  <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    name="copyRight"
                    value={formValues.copyRight}
                    onChange={handleChange}
                    sx={{
                      backgroundColor: "white",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box mt={2}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Submit
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
