// components/DonutChart.jsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, Typography } from "@mui/material";
import CustomCard from "./CustomCard";

ChartJS.register(ArcElement, Tooltip, Legend);

const StoresVisitBySource = () => {
  const data = {
    labels: ["Direct", "Social", "Email", "Other", "Referrals"],
    datasets: [
      {
        data: [25.6, 32.0, 23.8, 9.9, 8.7],
        backgroundColor: [
          "#3e517a",
          "#00bcd4",
          "#ffcd56",
          "#ff6e40",
          "#8e5ea2",
        ],
        hoverBackgroundColor: [
          "#3e517a",
          "#00bcd4",
          "#ffcd56",
          "#ff6e40",
          "#8e5ea2",
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
    },
  };

  const legendItems = [
    { color: "#3e517a", label: "Direct" },
    { color: "#00bcd4", label: "Social" },
    { color: "#ffcd56", label: "Email" },
    { color: "#ff6e40", label: "Other" },
    { color: "#8e5ea2", label: "Referrals" },
  ];

  return (

    <CustomCard>
      <Box p={2} sx={{
        height: 450,
      }}> 
        <Box mb={2}>
          <Typography sx={{fontSize: "16px", fontWeight: 600, color: "#495057"}}>Store Visits by Source</Typography>
        </Box>
        <Box sx={{ width: "100%", height: "300px" }}>
          <Doughnut data={data} options={options} />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          mt={2}
        >
          {legendItems.map((item, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              mx={1}
              mb={1}
            >
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

export default StoresVisitBySource;
