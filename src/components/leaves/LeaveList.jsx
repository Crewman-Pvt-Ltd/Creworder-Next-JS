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
  DialogContentText,
  DialogActions,
  Dialog,
  IconButton,
  Avatar,
  Typography,
  Chip,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Visibility from "@mui/icons-material/Visibility";
import Delete from "@mui/icons-material/Delete";
import CustomCard from "../CustomCard";
import useGetAllLeaves from "@/api-manage/react-query/useGetAllLeaves";
import useGetAllUsers from "@/api-manage/react-query/useGetAllUsers";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";

const LeaveList = ({ onAddLeave }) => {
  const { data, isLoading, isError, refetch } = useGetAllLeaves(); // Include refetch to update data after deletion
  const { data: userData, isLoading: userLoading, isError: userError } = useGetAllUsers();
  const [open, setOpen] = useState(false);
  const [leavesToDelete, setLeavesToDelete] = useState(null);

  const handleEdit = (id) => {
    console.log("Edit", id);
  };

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

  if (isLoading || userLoading) return <div>Loading data, please wait...</div>;
  if (isError || userError) return <div>Failed to load data. Please try again later.</div>;

  const userIdToNameMap = userData?.results.reduce((acc, user) => {
    acc[user.id] = user.first_name;
    return acc;
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
                          label={row.status}
                          size="small"
                          sx={{
                            backgroundColor: row.statusColor,
                            color: "white",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={row.type}
                          size="small"
                          sx={{
                            backgroundColor: row.leaveType === "Earned" ? "purple" : "gray",
                            color: "white",
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: "gray" }}>
                        {row.paid ? "Yes" : "No"}
                      </TableCell>
                      <TableCell>
                        {/* <IconButton
                          onClick={() => handleEdit(row.id)}
                          aria-label="edit"
                          sx={{ color: "#405189" }}
                        >
                          <Visibility />
                        </IconButton> */}
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
