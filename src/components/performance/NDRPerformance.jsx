import React, { useState, useEffect } from "react";
import { Grid, MenuItem, Select, Typography, TextField, Button } from "@mui/material";
import CustomCard from "../CustomCard";
import CustomLabel from "../CustomLabel";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useGetAllBranches from "@/api-manage/react-query/useGetAllBranches";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const NDRPerformance = () => {
  const { data } = useGetAllBranches();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [team, setTeam] = useState(1);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [showCharts, setShowCharts] = useState(false); 

  
  const mockData = [
    { status: 1, date: "2024-10-10" },
    { status: 1, date: "2024-10-12" }, 
    { status: 2, date: "2024-10-15" },
  ];

  const pieChartData1 = {
    labels: ["Running", "Pending"],
    datasets: [
      {
        label: "NDR Status",
        data: [3, 1],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const pieChartData2 = {
    labels: ["Delivered", "RTO", "OFD"],
    datasets: [
      {
        label: "NDR Status",
        data: [2, 1, 1],
        backgroundColor: ["#FFCE56", "#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FFCE56", "#FF6384", "#36A2EB"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  useEffect(() => {
    if (data?.results?.length) {
      setSelectedBranch(data.results[0].name);
    }
  }, [data]);

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const handleTeamChange = (event) => {
    setTeam(event.target.value);
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const handleGetDataClick = () => {
    if (selectedBranch && team && startDate && endDate) {
      setShowCharts(true);
    } else {
      setShowCharts(false);
    }
  };

  // Helper function to generate date range between start and end dates
  const generateDateRange = (start, end) => {
    let currentDate = dayjs(start);
    const dates = [];
    while (currentDate.isBefore(end) || currentDate.isSame(end)) {
      dates.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.add(1, "day");
    }
    return dates;
  };

  // Generate dates between startDate and endDate
  const dateRange = startDate && endDate ? generateDateRange(startDate, endDate) : [];

  // Filter and map mock data to the date range
  const finalData = dateRange.map((date) => {
    const dataForDate = mockData.find(
      (item) => dayjs(item.date).format("YYYY-MM-DD") === date && item.status === team
    );
    return dataForDate ? Math.floor(Math.random() * 100) : 0; // Random value or 0
  });

  // Bar chart data
  const barData = {
    labels: dateRange,
    datasets: [
      {
        label: "NDR Performance",
        data: finalData,
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={12}>
        <CustomCard>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                NDR Team Verification
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <CustomLabel htmlFor="select_team" required>
                NDR Status
              </CustomLabel>
              <Select
                labelId="select_team"
                id="select_team"
                value={team}
                onChange={handleTeamChange}
                displayEmpty
                fullWidth
                sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
              >
                <MenuItem value={1}>Running</MenuItem>
                <MenuItem value={2}>Pending</MenuItem>
                <MenuItem value={3}>Delivered</MenuItem>
                <MenuItem value={4}>RTO</MenuItem>
                <MenuItem value={5}>OFD</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={3}>
              <CustomLabel htmlFor="select_branch" required>
                Branch
              </CustomLabel>
              <Select
                labelId="select_branch"
                id="select_branch"
                value={selectedBranch}
                onChange={handleBranchChange}
                displayEmpty
                fullWidth
                sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
              >
                {data?.results?.map((branch) => (
                  <MenuItem key={branch.id} value={branch.name}>
                    {branch.name}
                  </MenuItem>
                )) || []}
              </Select>
            </Grid>
            <Grid item xs={12} sm={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CustomLabel htmlFor="start_date">Start Date</CustomLabel>
                <DatePicker
                  value={startDate}
                  onChange={handleStartDateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          { borderColor: "#212121", height: "45px" },
                        "& .MuiFormLabel-root": { color: "#212121" },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CustomLabel htmlFor="end_date">End Date</CustomLabel>
                <DatePicker
                  value={endDate}
                  onChange={handleEndDateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          { borderColor: "#212121", height: "45px" },
                        "& .MuiFormLabel-root": { color: "#212121" },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              display="flex"
              justifyContent="flex-end"
            >
              <Button
                onClick={handleGetDataClick}
                sx={{
                  backgroundColor: "#405987",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#405987",
                  },
                }}
              >
                Get Data
              </Button>
            </Grid>
          </Grid>
        </CustomCard>
      </Grid>

      {showCharts && (
        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <CustomCard>
                <Bar
                  fullWidth
                  data={barData}
                  options={barOptions}
                  style={{ padding: "20px" }}
                />
              </CustomCard>
            </Grid>
            <Grid item xs={12} sm={3} md={3}>
              <CustomCard>
                <Pie
                  data={pieChartData1}
                  options={chartOptions}
                  style={{ padding: "20px" }}
                />
              </CustomCard>
            </Grid>
            <Grid item xs={12} sm={3} md={3}>
              <CustomCard>
                <Pie
                  data={pieChartData2}
                  options={chartOptions}
                  style={{ padding: "20px" }}
                />
              </CustomCard>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default NDRPerformance;
