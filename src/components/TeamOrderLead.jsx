import React, { useState } from "react";
import {
  Box,
  CardContent,
  MenuItem,
  Card,
  Select,
  FormControl,
  Divider,
  Table,
  TableBody,
  TableCell,
  Grid,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  LinearProgress,
  Button,
} from "@mui/material";
import CustomCard from "./CustomCard";
import RocketIcon from "@mui/icons-material/Rocket";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
const TeamLead = () => {
  const [filter, setFilter] = useState("TL");
  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const getButtonColor = (status) => {
    return status === "Absent" ? "error" : "success";
  };

  const tlProducts = [
    {
      image:
        "https://www.themesbrand.com/velzon/html/master/assets/images/companies/img-2.png",
      name: "Rahul Kumar",
      date: "Web Developer",
      status: "Absent",
      orders: 62,
      accepted: 76,
      rejected: 45,
      noresponse: 89,
      targets: 510,
      progress: 10,
    },
    {
      image:
        "https://www.themesbrand.com/velzon/html/master/assets/images/companies/img-2.png",
      name: "Shivam Kumar",
      date: "Web Developer",
      status: "Present",
      orders: 34,
      accepted: 76,
      rejected: 45,
      noresponse: 89,
      targets: 120,
      progress: 25, // Progress in percentage
    },
    {
      image:
        "https://www.themesbrand.com/velzon/html/master/assets/images/companies/img-2.png",
      name: "Priya Singh",
      date: "Web Developer",
      status: "Absent",
      orders: 62,
      accepted: 50,
      rejected: 51,
      noresponse: 59,
      targets: 510,
      progress: 50,
    },
  ];

  const agentProducts = [
    {
      image:
        "https://www.themesbrand.com/velzon/html/master/assets/images/companies/img-8.png",
      name: "Ravendra kr",
      date: "Dev",
      status: "Present",
      orders: 34,
      accepted: 76,
      rejected: 45,
      noresponse: 89,
      targets: 120,
      progress: 30,
    },
    {
      image:
        "https://www.themesbrand.com/velzon/html/master/assets/images/companies/img-8.png",
      name: "Siva",
      date: "Dev",
      status: "Absent",
      orders: 34,
      accepted: 50,
      rejected: 51,
      noresponse: 59,
      targets: 120,
      progress: 75,
    },
  ];

  const managerProducts = [
    {
      image:
        "https://www.themesbrand.com/velzon/html/master/assets/images/companies/img-1.png",
      name: "Bharti",
      date: "Marketing",
      status: "Absent",
      orders: 80,
      accepted: 76,
      rejected: 45,
      noresponse: 89,
      targets: 749,
      progress: 90,
    },
    {
      image:
        "https://www.themesbrand.com/velzon/html/master/assets/images/companies/img-1.png",
      name: "Jittu",
      date: "Digital",
      status: "Present",
      orders: 62,
      accepted: 76,
      rejected: 45,
      noresponse: 89,
      targets: 510,
      progress: 40,
    },
  ];

  // Function to get the right products based on the selected filter
  const getFilteredProducts = () => {
    switch (filter) {
      case "TL":
        return tlProducts;
      case "Agent":
        return agentProducts;
      case "Manager":
        return managerProducts;
      default:
        return [];
    }
  };

  const products = getFilteredProducts();

  const metricsData = {
    TL: {
      campaignSent: 197,
      annualProfit: "100",
      leadConversation: "100",
      dailyIncome: "30",
      annualDeals: 2659,
    },
    Agent: {
      campaignSent: 150,
      annualProfit: "120",
      leadConversation: "120",
      dailyIncome: "35",
      annualDeals: 2000,
    },
    Manager: {
      campaignSent: 300,
      annualProfit: "130",
      leadConversation: "180",
      dailyIncome: "45",
      annualDeals: 3500,
    },
  };

  const metrics = metricsData[filter];

  const cards = [
    {
      title: "Total Order",
      value: metrics.campaignSent,
      color: "#169e09",
      icon: <RocketIcon style={{ color: "#fff" }} />,
    },
    {
      title: "Daily Target",
      value: metrics.annualProfit,
      color: "#5f27cd",
      icon: <ShoppingCartIcon style={{ color: "#fff" }} />,
    },
    {
      title: "Total Lead ",
      value: metrics.leadConversation,
      color: "#54a0ff",
      icon: <PeopleIcon style={{ color: "#fff" }} />,
    },
    {
      title: "Accepted Order",
      value: metrics.dailyIncome,
      color: "#01a3a4",
      icon: <CheckCircleIcon style={{ color: "#fff" }} />,
    },
    {
      title: "Rejected Order",
      value: 45,
      color: "#b0021f",
      icon: <CloseIcon style={{ color: "#fff" }} />,
    },
    {
      title: "No Response",
      value: metrics.annualDeals,
      color: "#edce02",
      icon: <ThumbDownIcon style={{ color: "#fff" }} />,
    },
  ];

  return (
    <CustomCard>
      <CardContent>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#495057",
                display: "flex",
                alignItems: "center",
              }}
            >
              Team Order List
              <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <Select value={filter} onChange={handleChange}>
                    <MenuItem value="TL">Team Lead</MenuItem>
                    <MenuItem value="Agent">Agent</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <TableContainer component={Paper}>
            {/* Metrics Cards */}
            <Grid container spacing={1}>
              {cards.map((card, index) => (
                <Grid item xs={12} sm={6} md={2} key={index}>
                  <Card sx={{ backgroundColor: card.color, color: "#fff" }}>
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", fontSize: "18px" }}
                      >
                        {card.title}
                      </Typography>
                      <Typography variant="h4" sx={{ mt: 1, fontSize: "24px" }}>
                        {card.icon} {card.value}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Table aria-label="top selling products">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Profile Images
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Agent Status
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Today Orders
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Today Accepted
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Today Rejected
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    No Response
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Daily Target
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Progress
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          component="img"
                          src={product.image}
                          alt={product.name}
                          sx={{ width: 50, height: 50, mr: 2 }}
                        />
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#495057",
                            }}
                          >
                            {product.name}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "13px",
                              color: "#888888",
                            }}
                          >
                            {product.date}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color={getButtonColor(product.status)}
                        sx={{ minWidth: 100, padding: "5px" }}
                      >
                        {product.status}{" "}
                      </Button>
                    </TableCell>
                    <TableCell align="right">{product.orders}</TableCell>
                    <TableCell align="right">{product.accepted}</TableCell>
                    <TableCell align="right">{product.rejected}</TableCell>
                    <TableCell align="right">{product.noresponse}</TableCell>
                    <TableCell align="right">{product.targets}</TableCell>
                    <TableCell align="right">
                      <Box sx={{ width: "100%", position: "relative" }}>
                        <LinearProgress
                          variant="determinate"
                          value={product.progress}
                          sx={{
                            height: 8,
                            borderRadius: 5,
                            "& .MuiLinearProgress-bar": {
                              borderRadius: 5,
                            },
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            position: "absolute",
                            left: "50%",
                            transform: "translateX(-50%)",
                            top: -25,
                            fontWeight: "bold",
                          }}
                        >
                          {product.progress}%
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </CardContent>
    </CustomCard>
  );
};

export default TeamLead;
