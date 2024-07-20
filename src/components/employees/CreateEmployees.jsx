import React, { useState } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
import {Typography, Button, Grid, Card, CardContent, Divider, Checkbox, FormControlLabel,} from "@mui/material";
import CustomCard from "../CustomCard";

const handleFileChange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById("preview").src = e.target.result;
  };
  if (file) {
    reader.readAsDataURL(file);
  }
};

const CreateEmployees = ({ onEmployeeList }) => {



  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
          <Grid item>
              <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                Add Employee
              </Typography>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                marginTop: 2,
              }}
            >
              <Grid item sx={{ flex: 1 }}>
                <CustomLabel htmlFor="name" required>
                   Name
                </CustomLabel>
                <CustomTextField
                  id="name"
                  name="name"
                  placeholder="Name"
                  type="text"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item sx={{ flex: 1 }}>
                <CustomLabel htmlFor="phone" required>
                  Phone Number
                </CustomLabel>
                <CustomTextField
                  id="phone"
                  name="phone"
                  type="number"
                  placeholder="(+91)"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item sx={{ flex: 1 }}>
                <CustomLabel htmlFor="email" required>
                  Email
                </CustomLabel>
                <CustomTextField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g. test@creworder.com"
                  required
                  fullWidth
                />
              </Grid>
              
            </Grid>

            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                marginTop: 2,
              }}
            >
              <Grid item sx={{ flex: 1 }}>
                <CustomLabel htmlFor="password" required>
                Password
                </CustomLabel>
                <CustomTextField
                  id="password"
                  name="password"
                  placeholder="XXXXX"
                  type="text"
                  required
                  fullWidth
                />
               
              </Grid>
              <Grid item sx={{ flex: 1 }}>
              <CustomLabel htmlFor="Confirm Password" required>
                  Confirm Password
                </CustomLabel>
                <CustomTextField
                  id="password"
                  name="password"
                  type="password"
                  placeholder="e.g. XXXXX"
                  required
                  fullWidth
                />
              </Grid>
            
            </Grid>

            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                marginTop: 2,
              }}
            >
            
              <Grid item xs={6} sm={6}>
                <CustomLabel htmlFor="companyLogo" required>
                  Upload Company Logo
                </CustomLabel>
                <input
                  type="file"
                  id="companyLogo"
                  onChange={handleFileChange}
                  style={{ marginTop: "8px", display: "block", width: "100%" }}
                />
                <Grid sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <img
                    id="preview"
                    src="https://placehold.co/600x400/EEE/31343C"
                    alt="Preview"
                    width="35%"
                    style={{ objectFit: "contain" }}
                  />
                </Grid>
              </Grid>
            
            </Grid>
 
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
                onClick={onEmployeeList}
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

export default CreateEmployees;
