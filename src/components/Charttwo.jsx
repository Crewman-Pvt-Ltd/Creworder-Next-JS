import React from "react";
import { Bar } from "react-chartjs-2";
import { Box, Typography } from '@mui/material';
import CustomCard from "./CustomCard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const chartData = {
  labels: [
    "India",
    "United States",
    "China",
    "Indonesia",
    "Russia",
    "Bangladesh",
    "Canada",
    "Brazil",
    "Vietnam",
    "UK",
  ],
  datasets: [
    {
      label: "Sessions",
      data: [1010, 1640, 490, 1255, 1050, 689, 800, 420, 1085, 589],
      backgroundColor: [
        "rgba(54, 162, 235, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(54, 162, 235, 0.6)",
      ],
    },
  ],
};

const chartOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Sessions by Countries",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Number of Sessions',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Country',
      },
    },
  },
};

const Charttwo = () => {
  return (
    <CustomCard>
      <Box
        sx={{
          padding: 2,
          height: { xs: '300px', sm: '600px', md: '580px' },
          overflow: 'hidden',
        }}
      >
        <Bar data={chartData} options={chartOptions} />
      </Box>
    </CustomCard>
  );
};

export default Charttwo;
