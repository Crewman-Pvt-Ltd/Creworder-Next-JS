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
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
  DialogContentText,
  DialogActions,
  Box,
  Dialog,
  IconButton,
  Avatar,
  Typography,
  Chip,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import CustomCard from "../CustomCard";
import useGetAllLeaves from "@/api-manage/react-query/useGetAllLeaves";
import useGetAllUsers from "@/api-manage/react-query/useGetAllUsers";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";

const LeaveList = ({ onAddLeave }) => {
  const { data, isLoading, isError, refetch } = useGetAllLeaves();
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useGetAllUsers();
  const [open, setOpen] = useState(false);
  const [leavesToDelete, setLeavesToDelete] = useState(null);
  const [selectedLeaveId, setSelectedLeaveId] = useState(null);

  const handleDeleteClick = (id) => {
    setLeavesToDelete(id);
    setOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await MainApi.delete(`/api/leaves/${leavesToDelete}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.status === 204) {
        console.log("Leave deleted successfully");
        refetch(); // Refetch data to update the list after deletion
      } else {
        console.error("Failed to delete the leave");
      }
    } catch (error) {
      console.error("An error occurred while deleting the leave:", error);
    }
    setOpen(false);
    setLeavesToDelete(null);
  };

  const handleDeleteCancel = () => {
    setOpen(false);
    setLeavesToDelete(null);
  };

  // Function to handle the toggle action for approve/disapprove
  const handleToggleStatus = async (id, newStatus) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await MainApi.put(
        `/api/leaves/${id}/leave_action/`,
        { status: newStatus }, // Payload with the new status
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(`Leave with ID: ${id} has been ${newStatus}`);
        refetch(); // Refetch data to update the list after status change
      } else {
        console.error("Failed to update leave status");
      }
    } catch (error) {
      console.error(
        "An error occurred while updating the leave status:",
        error
      );
    }
  };

  // Handle status change and update the selected leave ID
  const handleChange = (event, id) => {
    const newStatus = event.target.value;
    setSelectedLeaveId(id);
    handleToggleStatus(id, newStatus);
  };

  if (isLoading || userLoading) return <div>Loading data, please wait...</div>;
  if (isError || userError)
    return <div>Failed to load data. Please try again later.</div>;

  const userIdToNameMap = userData?.results.reduce((acc, user) => {
    acc[user.id] = user.first_name;
    return acc;
  }, {});
  const durationChoices = [
    { value: "full", display_name: "Full Day" },
    { value: "first", display_name: "First Half" },
    { value: "second", display_name: "Second Half" },
  ];

  // Create a map for quick lookup
  const durationMap = durationChoices.reduce((map, choice) => {
    map[choice.value] = choice.display_name;
    return map;
  }, {});
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
      <Grid item xs={12}>
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
                  {data?.results.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          alt={userIdToNameMap[row.user] || "Unknown User"}
                          src={row.userAvatar}
                          sx={{ marginRight: 2 }}
                        />
                        <Typography sx={{ fontSize: "14px", color: "black" }}>
                          {userIdToNameMap[row.user] || "Unknown User"}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: "gray" }}>{row.date}</TableCell>

                      <TableCell>
                        <Typography sx={{ fontSize: "14px", color: "gray" }}>
                          {row?.duration === "full" && "Full Day"}
                          {row?.duration === "first" && "First Half"}
                          {row?.duration === "second" && "Second Half"}
                          {row?.duration === "multiple" && (
                            <Chip
                              label={`${row.leaveCount} Leave`}
                              size="small"
                              sx={{
                                marginLeft: 1,
                                backgroundColor: "#d1d1d1",
                              }}
                            />
                          )}

                          {/* Fallback content */}
                          {!["full", "first", "second", "multiple"].includes(
                            row?.duration?.toLowerCase()
                          ) && (
                            <Typography sx={{ fontSize: "14px", color: "red" }}>
                              Unknown Duration
                            </Typography>
                          )}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Select
                            value={row.status || "pending"}
                            onChange={(event) => handleChange(event, row.id)}
                            sx={{
                              height: 40,
                              minWidth: 120, // Adjust the width as needed
                              fontSize: "12px",
                            }}
                          >
                            <MenuItem value="pending">
                              <Typography sx={{ color: "gray" }}>
                                Pending
                              </Typography>
                            </MenuItem>
                            <MenuItem value="approved">
                              <Typography sx={{ color: "green" }}>
                                Approved
                              </Typography>
                            </MenuItem>
                            <MenuItem value="disapprove">
                              <Typography sx={{ color: "red" }}>
                                Disapproved
                              </Typography>
                            </MenuItem>
                          </Select>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={row.type}
                          size="small"
                          sx={{
                            backgroundColor:
                              row.leaveType === "Earned" ? "purple" : "gray",
                            color: "white",
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: "gray" }}>
                        {row.paid ? "Yes" : "No"}
                      </TableCell>
                      <TableCell>
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
      <Dialog open={open} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Leave</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this leave? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default LeaveList;
