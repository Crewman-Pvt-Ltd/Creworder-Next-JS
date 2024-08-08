import React, { useState } from "react";
import CustomCard from "../CustomCard";
import CustomTextField from "../CustomTextField";
import {
  
  Divider,
  Grid,
  Button,
  CardContent,
  MenuItem,
  Select,
  FormControl,
  Checkbox,
  FormControlLabel,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import CustomLabel from "../CustomLabel";

const commonFormControlStyles = {
  height: "40px",
};

const commonSelectStyles = {
  height: "100%",
  display: "flex",
  alignItems: "center",
};


const NotificationSettings = () => {
 
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <CustomCard>
      <CardContent>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Email" />
          <Tab label="Push Notification" />
          <Tab label="Pusher" />
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
              <Grid item xs={12} sm={6} md={4}>
                <CustomLabel htmlFor="enableemailqueue" required>
                  Enable Email Queue
                </CustomLabel>
                <FormControl fullWidth sx={commonFormControlStyles}>
                  <Select
                    labelId="enableemailqueue"
                    id="enableemailqueue"
                    name="enableemailqueue"
                    defaultValue=""
                    sx={commonSelectStyles}
                  >
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
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
              <Grid item xs={12} sm={6} md={4}>
                <CustomLabel htmlFor="emailvarified" required>
                  Mail Varified
                </CustomLabel>
                <FormControl fullWidth sx={commonFormControlStyles}>
                  <Select
                    labelId="emailvarified"
                    id="emailvarified"
                    name="emailvarified"
                    defaultValue=""
                    sx={commonSelectStyles}
                  >
                    <MenuItem value="ssl">ssl</MenuItem>
                    <MenuItem value="tls">tls</MenuItem>
                    <MenuItem value="starttls">startls</MenuItem>
                  </Select>
                </FormControl>
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
                  }}
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
                  }}
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
                <CustomLabel htmlFor="onesingleappid" required>
                  One Signal App ID
                </CustomLabel>
                <CustomTextField
                  id="onesingleappid"
                  name="onesingleappid"
                  placeholder="e.g. creworder"
                  type="text"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <CustomLabel htmlFor="restapikey" required>
                  One Signal Rest API Key
                </CustomLabel>
                <CustomTextField
                  id="restapikey"
                  name="restapikey"
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
                  }}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <CustomLabel htmlFor="appid" required>
                  App Id
                </CustomLabel>
                <FormControl fullWidth sx={commonFormControlStyles}>
                  <CustomTextField
                    id="appid"
                    name="appid"
                    placeholder="e.g. 12345"
                    type="text"
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CustomLabel htmlFor="appkey" required>
                  App Key
                </CustomLabel>
                <FormControl fullWidth sx={commonFormControlStyles}>
                  <CustomTextField
                    id="appkey"
                    name="appkey"
                    placeholder="e.g. hddywnj76wegew7"
                    type="text"
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CustomLabel htmlFor="appsecret" required>
                  App Secret
                </CustomLabel>
                <FormControl fullWidth sx={commonFormControlStyles}>
                  <CustomTextField
                    id="appsecret"
                    name="appsecret"
                    placeholder="e.g. abcd"
                    type="text"
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CustomLabel htmlFor="appcluster" required>
                  App Cluster
                </CustomLabel>
                <FormControl fullWidth sx={commonFormControlStyles}>
                  <CustomTextField
                    id="appcluster"
                    name="appcluster"
                    placeholder="e.g. ap2"
                    type="text"
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CustomLabel htmlFor="forcetls" required>
                  Force TLS
                </CustomLabel>
                <FormControl fullWidth sx={commonFormControlStyles}>
                  <Select
                    labelId="forcetls"
                    id="forcetls"
                    name="forcetls"
                    defaultValue=""
                    sx={commonSelectStyles}
                  >
                    <MenuItem value="true">True</MenuItem>
                    <MenuItem value="false">False</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} mt={2}>
                <CustomLabel htmlFor="enablepusherfor" required>
                  Enable Pusher For
                </CustomLabel>
                <div style={{ marginTop: "8px" }}>
                  <FormControlLabel
                    control={<Checkbox name="taskboard" />}
                    label="Task Board"
                  />
                  <FormControlLabel
                    control={<Checkbox name="messages" />}
                    label="Messages"
                  />
                </div>
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
                  }}
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

export default NotificationSettings;
