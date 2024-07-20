import React from "react";
import { Grid, Typography } from "@mui/material";

import Tile from "../Tile";
import Chartone from "../Chartone";
import Charttwo from "../Charttwo";
import BestSellingProducts from "../BestSellingProducts";
import TopSellers from "../TopSellers";
import StoresVisitBySource from "../StoresVisitBySource";
import RecentOrders from "../RecentOrders";
import CalendarFilter from "../CalendarFilter";

const SuperAdminDashboard = () => {
  return (
    <Grid
      container
      direction="column"
      spacing={3}
      sx={{ padding: 3 }}
    >
      <Grid item>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
            margin: 0,
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
          {[...Array(4)].map((_, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
            >
              <Tile />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Chartone />
          </Grid>
          <Grid item xs={12} md={4}>
            <Charttwo />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} sm={12}>
            <StoresVisitBySource />
          </Grid>
          <Grid item xs={12} md={8} sm={12}>
            <RecentOrders />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <BestSellingProducts />
          </Grid>
          <Grid item xs={12} md={6}>
            <TopSellers />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SuperAdminDashboard;
