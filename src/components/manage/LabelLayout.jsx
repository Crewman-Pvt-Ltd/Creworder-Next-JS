import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormControl,
  FormGroup,
  Dialog,
  DialogContent,
} from "@mui/material";
import CustomCard from "../CustomCard";
import LabelPreview from "./LabelPreview"; // Import the new LabelPreview component

const LabelLayout = () => {
  const [labelFormat, setLabelFormat] = useState("4.5x6.25");
  const [preferences, setPreferences] = useState({
    codPrepaidValue: true,
    shipperAddress: true,
    supportNumberEmail: false,
    mobileNumber: true,
    hideProductName: false,
    hideCompanyLogo: true,
  });
  const [openDialog, setOpenDialog] = useState(false);

  const handleLabelFormatChange = (event) => {
    setLabelFormat(event.target.value);
  };

  const handlePreferenceChange = (event) => {
    setPreferences({
      ...preferences,
      [event.target.name]: event.target.checked,
    });
  };

  const handlePreview = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Grid container spacing={2} sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard padding="20px">
          <Typography
            variant="h5"
            sx={{ fontWeight: "500", marginBottom: "10px", color: "#405189" }}
          >
            Select Shipping Label Format
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="label-format"
              name="label-format"
              value={labelFormat}
              onChange={handleLabelFormatChange}
            >
              <FormControlLabel
                value="4.5x6.25"
                control={<Radio />}
                label="4.5'' x 6.25'' (Suitable for Standard Desktop Printer)"
              />
              <FormControlLabel
                value="4x6"
                control={<Radio />}
                label="4'' x 6'' (Suitable for Thermal Label Printer)"
              />
            </RadioGroup>
          </FormControl>
        </CustomCard>
      </Grid>

      <Grid item xs={12}>
        <CustomCard padding="20px">
          <Typography
            variant="h5"
            sx={{
              fontWeight: "500",
              marginBottom: "10px",
              color: "#405189",
            }}
          >
            Other Label Preferences
          </Typography>

          <FormGroup>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={preferences.codPrepaidValue}
                      onChange={handlePreferenceChange}
                      name="codPrepaidValue"
                    />
                  }
                  label="Display Order Value in COD and Prepaid label"
                />
                <Typography variant="body2" color="textSecondary">
                  Note: For couriers like Fedex, Bluedart, Delhivery, etc.
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={preferences.mobileNumber}
                      onChange={handlePreferenceChange}
                      name="mobileNumber"
                    />
                  }
                  label="Display Shipper's Mobile Number in Label"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={preferences.shipperAddress}
                      onChange={handlePreferenceChange}
                      name="shipperAddress"
                    />
                  }
                  label="Display Shipper's Address in Label"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={preferences.supportNumberEmail}
                      onChange={handlePreferenceChange}
                      name="supportNumberEmail"
                    />
                  }
                  label="Display Your Support Number & Email in Label"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={preferences.hideProductName}
                      onChange={handlePreferenceChange}
                      name="hideProductName"
                    />
                  }
                  label="Hide Product Name in Label"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={preferences.hideCompanyLogo}
                      onChange={handlePreferenceChange}
                      name="hideCompanyLogo"
                    />
                  }
                  label="Dispaly Company Logo"
                />
              </Grid>
            </Grid>
          </FormGroup>
        </CustomCard>
      </Grid>

      <Grid item xs={12}>
        <Grid container justifyContent="space-between" spacing={2}>
          <Grid item>
            <Button
              onClick={handlePreview}
              variant="outlined"
              sx={{
                borderColor: "#405189",
                color: "#405189",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              Preview Label
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#405189",
                color: "white",
                "&:hover": {
                  backgroundColor: "#334a6c",
                },
              }}
            >
              Save Preferences
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Dialog for Previewing the Label */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent
          style={{ width: labelFormat === "4.5x6.25" ? "1200px" : "auto" }}
        >
          {labelFormat === "4.5x6.25" ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "16px",
              }}
            >
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index}>
                  <LabelPreview preferences={preferences} />
                </div>
              ))}
            </div>
          ) : (
            <LabelPreview preferences={preferences} />
          )}
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default LabelLayout;
