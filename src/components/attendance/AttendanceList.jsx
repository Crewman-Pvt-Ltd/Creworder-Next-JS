import {
  Grid,
  Button,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Select,
  MenuItem,
  Avatar,
  Divider,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import React, { useState, useEffect, use } from "react";
import AddIcon from "@mui/icons-material/Add";
import Visibility from "@mui/icons-material/Visibility";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import CustomCard from "../CustomCard";
import axios from "axios";
import { baseApiUrl } from "@/api-manage/ApiRoutes";
import { getToken } from "@/utils/getToken";
import CustomLabel from "../CustomLabel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import StarIcon from "@mui/icons-material/Star";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
const AttendanceList = ({ onAddAttendance }) => {
  const token = getToken();
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedView, setSelectedView] = useState("");
  const [attendanceDeatials, setAttendanceDeatials] = useState("");
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
  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
  };
  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };
  const handleDesignationChange = (event) => {
    setSelectedDesignation(event.target.value);
  };
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };
  const handleViewChange = (event) => {
    setSelectedView(event.target.value);
  };
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleEdit = (id) => {
    console.log("Edit", id);
  };

  const handleDeleteClick = (id) => {
    console.log("Delete", id);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <CustomCard>
          <Grid container spacing={2} p={1}>
            <Grid item xs={12} sm={6} display="flex" alignItems="center">
              <CustomLabel sx={{ minWidth: "100px" }}>Employee</CustomLabel>
              <Select
                value={selectedEmployee || ""}
                onChange={handleEmployeeChange}
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
                <MenuItem value="employee1">Employee 1</MenuItem>
                <MenuItem value="employee2">Employee 2</MenuItem>
                <MenuItem value="employee3">Employee 3</MenuItem>
              </Select>

              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

              <CustomLabel sx={{ minWidth: "100px" }}>Department</CustomLabel>
              <Select
                value={selectedDepartment || ""}
                onChange={handleDepartmentChange}
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
                <MenuItem value="marketing">Marketing</MenuItem>
                <MenuItem value="sales">Sales</MenuItem>
                <MenuItem value="hr">HR</MenuItem>
              </Select>
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

              <CustomLabel sx={{ minWidth: "100px" }}>Designation</CustomLabel>
              <Select
                value={selectedDesignation || ""}
                onChange={handleDesignationChange}
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
                <MenuItem value="marketing">Trainee</MenuItem>
                <MenuItem value="sales">Head</MenuItem>
                <MenuItem value="hr">Senior</MenuItem>
              </Select>
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

              <CustomLabel sx={{ minWidth: "100px" }}>Month</CustomLabel>
              <Select
                value={selectedMonth || ""}
                onChange={handleMonthChange}
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
                <MenuItem value="marketing">January</MenuItem>
                <MenuItem value="sales">February</MenuItem>
                <MenuItem value="hr">March</MenuItem>
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
                <MenuItem value="marketing">2001</MenuItem>
                <MenuItem value="sales">2002</MenuItem>
                <MenuItem value="hr">2003</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </CustomCard>
      </Grid>

      <Grid item xs={12} sm={12} md={12} m={2} sx={{ display: "flex", gap: 2 }}>
        <Button
          onClick={onAddAttendance}
          sx={{
            padding: "8px 16px",
            fontSize: "14px",
            backgroundColor: "#405189",
            color: "white",
            "&:hover": {
              backgroundColor: "#334a6c",
            },
            display: "flex",
            alignItems: "center",
            gap: 1,
            textTransform: "none",
          }}
        >
          <AddIcon sx={{ fontSize: 20 }} />
          Mark Attendance
        </Button>
        <Button
          sx={{
            padding: "8px 16px",
            fontSize: "14px",
            border: "2px solid #405189",
            color: "#405189",
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
            display: "flex",
            alignItems: "center",
            gap: 1,
            textTransform: "none",
          }}
        >
          <AddIcon sx={{ fontSize: 20 }} />
          Import
        </Button>
        <Button
          sx={{
            padding: "8px 16px",
            fontSize: "14px",
            border: "2px solid #405189",
            color: "#405189",
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
            display: "flex",
            alignItems: "center",
            gap: 1,
            textTransform: "none",
          }}
        >
          <AddIcon sx={{ fontSize: 20 }} />
          Export
        </Button>
      </Grid>
      <Grid item xs={12} sm={12} md={12} m={2}>
        <CustomCard>
          <CardContent>
            <Typography variant="h6">Note:</Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="body2">
                   ⭐ Holiday |
                   📆 Day Off |
                    ✔️ Present |
                    🌗 Half Day |
                  {/* <StarIcon style={{ color: "gold" }} /> Holiday |{" "} */}
                  {/* <CalendarTodayIcon color="error" /> Day Off | */}
                  {/* <CheckCircleOutlineIcon color="success" /> Present |{" "} */}
                  {/* <StarIcon color="error" /> Half Day | */}
                   ⚠️ Late
                  {/* <WarningAmberIcon style={{ color: "orange" }} /> Late |{" "} */}
                   ❌ Absent |
                  {/* <HighlightOffIcon color="disabled" /> Absent | */}
                    🛫 On Leave
                  {/* <AirlineSeatReclineNormalIcon style={{ color: "red" }} /> On */}
                  {/* Leave */}
                </Typography>
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

export default AttendanceList;
