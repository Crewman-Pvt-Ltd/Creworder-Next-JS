import React, { useEffect, useState } from "react";
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
import { baseApiUrl } from "@/api-manage/ApiRoutes";
import { getToken } from "@/utils/getToken";
import axios from "axios";

const TeamLead = () => {
  const token = getToken();
  const [filter, setFilter] = useState("N"); // Default filter value
  const [teamLeadData, setTeamLeadData] = useState({});
  const [teamLeadData1, setTeamLeadData1] = useState({});
  const [teamLeadDetails, setTeamLeadDetails] = useState([]);
  const [agentDetailsData, setAgentDetailsData] = useState([]);

  // Metrics Data
  const metricsData = {
    N: {
      total_order: 0,
      daily_target: 0,
      accepted_order: 0,
      rejected_order: 0,
      total_lead: 0,
      total_order: 0,
    }
  };

  const metrics = teamLeadData1[filter] || metricsData.N;

  const getButtonColor = (status) => (status === "Absent" ? "error" : "success");

  // Fetch Team Lead Data
  const getTeamLeadData = async () => {
    try {
      const response = await axios.get(`${baseApiUrl}user-dashboard-team-order-list/`, {
        headers: { Authorization: `Token ${token}` },
      });
      const data = response.data.data;
      const newDetails = Object.values(data).map((value) => value.teamleadTiles);
      const reshapedData = newDetails.reduce((acc, item) => {
        const { lead_id, ...details } = item;
        acc[lead_id] = details;
        return acc;
      }, {});
      setTeamLeadData1(reshapedData);
      setTeamLeadData(data);
      setTeamLeadDetails(newDetails);
      console.log(teamLeadData1)
    } catch (error) {
      console.error("Error fetching team lead data:", error);
    }
  };

  // Filter Agent Details
  const getFilteredProducts = () => {
    if (!teamLeadData[filter]) {
      setAgentDetailsData([]);
      return;
    }

    const agents = Object.entries(teamLeadData[filter])
      .filter(([key]) => key !== "teamleadTiles")
      .map(([key, value]) => ({
        ...value,
        image:
          "https://www.themesbrand.com/velzon/html/master/assets/images/companies/img-2.png",
        status: "Present",
      }));

    setAgentDetailsData(agents);
  };

  useEffect(() => {
    getTeamLeadData();
  }, []);

  useEffect(() => {
    getFilteredProducts();
  }, [filter, teamLeadData]);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const cards = [
    { title: "Total Order", value: metrics.total_order, color: "#169e09", icon: <RocketIcon style={{ color: "#fff" }} /> },
    { title: "Daily Target", value: metrics.daily_target, color: "#5f27cd", icon: <ShoppingCartIcon style={{ color: "#fff" }} /> },
    { title: "Total Lead", value: metrics.total_lead, color: "#54a0ff", icon: <PeopleIcon style={{ color: "#fff" }} /> },
    { title: "Accepted Order", value: metrics.accepted_order, color: "#01a3a4", icon: <CheckCircleIcon style={{ color: "#fff" }} /> },
    { title: "Rejected Order", value: metrics.rejected_order, color: "#b0021f", icon: <CloseIcon style={{ color: "#fff" }} /> },
    { title: "No Response", value: metrics.no_response, color: "#edce02", icon: <ThumbDownIcon style={{ color: "#fff" }} /> },
  ];

  return (
    <CustomCard>
      <CardContent>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography sx={{ fontSize: "16px", fontWeight: 600, color: "#495057" }}>
              Team Order List
              <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <Select value={filter} onChange={handleChange}>
                    <MenuItem value="N">Select Team Lead</MenuItem>
                    {teamLeadDetails.map((detail, index) => (
                      <MenuItem key={index} value={detail.lead_id}>
                        {detail.teamlead_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            {cards.map((card, index) => (
              <Grid item xs={12} sm={6} md={2} key={index}>
                <Card sx={{ backgroundColor: card.color, color: "#fff" }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "18px" }}>{card.title}</Typography>
                    <Typography variant="h4" sx={{ mt: 1, fontSize: "24px" }}>{card.icon} {card.value}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <TableContainer component={Paper}>
            <Table aria-label="agent details">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Profile Images</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>Agent Status</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>Today Orders</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>Today Accepted</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>Today Rejected</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>No Response</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>Daily Target</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>Progress</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {agentDetailsData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No data available
                    </TableCell>
                  </TableRow>
                ) : (
                  agentDetailsData.map((product, index) => (
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
                            <Typography sx={{ fontSize: "13px", fontWeight: 600, color: "#495057" }}>{product.name}</Typography>
                            <Typography sx={{ fontSize: "13px", color: "#888888" }}>{product.total_order}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color={getButtonColor(product.status)}
                          sx={{ minWidth: 100, padding: "5px" }}
                        >
                          {product.status}
                        </Button>
                      </TableCell>
                      <TableCell align="right">{product.total_order}</TableCell>
                      <TableCell align="right">{product.accepted_order}</TableCell>
                      <TableCell align="right">{product.rejected_order}</TableCell>
                      <TableCell align="right">{product.no_response}</TableCell>
                      <TableCell align="right">{product.daily_target}</TableCell>
                      <TableCell align="right">
                        <Box sx={{ width: "100%", position: "relative" }}>
                          <LinearProgress
                            variant="determinate"
                            value={product.total_order || 0}
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
                            {`${product.total_order || 0}%`}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </CardContent>
    </CustomCard>
  );
};
export default TeamLead;
