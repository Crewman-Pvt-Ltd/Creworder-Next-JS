import React, { useState, useEffect, useRef } from "react";
import { Grid, MenuItem, Select, Typography, Button } from "@mui/material";
import CustomCard from "../CustomCard";
import CustomLabel from "../CustomLabel";

import dayjs from "dayjs";
import useGetAllBranches from "@/api-manage/react-query/useGetAllBranches";
import { Bar, Pie } from "react-chartjs-2";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

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
  const dateRef = useRef(null);
  const { data } = useGetAllBranches();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [team, setTeam] = useState(1);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [showCharts, setShowCharts] = useState(false);

  useEffect(() => {
    const today = new Date();
    const flatpickrInstance = Flatpickr(dateRef.current, {
      mode: "range",
      dateFormat: "d M, Y",
      defaultDate: [today, today],
      onChange: (selectedDates) => {
        if (selectedDates.length === 2) {
          setStartDate(dayjs(selectedDates[0]));
          setEndDate(dayjs(selectedDates[1]));
        }
      },
    });

    return () => {
      flatpickrInstance.destroy();
    };
  }, []);

  useEffect(() => {
    if (data?.results?.length) {
      setSelectedBranch(data.results[0].name);
    }
  }, [data]);

  const handleGetDataClick = () => {
    if (selectedBranch && team && startDate && endDate) {
      setShowCharts(true);
    } else {
      alert("Please fill in all fields.");
      setShowCharts(false);
    }
  };

  // Helper function to generate date range
  const generateDateRange = (start, end) => {
    let currentDate = dayjs(start);
    const dates = [];
    while (currentDate.isBefore(end) || currentDate.isSame(end)) {
      dates.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.add(1, "day");
    }
    return dates;
  };

  // Mock data
  const mockData = [
    { status: 1, date: "2024-10-10" },
    { status: 1, date: "2024-10-12" },
    { status: 2, date: "2024-10-15" },
  ];

  // Generate date range and filter mock data
  const dateRange =
    startDate && endDate ? generateDateRange(startDate, endDate) : [];

  const finalData = dateRange.map((date) => {
    const dataForDate = mockData.find(
      (item) =>
        dayjs(item.date).format("YYYY-MM-DD") === date && item.status === team
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

  // Pie chart data
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
                onChange={(e) => setTeam(e.target.value)}
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
                onChange={(e) => setSelectedBranch(e.target.value)}
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
            <Grid item xs={12} sm={6} md={3} mt={2}>
              <div
                style={{
                  padding: "8px",
                  borderRadius: "4px",
                  position: "relative",
                  backgroundColor: "#fff",
                  border: "2px solid gray",
                  marginTop: 5,
                }}
              >
                <input
                  ref={dateRef}
                  type="text"
                  placeholder="Select date range"
                  style={{
                    padding: "5px",
                    borderRadius: "4px",
                    color: "#333",
                    width: "100%",
                    height: "20px",
                    fontSize: "15px",
                  }}
                />
                <CalendarMonthIcon
                  style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "35px",
                    color: "white",
                    right: "1px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    backgroundColor: "#405189",
                    padding: "4px",
                  }}
                  onClick={() => dateRef.current.focus()}
                />
              </div>
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
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CustomCard>
                <Bar data={barData} options={barOptions} />
              </CustomCard>
            </Grid>
            <Grid item xs={12} sm={3}>
              <CustomCard>
                <Pie data={pieChartData1} options={chartOptions} />
              </CustomCard>
            </Grid>
            <Grid item xs={12} sm={3}>
              <CustomCard>
                <Pie data={pieChartData2} options={chartOptions} />
              </CustomCard>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default NDRPerformance;
