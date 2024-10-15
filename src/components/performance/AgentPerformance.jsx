import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import CustomLabel from "../CustomLabel";
import CustomTextField from "../CustomTextField";
import { styled } from "@mui/system";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import TotalOrderIcon from "@mui/icons-material/Assignment";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";
import TotalLeadIcon from "@mui/icons-material/People";
import AcceptIcon from "@mui/icons-material/CheckCircle";
import RejectedIcon from "@mui/icons-material/Cancel";
import NoResponseIcon from "@mui/icons-material/QuestionAnswer";
import CustomCard from "../CustomCard";
import useGetAllBranches from "@/api-manage/react-query/useGetAllBranches";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ArrowCircleUpTwoToneIcon from "@mui/icons-material/ArrowCircleUpTwoTone";
import ArrowCircleDownTwoToneIcon from "@mui/icons-material/ArrowCircleDownTwoTone";
import ChartThree from "../ChartThree";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels
);

const Tile = styled(Paper)(() => ({
  padding: "16px",
  textAlign: "center",
  color: "#000",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minHeight: "100px",
  fontWeight: "bold",
}));

const tilesData = [
  {
    title: "Total Order",
    count: 300,
    bgcolor: "#1f8224",
    icon: <TotalOrderIcon />,
    trend: "up",
  },
  {
    title: "Daily Target",
    count: 130,
    bgcolor: "#502894",
    icon: <ModeStandbyIcon />,
    trend: "down",
  },
  {
    title: "Total Lead",
    count: 180,
    bgcolor: "#3682a3",
    icon: <TotalLeadIcon />,
    trend: "up",
  },
  {
    title: "Accept",
    count: 205,
    bgcolor: "#2b8079",
    icon: <AcceptIcon />,
    trend: "up",
  },
  {
    title: "Rejected",
    count: 102,
    bgcolor: "#9c1209",
    icon: <RejectedIcon />,
    trend: "down",
  },
  {
    title: "No Response",
    count: 500,
    bgcolor: "#a89d38",
    icon: <NoResponseIcon />,
    trend: "up",
  },
];

const pieChartColors = [
  "#f569a1",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#9359bd",
];

const pieChartData1 = {
  labels: ["Orders", "Products"],
  datasets: [
    {
      label: "Orders vs Products",
      data: [tilesData[0].count, tilesData[1].count],
      backgroundColor: [pieChartColors[0], pieChartColors[1]],
      borderWidth: 1,
    },
  ],
};

const pieChartData2 = {
  labels: ["Prepaid", "COD", "Partial"],
  datasets: [
    {
      label: "Payment Modes",
      data: [tilesData[2].count, tilesData[3].count, tilesData[4].count],
      backgroundColor: [
        pieChartColors[2],
        pieChartColors[3],
        pieChartColors[4],
      ],
      borderWidth: 1,
    },
  ],
};

const orderData = [
  { orderStatus: "Rejected", date: "2024-10-01", count: 35 },
  { orderStatus: "No Response", date: "2024-10-01", count: 43 },
  { orderStatus: "Accepted", date: "2024-10-02", count: 17 },
  { orderStatus: "Pickup", date: "2024-10-04", count: 32 },
  { orderStatus: "DElivered", date: "2024-10-03", count: 26 },
];

const aggregateCounts = (data) => {
  return data.reduce((acc, curr) => {
    acc[curr.orderStatus] = (acc[curr.orderStatus] || 0) + curr.count;
    return acc;
  }, {});
};

const counts = aggregateCounts(orderData);

