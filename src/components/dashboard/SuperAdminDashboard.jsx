import React from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  ButtonGroup,
  CardContent,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Tile from "../Tile";
import Chartone from "../Chartone";
import Charttwo from "../Charttwo";
import BestSellingProducts from "../BestSellingProducts";
import TopSellers from "../TopSellers";

const SuperAdminDashboard = () => {
  return (
    <Grid
      container
      sx={{
        flexDirection: "column",
        flexGrow: 1,
        padding: 3,
      }}
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
   <Tile />
   <Box sx={{ display: "flex", gap: 2, marginTop: 4 }}>
  <Box sx={{ flex: 8 }}>
    <Chartone />
  </Box>
  
  <Box sx={{ flex: 4 }}>
    <Charttwo />
  </Box>
</Box>

      <Box sx={{ display: "flex", gap: 2, marginTop: 4 }}>
        <Box sx={{ flex: 1 }}>
          <BestSellingProducts />
        </Box>

        <Box sx={{ flex: 1 }}>
        <TopSellers />
        </Box>
      </Box>
    </Grid>
  );
};

export default SuperAdminDashboard;
