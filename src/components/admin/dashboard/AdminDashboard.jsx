import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  ButtonGroup,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);
const chartData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      type: "line",
      label: "Orders",
      data: [90, 110, 60, 120, 90, 100, 70, 50, 110, 80, 90, 60],
      borderColor: "#8884d8",
      borderWidth: 2,
      fill: false,
    },
    {
      type: "bar",
      label: "Earnings",
      data: [40, 30, 60, 50, 70, 80, 40, 30, 50, 60, 70, 50],
      backgroundColor: "#82ca9d",
    },
    {
      type: "line",
      label: "Refunds",
      data: [10, 20, 30, 20, 40, 10, 30, 20, 10, 30, 40, 20],
      borderColor: "#FF8042",
      borderWidth: 2,
      fill: false,
      borderDash: [5, 5],
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};
const data = [
  {
    change: "+16.24 %",
    link: "View net earnings",
    icon: <MonetizationOnIcon />,
    changePositive: true,
  },
  {
    change: "-3.57 %",
    link: "View all orders",
    icon: <ShoppingCartIcon />,
    changePositive: false,
  },
  {
    change: "+29.08 %",
    link: "See details",
    icon: <PeopleIcon />,
    changePositive: true,
  },
  {
    change: "+0.00 %",
    link: "Withdraw money",
    icon: <AccountBalanceWalletIcon />,
    changePositive: true,
  },
  {
    change: "+0.00 %",
    link: "Withdraw money",
    icon: <AccountBalanceWalletIcon />,
    changePositive: true,
  },
  {
    change: "+0.00 %",
    link: "Withdraw money",
    icon: <AccountBalanceWalletIcon />,
    changePositive: true,
  },
];

const AdminDashboard = () => {
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
          Good Morning, Demo!
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
      <Grid
        item
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 2,
          marginTop: 2,
        }}
      >
        {data.map((item, index) => (
          <Card
            key={index}
            sx={{
              boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
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
                    color: item.changePositive
                      ? "rgb(10 179 156)"
                      : "rgb(240 101 72)",
                  }}
                >
                  <Typography variant="body2" sx={{ marginLeft: 0.5 }}>
                    {item.change}
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="h5"
                sx={{
                  color: "#495057",
                  fontSize: "22px",
                  fontWeight: "bolder",
                }}
              >
                {item.value}
              </Typography>
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
                  {item.link}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {item.icon}
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ marginTop: 4 }}>
  <Grid item xs={8}>
    <Card>
      <Box sx={{ padding: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
            Orders
          </Typography>
          <ButtonGroup size="small" sx={{ backgroundColor: "#e1ebfd" }}>
            <Button>ALL</Button>
            <Button>1M</Button>
            <Button>6M</Button>
            <Button>1Y</Button>
          </ButtonGroup>
        </Box>
        <Box sx={{ display: "flex", gap: 2, marginTop: 2, backgroundColor: "#f9fbfc", padding: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography>7,585</Typography>
            <Typography>Orders</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography>$22.89k</Typography>
            <Typography>Earnings</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography>367</Typography>
            <Typography>Refunds</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography color="primary">18.92%</Typography>
            <Typography>Conversion Ratio</Typography>
          </Box>
        </Box>
        <Box sx={{ marginTop: 3 }}>
          <Line data={chartData} options={chartOptions} />
        </Box>
      </Box>
    </Card>
  </Grid>

  <Grid item xs={4}>
    <Card>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h6">Hello</Typography>
      </Box>
    </Card>
  </Grid>
</Grid>



    </Grid>
  );
};

export default AdminDashboard;
