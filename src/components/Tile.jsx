import React from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const data = [
  {
    change: "+16.24 %",
    link: "View net earnings",
    icon: <MonetizationOnIcon />,
    changePositive: true,
  },
];

const Tile = (props) => {
  return (
  
        <Card
          sx={{
            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
            borderRadius: 1,
            overflow: "hidden",
            marginTop: 3,
            maxWidth: "200px"

          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginY: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "rgb(240 101 72)",
                }}
              >
                <Typography variant="body2" sx={{ marginLeft: 0.5 }}>
                  test
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 1,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "underline",
                  color: "rgb(68 81 137)",
                  cursor: "pointer",
                }}
              >
                test
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                test
              </Box>
            </Box>
          </CardContent>
        </Card>
  
  );
};

export default Tile;
