import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, Typography } from "@mui/material";
import CustomCard from "./CustomCard";

ChartJS.register(ArcElement, Tooltip, Legend);

const ScheduleOrderChart = () => {
  const data = {
    labels: [
      "Invoice Sent",
      "Paid by clients",
      "Unpaid by clients",
      "Canceled by clients",
    ],
    datasets: [
      {
        data: [25, 32, 23, 29],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#cc65fe"],
        hoverBackgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#cc65fe"],
      },
    ],
  };

  const totalInvoices = data.datasets[0].data.reduce((a, b) => a + b, 0);

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: "#000000",
        formatter: (value) => value,
        font: {
          weight: "bold",
        },
      },
    },
  };

  const legendItems = [
    { color: "#ff6384", label: "Invoice Sent" },
    { color: "#36a2eb", label: "Paid by clients" },
    { color: "#ffce56", label: "Unpaid by clients" },
    { color: "#cc65fe", label: "Canceled by clients" },
  ];

  return (
    <CustomCard>
      <Box p={2} sx={{ height: 267, position: "relative" }}>
        <Box mb={2}>
          <Typography
            sx={{ fontSize: "16px", fontWeight: 600, color: "#495057" }}
          >
            Schedule Order
          </Typography>
        </Box>
        <Box sx={{ width: "100%", height: "200px", position: "relative" }}>
          <Doughnut data={data} options={options} />
        </Box>
      </Box>
    </CustomCard>
  );
};

export default ScheduleOrderChart;
