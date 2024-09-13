import React, { useState, useEffect } from "react";
import CustomCard from "../CustomCard";
import {
  Grid,
  Typography,
  Button,
  IconButton,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";

const BranchListPage = ({ onAddBranch }) => {
  const [branches, setBranches] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [branchToEdit, setBranchToEdit] = useState(null);
  const [formData, setFormData] = useState({ name: "", address: "" });

  // Fetch branches data
  const fetchBranches = async () => {
    try {
      const token = getToken();
      if (!token) throw new Error("No authentication token found.");

      const response = await MainApi.get("/api/branches", {
        headers: { Authorization: `Token ${token}` },
      });

      if (response.status === 200) {
        setBranches(response.data.results);
      } else {
        console.error("Failed to fetch branches");
      }
    } catch (error) {
      console.error("An error occurred while fetching branches:", error);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  // Handle branch deletion
  const handleDeleteClick = (id) => {
    setBranchToDelete(id);
    setOpenDelete(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = getToken();
      if (!token) throw new Error("No authentication token found.");

      const response = await MainApi.delete(`/api/branches/${branchToDelete}`, {
        headers: { Authorization: `Token ${token}` },
      });

      if (response.status === 204) {
        console.log("Branch deleted successfully");
        fetchBranches(); // Refresh the list
      } else {
        console.error("Failed to delete branch");
      }
    } catch (error) {
      console.error("An error occurred while deleting the branch:", error);
    }
    setOpenDelete(false);
    setBranchToDelete(null);
  };

  const handleDeleteCancel = () => {
    setOpenDelete(false);
    setBranchToDelete(null);
  };

  // Handle branch editing
  const handleEditClick = async (id) => {
    setBranchToEdit(id);
    try {
      const token = getToken();
      if (!token) throw new Error("No authentication token found.");

      const response = await MainApi.get(`/api/branches/${id}`, {
        headers: { Authorization: `Token ${token}` },
      });

      if (response.status === 200) {
        setFormData({
          name: response.data.name,
          address: response.data.address,
        });
        setOpenEdit(true);
      } else {
        console.error("Failed to fetch branch data");
      }
    } catch (error) {
      console.error("An error occurred while fetching branch data:", error);
    }
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    setBranchToEdit(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSave = async () => {
    try {
      const token = getToken();
      if (!token) throw new Error("No authentication token found.");

      const response = await MainApi.patch(`/api/branches/${branchToEdit}/`, formData, {
        headers: { Authorization: `Token ${token}` },
      });

      if (response.status === 200) {
        console.log("Branch updated successfully");
        fetchBranches(); // Refresh the list
        handleEditClose(); // Close the dialog after saving
      } else {
        console.error("Failed to update branch");
      }
    } catch (error) {
      console.error("An error occurred while updating the branch:", error);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container sx={{ marginBottom: "10px" }}>
          <Grid item xs={12}>
            <CustomCard padding="13px">
              <Grid container justifyContent="space-between" alignItems="center">
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
                    Branch List
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    onClick={onAddBranch}
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
                    Add Branch
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
                  <TableCell>ID</TableCell>
                  <TableCell>Branch Name</TableCell>
                  <TableCell>Branch Address</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {branches.map((branch, index) => (
                  <TableRow key={branch.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{branch.name}</TableCell>
                    <TableCell>{branch.address}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditClick(branch.id)} aria-label="edit" sx={{ color: "green" }}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(branch.id)} aria-label="delete" sx={{ color: "red" }}>
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

      {/* Delete confirmation dialog */}
      <Dialog open={openDelete} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Branch</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this branch? This action cannot be undone.
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

      {/* Edit branch dialog */}
      <Dialog open={openEdit} onClose={handleEditClose}>
        <DialogTitle>Edit Branch</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            name="name"
            label="Branch Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="address"
            name="address"
            label="Branch Address"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.address}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default BranchListPage;
