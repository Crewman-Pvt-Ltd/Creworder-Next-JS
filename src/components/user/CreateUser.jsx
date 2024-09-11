import React, { useState, useEffect } from "react";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
import CustomCard from "../CustomCard";
import { Typography, Button, Grid, CardContent, Divider, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const CreateUser = () => {
  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
              Add User
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                  Personal Info.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="first_name" required>
                  First Name:
                </CustomLabel>
                <CustomTextField
                  id="first_name"
                  name="first_name"
                  placeholder="e.g. firstname"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="last_name" required>
                  Last Name:
                </CustomLabel>
                <CustomTextField
                  id="last_name"
                  name="last_name"
                  type="text"
                  placeholder="e.g. lastname"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="dob" required>
                  Date of Birth:
                </CustomLabel>
                <CustomTextField
                  id="dob"
                  name="dob"
                  type="num"
                  placeholder="e.g. 01/01/2001"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={1}>
            <Grid item xs={12} md={4}>
                <CustomLabel htmlFor="gender" required>
                  Gender:
                </CustomLabel>
                <FormControl fullWidth required sx={{ height: 40 }}>
                  <InputLabel htmlFor="gender">Choose</InputLabel>
                  <Select
                    id="gender"
                    name="gender"
                    value="gender"
                    onChange={handleChange}
                   
                    sx={{ height: 40 }}
                  >
                    <MenuItem value="m">Male</MenuItem>
                    <MenuItem value="f">Female</MenuItem>
                    <MenuItem value="t">Transgender</MenuItem>
                  </Select>
                 
                </FormControl>
              </Grid>





              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="marital_status" required>
                  Marital Status
                </CustomLabel>
                <CustomTextField
                  id="marital_status"
                  name="marital_status"
                  type="text"
                  placeholder="e.g. Married/unmarried"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="contact_number" required>
                  Contact Number
                </CustomLabel>
                <CustomTextField
                  id="contact_number"
                  name="contact_number"
                  type="num"
                  placeholder="e.g. 9999999999"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} sm={4} md={4}>
                <CustomLabel htmlFor="email" required>
                   Personal Email
                </CustomLabel>
                <CustomTextField
                  id="email"
                  name="email"
                  placeholder="e.g. email@gmail.com"
                  type="email"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <CustomLabel htmlFor="professional" required>
                  Professional Email
                </CustomLabel>
                <CustomTextField
                  id="professional"
                  name="professional"
                  placeholder="e.g. professional@gmail.com"
                  type="professional"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <CustomLabel htmlFor="address" required>
                  Address
                </CustomLabel>
                <CustomTextField
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Full Address"
                  required
                  fullWidth
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>
            <Grid container mt={2}>
              <Grid item xs={12}>
                <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
                  Office Info.
                </Typography>{" "}
                <Divider sx={{ my: 2 }} />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="desigination" required>
                  Desigination
                </CustomLabel>
                <CustomTextField
                  id="desigination"
                  name="desigination"
                  placeholder="e.g. desigination"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="department" required>
                  Department
                </CustomLabel>
                <CustomTextField
                  id="department"
                  name="department"
                  type="text"
                  placeholder="e.g. department"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="doj" required>
                  Date of Joining:
                </CustomLabel>
                <CustomTextField
                  id="doj"
                  name="doj"
                  type="num"
                  placeholder="e.g. 01/01/2001"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="dailyordertarget" required>
                  Daily Order Target:
                </CustomLabel>
                <CustomTextField
                  id="dailyordertarget"
                  name="dailyordertarget"
                  type="text"
                  placeholder="e.g. 10"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="reportingto" required>
                  Reporting To:
                </CustomLabel>
                <CustomTextField
                  id="reportingto"
                  name="reportingto"
                  type="num"
                  placeholder="e.g. abc"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="Select Role Permission: " required>
                  Select Role Permission:
                </CustomLabel>
                <CustomTextField
                  id="Select Role Permission: "
                  name="Select Role Permission: "
                  type="textarea"
                  placeholder="e.g. Select Role Permission: "
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="username" required>
                  Username
                </CustomLabel>
                <CustomTextField
                  id="username"
                  name="username"
                  placeholder="e.g. username"
                  type="username"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="password" required>
                  Password
                </CustomLabel>
                <CustomTextField
                  id="password"
                  name="password"
                  type="textarea"
                  placeholder="e.g. password"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={1}></Grid>
            <Grid
              item
              sx={{
                marginTop: 3,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                sx={{
                  padding: "8px 16px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  backgroundColor: "#405189",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#334a6c",
                  },
                }}
              >
                Submit
              </Button>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default CreateUser;
