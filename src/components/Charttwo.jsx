import React from "react";
import { Bar } from "react-chartjs-2";
import { Box } from '@mui/material';
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
      backgroundColor: "rgba(41, 156, 219, 0.85)",
      hoverBackgroundColor: '#a5e6fa',
      borderWidth: 1,
      barPercentage: 0.9,
      borderRadius: 8,
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
      labels: {
        font: {
          size: 14,
          weight: 'bold',
        },
        color: '#333',
      },
    },
    title: {
      display: true,
      text: "Sessions by Country",
      font: {
        size: 16,
        weight: 'bold',
      },
      color: '#333',
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed.x !== null) {
            label += new Intl.NumberFormat().format(context.parsed.x);
          }
          return label;
        }
      },
      backgroundColor: '#333',
      titleColor: '#fff',
      bodyColor: '#fff',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Number of Sessions',
        font: {
          size: 14,
          weight: 'bold',
        },
        color: '#333',
      },
      grid: {
        color: '#ddd',
        borderColor: '#ddd',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Country',
        font: {
          size: 14,
          weight: 'bold',
        },
        color: '#333',
      },
      grid: {
        color: '#ddd',
        borderColor: '#ddd',
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
          height: { xs: '300px', sm: '600px', md: '490px' },
          overflow: 'hidden',
        }}
      >
        <Bar data={chartData} options={chartOptions} />
      </Box>
    </CustomCard>
  );
};

export default Charttwo;
