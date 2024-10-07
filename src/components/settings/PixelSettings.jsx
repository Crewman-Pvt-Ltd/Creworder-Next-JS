import React from "react";
import { CardContent, Grid, Button, MenuItem, Divider, TableHead, Table, TableBody, TableContainer, TableRow, IconButton, Typography, TableCell } from "@mui/material";
import CustomCard from "../CustomCard";
import CustomLabel from "../CustomLabel";
import CustomTextField from "../CustomTextField";
import { Poppins } from "next/font/google";
import { Edit, Delete } from "@mui/icons-material";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const PixelSettings = ({ onAdd, onEdit }) => {


  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <CustomCard>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  className={poppins.className}
                  sx={{ fontSize: "18px", fontWeight: "600" }}
                >
                  Pixel Settings
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="google_analytics" required>
                 Google Analytics
                </CustomLabel>
                <CustomTextField
                  id="google_analytics"
                  name="google_analytics"
                  type="text"
                  placeholder=""
                  required
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="meta" required>
                  Meta
                </CustomLabel>
                <CustomTextField
                  id="meta" 
                  name="meta"
                  type="text"
                //   placeholder="Re-enter"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="other" required>
                  Other
                </CustomLabel>
                <CustomTextField
                  id="other"
                  name="other"
                  type="text"
                //   placeholder="Re-enter"
                  required
                  fullWidth
                />
              </Grid>

              

              <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  sx={{
                    backgroundColor: "#405189",
                    color: "white",
                  }}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>

      
    </Grid>
  );
};

export default PixelSettings;
