import React from "react";
import { Grid, Typography,useTheme } from "@mui/material";
import Tile from "../Tile";
import CompanyDetailsdashboard from "../CompanyDetailsDashboard";
import CompanyRegistrationGraph from "../CompanyRegistrationGraph";

const SuperAdminDashboard = () => {
 
  const tilesTypes = ["totalCompanies", "activeCompanies", "suspendedCompanies", "totalPackages"];
  return (
    <Grid
      container
      direction="column"
      spacing={3}
    sx={{
     padding: 2,
    }}
    >
      <Grid item>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "600",
            margin: 0,
            color:"#495057",
          }}
        >
          Welcome..., Superadmin!
        </Typography>
        <Typography
          sx={{
            fontSize: "13px",
            color: "gray",
            margin: 0,
            paddingTop: 0,
          }}
        >
          Here's what's happening with your store today.
        </Typography>
      </Grid>

      <Grid item>
      <Grid container spacing={2}>
      {tilesTypes.map((type, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Tile type={type} />
        </Grid>
      ))}
    </Grid>
      </Grid>

       <Grid item>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
          <CompanyDetailsdashboard type="newlyRegistered" />
          </Grid>
          <Grid item xs={12} md={6}>
          <CompanyDetailsdashboard type="mostUsers" />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sm={12}>
          <CompanyDetailsdashboard type="recentPaid" />
          </Grid>
          <Grid item xs={12} md={6} sm={12}>
          <CompanyDetailsdashboard type="recentExpired" />
          </Grid>
        </Grid>
      </Grid>

        <Grid item>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
          <CompanyDetailsdashboard type="packageCompanyCount" />
          </Grid>
          <Grid item xs={12} md={6}>
           <CompanyRegistrationGraph />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SuperAdminDashboard;
