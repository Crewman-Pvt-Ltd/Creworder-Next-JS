import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";
import useGetAllUserTargets from "@/api-manage/react-query/useGetAllUserTargets";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

const TargetList = () => {
  const router = useRouter();
  const { data, refetch } = useGetAllUserTargets();
  const [open, setOpen] = useState(false);
  const [targetToDelete, setTargetToDelete] = useState(null);

  const createTarget = () => {
    router.push("/admin/manage/create-target");
  };

  const handleDeleteClick = (id) => {
    setTargetToDelete(id);
    setOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await MainApi.delete(`/api/user-target/${targetToDelete}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.status === 204) {
        console.log("Target deleted successfully");
        refetch(); // Refresh the data after deletion
      } else {
        console.error("Failed to delete the target");
      }
    } catch (error) {
      console.error("An error occurred while deleting the target:", error);
    }
    setOpen(false);
    setTargetToDelete(null);
  };

  const handleDeleteCancel = () => {
    setOpen(false);
    setTargetToDelete(null);
  };

  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={12}>
        <CustomCard>
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "auto 1fr auto",
              maxHeight: "400px",
            }}
          >
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
                        marginLeft: "5px",
                      }}
                    >
                      Target List
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={createTarget}
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
                      Create Target
                    </Button>
                  </Grid>
                </Grid>
              </CustomCard>
            </Grid>

            <TableContainer
              component={Paper}
              sx={{ overflowY: "auto", maxHeight: "340px" }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Sr.</b></TableCell>
                    <TableCell><b>Name</b></TableCell>
                    <TableCell><b>Month</b></TableCell>
                    <TableCell><b>Daily Target</b></TableCell>
                    <TableCell><b>Weekly Target</b></TableCell>
                    <TableCell><b>Created At</b></TableCell>
                    <TableCell><b>Action</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.results?.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell>{index + 1}.</TableCell>
                      <TableCell>{row.username}</TableCell>
                      <TableCell>{row.month}</TableCell>
                      <TableCell>{row.daily_target}</TableCell>
                      <TableCell>{row.weekly_target}</TableCell>
                      <TableCell>
                        {row.created_at
                          ? format(new Date(row.created_at), "yyyy-MM-dd")
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: "8px" }}>
                          <IconButton color="primary">
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteClick(row.id)}
                            aria-label="delete"
                            sx={{ color: "red" }}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </CustomCard>
      </Grid>

      <Dialog open={open} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Target</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Target? This action cannot be undone.
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

export default TargetList;
