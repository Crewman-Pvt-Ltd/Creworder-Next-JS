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
  Avatar,
  Typography,
  Chip,
  Box,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CustomCard from "../CustomCard";
import { Poppins } from "next/font/google";
import CustomLabel from "../CustomLabel";
import CustomTextField from "../CustomTextField";
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const ShiftRosterList = ({ onAddShiftRoster }) => {
  const employees = [
    {
      id: 1,
      name: "Keanu O'Kon",
      role: "Team Lead",
      avatar: "https://i.pravatar.cc/300?u=admin@example.com",
      itsYou: true,
    },
    {
        id: 2,
        name: "Test 1",
        role: "Manager",
        avatar: "https://i.pravatar.cc/300?u=admin@example.com",
        itsYou: true,
      },
      {
        id: 3,
        name: "Test 2",
        role: "Senior",
        avatar: "https://i.pravatar.cc/300?u=admin@example.com",
        itsYou: true,
      },
  ];

  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedView, setSelectedView] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleViewChange = (event) => {
    setSelectedView(event.target.value);
  };

  const daysOfWeek = [
    { day: "Monday", date: "9", month: "SEP" },
    { day: "Tuesday", date: "10", month: "SEP" },
    { day: "Wednesday", date: "11", month: "SEP" },
    { day: "Thursday", date: "12", month: "SEP" },
    { day: "Friday", date: "13", month: "SEP" },
    { day: "Saturday", date: "14", month: "SEP" },
    { day: "Sunday", date: "15", month: "SEP" },
  ];

  const handleOpenOverlay = (employee) => {
    setCurrentEmployee(employee);
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
    setCurrentEmployee(null);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <CustomCard>
          <Grid container spacing={2} p={1}>
            <Grid
              item
              xs={12}
              sm={6}
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Typography sx={{ minWidth: "100px" }}>Employee</Typography>
              <Select
                value={selectedEmployee || ""}
                onChange={handleEmployeeChange}
                sx={{
                  minWidth: "130px",
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

              <Typography sx={{ minWidth: "100px" }}>Department</Typography>
              <Select
                value={selectedDepartment || ""}
                onChange={handleDepartmentChange}
                sx={{
                  minWidth: "130px",
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

              <Select
                value={selectedView || "weekly"}
                onChange={handleViewChange}
                sx={{
                  minWidth: "150px",
                  height: "30px",
                  whiteSpace: "nowrap",
                  overflow: "visible",
                }}
              >
                <MenuItem value="weekly">Weekly View</MenuItem>
                <MenuItem value="monthly">Monthly View</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </CustomCard>
      </Grid>
      <Grid item xs={12} sm={12} md={12} m={2} sx={{ display: "flex", gap: 2 }}>
        <Button
          onClick={onAddShiftRoster}
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
          className={poppins.className}
        >
          <AddIcon sx={{ fontSize: 20 }} />
          Assign Bulk Shifts
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
          className={poppins.className}
        >
          <AddIcon sx={{ fontSize: 20 }} />
          Export
        </Button>
      </Grid>
      <Grid item xs={12} m={2}>
        <CustomCard>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead
                  sx={{
                    backgroundColor: "#f2f2f2",
                  }}
                  className={poppins.className}
                >
                  <TableRow>
                    <TableCell sx={{ minWidth: 200, borderBottom: "none" }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "500" }}
                        className={poppins.className}
                      >
                        Employee
                      </Typography>
                    </TableCell>
                    {daysOfWeek.map((day) => (
                      <TableCell
                        className={poppins.className}
                        key={day.date}
                        sx={{ borderBottom: "none" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                          className={poppins.className}
                        >
                          <Typography
                            sx={{
                              fontWeight: "500",
                              color: "#405189",
                              fontSize: "25px",
                            }}
                            className={poppins.className}
                          >
                            {day.date}
                          </Typography>

                          <Box>
                            <Typography
                              sx={{
                                fontSize: "13px",
                                color: "#6c757d",
                              }}
                              className={poppins.className}
                            >
                              {day.day}
                            </Typography>
                            <Typography
                              sx={{ fontSize: "13px", color: "#6c757d" }}
                              className={poppins.className}
                            >
                              {day.month}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            src={employee.avatar}
                            sx={{ marginRight: 2 }}
                          />
                          <div>
                            <Typography
                              sx={{ fontSize: "14px", color: "black" }}
                            >
                              {employee.name}
                              {employee.itsYou && (
                                <Chip
                                  label="It's you"
                                  size="small"
                                  sx={{
                                    marginLeft: 1,
                                    backgroundColor: "#e0e0e0",
                                  }}
                                />
                              )}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {employee.role}
                            </Typography>
                          </div>
                        </Box>
                      </TableCell>
                      {daysOfWeek.map((_, index) => (
                        <TableCell key={index} align="center">
                          <IconButton
                            onClick={() => handleOpenOverlay(employee)}
                            sx={{
                              border: "1px solid #ddd",
                              borderRadius: "4px",
                              padding: "20px 30px",
                              color: "#405189",
                              backgroundColor: "#f2f2f2",
                              "&:hover": {
                                backgroundColor: "#f2f2f2",
                                borderColor: "#405189",
                              },
                            }}
                          >
                            <AddIcon />
                          </IconButton>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </CustomCard>
      </Grid>

      {/* Overlay Form */}
      {showOverlay && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1200,
          }}
        >
          <Box
            sx={{
              width: "700px",
              bgcolor: "white",
              borderRadius: "8px",
              p: 3,
              boxShadow: 3,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Update Shift
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Date: 02-09-2024 (Monday)
            </Typography>
            {currentEmployee && (
              <>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    src={currentEmployee.avatar}
                    sx={{ marginRight: 2 }}
                  />
                  <div>
                    <Typography sx={{ fontSize: "14px", color: "black" }}>
                      {currentEmployee.name}
                      {currentEmployee.itsYou && (
                        <Chip
                          label="It's you"
                          size="small"
                          sx={{
                            marginLeft: 1,
                            backgroundColor: "#e0e0e0",
                          }}
                        />
                      )}
                    </Typography>
                  </div>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ mb: 1 }}>Employee Shift</Typography>
                  <Select
                    value={selectedEmployee || ""}
                    onChange={handleEmployeeChange}
                    sx={{
                      width: "100%",
                      height: "30px",
                    }}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Day Off
                    </MenuItem>
                    <MenuItem value="employee1">General Shift</MenuItem>
                    <MenuItem value="employee2">Day Shift</MenuItem>
                    <MenuItem value="employee3">Night Shift</MenuItem>
                  </Select>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <CustomLabel htmlFor="remark" required>
                    Remark
                  </CustomLabel>
                  <CustomTextField
                    id="remark"
                    name="remark"
                    type="text"
                    fullWidth
                    multiline
                   
                    variant="outlined"
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Upload Photo
                  </Typography>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ textTransform: "none", width: "100%" }}
                  >
                    Choose File
                    <input
                      type="file"
                      hidden
                      // Add any onChange handler here if needed
                    />
                  </Button>
                </Box>
              </>
            )}

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button onClick={handleCloseOverlay} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button onClick={handleCloseOverlay}>Save</Button>
            </Box>
          </Box>
        </Box>
      )}
    </Grid>
  );
};

export default ShiftRosterList;