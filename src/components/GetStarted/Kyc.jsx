import React from "react";
import { Grid, Typography, Divider } from "@mui/material";
import CustomCard from "../CustomCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const Kyc = () => {
  return (
    <Grid container spacing={2} sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <Grid m={1} container spacing={2} alignItems="center">
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <CheckCircleIcon style={{ color: "green" }} />
                <Typography className={poppins.className}>
                  Business Type
                </Typography>
              </Grid>
            </Grid>

            <Grid item>
              <Divider
                orientation="horizontal"
                style={{ width: "400px", border: "1px dashed grey" }}
              />
            </Grid>

            <Grid item>
              <Grid container direction="column" alignItems="center">
                <CheckCircleIcon style={{ color: "green" }} />
                <Typography className={poppins.className}>
                  Photo Identification
                </Typography>
              </Grid>
            </Grid>

            <Grid item>
              <Divider
                orientation="horizontal"
                style={{ width: "400px", border: "1px dashed grey" }}
              />
            </Grid>

            <Grid item>
              <Grid container direction="column" alignItems="center">
                <RadioButtonUncheckedIcon style={{ color: "purple" }} />
                <Typography>Document Verification</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} mt={5}>
              <Typography
                className={poppins.className}
                sx={{
                  fontWeight: "600",
                }}
              >
                Please select any of the 2 options below to verify your KYC
              </Typography>
            </Grid>
          </Grid>
          <Grid xs={12} sm={12} md={12}>

          </Grid>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default Kyc;
