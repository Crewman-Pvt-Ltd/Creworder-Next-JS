import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, Typography } from "@mui/material";
import CustomCard from "./CustomCard";


ChartJS.register(ArcElement, Tooltip, Legend);

const InvoicesChart = () => {
  const data = {
    labels: ["Invoice Sent", "Paid by clients", "Unpaid by clients", "Canceled by clients"],
    datasets: [
      {
        data: [25, 32, 23, 29],
        backgroundColor: [
          "#ff6384", 
          "#36a2eb", 
          "#ffce56", 
          "#cc65fe", 
        ],
        hoverBackgroundColor: [
          "#ff6384", 
          "#36a2eb", 
          "#ffce56", 
          "#cc65fe", 
        ],
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
        color: '#000000',
        formatter: (value) => value,
        font: {
          weight: 'bold',
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
      <Box p={2} sx={{ height: 489, position: 'relative' }}>
        <Box mb={2}>
          <Typography sx={{ fontSize: "16px", fontWeight: 600, color: "#495057" }}>
            Invoices
          </Typography>
        </Box>
        <Box sx={{ width: "100%", height: "300px", position: 'relative' }}>
          <Doughnut data={data} options={options} />
   
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: 'black',
            }}
          >
            <Typography>
              Total Invoice
            </Typography>
            <Typography>
              {totalInvoices}
            </Typography>
          </Box>
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

export default InvoicesChart;
