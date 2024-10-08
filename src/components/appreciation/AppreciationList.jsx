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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Visibility from "@mui/icons-material/Visibility";
import Delete from "@mui/icons-material/Delete";
import CustomCard from "../CustomCard";
import useGetAllAppreciations from "@/api-manage/react-query/useGetAllAppreciation";
import useGetAllAwards from "@/api-manage/react-query/useGetAllAwards";
import useGetAllUsers from "@/api-manage/react-query/useGetAllUsers";
import MainApi from "@/api-manage/MainApi"; 
import { getToken } from "@/utils/getToken"; 

const AppreciationList = ({ onAddAppreciation }) => {
  const { data: appreciationData, isLoading: appreciationLoading, isError: appreciationError, refetch } = useGetAllAppreciations();
  const { data: userData, isLoading: userLoading, isError: userError } = useGetAllUsers();
  const { data: awardsData, isLoading: awardsLoading, isError: awardsError } = useGetAllAwards();
  
  const [open, setOpen] = useState(false); // Initialize dialog state
  const [appreciationToDelete, setAppreciationToDelete] = useState(null);

  if (appreciationLoading || userLoading || awardsLoading) return <div>Loading...</div>;
  if (appreciationError || userError || awardsError) return <div>Error loading data</div>;

  // Create a mapping of user IDs to names
  const userIdToNameMap = userData?.results.reduce((acc, user) => {
    acc[user.id] = user.first_name; 
    return acc;
  }, {});

  // Create a mapping of award IDs to titles
  const awardIdToTitleMap = awardsData?.results.reduce((acc, award) => {
    acc[award.id] = award.title; 
    return acc;
  }, {});

  const handleEdit = (id) => {
    console.log("Edit", id);
  };

  const handleDeleteClick = (id) => {
    setAppreciationToDelete(id);
    setOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await MainApi.delete(`/api/appreciations/${appreciationToDelete}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.status === 204) {
        console.log("Appreciation deleted successfully");
        refetch(); 
      } else {
        console.error("Failed to delete the appreciation");
      }
    } catch (error) {
      console.error("An error occurred while deleting the appreciation:", error);
    }
    setOpen(false);
    setAppreciationToDelete(null);
  };

  const handleDeleteCancel = () => {
    setOpen(false);
    setAppreciationToDelete(null);
  };

  return (
    <Grid container spacing={2} sx={{ padding: 3 }}>
      <Grid item xs={12} sx={{ display: "flex", gap: 2 }}>
        <Button
          onClick={onAddAppreciation}
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
          Add Appreciation
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
                    <TableCell>ID</TableCell>
                    <TableCell>Given To</TableCell>
                    <TableCell>Award Name</TableCell>
                    <TableCell>Given On</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appreciationData?.results.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          src={row.givento?.avatar} 
                          sx={{ marginRight: 2 }}
                        />
                        <div>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "black",
                            }}
                          >
                            {userIdToNameMap[row.user] || "Unknown User"} 
                            {row.givento?.itsYou && (
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
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "black",
                          }}
                        >
                          {awardIdToTitleMap[row.award] || "Unknown Award"}
                        </Typography>
                      </TableCell>
                      <TableCell>{row.date_given}</TableCell>
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

      <Dialog open={open} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Appreciation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this appreciation? This action cannot be
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

export default AppreciationList;
