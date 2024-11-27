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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import useGetAllBranches from "@/api-manage/react-query/useGetAllBranches";
import { Edit, Delete } from "@mui/icons-material";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";
import { usePermissions } from "@/contexts/PermissionsContext";

const CourierService = () => {
  const { data: branchData } = useGetAllBranches();
  const [inputValues, setInputValues] = useState({
    name: "",
    api_url: "",
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [courierService, setCourierService] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const { permissionsData } = usePermissions();

  // Handle input field changes
  const handleInputChange = (field) => (event) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [field]: event.target.value,
    }));
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!inputValues.name) tempErrors.name = "Courier Name is required.";
    if (!inputValues.api_url) tempErrors.api_url = "Courier Url is required.";
    if (!inputValues.remark) tempErrors.remark = "Remark is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      name: inputValues.name,
      api_url: inputValues.api_url,
      remark: inputValues.remark,
    };

    try {
      const token = getToken();
      if (editMode) {
        await MainApi.put(`/api/courier-service/${editId}/`, payload, {
          headers: { Authorization: `Token ${token}` },
        });
        alert("Courier Service updated successfully!");
      } else {
        await MainApi.post("/api/courier-service/", payload, {
          headers: { Authorization: `Token ${token}` },
        });
        alert("Courier Service added successfully!");
      }
      fetchCourierService();
      resetForm();
    } catch (error) {
      console.error("Error saving Courier Service settings:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const fetchCourierService = async () => {
    try {
      const token = getToken();
      const response = await MainApi.get("/api/courier-service/", {
        headers: { Authorization: `Token ${token}` },
      });
      setCourierService(response.data.results);
    } catch (error) {
      console.error("Failed to fetch Courier Service settings:", error);
    }
  };

  const resetForm = () => {
    setInputValues({ name: "", api_url: "", remark: "" });
    setEditMode(false);
    setEditId(null);
  };

  const handleEditClick = (id, detail) => {
    setInputValues({
      name: detail.name,
      api_url: detail.api_url,
      remark: detail.remark,
    });
    setEditMode(true);
    setEditId(id);
  };

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = getToken();
      await MainApi.delete(`/api/courier-service/${itemToDelete}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      fetchCourierService();
      setOpenDeleteDialog(false);
      setItemToDelete(null);
      alert("Courier Service setting deleted successfully!");
    } catch (error) {
      console.error("Failed to delete Courier Service setting:", error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchCourierService();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">
              <b>{editMode ? "Edit Courier Service" : "Add Courier Service"}</b>
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Courier Name:"
                    value={inputValues.name}
                    onChange={handleInputChange("name")}
                    error={!!errors.name}
                    helperText={errors.name}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Courier URL:"
                    value={inputValues.api_url}
                    onChange={handleInputChange("api_url")}
                    error={!!errors.api_url}
                    helperText={errors.api_url}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Remark"
                    value={inputValues.remark}
                    onChange={handleInputChange("remark")}
                    error={!!errors.remark}
                    helperText={errors.remark}
                    fullWidth
                    required
                  />
                </Grid>

               
              </Grid>
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                {editMode ? "Update" : "Save"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">
              <b>Courier Service</b>
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Courier Name</TableCell>
                    <TableCell>API URL</TableCell>
                    <TableCell>Remark</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courierService.map((detail) => (
                    <TableRow key={detail.id}>
                      <TableCell>{detail.name}</TableCell>
                      <TableCell>{detail.api_url}</TableCell>
                      <TableCell>{detail.remark}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleEditClick(detail.id, detail)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => handleDeleteClick(detail.id)}
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
        </Card>
      </Grid>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Courier Service setting?
          </DialogContentText>
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

export default CourierService;
