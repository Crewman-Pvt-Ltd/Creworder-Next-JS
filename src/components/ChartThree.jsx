import React from "react";
import { Bar } from "react-chartjs-2";
import { Box, Typography, Button } from "@mui/material";
import CustomCard from "./CustomCard";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels'; 
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: "300",
  subsets: ["latin"],
});

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels);

const ChartThree = ({ 
  labels = ["Accepted", "Rejected", "No Response", "Future Orders", "Pending Orders"], 
  dataValues = [37000, 12000, 18000, 15000, 8000], 
  orderCounts = [100, 52, 82, 17, 32],
  backgroundColors = ["#3e4c78", "#4bc0c0", "#ffcd56", "#ff5733", "#33c1ff"] 
}) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total Forecasted Value",
        data: dataValues,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false, 
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return `$${value / 1000}k`;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        align: 'center', 
        anchor: 'center', 
        formatter: (value, context) => {
          return orderCounts[context.dataIndex]; 
        },
        color: 'white', 
        font: {
          weight: 'bold',
          size: 10, 
        },
      }
    },
  };

  return (
    <CustomCard>
      <Box sx={{ padding: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontFamily: poppins.style.fontFamily }}>Sales Forecast</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={{ mr: 1, fontFamily: poppins.style.fontFamily }}>SORT BY:</Typography>
            <Button variant="outlined" size="small">Nov 2021</Button>
          </Box>
        </Box>
        <Box sx={{ height: 300 }}>
          <Bar data={data} options={options} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          {labels.map((label, index) => (
            <Typography key={index} variant="body2" sx={{ mr: 1, fontFamily: poppins.style.fontFamily, fontSize: '10px' }}>
              <Box component="span" sx={{ width: 10, height: 10, backgroundColor: backgroundColors[index], display: "inline-block", mr: 1 }} />
              {label}
            </Typography>
          ))}
        </Box>
      </Box>
    </CustomCard>
  );
};

export default ChartThree;
