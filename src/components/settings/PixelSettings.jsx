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
  MenuItem,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

import { Edit, Delete } from "@mui/icons-material";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";
import useGetAllPixelCode from "@/api-manage/react-query/useGetAllPixelCode";
import { usePermissions } from "@/contexts/PermissionsContext";

const PixelSettings = () => {
  const { data, refetch } = useGetAllPixelCode();
  const [inputValues, setInputValues] = useState({
    google_analytics_code: "",
    meta_pexel_code: "",
    other_pexel_code: "",
  });
  const [errors, setErrors] = useState({});
  const [pixelSettings, setPixelSettings] = useState([]);
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

  // Validate the form before submission
  const validateForm = () => {
    const tempErrors = {};
    if (!inputValues.google_analytics_code) tempErrors.google_analytics_code = "google_analytics_code is required.";
    if (!inputValues.meta_pexel_code) tempErrors.meta_pexel_code = "meta_pexel_code is required.";
    if (!inputValues.other_pexel_code) tempErrors.other_pexel_code = "other_pexel_code is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Submit the form (add or edit Pixel settings)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      google_analytics_code: inputValues.google_analytics_code,
      meta_pexel_code: inputValues.meta_pexel_code,
      other_pexel_code: inputValues.other_pexel_code
    };

    try {
      const token = getToken();
      if (editMode) {
        await MainApi.put(`/api/pixel-code/${editId}/`, payload, {
          headers: { Authorization: `Token ${token}` },
        });
        alert("PixelCode updated successfully!");
      } else {
        await MainApi.post("/api/pixel-code/", payload, {
          headers: { Authorization: `Token ${token}` },
        });
        alert("Pixel Code added successfully!");
      }
      fetchPixelSettings();
      resetForm();
    } catch (error) {
      console.error("Error saving Pixel settings:", error);
    }
  };

 
  const fetchPixelSettings = async () => {
    try {
      const token = getToken();
      const response = await MainApi.get("/api/pixel-code/", {
        headers: { Authorization: `Token ${token}` },
      });
      setPixelSettings(response.data.results);
    } catch (error) {
      console.error("Failed to fetch Pixel details:", error);
    }
  };

  // Reset form and edit mode
  const resetForm = () => {
    setInputValues({ google_analytics_code: "", meta_pexel_code: "",other_pexel_code: "" });
    setEditMode(false);
    setEditId(null);
  };

  // Handle edit action
  const handleEditClick = (id, detail) => {
    setInputValues({
      google_analytics_code: detail.google_analytics_code,
      meta_pexel_code: detail.meta_pexel_code,
      other_pexel_code: detail.other_pexel_code,
    });
    setEditMode(true);
    setEditId(id);
  };

  // Handle delete action
  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setOpenDeleteDialog(true);
  };

  // Confirm and delete item
  const handleDeleteConfirm = async () => {
    try {
      const token = getToken();
      await MainApi.delete(`/api/pixel-code/${itemToDelete}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      fetchPixelSettings();
      setOpenDeleteDialog(false);
      setItemToDelete(null);
      alert("Pixel setting deleted successfully!");
    } catch (error) {
      console.error("Failed to delete Pixel setting:", error);
    }
  };

  useEffect(() => {
    fetchPixelSettings();
  }, []);

  return (
    <Grid container spacing={2}>
      {/* Add/Edit Pixel Form */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">
              <b>{editMode ? "Edit Pixel" : "Add Pixel"}</b>
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
             
                <Grid item xs={4}>
                  <TextField
                    label="Google Analytics"
                    value={inputValues.google_analytics_code}
                    onChange={handleInputChange("google_analytics_code")}
                    error={!!errors.google_analytics_code}
                    helperText={errors.google_analytics_code}
                    fullWidth
                    required
                  />
                </Grid>

                {/* Branch Dropdown */}
                <Grid item xs={4}>
                  <TextField
                    label="Meta Pixel Code"
                    value={inputValues.meta_pexel_code}
                    onChange={handleInputChange("meta_pexel_code")}
                    error={!!errors.meta_pexel_code}
                    helperText={errors.meta_pexel_code}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                <TextField
                  label="Other Pixel Code"
                  value={inputValues.other_pexel_code}
                  onChange={handleInputChange("other_pexel_code")}
                  error={!!errors.other_pexel_code}
                  helperText={errors.other_pexel_code}
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

      {/* Pixel Settings Table */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">
              <b>Pixel Settings</b>
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                  <TableCell>Google Analytics</TableCell>
                    <TableCell>Meta Pixel Code</TableCell>
                    <TableCell>Other Pixel Code</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {data?.map((row, index) => (
                    <TableRow key={row.id}>
                    <TableCell>{row.google_analytics_code}</TableCell>
                      <TableCell>{row.meta_pexel_code}</TableCell>
                      <TableCell>{row.other_pexel_code}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleEditClick(row.id, detail)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => handleDeleteClick(row.id)}
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Pixel setting?
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

export default PixelSettings;
