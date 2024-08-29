import React, { useState } from "react";
import CustomCard from "../CustomCard";
import CustomTextField from "../CustomTextField";
import {
  Typography,
  Divider,
  Grid,
  Button,
  CardContent,
  MenuItem,
  Select,
  FormControl,
  Checkbox,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import CustomLabel from "../CustomLabel";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const commonFormControlStyles = {
  height: "40px",
};

const commonSelectStyles = {
  height: "100%",
  display: "flex",
  alignItems: "center",
};


const PaymentCredentials = () => {
 
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <CustomCard>
      <CardContent>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab className={poppins.className} label="PayPal" />
          <Tab className={poppins.className} label="Strip" />
          <Tab className={poppins.className} label="RazorPay" />
          <Tab className={poppins.className} label="PhonePay" />
        </Tabs>
        <Divider sx={{ my: 2 }} />

        {activeTab === 0 && (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} container alignItems="center">
                <FormControlLabel
                  control={
                    <Switch
                      checked={isChecked}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                />

                <Typography>Paypal Status</Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={8}>
                <CustomLabel htmlFor="selectenvironment" required>
                  Select Environment
                </CustomLabel>
                <FormControl fullWidth sx={commonFormControlStyles}>
                  <Select
                    labelId="selectenvironment"
                    id="selectenvironment"
                    name="selectenvironment"
                    defaultValue=""
                    sx={commonSelectStyles}
                  >
                    <MenuItem value="sendbox">Sendbox</MenuItem>
                    <MenuItem value="live">Live</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="sendboxpaypaclientid" required>
                  Sandbox Paypal Client Id
                </CustomLabel>
                <CustomTextField
                  id="sendboxpaypaclientid"
                  name="sendboxpaypaclientid"
                  placeholder="e.g. creworder"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <CustomLabel htmlFor="sendboxpaypalsecret" required>
                  Sandbox Paypal Secret
                </CustomLabel>
                <FormControl fullWidth sx={commonFormControlStyles}>
                  <Select
                    labelId="sendboxpaypalsecret"
                    id="sendboxpaypalsecret"
                    name="sendboxpaypalsecret"
                    defaultValue=""
                    sx={commonSelectStyles}
                  >
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Grid conatiner>
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography sx={{
                      fontSize:"14px",
                    }} className={poppins.className} >Webhook URL</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Typography
                      sx={{
                        color: "gray",
                        fontSize: "13px",
                        mt: 2,
                      }}  className={poppins.className} 
                    >
                      https://creworder/save-paypal-webhook/e5c824d3541859914fb2cf18c6db4c92
                    </Typography>
                    <Button
                      sx={{
                        ml: 2,
                        border: "2px solid #405189",
                        color: "#405189",
                        bgcolor: "transparent",
                        "&:hover": {
                          bgcolor: "lightblue",
                        },
                      }}  className={poppins.className} 
                    >
                      Copy
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography
                      sx={{
                        color: "#405189",
                        mt: 2,
                        fontSize: "13px",
                      }}  className={poppins.className} 
                    >
                      (Add this webhook url on your paypal app settings.)
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                sm={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  sx={{
                    backgroundColor: "#405189",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#405189",
                    },
                  }}  className={poppins.className} 
                >
                  Save
                </Button>
                <Button
                  sx={{
                    backgroundColor: "#405189",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#405189",
                    },
                    marginLeft: "5px",
                  }}  className={poppins.className} 
                >
                  Send Test Mail
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} container alignItems="center">
                <FormControlLabel
                  control={
                    <Switch
                      checked={isChecked}
                      onChange={handleChange}
                      color="primary"
                      
                    />
                  }
                />

                <Typography>Strip Status</Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={12}>
                <CustomLabel htmlFor="selectenvironment" required>
                  Select Environment
                </CustomLabel>
                <FormControl fullWidth sx={commonFormControlStyles}>
                  <Select
                    labelId="selectenvironment"
                    id="selectenvironment"
                    name="selectenvironment"
                    defaultValue=""
                    sx={commonSelectStyles}
                  >
                    <MenuItem value="sendbox">Sendbox</MenuItem>
                    <MenuItem value="live">Live</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="puplishkey" required>
                Test Stripe Publishable Key
                </CustomLabel>
                <CustomTextField
                  id="puplishkey"
                  name="puplishkey"
                  placeholder="e.g. creworder"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <CustomLabel htmlFor="sendboxpaypalsecret" required>
                Test Stripe Secret
                </CustomLabel>
                <CustomTextField
                  id="puplishkey"
                  name="puplishkey"
                  placeholder="e.g. creworder"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={12}>
                <CustomLabel htmlFor="sendboxpaypalsecret" required>
                Test Stripe Webhook Signing Secret
                </CustomLabel>
                <CustomTextField
                  id="puplishkey"
                  name="puplishkey"
                  placeholder="e.g. creworder"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Grid conatiner>
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography sx={{
                      fontSize:"14px",
                    }} className={poppins.className} >Webhook URL</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Typography
                      sx={{
                        color: "gray",
                        fontSize: "13px",
                        mt: 2,
                        
                      }}  className={poppins.className} 
                    >
                      https://creworder/save-paypal-webhook/e5c824d3541859914fb2cf18c6db4c92
                    </Typography>
                    <Button
                      sx={{
                        ml: 2,
                        border: "2px solid #405189",
                        color: "#405189",
                        bgcolor: "transparent",
                        "&:hover": {
                          bgcolor: "lightblue",
                        },
                      }}  className={poppins.className} 
                    >
                      Copy
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography
                      sx={{
                        color: "gray",
                        mt: 2,
                        fontSize: "11px",
                      }}  className={poppins.className} 
                    >
                      Visit Generate Add endpoint as above url and enter the webhook key generated
                      Select event invoice.payment_failed, invoice.payment_succeeded , payment_intent.succeeded and payment_intent.payment_failed while creating webhook.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                sm={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  sx={{
                    backgroundColor: "#405189",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#405189",
                    },
                  }}  className={poppins.className} 
                >
                  Save
                </Button>
                <Button
                  sx={{
                    backgroundColor: "#405189",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#405189",
                    },
                    marginLeft: "5px",
                  }}  className={poppins.className} 
                >
                  Send Test Mail
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} container alignItems="center">
                <FormControlLabel
                  control={
                    <Switch
                      checked={isChecked}
                      onChange={handleChange}
                      color="primary"
                      
                    />
                  }
                />

                <Typography>Phonepay Status</Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={12}>
                <CustomLabel htmlFor="selectenvironment" required>
                  Select Environment
                </CustomLabel>
                <FormControl fullWidth sx={commonFormControlStyles}>
                  <Select
                    labelId="selectenvironment"
                    id="selectenvironment"
                    name="selectenvironment"
                    defaultValue=""
                    sx={commonSelectStyles}
                  >
                    <MenuItem value="sendbox">Sendbox</MenuItem>
                    <MenuItem value="live">Live</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="merchantkey" required>
               Merchant Id
                </CustomLabel>
                <CustomTextField
                  id="merchantkey"
                  name="merchantkey"
                  placeholder="e.g. creworder"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <CustomLabel htmlFor="saltkey" required>
                Salt Key
                </CustomLabel>
                <CustomTextField
                  id="saltkey"
                  name="saltkey"
                  placeholder="e.g. creworder"
                  type="text"
                  fullWidth
                />
              </Grid>
              
              
              <Grid
                item
                xs={12}
                md={12}
                sm={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  sx={{
                    backgroundColor: "#405189",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#405189",
                    },
                  }}  className={poppins.className} 
                >
                  Save
                </Button>
                <Button
                  sx={{
                    backgroundColor: "#405189",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#405189",
                    },
                    marginLeft: "5px",
                  }}  className={poppins.className} 
                >
                  Send Test Mail
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </CardContent>
    </CustomCard>
  );
};

export default PaymentCredentials;
