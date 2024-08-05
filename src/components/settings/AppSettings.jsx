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

const checkboxStyles = {
  display: "flex",
  alignItems: "center",
};

const smallLabelStyles = {
  fontSize: "13px",
};

const AppSettings = () => {
  const [allowedFileTypes, setAllowedFileTypes] = useState([]);

  const handleAllowedFileTypesChange = (event) => {
    setAllowedFileTypes(event.target.value);
  };
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <CustomCard>
      <CardContent>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="App Settings" />
          <Tab label="File Settings" />
          <Tab label="Google Map Settings" />
        </Tabs>
        <Divider sx={{ my: 2 }} />

        {activeTab === 0 && (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <CustomLabel htmlFor="date_format" required>
                  Date Format
                </CustomLabel>
                <FormControl fullWidth sx={commonFormControlStyles}>
                  <Select
                    labelId="date_format_label"
                    id="date_format"
                    name="date_format"
                    defaultValue=""
                    sx={commonSelectStyles}
                  >
                    <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                    <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                    <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CustomLabel htmlFor="time_format" required>
                  Time Format
                </CustomLabel>
                <FormControl fullWidth sx={commonFormControlStyles}>
                  <Select
                    labelId="time_format_label"
                    id="time_format"
                    name="time_format"
                    defaultValue=""
                    sx={commonSelectStyles}
                  >
                    <MenuItem value="12-hour">12-hour</MenuItem>
                    <MenuItem value="24-hour">24-hour</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CustomLabel htmlFor="default_timezone" required>
                  Default Timezone
                </CustomLabel>
                <FormControl fullWidth sx={commonFormControlStyles}>
                  <Select
                    labelId="default_timezone_label"
                    id="default_timezone"
                    name="default_timezone"
                    defaultValue=""
                    sx={commonSelectStyles}
                  >
                    <MenuItem value="GMT+1">GMT+1</MenuItem>
                    <MenuItem value="GMT+2">GMT+2</MenuItem>
                    <MenuItem value="GMT-5">GMT-5</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CustomLabel htmlFor="default_currency" required>
                  Default Currency
                </CustomLabel>
                <FormControl fullWidth sx={commonFormControlStyles}>
                  <Select
                    labelId="default_currency_label"
                    id="default_currency"
                    name="default_currency"
                    defaultValue=""
                    sx={commonSelectStyles}
                  >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="JPY">JPY</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CustomLabel htmlFor="language" required>
                  Language
                </CustomLabel>
                <FormControl fullWidth sx={commonFormControlStyles}>
                  <Select
                    labelId="language_label"
                    id="language"
                    name="language"
                    defaultValue=""
                    sx={commonSelectStyles}
                  >
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Spanish">Spanish</MenuItem>
                    <MenuItem value="French">French</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CustomLabel htmlFor="datatable_row_limit" required>
                  Datatable Row Limit
                </CustomLabel>
                <FormControl fullWidth sx={commonFormControlStyles}>
                  <Select
                    labelId="datatable_row_limit_label"
                    id="datatable_row_limit"
                    name="datatable_row_limit"
                    defaultValue=""
                    sx={commonSelectStyles}
                  >
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="25">25</MenuItem>
                    <MenuItem value="50">50</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <CustomLabel htmlFor="session_driver" required>
                  Session Driver
                </CustomLabel>
                <FormControl fullWidth sx={commonFormControlStyles}>
                  <Select
                    labelId="session_driver_label"
                    id="session_driver"
                    name="session_driver"
                    defaultValue=""
                    sx={commonSelectStyles}
                  >
                    <MenuItem value="file">File</MenuItem>
                    <MenuItem value="database">Database</MenuItem>
                    <MenuItem value="cache">Cache</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={2}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <Typography sx={smallLabelStyles}>App Debug</Typography>
                      }
                      sx={checkboxStyles}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={2}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <Typography sx={smallLabelStyles}>
                          App Update
                        </Typography>
                      }
                      sx={checkboxStyles}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={2}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <Typography sx={smallLabelStyles}>
                          Enable Cache
                        </Typography>
                      }
                      sx={checkboxStyles}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <Typography sx={smallLabelStyles}>
                          Company Need Approval
                        </Typography>
                      }
                      sx={checkboxStyles}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label={
                        <Typography sx={smallLabelStyles}>
                          On Email Verification
                        </Typography>
                      }
                      sx={checkboxStyles}
                    />
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
                    backgroundColor: "red",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "red",
                    },
                  }}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={4} md={6}>
                <CustomLabel htmlFor="maxfiesize" required>
                  Max File Size Upload
                </CustomLabel>
                <CustomTextField
                  id="maxfiesize"
                  name="maxfiesize"
                  placeholder="e.g. creworder"
                  type="text"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <CustomLabel htmlFor="maxnumfileupload" required>
                  Max Number of File For Upload
                </CustomLabel>
                <CustomTextField
                  id="maxfiesize"
                  name="maxfiesize"
                  placeholder="e.g. creworder"
                  type="text"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <CustomLabel htmlFor="maxnumfileupload" required>
                  Max Number of File For Upload
                </CustomLabel>
                <CustomTextField
                  id="maxfiesize"
                  name="maxfiesize"
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
                    backgroundColor: "red",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "red",
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
              <Grid item xs={12} sm={6} md={12}>
                <CustomLabel htmlFor="api_key" required>
                  Google Map Key
                </CustomLabel>
                <FormControl fullWidth sx={commonFormControlStyles}>
                <CustomTextField
                  id="api_key"
                  name="api_key"
                  placeholder="e.g. Ahdteu56XXXXXXXXXXXXXXXXXXXX"
                  type="text"
                  fullWidth
                />
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
                    backgroundColor: "red",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "red",
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

export default AppSettings;
