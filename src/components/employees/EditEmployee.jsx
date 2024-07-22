import React, { useState } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
import {Typography, Button, Grid, Card, CardContent, Divider, Checkbox, FormControlLabel,} from "@mui/material";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
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

const EditEmployee = ({ employeeData }) => {
  const router = useRouter();

  const handleUpdate = () => {
    router.push("/superadmin/employees");
  };


  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
          <Grid item>
              <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                Update Employee Details
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
                  value={employeeData?.name || ''}
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
                  value={employeeData?.phone || ''}
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
                  value={employeeData?.email || ''}
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
                  value={employeeData?.password || ''}
                />
               
              </Grid>
              <Grid item sx={{ flex: 1 }}>
              <CustomLabel htmlFor="confirmpassword" required>
                  Confirm Password
                </CustomLabel>
                <CustomTextField
                  id="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  placeholder="e.g. XXXXX"
                  required
                  fullWidth
                  value={employeeData?.confirmpassword || ''}
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
              container
              justifyContent="flex-end"
              spacing={2}
              sx={{ marginTop: "20px" }}
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    handleUpdate();
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </CardContent>
         
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default EditEmployee;
