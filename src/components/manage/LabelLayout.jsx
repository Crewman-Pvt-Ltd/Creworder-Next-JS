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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import CustomCard from "../CustomCard";
// Import Image component if necessary
// import Image from "next/image";
// import creworderLogo from "../../images/CO-logo.png";

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

  // Function to render the label box
  const renderLabelBox = () => (
    <Box
      sx={{
        border: "2px solid #000",
        padding: 2,
        width: "auto",
        bgcolor: "#f9f9f9",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">
            <strong>Deliver To:</strong>
          </Typography>
          <Typography>
            <b>Rahul Kumar,</b>
            <br />
            {preferences.shipperAddress && (
              <Typography variant="body1">
                House No.211, First Floor, Noida
                <br />
                Sector- 63 Uttar Pradesh, India - 201304
                <br />
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
            )}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ marginY: 1 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography>
            Order Date: <strong>25/09/2024</strong>
          </Typography>
          <Typography>
            Invoice No: <strong>ORDER9202323</strong>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src="https://www.pngall.com/wp-content/uploads/2/Barcode-PNG-Images.png"
            alt="AWB Product Code"
            style={{ maxWidth: "80%", height: "auto" }} // Ensuring responsive image
          />
        </Grid>
      </Grid>
      <Divider sx={{ marginY: 1 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
          <Typography>
            <strong style={{ fontSize: "24px" }}>COD:</strong>
          </Typography>
          <Typography>
            <strong style={{ fontSize: "22px" }}>₹2000</strong>
          </Typography>
          <Typography>Weight: 1.5 KG</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2zmm39pKpY2coD0De8cWvlLdZUBzHE9z8Ie7Yu0RiygKZAaAvT5yb2mXvqwj-E5DePhE&usqp=CAU"
            alt="AWB Product Code"
            style={{ maxWidth: "80%", height: "auto" }} // Ensuring responsive image
          />
          <Typography>Dimensions: 12x12x12</Typography>
        </Grid>
      </Grid>
      <Divider />
      <TableContainer>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell style={{ padding: "4px 8px" }}>
                <Typography>
                  <strong>SKU</strong>
                </Typography>
              </TableCell>
              <TableCell style={{ padding: "4px 8px" }}>
                <Typography>
                  <strong>OPSKU9844</strong>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ padding: "4px 8px" }}>
                <Typography>
                  <strong>Quantity</strong>
                </Typography>
              </TableCell>
              <TableCell style={{ padding: "4px 8px" }}>
                <Typography>
                  <strong>2</strong>
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body1">
        <strong>Pickup and Return Address:</strong>
        <br /> New Delhi, 110095
      </Typography>
      <Divider />
      <Typography variant="body1" style={{ fontSize: "14px" }}>
        This is a system generated document, hence does not require signature.
        <br />
        <strong>Note:</strong> All disputes are subject to Delhi jurisdiction.
        Goods once sold will only be taken back or exchanged as per the store
        exchange/return policy.
      </Typography>
    </Box>
  );

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
        <DialogContent
          style={{ width: labelFormat === "4.5x6.25" ? "1200px" : "auto" }}
        >
          {labelFormat === "4.5x6.25" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "16px",
              }}
            >
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index}>{renderLabelBox()}</div>
              ))}
            </div>
          )}
          {labelFormat === "4x6" && <>{renderLabelBox()}</>}
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default LabelLayout;
