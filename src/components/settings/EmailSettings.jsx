import React, { useState } from "react";
import CustomCard from "../CustomCard";
import CustomTextField from "../CustomTextField";
import { Poppins } from "next/font/google";
import {
  Typography,
  Divider,
  Grid,
  Button,
  CardContent,
  MenuItem,
  Select,
  Switch,
  FormControl,
  Checkbox,
  FormControlLabel,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import CustomLabel from "../CustomLabel";
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

const checkboxStyles = {
  display: "flex",
  alignItems: "center",
};

const smallLabelStyles = {
  fontSize: "13px",
};

const EmailSettings = () => {
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
          <Tab className={poppins.className} label="Setup Email" />
          <Tab className={poppins.className} label="Otp For Mail" />
          <Tab className={poppins.className} label="Reports" />
      
        </Tabs>
        <Divider sx={{ my: 2 }} />

        {activeTab === 0 && (
        <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <CustomLabel htmlFor="mailfromname" required>
              Mail From Name
            </CustomLabel>
            <CustomTextField
              id="mailfromname"
              name="mailfromname"
              placeholder="e.g. creworder"
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomLabel htmlFor="mailfromemail" required>
              Mail From Email
            </CustomLabel>
            <CustomTextField
              id="mailfromemail"
              name="mailfromemail"
              placeholder="e.g. creworder"
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomLabel htmlFor="mailusername" required>
              Mail Username
            </CustomLabel>
            <CustomTextField
              id="mailusername"
              name="mailusername"
              placeholder="e.g. creworder"
              type="text"
              fullWidth
            />
          </Grid>
         
          
          <Grid item xs={12} sm={4}>
            <CustomLabel htmlFor="mailpassword" required>
              Mail Password
            </CustomLabel>
            <CustomTextField
              id="mailpassword"
              name="mailpassword"
              placeholder="e.g. creworder"
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomLabel htmlFor="mailhost" required>
              Mail Host
            </CustomLabel>
            <CustomTextField
              id="mailhost"
              name="mailhost"
              placeholder="e.g. creworder"
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomLabel htmlFor="mailsmtp" required>
              Mail SMTP
            </CustomLabel>
            <CustomTextField
              id="mailsmtp"
              name="mailsmtp"
              placeholder="e.g. creworder"
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomLabel htmlFor="mailport" required>
              Mail Port
            </CustomLabel>
            <CustomTextField
              id="mailport"
              name="mailport"
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
              }} className={poppins.className} 
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
              }} className={poppins.className} 
            >
              Send Test Mail
            </Button>
          </Grid>
        </Grid>
      </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={4} md={6}>
                <CustomLabel className={poppins.className} htmlFor="mailotp" required>
                   OTP
                </CustomLabel>
                <CustomTextField
                  id="mailotp"
                  name="mailotp"
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
                  }} className={poppins.className}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

{activeTab === 2 && (
          <Box>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={4} md={6}>
                <CustomLabel className={poppins.className} htmlFor="mailotp" required>
                   Reports
                </CustomLabel>
                <CustomTextField
                  id="mailotp"
                  name="mailotp"
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
                  }} className={poppins.className}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </CardContent>
    </CustomCard>
  );
};

export default EmailSettings;
