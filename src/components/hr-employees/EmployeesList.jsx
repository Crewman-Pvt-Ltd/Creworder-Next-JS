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
    Select,
    MenuItem,
    Chip,
  } from "@mui/material";
  import React, { useState } from "react";
  import AddIcon from "@mui/icons-material/Add";
  import Visibility from "@mui/icons-material/Visibility";
  import Edit from "@mui/icons-material/Edit";
  import Delete from "@mui/icons-material/Delete";
  import CustomCard from "../CustomCard";
  import ImportExportIcon from '@mui/icons-material/ImportExport';

  const EmployeesList = ({ onAddEmployees }) => {

    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedView, setSelectedView] = useState("");
    const handleEmployeeChange = (event) => {
      setSelectedEmployee(event.target.value);
    };
  
    const handleDepartmentChange = (event) => {
      setSelectedDepartment(event.target.value);
    };
  
    const handleViewChange = (event) => {
      setSelectedView(event.target.value);
    };
  
    const rows = [
      {
        id: "EMP-12",
        name: "Della Fisher",
        role: "Project Manager",
        email: "sylvester.kihnr10@example.org",
        userRole: "Employee",
        reportingTo: "--",
        status: "Active",
        avatar: "https://i.pravatar.cc/300?u=admin@example.com",
      },
      {
        id: "EMP-11",
        name: "Jordan Lemke",
        role: "Trainee",
        email: "antoinette35y66@example.org",
        userRole: "Employee",
        reportingTo: "--",
        status: "Active",
        avatar: "https://i.pravatar.cc/300?u=pgaylordo100@example.com",
      },
      // Add more rows as needed
    ];
  
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
        <Grid item xs={12} sm={12} md={12}  m={2} sx={{ display: "flex", gap: 2 }}>
          <Button
            onClick={onAddEmployees}
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
            Add Employee
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
            Invite Employee
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
  <ImportExportIcon sx={{ fontSize: 20 }} />
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
  <ImportExportIcon sx={{ fontSize: 20 }} />
  Export
</Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} m={2}>
          <CustomCard>
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                    <TableCell>ID</TableCell>
                      <TableCell>Employee ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>User Role</TableCell>
                      <TableCell>Reporting To</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow key={row.id}>
                         <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.id}</TableCell>
                        <TableCell sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar src={row.avatar} sx={{ marginRight: 2 }} />
                          <div>
                            <Typography sx={{ fontSize: "14px", color: "black" }}>
                              {row.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {row.role}
                            </Typography>
                          </div>
                        </TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>
                          <Select value={row.userRole} size="small" fullWidth>
                            <MenuItem value="Employee">Employee</MenuItem>
                            <MenuItem value="Manager">Manager</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select value={row.reportingTo} size="small" fullWidth>
                            <MenuItem value="--">--</MenuItem>
                            <MenuItem value="Manager A">Manager A</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={row.status}
                            size="small"
                            sx={{
                              backgroundColor: row.status === "Active" ? "green" : "red",
                              color: "white",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                        <IconButton
                          onClick={() => handleEdit(row.id)}
                          aria-label="edit"
                          sx={{ color: "#405189" }}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteClick(row.id)}
                          aria-label="delete"
                          sx={{ color: "#e74c3c" }}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </CustomCard>
        </Grid>
      </Grid>
    );
  };
  
  export default EmployeesList;
  