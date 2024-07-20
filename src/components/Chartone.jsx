import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Typography, Button, ButtonGroup, Grid } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
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
      type: 'line',
      label: 'Orders',
      data: [90, 110, 60, 120, 90, 100, 70, 50, 110, 80, 90, 60],
      borderColor: '#8884d8',
      borderWidth: 2,
      fill: false,
    },
    {
      type: 'bar',
      label: 'Earnings',
      data: [40, 30, 60, 50, 70, 80, 40, 30, 50, 60, 70, 50],
      backgroundColor: '#82ca9d',
    },
    {
      type: 'line',
      label: 'Refunds',
      data: [10, 20, 30, 20, 40, 10, 30, 20, 10, 30, 40, 20],
      borderColor: '#FF8042',
      borderWidth: 2,
      fill: false,
      borderDash: [5, 5],
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
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
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={9}>
            <Typography sx={{ fontSize: { xs: '14px', sm: '16px' }, fontWeight: 600, color: "#495057" }}>
              Orders
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={3} container justifyContent="flex-end">
            <ButtonGroup size="small" sx={{ backgroundColor: '#e1ebfd' }}>
              <Button>ALL</Button>
              <Button>1M</Button>
              <Button>6M</Button>
              <Button>1Y</Button>
            </ButtonGroup>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            marginTop: 2,
            backgroundColor: '#f9fbfc',
            padding: 2,
          }}
        >
          {typodata.map((item, index) => (
            <Box key={index} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography sx={{ color: '#4a4a4a', fontWeight: 600, fontSize: { xs: '14px', sm: '17px' } }}>
                {item.value}
              </Typography>
              <Typography sx={{ color: 'gray', fontSize: { xs: '12px', sm: '14px' } }}>
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ marginTop: 3 }}>
          <Box sx={{ width: '100%', height: { xs: '300px', sm: '350px', md: '400px' } }}>
            <Line data={chartData} options={chartOptions} />
          </Box>
        </Box>
      </Box>
    </CustomCard>
  );
};

export default Chartone;
