import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import useGetAllCompanies from "@/api-manage/react-query/useGetAllCompanies";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import CustomCard from "./CustomCard";
import {
  FormControl,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { Poppins } from "next/font/google";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const CompanyRegistrationGraph = () => {
    const { datacompany } = useGetAllCompanies();
  const [selectedYear, setSelectedYear] = useState(2024);

  const dataByYear = {
    2022: [20, 35, 40, 30, 45, 55, 60, 50, 45, 65, 70, 85],
    2023: [25, 40, 45, 35, 50, 60, 65, 55, 50, 70, 75, 90],
    2024: [30, 45, 50, 35, 40, 60, 70, 65, 55, 75, 80, 90],
  };

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        
        data: dataByYear[selectedYear],
        backgroundColor: "rgba(75,192,192,0.6)", 
        borderColor: "rgba(75,192,192,1)", 
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.9)", 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        callbacks: {
          label: (context) => `Registrations: ${context.raw}`,
        },
      },
    },
    
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <CustomCard>
      <Box display="flex" flexDirection="column" p={2}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography
            className={poppins.className}
            sx={{ fontSize: "16px", fontWeight: "500", color: "black" }}
          >
            Company Registrations
          </Typography>
          <FormControl
            sx={{
              minWidth: 120,
              backgroundColor: "#f0f0f0",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <Select
              id="year-select"
              value={selectedYear}
              onChange={handleYearChange}
              autoWidth
              sx={{
                "& .MuiSelect-select": {
                  padding: "10px",
                  fontSize: "14px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ccc",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#999",
                },
              }}
            >
              <MenuItem value={2022}>2022</MenuItem>
              <MenuItem value={2023}>2023</MenuItem>
              <MenuItem value={2024}>2024</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Bar data={data} options={options} />
      </Box>
    </CustomCard>
  );
};

export default CompanyRegistrationGraph;
