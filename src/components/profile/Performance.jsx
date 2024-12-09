import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import TotalOrderIcon from "@mui/icons-material/Assignment";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";
import TotalLeadIcon from "@mui/icons-material/People";
import AcceptIcon from "@mui/icons-material/CheckCircle";
import RejectedIcon from "@mui/icons-material/Cancel";
import NoResponseIcon from "@mui/icons-material/QuestionAnswer";
import ArrowCircleUpTwoToneIcon from "@mui/icons-material/ArrowCircleUpTwoTone";
import ArrowCircleDownTwoToneIcon from "@mui/icons-material/ArrowCircleDownTwoTone";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

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

const pieChartData = {
  labels: [
    "Total Order",
    "Daily Target",
    "Total Lead",
    "Accept",
    "Rejected",
    "No Response",
  ],
  datasets: [
    {
      label: "Performance Data",
      data: tilesData.map((tile) => tile.count),
      backgroundColor: pieChartColors,
      borderWidth: 1,
    },
  ],
};

const pieChartOptions = {
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
      formatter: (value, context) => {
        return value;
      },
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
const pieChartData1 = {
  labels: ["Total Order", "Daily Target"],
  datasets: [
    {
      label: "Performance Data",
      data: [tilesData[0].count, tilesData[1].count], // Total Order and Daily Target counts
      backgroundColor: [pieChartColors[0], pieChartColors[1]],
      borderWidth: 1,
    },
  ],
};

const pieChartData2 = {
  labels: ["Total Lead", "Accept"],
  datasets: [
    {
      label: "Performance Data",
      data: [tilesData[2].count, tilesData[3].count], // Total Lead and Accept counts
      backgroundColor: [pieChartColors[2], pieChartColors[3]],
      borderWidth: 1,
    },
  ],
};

const pieChartData3 = {
  labels: ["Rejected", "No Response"],
  datasets: [
    {
      label: "Performance Data",
      data: [tilesData[4].count, tilesData[5].count], // Rejected and No Response counts
      backgroundColor: [pieChartColors[4], pieChartColors[5]],
      borderWidth: 1,
    },
  ],
};
const Performance = () => {
  return (
    <Grid container spacing={0.3} p={1}>
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
          <Grid item xs={12} sm={4} md={4} sx={{ height: "300px" }}>
            <Pie data={pieChartData1} options={pieChartOptions} />
          </Grid>
          <Grid item xs={12} sm={4} md={4} sx={{ height: "300px" }}>
            <Pie data={pieChartData2} options={pieChartOptions} />
          </Grid>
          <Grid item xs={12} sm={4} md={4} sx={{ height: "300px" }}>
            <Pie data={pieChartData3} options={pieChartOptions} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Performance;