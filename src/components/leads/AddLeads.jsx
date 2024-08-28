import React, { useState } from "react";
import { Grid, Typography, IconButton } from "@mui/material";
import { Download as DownloadIcon, Height, Margin } from "@mui/icons-material";
import {  
  Button, 
  Box,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import CustomCard from "../CustomCard";
const AddLeads = () => {
  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
          <CustomCard padding="13px">
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "22px",
                  whiteSpace: "nowrap",
                  textTransform: "capitalize",
                  color: "black",
                  marginLeft: "30px",
                }}
              >
                Export File Extension
              </Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: "18px",
                  whiteSpace: "nowrap",
                  textTransform: "capitalize",
                  color: "#818181",
                  marginLeft: "30px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Download the sample Excel file.      
              </Typography>
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "18px",
                  whiteSpace: "nowrap",
                  textTransform: "capitalize",
                  color: "blue",
                  marginLeft: "30px",
                }}
                component="a"
                  href="https://www.cmu.edu/blackboard/files/evaluate/tests-example.xls"
                  download
              >
                <IconButton
                  component="a"
                  href="https://www.cmu.edu/blackboard/files/evaluate/tests-example.xls"
                  download
                  sx={{
                    marginLeft: "10px",
                    color: "blue",
                  }}
                >
                  <DownloadIcon />
                </IconButton>
                Download Sample
              </Typography>
            </CustomCard>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
          <CustomCard padding="13px">
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "22px",
                    whiteSpace: "nowrap",
                    textTransform: "capitalize",
                    color: "black",
                    marginLeft: "30px",
                  }}
                >
                  Import Leads
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "16px",
                    whiteSpace: "nowrap",
                    textTransform: "capitalize",
                    color: "#818181",
                    marginLeft: "30px",
                  }}
                >
                  Upload a CSV file here.
                </Typography>
                
                {/* File Upload Field */}
                <Box sx={{ marginLeft: "30px", marginTop: "20px" }}>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      fontWeight: "600",
                      textTransform: "none",
                      backgroundColor: "#1976d2",
                      color: "white",
                      '&:hover': {
                        backgroundColor: "#115293",
                      },
                    }}
                  >
                    Choose File
                    <input
                      type="file"
                      hidden
                      accept=".csv"
                      onChange={(e) => console.log(e.target.files[0])}
                    />
                  </Button>                 
                </Box>
              </CustomCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default AddLeads;
