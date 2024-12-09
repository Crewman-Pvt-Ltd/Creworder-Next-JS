import React from "react";
import CustomCard from "./CustomCard";
import { Typography, Grid } from "@mui/material";

const FooterBottom = () => {
  return (
    <Grid
      container
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 999,
        
        p: 2, 
      }}
    >
      <Grid item xs={12}>
        <CustomCard>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{ py: 1 }}
          >
            <Grid item xs={6}>
              <Typography variant="body1">Copyright © Crewman 2024</Typography>
            </Grid>
            <Grid item xs={6} >
              <Typography variant="body1">Version 1</Typography>
            </Grid>
          </Grid>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default FooterBottom;
