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
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";

const ThemeSettings = () => {
  const token = getToken();
  const [formData, setFormData] = useState({
    name: "",
    dark_logo: null,
    light_logo: null,
    favicon_logo: null,
    invoice_logo: null,
    signature: null,
    primary_color_code: "",
    page_theme: "light",
    branch: 6,
    company: 10,
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      const response = await MainApi.post("/api/theme-setting/", form, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
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
                <CustomLabel htmlFor="name" required>
                  App Name
                </CustomLabel>
                <CustomTextField
                  id="name"
                  name="name"
                  placeholder="e.g. creworder"
                  type="text"
                  fullWidth
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Grid>

          
          {[
            { label: "Front Website Logo", name: "favicon_logo" },
            { label: "Light Mode Logo", name: "light_logo" },
            { label: "Dark Mode Logo", name: "dark_logo" },
            { label: "Invoice Logo", name: "invoice_logo" },
            { label: "Authorised Signatory Signature", name: "signature" },
          ].map((item, index) => (
            <Grid item xs={12} sm={4} md={4} key={index}>
              <Box>
                <Typography variant="body1">
                  {item.label}
                  <Tooltip
                    title={`Upload your ${item.label.toLowerCase()} here`}
                  >
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
                    name={item.name}
                    onChange={handleInputChange}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      opacity: 0,
                      cursor: "pointer",
                    }}
                  />
                  {formData[item.name] ? (
                    <img
                      src={URL.createObjectURL(formData[item.name])}
                      alt={item.label}
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
          ))}

          {/* Color and Theme settings */}
          <Grid item xs={12} sm={6}>
            <CustomLabel htmlFor="primary_color_code" required>
              Primary Color
            </CustomLabel>
            <CustomTextField
              id="primary_color_code"
              name="primary_color_code"
              placeholder="e.g. #405189"
              type="text"
              fullWidth
              value={formData.primary_color_code}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomLabel htmlFor="page_theme" required>
              Public Pages Theme
            </CustomLabel>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.page_theme === "dark"}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        page_theme: "dark",
                      }))
                    }
                  />
                }
                label="Dark"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.page_theme === "light"}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        page_theme: "light",
                      }))
                    }
                  />
                }
                label="Light"
              />
            </div>
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
            sx={{
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: "bold",
              backgroundColor: "#405189",
              color: "white",
              "&:hover": { backgroundColor: "#334a6c" },
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            sx={{
              ml: 1,
              backgroundColor: "#405189",
              color: "white",
              "&:hover": { backgroundColor: "#405189" },
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
