import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Box, Typography } from "@mui/material";
import CustomCard from "./CustomCard";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const AlTypeUsers = () => {
  const data = {
    labels: ["Total Users", "Active Users", "Suspend Users", "Present Users", "Absent Users"],
    datasets: [
      {
        data: [25, 32, 23, 9, 8],
        backgroundColor: [
          "#4caf50",
          "#2196f3",
          "#9c27b0",
          "#ff5722",
          "#ffc107",
        ],
        hoverBackgroundColor: [
          "#4caf50",
          "#2196f3",
          "#9c27b0",
          "#ff5722",
          "#ffc107",
        ],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true, 
        callbacks: {
          label: function(context) {
          
            let label = context.label || '';
            if (context.parsed !== null) {
              label += `: ${context.raw}`;
            }
            return label;
          }
        }
      },
      datalabels: {
        display: true,
        color: '#000000', 
        formatter: (value) => value,
        font: {
          weight: 'bold',
        },
       
      },
    },
  };

  const legendItems = [
    { color: "#4caf50", label: "Total Users" },
    { color: "#2196f3", label: "Active Users" },
    { color: "#ffc107", label: "Present Users" },
    { color: "#9c27b0", label: "Absent Users" },
    { color: "#ff5722", label: "Suspend Users" },
  ];

  return (
    <CustomCard>
      <Box p={2} sx={{ height: 450 }}>
        <Box mb={2}>
          <Typography sx={{ fontSize: "16px", fontWeight: 600, color: "#495057" }}>
            All Users
          </Typography>
        </Box>
        <Box sx={{ width: "100%", height: "300px" }}>
          <Doughnut data={data} options={options} />
        </Box>
        <Box display="flex" justifyContent="center" flexWrap="wrap" mt={2}>
          {legendItems.map((item, index) => (
            <Box key={index} display="flex" alignItems="center" mx={1} mb={1}>
              <Box
                sx={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: item.color,
                  marginRight: "5px",
                }}
              />
              <Typography variant="body2">{item.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </CustomCard>
  );
};

export default AlTypeUsers;
