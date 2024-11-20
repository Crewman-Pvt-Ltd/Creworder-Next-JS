import React, { useState } from "react";
import {
  CardContent,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import CustomCard from "../CustomCard";
import CustomLabel from "../CustomLabel";
import CustomTextField from "../CustomTextField";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const PixelSettings = ({ onAdd, onEdit }) => {
  const [formValues, setFormValues] = useState({
    google_analytics: "",
    meta: "",
    other: "",
  });

  const [errors, setErrors] = useState({
    google_analytics: false,
    meta: false,
    other: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const newErrors = {
      google_analytics: formValues.google_analytics.trim() === "",
      meta: formValues.meta.trim() === "",
      other: formValues.other.trim() === "",
    };

    setErrors(newErrors);
    if (!newErrors.google_analytics && !newErrors.meta && !newErrors.other) {
      console.log("Form submitted successfully:", formValues);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <CustomCard>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  className={poppins.className}
                  sx={{ fontSize: "18px", fontWeight: "600" }}
                >
                  Pixel Settings
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="google_analytics" required>
                  <b>Google Analytics</b>
                </CustomLabel>
                <CustomTextField
                  id="google_analytics"
                  name="google_analytics"
                  type="text"
                  placeholder=""
                  value={formValues.google_analytics}
                  onChange={handleChange}
                  required
                  multiline
                  rows={8}
                  fullWidth
                  error={errors.google_analytics} 
                  helperText={errors.google_analytics && "This field is required"} 
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="meta" required>
                  <b>Meta Pixel Code</b>
                </CustomLabel>
                <CustomTextField
                  id="meta"
                  name="meta"
                  type="text"
                  value={formValues.meta}
                  onChange={handleChange}
                  required
                  multiline
                  rows={8}
                  fullWidth
                  error={errors.meta} 
                  helperText={errors.meta && "This field is required"} 
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="other" required>
                  <b>Other Pixel Code</b>
                </CustomLabel>
                <CustomTextField
                  id="other"
                  name="other"
                  type="text"
                  value={formValues.other}
                  onChange={handleChange}
                  required
                  multiline
                  rows={8}
                  fullWidth
                  error={errors.other} 
                  helperText={errors.other && "This field is required"}
                />
              </Grid>

              <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  sx={{
                    backgroundColor: "#405189",
                    color: "white",
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default PixelSettings;
