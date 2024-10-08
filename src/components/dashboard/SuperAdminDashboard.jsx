import React from "react";
import { Grid, Typography, useTheme } from "@mui/material";
import Tile from "../Tile";
import CompanyDetailsdashboard from "../CompanyDetailsDashboard";
import CompanyRegistrationGraph from "../CompanyRegistrationGraph";

const SuperAdminDashboard = () => {
  const tilesTypes = [
    "totalCompanies",
    "activeCompanies",
    "suspendedCompanies",
    "totalPackages",
  ];

  const currentHour = new Date().getHours();
  let greeting;
  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

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
            fontSize: "20px",
            fontWeight: "600",
            margin: 0,
            color: "#495057",
            }}
            >
          {greeting}, Superadmin!
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
              <Tile height="120px" padding="20px 20px" type={type} />
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
