import React, { useState } from "react";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import useGetAllFollowUp from "@/api-manage/react-query/useGetAllFollowUP";
import { getToken } from "@/utils/getToken";
import MainApi from "@/api-manage/MainApi";
import {
  Grid,
  Typography,
  Button,
  Box,
  IconButton,
  CardContent,
  TableContainer,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContentText ,
  DialogContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {  Edit, Delete } from "@mui/icons-material";
const FollowUpList = () => {
  const { data, refetch } = useGetAllFollowUp();
  const [open, setOpen] = useState(false);
  const [followupToDelete, setFollowupToDelete] = useState(null);
  const router = useRouter();

  const handleCreateFollowUp = () => {
    router.push("/followup/createfollowup");
  };
  const handleEdit = (row) => {
    router.push(`/followup/editfollowup?id=${row.id}`);
  };
  const handleDeleteClick = (id) => {
    setFollowupToDelete(id);
    setOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await MainApi.delete(`/api/follow-up/${followupToDelete}`, {
        headers: {
          Authorization: `Token ${token}`,
        },    
      });

      if (response.status === 204) {
        console.log("FollowUp deleted successfully");
        refetch();
      } else {
        console.error("Failed to delete the followup");
      }
    } catch (error) {
      console.error("An error occurred while deleting the followup:", error);
    }
    setOpen(false);
    setFollowupToDelete(null);
  };

  const handleDeleteCancel = () => {
    setOpen(false);
    setFollowupToDelete(null);
  };

  const HeaderCell = (props) => (
    <TableCell
      sx={{
        fontSize: "1rem",
        whiteSpace: "nowrap",
        fontWeight: "500",
        textTransform: "capitalize",
        color: "black",
      }}
      {...props}
    />
  );

  const DataCell = (props) => (
    <TableCell
      sx={{
        color: "#999999",
        fontSize: "14px",
        whiteSpace: "nowrap",
        fontWeight: "500",
        textTransform: "capitalize",
      }}
      {...props}
    />
  );

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <Grid container sx={{ marginBottom: "10px" }}>
          <Grid item xs={12}>
            <CustomCard padding="13px">
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "20px",
                      whiteSpace: "nowrap",
                      textTransform: "capitalize",
                      color: "black",
                      marginLeft: "30px",
                    }}
                  >
                    Follow Up List
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    onClick={handleCreateFollowUp}
                    sx={{
                      padding: "8px",
                      fontSize: "14px",
                      backgroundColor: "#405189",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#334a6c",
                      },
                      borderRadius: "30px",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <AddIcon sx={{ fontSize: 15 }} />
                    Add Follow Up
                  </Button>
                </Grid>
              </Grid>
            </CustomCard>
          </Grid>
        </Grid>

        <CustomCard>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <HeaderCell>ID</HeaderCell>
                    <HeaderCell>Customer Name</HeaderCell>
                    <HeaderCell>Customer Phone</HeaderCell>
                    <HeaderCell>Call ID</HeaderCell>
                    <HeaderCell>Reminder Date</HeaderCell>
                    <HeaderCell>follow_status</HeaderCell>
                    <HeaderCell>snooze</HeaderCell>
                    <HeaderCell>Action</HeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.results?.map((row, index) => (
                    <TableRow key={row.id}>
                      <DataCell>{index + 1}.</DataCell>
                      <DataCell>{row.customer_name}</DataCell>
                      <DataCell>{row.customer_phone}</DataCell>
                      <DataCell>{row.call_id}</DataCell>
                      <DataCell>{row.reminder_date}</DataCell>
                      <DataCell>{row.follow_status}</DataCell>
                      <DataCell>{row.snooze}</DataCell>
                      
                      <TableCell>
                      <IconButton
                          onClick={() => handleEdit(row)}
                          aria-label="edit"
                          sx={{ color: "red" }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteClick(row.id)}
                          aria-label="delete"
                          sx={{ color: 'red' }}
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
        <DialogTitle>Delete FollowUp</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this followup? This action cannot be undone.
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

export default FollowUpList;
