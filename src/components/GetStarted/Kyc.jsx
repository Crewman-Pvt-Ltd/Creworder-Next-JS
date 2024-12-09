import React, { useState } from "react";
import {
  Grid,
  Typography,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  Card,
  FormControl,
  Button,
  TextField,
  Box,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const Kyc = () => {
  const [opentopFields, setOpentopFields] = useState(false);
  const [openbelowFields, setOpenbelowFields] = useState(false);

  const handletopClick = () => {
    setOpentopFields(!opentopFields);
  };

  const handlebelowClick = () => {
    // Corrected this line to toggle state correctly
    setOpenbelowFields(!openbelowFields);
  };
  const [selectedDoc, setSelectedDoc] = useState("aadhar");
  const [docNumber, setDocNumber] = useState("");
  const [file, setFile] = useState(null);

  const handleDocChange = (event) => {
    setSelectedDoc(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <Grid container spacing={2} sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <Card>
          <Grid container spacing={2} alignItems="center" p={2}>
            <Grid item xs={12}>
              <Typography
                className={poppins.className}
                sx={{ fontWeight: "700" }}
              >
                KYC
              </Typography>
            </Grid>
            <Grid container justifyContent="center" sx={{ mt: 5 }}>
              <Grid item>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Grid container direction="column" alignItems="center">
                      <CheckCircleIcon style={{ color: "green" }} />
                      <Typography
                        className={poppins.className}
                        sx={{ fontSize: "14px" }}
                      >
                        Business Type
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Divider
                      orientation="horizontal"
                      style={{ width: "300px", border: "1px dashed grey" }}
                    />
                  </Grid>

                  <Grid item>
                    <Grid container direction="column" alignItems="center">
                      <CheckCircleIcon style={{ color: "green" }} />
                      <Typography
                        className={poppins.className}
                        sx={{ fontSize: "14px" }}
                      >
                        Photo Identification
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Divider
                      orientation="horizontal"
                      style={{ width: "300px", border: "1px dashed grey" }}
                    />
                  </Grid>

                  <Grid item>
                    <Grid container direction="column" alignItems="center">
                      <RadioButtonUncheckedIcon style={{ color: "purple" }} />
                      <Typography sx={{ fontSize: "14px" }}>
                        Document Verification
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} m={5}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    className={poppins.className}
                    sx={{ fontWeight: "600", fontSize: "18px" }}
                  >
                    Please select any of the 2 options below to verify your KYC
                  </Typography>
                </Grid>

                <Grid
                  container
                  mt={4}
                  sx={{
                    border: "1px solid #afcfff",
                    padding: "2px",
                    borderRadius: "8px",
                    alignItems: "center",
                  }}
                >
                  <Grid item xs={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={1}>
                        <img
                          src="https://app.shiprocket.in/seller/assets/images/Group%2021806.svg"
                          alt="Express KYC"
                          style={{ width: "50px", height: "50px" }}
                        />
                      </Grid>
                      <Grid item xs={11}>
                        <Grid container alignItems="center">
                          <Grid item>
                            <Typography
                              className={poppins.className}
                              sx={{ fontWeight: "500", fontSize: "14px" }}
                            >
                              Express KYC using GSTIN OTP
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              className={poppins.className}
                              sx={{ fontSize: "11px" }}
                              variant="body2"
                              color="textSecondary"
                            >
                              (No Document Upload Required)
                            </Typography>
                          </Grid>
                        </Grid>
                        <Typography
                          className={poppins.className}
                          sx={{
                            backgroundColor: "#fff5eb",
                            borderRadius: "10px",
                            color: "#d96c00",
                            fontSize: "11px",
                            padding: "4px 9px",
                            display: "inline-block",
                          }}
                        >
                          Get KYC verified within 30 seconds
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    container
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <IconButton onClick={handletopClick}>
                      <KeyboardArrowDownIcon />
                    </IconButton>
                  </Grid>
                </Grid>

                {opentopFields && (
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        padding: 2,
                        border: "1px solid #afcfff",
                        borderRadius: "8px",
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography
                            className={poppins.className}
                            sx={{ fontWeight: "500", fontSize: "14px", mb: 1 }}
                          >
                            Enter GST Number
                          </Typography>
                          <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            placeholder="xxxxxxxxxxxxx"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography
                            className={poppins.className}
                            sx={{ fontWeight: "500", fontSize: "14px", mb: 1 }}
                          >
                            Enter TAN Number
                          </Typography>
                          <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            placeholder="xxxxxxxxxxxxx"
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                          <Button>Send Otp</Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                )}

                <Grid
                  container
                  mt={4}
                  sx={{
                    border: "1px solid #afcfff",
                    padding: "2px",
                    borderRadius: "8px",
                    alignItems: "center",
                  }}
                >
                  <Grid item xs={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={1}>
                        <img
                          src="https://app.shiprocket.in/seller/assets/images/Group%2021805.svg"
                          alt="KYC by uploading ID & Address Proofs"
                          style={{ width: "50px", height: "50px" }}
                        />
                      </Grid>
                      <Grid item xs={11}>
                        <Grid container alignItems="center">
                          <Grid item>
                            <Typography
                              className={poppins.className}
                              sx={{ fontWeight: "500", fontSize: "14px" }}
                            >
                              KYC by uploading ID & Address Proofs
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              className={poppins.className}
                              sx={{ fontSize: "11px" }}
                              variant="body2"
                              color="textSecondary"
                            >
                              (Document Upload Required)
                            </Typography>
                          </Grid>
                        </Grid>
                        <Typography
                          className={poppins.className}
                          sx={{
                            backgroundColor: "#fff5eb",
                            borderRadius: "10px",
                            color: "#d96c00",
                            fontSize: "11px",
                            padding: "4px 9px",
                            display: "inline-block",
                          }}
                        >
                          KYC verification might take 2-3 business days
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    container
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <IconButton onClick={handlebelowClick}>
                      <KeyboardArrowDownIcon />
                    </IconButton>
                  </Grid>
                </Grid>

                {openbelowFields && (
                  <Grid container spacing={2} mt={2}>
                    <Grid item xs={12}>
                      <Grid
                        container
                        spacing={2}
                        sx={{
                          padding: 2,
                          border: "1px solid #afcfff",
                          borderRadius: "8px",
                        }}
                      >
                        <Grid item xs={12} sm={3} md={3}>
                          <FormControl fullWidth>
                            <InputLabel>Select Document</InputLabel>
                            <Select
                              value={selectedDoc}
                              onChange={handleDocChange}
                              label="Select Document"
                            >
                              <MenuItem value="aadhar">Aadhar</MenuItem>
                              <MenuItem value="pan">PAN</MenuItem>
                              <MenuItem value="dl">Driving License</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        {selectedDoc && (
                          <Grid item xs={12}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                  fullWidth
                                  margin="normal"
                                  label={`${
                                    selectedDoc === "aadhar"
                                      ? "Aadhar"
                                      : selectedDoc === "pan"
                                      ? "PAN"
                                      : "Driving License"
                                  } Number`}
                                  value={docNumber}
                                  onChange={(e) => setDocNumber(e.target.value)}
                                />
                              </Grid>

                              <Grid item xs={12} sm={6} md={6}>
                                <Typography variant="body1" mb={1}>
                                  Upload
                                  {selectedDoc === "aadhar"
                                    ? " Aadhar"
                                    : selectedDoc === "pan"
                                    ? " PAN"
                                    : " Driving License"}{" "}
                                </Typography>
                                <Grid
                                  container
                                  border={1}
                                  borderColor="grey.400"
                                  p={2}
                                  borderRadius={2}
                                  textAlign="center"
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  <Grid item xs={12} sm={6}>
                                    <Button
                                      variant="contained"
                                      component="label"
                                    >
                                      Upload Document
                                      <input
                                        type="file"
                                        hidden
                                        onChange={handleFileChange}
                                      />
                                    </Button>
                                  </Grid>
                                  {file && (
                                    <Grid item xs={12} sm={6} textAlign="left">
                                      <Typography>{file.name}</Typography>
                                    </Grid>
                                  )}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Kyc;
