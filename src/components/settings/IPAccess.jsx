import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  MenuItem,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import useGetAllBranches from "@/api-manage/react-query/useGetAllBranches";
import { Edit, Delete } from "@mui/icons-material";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";
import { usePermissions } from "@/contexts/PermissionsContext";
import Swal from "sweetalert";

const IPAccess = () => {
  const { data: branchData } = useGetAllBranches();
  const [inputValues, setInputValues] = useState({
    ip_from: "",
    ip_address: "",
    branch: "",
  });
  const [errors, setErrors] = useState({});
  const [ipDetails, setIPDetails] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [ipToDelete, setIPToDelete] = useState(null);

  const { permissionsData } = usePermissions();

  const handleInputChange = (field) => (event) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [field]: event.target.value,
    }));
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!inputValues.ip_from) tempErrors.ip_from = "Login place is required.";
    if (!inputValues.ip_address) tempErrors.ip_address = "IP address is required.";
    if (!inputValues.branch) tempErrors.branch = "Branch is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Ensure the correct branch ID is passed, not the name
    const payload = {
      ip_from: inputValues.ip_from,
      ip_address: inputValues.ip_address,
      branch: inputValues.branch,  // This should be the branch ID, not the name
      user: permissionsData?.user?.id,
    };

    try {
      const token = getToken();
      if (editMode) {
        await MainApi.put(`/api/add-ip-forlogin/${editId}/`, payload, {
          headers: { Authorization: `Token ${token}` },
        });
        Swal({
          icon: "success",
          title: "Updated!",
          text: "IP details updated successfully!",
        });
      } else {
        await MainApi.post("/api/add-ip-forlogin/", payload, {
          headers: { Authorization: `Token ${token}` },
        });
        Swal({
          icon: "success",
          title: "Saved!",
          text: "IP details added successfully!",
        });
      }
      fetchIPDetails();
      setInputValues({ ip_from: "", ip_address: "", branch: "" }); // Reset form
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      console.error("Error saving IP details:", error);
      Swal({
        icon: "error",
        title: "Error!",
        text: "Failed to save IP details.",
      });
    }
  };

  const fetchIPDetails = async () => {
    try {
      const token = getToken();
      const response = await MainApi.get("/api/add-ip-forlogin/", {
        headers: { Authorization: `Token ${token}` },
      });
      setIPDetails(response.data.results);
    } catch (error) {
      console.error("Failed to fetch IP details:", error);
    }
  };

  const handleEditClick = (id, detail) => {
    setInputValues({
      ip_from: detail.ip_from,
      ip_address: detail.ip_address,
      branch: detail.branch,
    });
    setEditMode(true);
    setEditId(id);
  };

  const handleDeleteClick = (id) => {
    setIPToDelete(id);
    setOpenDeleteDialog(true);  // Open the delete dialog
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = getToken();
      await MainApi.delete(`/api/add-ip-forlogin/${ipToDelete}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setOpenDeleteDialog(false); // Close the delete dialog
      fetchIPDetails();
      Swal({
        icon: "success",
        title: "Deleted!",
        text: "IP deleted successfully!",
      });
    } catch (error) {
      console.error("Failed to delete IP details:", error);
      Swal({
        icon: "error",
        title: "Error!",
        text: "Failed to delete IP details.",
      });
    }
  };

  const getBranchName = (branchId) => {
    const branch = branchData?.results.find((b) => b.id === branchId);
    return branch ? branch.name : "Unknown";
  };

  useEffect(() => {
    fetchIPDetails();
  }, []);

  return (
    <Grid container spacing={2}>
      {/* Add/Edit IP Form */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">
              <b>{editMode ? "Edit IP" : "Add IP"}</b>
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Login Place Dropdown */}
                <Grid item xs={4}>
                  <TextField
                    select
                    label="Login Place"
                    value={inputValues.ip_from}
                    onChange={handleInputChange("ip_from")}
                    error={!!errors.ip_from}
                    helperText={errors.ip_from}
                    fullWidth
                    required
                  >
                    <MenuItem value="office">Office</MenuItem>
                    <MenuItem value="home">Home</MenuItem>
                  </TextField>
                </Grid>

                {/* IP Address */}
                <Grid item xs={4}>
                  <TextField
                    label="IP Address"
                    value={inputValues.ip_address}
                    onChange={handleInputChange("ip_address")}
                    error={!!errors.ip_address}
                    helperText={errors.ip_address}
                    fullWidth
                    required
                  />
                </Grid>

                {/* Branch Dropdown */}
                <Grid item xs={4}>
                  <TextField
                    select
                    label="Branch"
                    value={inputValues.branch}
                    onChange={handleInputChange("branch")}
                    error={!!errors.branch}
                    helperText={errors.branch}
                    fullWidth
                    required
                  >
                    <MenuItem value="" disabled>
                      Select Branch
                    </MenuItem>
                    {branchData?.results.map((row) => (
                      <MenuItem key={row.id} value={row.id}>
                        {row.name} {/* Display branch name */}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                {editMode ? "Update" : "Save"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>

      {/* IP Details Table */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">
              <b>IP Details</b>
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Login Place</TableCell>
                    <TableCell>IP Address</TableCell>
                    <TableCell>Branch</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ipDetails.map((detail) => (
                    <TableRow key={detail.id}>
                      <TableCell>{detail.ip_from}</TableCell>
                      <TableCell>{detail.ip_address}</TableCell>
                      <TableCell>{getBranchName(detail.branch)}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleEditClick(detail.id, detail)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDeleteClick(detail.id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this IP detail?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default IPAccess;
