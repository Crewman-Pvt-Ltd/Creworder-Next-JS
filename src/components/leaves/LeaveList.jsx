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
  } from "@mui/material";
  import React from "react";
  import AddIcon from "@mui/icons-material/Add";
  import Visibility from "@mui/icons-material/Visibility";
  import Delete from "@mui/icons-material/Delete";
  import CustomCard from "../CustomCard";
  
  const LeaveList = ({ onAddLeave }) => {
    const rows = [
      {
        id: 1,
        employee: {
          name: "Kay Schoen DDS",
          role: "Senior",
          avatar: "https://i.pravatar.cc/300?u=kay@example.com",
        },
        leaveDate: "08-10-2024 (Tuesday)",
        duration: "Multiple",
        leaveCount: 4,
        leaveStatus: "Pending",
        leaveType: "Earned",
        paid: true,
        statusColor: "#c392e8",
      },
      {
        id: 2,
        employee: {
          name: "Ms. Aubrey Kihn III",
          role: "Trainee",
          avatar: "https://i.pravatar.cc/300?u=aubrey@example.com",
        },
        leaveDate: "18-05-2024 (Saturday)",
        duration: "Full Day",
        leaveStatus: "Approved",
        leaveType: "Sick",
        paid: true,
        statusColor: "#32a852",
      },
      {
        id: 3,
        employee: {
          name: "Ms. Aubrey Kihn III",
          role: "Trainee",
          avatar: "https://i.pravatar.cc/300?u=aubrey@example.com",
        },
        leaveDate: "08-04-2024 (Monday)",
        duration: "Full Day",
        leaveStatus: "Pending",
        leaveType: "Sick",
        paid: true,
        statusColor: "orange",
      },
      {
        id: 4,
        employee: {
          name: "Ms. Aubrey Kihn III",
          role: "Trainee",
          avatar: "https://i.pravatar.cc/300?u=aubrey@example.com",
        },
        leaveDate: "14-04-2024 (Sunday)",
        duration: "Full Day",
        leaveStatus: "Rejected",
        leaveType: "Sick",
        paid: true,
        statusColor: "red",
      },
    ];
  
    return (
      <Grid container spacing={2} sx={{ padding: 3 }}>
        <Grid item xs={12} sm={12} md={12} sx={{ display: "flex", gap: 2 }}>
          <Button
            onClick={onAddLeave}
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
            Add Leave
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
        <Grid item xs={12} sm={12} md={12}>
          <CustomCard>
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Employee</TableCell>
                      <TableCell>Leave Date</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell>Leave Status</TableCell>
                      <TableCell>Leave Type</TableCell>
                      <TableCell>Paid</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar src={row.employee.avatar} sx={{ marginRight: 2 }} />
                          <div>
                            <Typography sx={{ fontSize: "14px", color: "black" }}>
                              {row.employee.name}
                            </Typography>
                            <Typography variant="body2" color="gray">
                              {row.employee.role}
                            </Typography>
                          </div>
                        </TableCell>
                        <TableCell  sx={{color: "gray" }}>{row.leaveDate}</TableCell>
                        <TableCell>
                          <Typography sx={{ fontSize: "14px", color: "gray" }}>
                            {row.duration}
                            {row.duration === "Multiple" && (
                              <Chip
                                label={`${row.leaveCount} Leave`}
                                size="small"
                                sx={{
                                  marginLeft: 1,
                                  backgroundColor: "#d1d1d1",
                                }}
                              />
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={row.leaveStatus}
                            size="small"
                            sx={{
                              backgroundColor: row.statusColor,
                              color: "white",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={row.leaveType}
                            size="small"
                            sx={{
                              backgroundColor: row.leaveType === "Earned" ? "purple" : "gray",
                              color: "white",
                            }}
                          />
                        </TableCell>
                        <TableCell   sx={{color: "gray" }}> {row.paid ? "Yes" : "No"}</TableCell>
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
  
  export default LeaveList;
  