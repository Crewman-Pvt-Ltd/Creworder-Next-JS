import {
  Grid,
  CardContent,
  Select,
  MenuItem,
  Avatar,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import React, { useState, useEffect, use } from "react";

import CustomCard from "../CustomCard";
import axios from "axios";
import { baseApiUrl } from "@/api-manage/ApiRoutes";
import { getToken } from "@/utils/getToken";
import CustomLabel from "../CustomLabel";

const UserAttendance = ({ onAddAttendance }) => {
  const token = getToken();

  const [employeesLis, setemployeesLis] = useState([]);

  const createAttendanceArray = (data) => {
    setemployeesLis([]);
    const star = "⭐";
    const late = "⚠️";
    const onLeave = "🚀";
    const pre = "✔️";
    const offIcon = "📴";
    const absent = "❌";
    const onLeaveIcon = "🛫";
    const shortLeave = "🚖";
    const halfDay = "🌗";
    const notClockOut = "🏃‍♂️‍➡️";
    const year = 2024;
    const month = 9;
    data.Attendance_Counts.forEach((element) => {
      let userBiseDict = {};
      const userId = element.user__id;
      const d = new Date();
      const indexArrray = d.getDate() - 1;
      let daysArray = new Array(new Date(year, month, 0).getDate()).fill("-");
      for (let i = 0; i < daysArray.length; i++) {
        if (i <= 9) {
          daysArray[i] = absent;
        }
      }
      userBiseDict["name"] = element.user__username;
      userBiseDict["role"] = "Developer";
      userBiseDict["isYou"] = true;
      userBiseDict["totalPresent"] = element.total_present;
      userBiseDict["ThisMonthDays"] = new Date(year, month, 0).getDate();
      if (data.Data[userId]) {
        data.Data[userId].forEach((row) => {
          const arrayDate = row.date.split("-")[2] - 1;
          if (row.present_title === "Full_Day") {
            daysArray[arrayDate] = pre;
          } else if (row.present_title === "Half_Day") {
            daysArray[arrayDate] = halfDay;
          } else if (row.present_title === "Short_Day") {
            daysArray[arrayDate] = shortLeave;
          } else if (row.present_title === "Not_Clock_Out") {
            daysArray[arrayDate] = offIcon;
          } else if (row.present_title === "Absent") {
            daysArray[arrayDate] = absent;
          } else if (row.present_title === "Absent") {
            daysArray[arrayDate] = absent;
          } else if (row.present_title === "Late") {
            daysArray[arrayDate] = late;
          }
        });
        userBiseDict["attendance"] = daysArray;
      } else {
        console.log(`No data found for userId: ${userId}`);
        userBiseDict["attendance"] = daysArray;
      }
      setemployeesLis((prevEmployees) => [...prevEmployees, userBiseDict]);
    });
  };

  const attendanceDeatial = async () => {
    try {
      const dateRange = "09/01/2024 - 09/30/2024";

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${baseApiUrl}get-attendance/?date_range=${encodeURIComponent(
          dateRange
        )}`, // Pass as query parameter
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.request(config);
      setAttendanceDeatials(response.data);
      createAttendanceArray(response.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  useEffect(() => {
    attendanceDeatial();
  }, []);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const getCurrentMonth = () => {
    const monthNames = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];
    return monthNames[new Date().getMonth()];
  };

  useEffect(() => {
    setSelectedMonth(getCurrentMonth());
  }, []);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} m={1}>
        <CustomCard>
          <CardContent>
            <Grid container spacing={2} p={1}>
              <Grid item xs={12} sm={6} display="flex" alignItems="center">
                <CustomLabel sx={{ minWidth: "100px" }}>Month</CustomLabel>
                <Select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  sx={{
                    minWidth: "100px",
                    height: "30px",
                    whiteSpace: "nowrap",
                    overflow: "visible",
                  }}
                  displayEmpty
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 200,
                        overflowY: "auto",
                      },
                    },
                  }}
                >
                  <MenuItem value="january">January</MenuItem>
                  <MenuItem value="february">February</MenuItem>
                  <MenuItem value="march">March</MenuItem>
                  <MenuItem value="april">April</MenuItem>
                  <MenuItem value="may">May</MenuItem>
                  <MenuItem value="june">June</MenuItem>
                  <MenuItem value="july">July</MenuItem>
                  <MenuItem value="august">August</MenuItem>
                  <MenuItem value="september">September</MenuItem>
                  <MenuItem value="october">October</MenuItem>
                  <MenuItem value="november">November</MenuItem>
                  <MenuItem value="december">December</MenuItem>
                </Select>
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

                <CustomLabel sx={{ minWidth: "100px" }}>Year</CustomLabel>
                <Select
                  value={selectedYear || ""}
                  onChange={handleYearChange}
                  sx={{
                    minWidth: "100px",
                    height: "30px",
                    whiteSpace: "nowrap",
                    overflow: "visible",
                  }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    All
                  </MenuItem>
                  <MenuItem value="2021">2020</MenuItem>
                  <MenuItem value="2021">2021</MenuItem>
                  <MenuItem value="2022">2022</MenuItem>
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <Box>
                      <Typography variant="h6">Note:</Typography>
                      <Typography variant="body2">
                        ⭐ Holiday | 📆 Day Off | ✔️ Present | 🌗 Half Day | ⚠️
                        Late | ❌ Absent | 🛫 On Leave
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid
                  container
                  spacing={0}
                  sx={{
                    backgroundColor: "#dedede",
                    padding: "15px",
                  }}
                >
                  <Grid item xs={2}>
                    <Typography variant="body2">Employee</Typography>
                  </Grid>
                  {[...Array(30)].map((_, index) => (
                    <Grid item xs key={index}>
                      <Typography
                        sx={{
                          fontSize: "13px",
                        }}
                        variant="body2"
                        align="center"
                      >
                        {index + 1}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "10px",
                        }}
                        variant="body2"
                        align="center"
                      >
                        {daysOfWeek[index % 7]}
                      </Typography>
                    </Grid>
                  ))}
                  <Grid item xs>
                    <Typography variant="body2" align="center">
                      Total
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {employeesLis.map((employee, empIndex) => (
                <Grid item xs={12} key={empIndex}>
                  <Grid container spacing={0} alignItems="center">
                    <Grid item xs={2}>
                      <Box display="flex" alignItems="center">
                        <Avatar src={employee.image} alt={employee.name} />
                        <Box ml={1}>
                          <Typography variant="body2">
                            {employee.name}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {employee.role}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    {employee.attendance.map((status, index) => (
                      <Grid item xs key={index}>
                        <Typography
                          component="a"
                          href="#"
                          sx={{
                            color: "#858585",
                            fontSize: "10px",
                            textDecoration: "none",
                            cursor: "pointer",
                          }}
                          variant="body2"
                          align="center"
                        >
                          {status}
                        </Typography>
                      </Grid>
                    ))}
                    <Grid item xs>
                      <Typography
                        sx={{
                          fontSize: "12px",
                        }}
                        variant="body2"
                        align="center"
                      >
                        {employee.totalPresent} / {employee.ThisMonthDays}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default UserAttendance;
