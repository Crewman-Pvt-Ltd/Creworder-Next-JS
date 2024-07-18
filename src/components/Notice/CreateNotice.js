import React, { useState } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
import {Typography, Button, Grid, Card, CardContent, Divider, Checkbox, FormControlLabel,} from "@mui/material";

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

  const CreateNoticeLayout = ({ onNoticeList }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [branches, setBranches] = useState([{ id: 1 }]);


  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
          <Grid item>
              <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                Add Notice
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
              <Grid item >
                <CustomLabel htmlFor="title" required>
                   Title
                </CustomLabel>
                <CustomTextField
                  id="title"
                  name="title"
                  placeholder="title "
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
              <Grid item sx={{ flex: 1 }}>
              <CustomLabel htmlFor="website">
                    Website <span style={{ color: "red" }}>*</span>
                  </CustomLabel>
                  <CustomTextField
                    id="website"
                    name="website"
                    placeholder="e.g. creworder"
                    type="text"
                    required
                    fullWidth
                    sx={{ marginTop: 1 }}
                  />
              </Grid>
              <Grid item sx={{ flex: 1 }}>
             
                  <img
                    id="preview"
                    src="https://placehold.co/600x400/EEE/31343C"
                    alt="Preview"
                    width="35%"
                    style={{ objectFit: "contain" }}
                  />
                   <CustomLabel htmlFor="profile">
                  Upload Images <span style={{ color: "red" }}>*</span>
                </CustomLabel>
                <input
                  type="file"
                  id="companyLogo"
                  onChange={handleFileChange}
                  style={{ marginTop: "8px", display: "block", width: "100%" }}
                />
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
                onClick={onSuperAdminList}
              >
                Submit
              </Button>
            </Grid>
          </CardContent>
         
        </Card>
      </Grid>
    </Grid>
  );
};

export default CreateCompanyLayout;