const barChartData = {
  labels: Object.keys(counts), // Order statuses
  datasets: [
    {
      label: "Count",
      data: Object.values(counts), // Corresponding counts
      backgroundColor: pieChartColors.slice(0, Object.keys(counts).length), // Colors for each bar
      borderColor: "rgba(255, 255, 255, 0.8)", // Color of the border
      borderWidth: 2, // Width of the border
      hoverBackgroundColor: "rgba(255, 99, 132, 0.8)", // Background color on hover
      hoverBorderColor: "rgba(255, 255, 255, 1)", // Border color on hover
      hoverBorderWidth: 3, // Border width on hover
      barPercentage: 0.6, // Adjusts the width of the bars relative to the available space
      categoryPercentage: 0.8, // Adjusts the width of the categories
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    datalabels: {
      color: "#000",
      font: {
        weight: "bold",
        size: 12,
      },
      formatter: (value) => value,
      align: "center",
    },
  },
};
const Counter = ({ target }) => {
  const [count, setCount] = useState(0);
  const duration = 2000;
  const stepTime = Math.abs(Math.floor(duration / target));

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev < target) {
          return Math.min(prev + 1, target);
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, stepTime]);

  return <span style={{ marginLeft: "20px" }}>{count}</span>;
};
const AgentPerformance = () => {
  const { data } = useGetAllBranches();
  const [team, setTeam] = useState(1);
  const [page, setPage] = useState(0);
  const [startDate, setStartDate] = useState(dayjs(null));
  const [endDate, setEndDate] = useState(dayjs(null));
  const [selectedBranch, setSelectedBranch] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const teamData = {
    1: [],
    3: [],
  };

  useEffect(() => {
    if (data?.results?.length) {
      setSelectedBranch(data.results[0].name);
    }
  }, [data]);

  useEffect(() => {
    setFilteredRows(teamData[team]);
    setPage(0);
  }, [team]);

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const handleTeamChange = (event) => {
    setTeam(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  return (
    <Grid container spacing={1} p={1}>
      <Grid item xs={12}>
        <CustomCard>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                Agent Dashboard
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <CustomLabel htmlFor="select_team" required>
                Select Team
              </CustomLabel>
              <Select
                labelId="select_team"
                id="select_team"
                value={team}
                onChange={handleTeamChange}
                displayEmpty
                sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                fullWidth
              >
                <MenuItem value={1}>Crewman</MenuItem>
                <MenuItem value={2}>NDR</MenuItem>
                <MenuItem value={3}>Sales</MenuItem>
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
                sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                fullWidth
              >
                {data?.results?.map((branch) => (
                  <MenuItem key={branch.id} value={branch.name}>
                    {branch.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CustomLabel htmlFor="start_date" required>
                  Start Date
                </CustomLabel>
                <DatePicker
                  value={startDate}
                  onChange={handleStartDateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "#212121",
                            height: "45px",
                          },
                        "& .MuiFormLabel-root.Mui-error": {
                          color: "#212121",
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CustomLabel htmlFor="end_date" required>
                  End Date
                </CustomLabel>
                <DatePicker
                  value={endDate}
                  onChange={handleEndDateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "#212121",
                            height: "45px",
                          },
                        "& .MuiFormLabel-root.Mui-error": {
                          color: "#212121",
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </CustomCard>
      </Grid>
      {tilesData.map((tile, index) => (
        <Grid item xs={2} sm={2} md={2} key={index}>
          <Tile
            elevation={0}
            style={{ boxShadow: "none" }}
            bgcolor={tile.bgcolor}
          >
            <Typography
              variant="body1"
              style={{
                textAlign: "left",
                marginBottom: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {tile.title}
              {tile.trend === "up" ? (
                <ArrowCircleUpTwoToneIcon
                  style={{ color: "green", fontSize: "20px" }}
                />
              ) : (
                <ArrowCircleDownTwoToneIcon
                  style={{ color: "red", fontSize: "20px" }}
                />
              )}
            </Typography>
            <Typography
              variant="h6"
              style={{ display: "flex", alignItems: "center" }}
            >
              {tile.icon}
              <Counter target={tile.count} />
            </Typography>
          </Tile>
        </Grid>
      ))}
      <Grid item xs={12} sm={12} md={12} mt={2}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            sx={{ height: "300px", padding: "20" }}
          >
            <CustomCard>
              <Pie data={pieChartData1} options={chartOptions}  style={{
                padding:"20px",
              }} />
            </CustomCard>
          </Grid>
          <Grid item xs={12} sm={4} md={4} >
            <CustomCard>
              <Pie data={pieChartData2} options={chartOptions} style={{
                padding:"20px",
              }} />
            </CustomCard>
          </Grid>
          <Grid item xs={12} sm={4} md={4} >
            <ChartThree />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AgentPerformance;
