import React, { useState } from "react";
import {
  Box,
  Divider,
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import CustomCard from "../CustomCard";

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

  // Sample rows data
  const rows = [
    {
      id: 1,
      order_id: "PRXTW987",
      name: "Shivam",
      city: "Noida",
      product: "Weight loss",
      amount: "2024",
      status: "Pending",
      payment_mode: "COD",
      awb: "AWBNMBR98334433",
      order_date: "2024-08-01",
      action: "Edit",
    },
  ];

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
              {Object.keys(preferences).map((key) => (
                <Grid item xs={12} sm={6} key={key}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={preferences[key]}
                        onChange={handlePreferenceChange}
                        name={key}
                      />
                    }
                    label={
                      key === "codPrepaidValue"
                        ? "Display Order Value in COD and Prepaid label"
                        : key === "shipperAddress"
                        ? "Display Shipper's Address in Label"
                        : key === "supportNumberEmail"
                        ? "Display Your Support Number & Email in Label"
                        : key === "mobileNumber"
                        ? "Display Shipper's Mobile Number in Label"
                        : key === "hideProductName"
                        ? "Hide Product Name in Label"
                        : "Display Company Logo"
                    }
                  />
                </Grid>
              ))}
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

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent
          style={{ width: labelFormat === "4.5x6.25" ? "1200px" : "auto" }}
        >
          {labelFormat === "4.5x6.25" ? (
            // Show four labels for the "4.5x6.25" format
            <Grid container spacing={2}>
              {Array.from({ length: 4 }, (_, index) => (
                <Grid item xs={6} key={index}>
                  <Box
                    sx={{
                      border: "2px solid #000",
                      padding: 2,
                      bgcolor: "#f9f9f9",
                      marginBottom: 2,
                    }}
                  >
                    <Typography variant="h6">
                      <strong>Deliver To:</strong>
                    </Typography>
                    <Typography variant="body1">
                      <strong>{rows[0].name},</strong>
                      <br />
                      House No.211, First Floor, {rows[0].city}
                      <br />
                      Sector- 63, Uttar Pradesh, India - 201304
                      <br />
                      Phone: 9110998103
                      <br />
                      Email: test@gmail.com
                    </Typography>

                    <Divider sx={{ marginY: 1 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography>
                          Order Date: <strong>{rows[0].order_date}</strong>
                        </Typography>
                        <Typography>
                          Invoice No: <strong>{rows[0].order_id}</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <img
                          src="https://www.pngall.com/wp-content/uploads/2/Barcode-PNG-Images.png"
                          alt="AWB Product Code"
                          style={{ maxWidth: "80%", height: "auto" }}
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
                          <strong style={{ fontSize: "22px" }}>
                            ₹{rows[0].amount}
                          </strong>
                        </Typography>
                        <Typography>Weight: 1.5 KG</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2zmm39pKpY2coD0De8cWvlLdZUBzHE9z8Ie7Yu0RiygKZAaAvT5yb2mXvqwj-E5DePhE&usqp=CAU"
                          alt="AWB Product Code"
                          style={{ maxWidth: "80%", height: "auto" }}
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
                    <Typography
                      variant="body1"
                      style={{ fontSize: "12px", paddingTop: "1rem" }}
                    >
                      Terms and Conditions: This shipment is bound by the terms
                      and conditions of our service. Please handle with care.
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            // Show a single label for the "4x6" format
            <Box
              sx={{
                border: "2px solid #000",
                padding: 2,
                bgcolor: "#f9f9f9",
              }}
            >
              <Typography variant="h6">
                <strong>Deliver To:</strong>
              </Typography>
              <Typography variant="body1">
                <strong>{rows[0].name},</strong>
                <br />
                House No.211, First Floor, {rows[0].city}
                <br />
                Sector- 63, Uttar Pradesh, India - 201304
                <br />
                Phone: 9110998103
                <br />
                Email: test@gmail.com
              </Typography>
              <Divider sx={{ marginY: 1 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography>
                    Order Date: <strong>{rows[0].order_date}</strong>
                  </Typography>
                  <Typography>
                    Invoice No: <strong>{rows[0].order_id}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <img
                    src="https://www.pngall.com/wp-content/uploads/2/Barcode-PNG-Images.png"
                    alt="AWB Product Code"
                    style={{ maxWidth: "80%", height: "auto" }}
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
                    <strong style={{ fontSize: "22px" }}>
                      ₹{rows[0].amount}
                    </strong>
                  </Typography>
                  <Typography>Weight: 1.5 KG</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2zmm39pKpY2coD0De8cWvlLdZUBzHE9z8Ie7Yu0RiygKZAaAvT5yb2mXvqwj-E5DePhE&usqp=CAU"
                    alt="AWB Product Code"
                    style={{ maxWidth: "80%", height: "auto" }}
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
              <Typography
                variant="body1"
                style={{ fontSize: "12px", paddingTop: "1rem" }}
              >
                Terms and Conditions: This shipment is bound by the terms and
                conditions of our service. Please handle with care.
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default LabelLayout;
