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
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import { useRouter } from "next/router";
import useGetAllEmployees from "@/api-manage/react-query/useGetAllEmployees";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import CustomCard from "../CustomCard";
import KeyOffIcon from '@mui/icons-material/KeyOff';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ImportExportIcon from "@mui/icons-material/ImportExport";
import {
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  LockOpen as LockOpenIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
const LockedEmployees = ({ onAddEmployees }) => {
  const router = useRouter();
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedView, setSelectedView] = useState("");
  const { data, refetch } = useGetAllEmployees();
  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleViewChange = (event) => {
    setSelectedView(event.target.value);
  };


  const handleEdit = (row) => {
    router.push(`/hr/employees/editemployee?id=${row.id}`);
  };

  const handleDeleteClick = (id) => {
    console.log("Delete", id);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} mt={1} ml={2}>
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
        <a href="/hr/employees/lockedemployees" style={{ textDecoration: "none" }}><Button
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
          <KeyOffIcon sx={{ fontSize: 20 }} />
          Locked Users
        </Button></a>

        <a href="/hr/employees/deletedemployees" style={{ textDecoration: "none" }}><Button
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
          <DeleteForeverIcon sx={{ fontSize: 20 }} />
          Deleted Users
        </Button></a>

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
                    {/* <TableCell>User Role</TableCell> */}
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {data?.results?.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.profile?.employee_id}</TableCell>
                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar src={row.profile?.profile_image} sx={{ marginRight: 2 }} />
                          <Typography sx={{ fontSize: "14px", color: "black" }}>
                            {row.first_name} {row.last_name}
                          </Typography>
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      {/* <TableCell>
                        <Select value={row?.role} size="small" fullWidth>
                          <MenuItem value="{row?.role?.id}">{row?.role?.role}</MenuItem>
                        </Select>
                      </TableCell> */}
                      <TableCell>
                        <Chip
                          label={row?.profile?.status == "1" ? "Active" : "Inactive"}
                          size="large"
                         
                        />
                      </TableCell>
                      <TableCell>
                      {row.status === "Approved" ? (
                          <Tooltip title="Suspend">
                            <IconButton
                              aria-label="suspend"
                              onClick={() =>
                                handleToggleStatus(row.id, "Suspended")
                              }
                              sx={{ color: "#DC3545" }}
                            >
                              <CancelIcon />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Activate">
                            <IconButton
                              aria-label="activate"
                              onClick={() =>
                                handleToggleStatus(row.id, "Approved")
                              }
                              sx={{ color: "#28A745" }}
                            >
                              <CheckCircleIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      <Tooltip title="Change Password">
                          <IconButton
                            aria-label="change password"
                            sx={{ color: "blue" }}
                          >
                            <LockOpenIcon sx={{ marginRight: "8px" }} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Force Logout">
                          <IconButton
                            aria-label="force logout"
                            sx={{ color: "#FF0000" }}
                          >
                            <LogoutIcon sx={{ marginRight: "8px" }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                        <IconButton
                              onClick={() => handleEdit(row)}
                              aria-label="edit"
                              sx={{ color: "green" }}>
                              <Edit />
                          </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                        <IconButton
                          onClick={() => handleDeleteClick(row.id)}
                          aria-label="delete"
                          sx={{ color: "#e74c3c" }}
                        >
                          <Delete />
                        </IconButton>
                        </Tooltip>
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

export default LockedEmployees;
