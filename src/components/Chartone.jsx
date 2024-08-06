
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Typography, Button, ButtonGroup, Grid } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

import CustomCard from './CustomCard';

const chartData = {
  labels: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ],
  datasets: [
    {
      type: 'bar',
      label: 'Orders',
      data: [90, 110, 60, 120, 90, 100, 70, 50, 110, 80, 90, 60],
      backgroundColor: 'rgba(10, 179, 156, 0.9)',
      barPercentage: 0.6,
      categoryPercentage: 0.8,
    },
    {
      type: 'line',
      label: 'Earnings',
      data: [40, 30, 60, 50, 70, 80, 40, 30, 50, 60, 70, 50],
      borderColor: '#405189',
      borderWidth: 2,
      backgroundColor: '#405189', 
    },
    {
      type: 'line',
      label: 'Refunds',
      data: [10, 20, 30, 20, 40, 10, 30, 20, 10, 30, 40, 20],
      borderColor: '#ff6200e0',
      borderWidth: 2,
      backgroundColor: '#ff6200e0', 
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#333',
        font: {
          size: 12,
        },
      },
    },
    tooltip: {
      mode: 'index', 
      intersect: false, 
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat().format(context.parsed.y);
          }
          return label;
        },
      },
    },
   
    datalabels: {
      display: false, 
    },
  },
  scales: {
    x: {
      stacked: true,
      barPercentage: 0.6,
      categoryPercentage: 0.8,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
    },
    y: {
      stacked: false,
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
    },
  },
};



const typodata = [
  { value: '7,585', label: 'Orders' },
  { value: '$22.89k', label: 'Earnings' },
  { value: '367', label: 'Refunds' },
  { value: '18.92%', label: 'Conversion Ratio' },
];

const Chartone = () => {
  return (
    <CustomCard>
      <Box sx={{ height:"590px" }}>
        <Grid container spacing={2} pt={2} pl={2} pr={2}>
          <Grid item xs={12} sm={8} md={9}>
            <Typography sx={{ fontSize: { xs: '16px', sm: '18px' }, fontWeight: 700, color: "#222" }}>
              Orders Overview
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={3} container justifyContent="flex-end">
            <ButtonGroup size="small" sx={{ backgroundColor: '#e3f2fd', borderRadius: '20px' }}>
              <Button variant="text" sx={{ color: '#1E90FF' }}>ALL</Button>
              <Button variant="text" sx={{ color: '#1E90FF' }}>1M</Button>
              <Button variant="text" sx={{ color: '#1E90FF' }}>6M</Button>
              <Button variant="text" sx={{ color: '#1E90FF' }}>1Y</Button>
            </ButtonGroup>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            // gap: 3,
            marginTop: 3,
            backgroundColor: '#f9fbfc',
           
            
         
          }}
        >
          {typodata.map((item, index) => (
            <Box key={index} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography sx={{ color: '#333', fontWeight: 700, fontSize: { xs: '16px', sm: '20px' } }}>
                {item.value}
              </Typography>
              <Typography sx={{ color: '#777', fontSize: { xs: '12px', sm: '14px' } }}>
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ marginTop: 4 }}>
          <Box sx={{ width: '100%', height: { xs: '300px', sm: '350px', md: '400px' } }}>
            <Bar data={chartData} options={chartOptions} />
          </Box>
        </Box>
      </Box>
    </CustomCard>
  );
};

export default Chartone;
