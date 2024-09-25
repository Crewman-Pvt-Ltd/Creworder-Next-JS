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
  Box,
  Divider,
} from "@mui/material";
import CustomCard from "../CustomCard";
import Image from "next/image";
import creworderLogo from "../../images/CO-logo.png";
const CreateLabel = () => {
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

  // Handle change for label format radio buttons
  const handleLabelFormatChange = (event) => {
    setLabelFormat(event.target.value);
  };

  // Handle checkbox change
  const handlePreferenceChange = (event) => {
    setPreferences({
      ...preferences,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = () => {
    console.log("Selected Label Format:", labelFormat);
    console.log("Preferences:", preferences);
    // Implement save preferences logic here
  };

  const handlePreview = () => {
    // Open the dialog to preview the label
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
            sx={{              
              fontWeight: "500",
              marginBottom: "10px",
              color: "#405189",
            }}
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
            <Typography variant="body2" sx={{ marginTop: 1, color: "#8c8c8c" }}>
              Note: The 4'' x 6'' label will be used for all courier partners
              except Bluedart.
            </Typography>
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
              onClick={handleSubmit}
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
        <DialogContent>
          <Box
            sx={{
              border: "2px solid #000",
              padding: 2,
              width: "500px",
              bgcolor: "#f9f9f9",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={7}>
                <Typography variant="h5">Shipping Label</Typography>
                <Typography>
                  <strong>Ship To:</strong>
                  <br />
                  Rahul Kumar,
                  <br />
                  {preferences.shipperAddress && (
                    <Typography variant="body1">
                      House No.211,
                      <br />
                      First Floor, Noida
                      <br />
                      Sector- 63 UP, India - 201304
                    </Typography>
                  )}
                </Typography>
              </Grid>
              <Grid item xs={12} md={5}>
              {preferences.hideCompanyLogo && (
              <Image
                src={creworderLogo}
                style={{ cursor: "pointer" }}
                alt="Creworder Logo"
                sx={{
                  backgroundColor: "black",
                }}
                 />
              )}
              </Grid>
            </Grid>
            <Divider sx={{ marginY: 2 }} />
            <Grid container spacing={2} ml={1}>
              <Grid item xs={12} md={6}>
                <img
                  src="https://pngimg.com/uploads/barcode/barcode_PNG30.png"
                  alt="AWB Product Code"
                  style={{ maxWidth: "80%", height: "auto" }} // Ensuring responsive image
                />
                <Typography>
                  <strong>AWB:</strong> PRODUCT987
                </Typography>
                <Typography>
                  <strong>Routing Code:</strong> <strong>DEL/KRB</strong>
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <img
                  src="https://pngimg.com/uploads/barcode/barcode_PNG30.png"
                  alt="AWB Product Code"
                  style={{ maxWidth: "80%", height: "auto" }} // Ensuring responsive image
                />
              </Grid>
            </Grid>
            <Divider sx={{ marginY: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">
                  Dimensions: 12.00x12.00x12.00
                </Typography>
                <Typography variant="body1">Payment Mode: COD</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">Weight: 1Kg</Typography>
                <Typography variant="body1">
                  Item(s): Tshirts + 1 more.....
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="body1">
              <b>Shipped By:</b> Laxmi Nagar New Delhi, 110095 <br />
              {preferences.mobileNumber && (
                <>
                  Phone: 9110998103
                  <br />
                </>
              )}
              {preferences.supportNumberEmail && (
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  Email: test@gmail.com
                </Typography>
              )}
            </Typography>

            <Typography variant="body1">
              <b>Order #</b>: PRODUCT987
            </Typography>
            <Typography variant="body1">
              <b>Product Description:</b> Tshirt + 1 Items | SKU: 1111 | Qty: 2{" "}
              <br></br> <b>Total Amount: Rs.180.00</b>
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default CreateLabel;
