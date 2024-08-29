import React, { useState } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
import {Typography, Button, Grid, Card, CardContent, Divider, Checkbox, FormControlLabel,} from "@mui/material";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
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

const EditEmployee = () => {
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/superadmin/employees");
  };
  return (

    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
        <Grid item>
          <Typography sx={{mt:2, ml:2, fontSize: "16px", fontWeight: "600" }}>
            Update Employee .
          </Typography>
          </Grid>
        <Divider sx={{ my: 2 }} />

          <CardContent>
          <Grid item>
              <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
              Personal Information.
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
              }} >
                 <Grid item sx={{ flex: 1 }}>
                <CustomLabel htmlFor="username" required>
                Username: : 
                </CustomLabel>
                <CustomTextField
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter UserName"
                  required
                  fullWidth
                />
              </Grid> 

              <Grid item sx={{ flex: 1 }}>
                <CustomLabel htmlFor="first_name" required>
                   First Name
                </CustomLabel>
                <CustomTextField
                  id="first_name"
                  name="first_name"
                  placeholder="First Name"
                  type="text"
                  required
                  fullWidth
                />
              </Grid>

              <Grid item sx={{ flex: 1 }}>
                <CustomLabel htmlFor="last_name" required>
                   Last Name
                </CustomLabel>
                <CustomTextField
                  id="last_name"
                  name="last_name"
                  placeholder="Last Name"
                  type="text"
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
                <CustomLabel htmlFor="gender" required>
                  Gender:
                </CustomLabel>
                <FormControl fullWidth required sx={{ minHeight: 40, height: 40 }}>
                  <InputLabel htmlFor="gender">Choose</InputLabel>
                  <Select
                    id="gender"
                    name="gender"
                    placeholder="Select Gender"
                    fullWidth
                    sx={{ height: 40 }}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="transgender">Transgender</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sx={{ flex: 1 }}>
                <CustomLabel htmlFor="maritalStatus" required>
                  Marital Status:
                </CustomLabel>
                <FormControl fullWidth required sx={{ minHeight: 40, height: 40 }}>
                  <InputLabel htmlFor="maritalStatus">Choose</InputLabel>
                  <Select
                    id="maritalStatus"
                    name="maritalStatus"
                    placeholder="Select Marital Status"
                    fullWidth
                    sx={{ height: 40 }}
                  >
                    <MenuItem value="married">Married</MenuItem>
                    <MenuItem value="unmarried">UnMarried</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sx={{ flex: 1 }}>
                <CustomLabel htmlFor="dob" required>
                Date of Birth:
                </CustomLabel>
                <CustomTextField
                  id="dob"
                  name="dob"
                  type="date"
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
                }}>
                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="phone" required>
                    Phone Number
                  </CustomLabel>
                  <CustomTextField
                    id="phone"
                    name="phone"
                    type="number"
                    placeholder="(+91)"
                    required
                    fullWidth/>
                </Grid>
                <Grid item xs={12} sm={4}>
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
                  sx={{ height: 40 }}
                />
              </Grid>
                
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="profile_images" required>
                  Upload Profile
                </CustomLabel>
               
                <img
                    id="preview"
                    src="https://static.vecteezy.com/system/resources/thumbnails/021/353/308/small_2x/user-icon-for-website-and-mobile-apps-png.png"
                    alt="Preview"
                    width="35%"
                    style={{ objectFit: "contain" }}
                  />
                <input
                  type="file"
                  id="profile_images"
                  onChange={handleFileChange}
                  style={{ marginTop: "8px", display: "block", width: "100%" }}/>                
              </Grid>             
              </Grid>


              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  marginTop: 2,
                }}>     
                
                <Grid item xs={12} sm={12}>
                  <CustomLabel htmlFor="address" required>
                    Address:
                  </CustomLabel>
                  <CustomTextField
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Address"
                    required
                    fullWidth
                    multiline
                    rows={4}  // This makes it a textarea
                  />
                </Grid>              
              </Grid>
        <Grid container>
      {/* Other components/content above */}
      <Grid item xs={12}>
        <Divider sx={{ marginBottom: 2 }} />
      </Grid>
      <Grid item>
        <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>
          Office Information.
        </Typography>
      </Grid>
      {/* Other components/content below */}
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
                <CustomLabel htmlFor="designation" required>
                Designation:
                </CustomLabel>
                <CustomTextField
                  id="designation"
                  name="designation"
                  placeholder="Designation"
                  type="text"
                  required
                  fullWidth
                />
              </Grid>

              <Grid item sx={{ flex: 1 }}>
                <CustomLabel htmlFor="department" required>
                Department:
                </CustomLabel>
                <CustomTextField
                  id="department"
                  name="department"
                  placeholder="Department"
                  type="text"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item sx={{ flex: 1 }}>
                <CustomLabel htmlFor="doj" required>
                Date of Joining:
                </CustomLabel>
                <CustomTextField
                  id="doj"
                  name="doj"
                  type="date"
                  required
                  fullWidth
                />
              </Grid>   
                       
            </Grid>

         
          
            <Grid
              item
              sx={{
                marginTop: 3,
                display: "flex",
                justifyContent: "flex-end",
              }}>
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
                onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
          </CardContent>         
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default EditEmployee;
