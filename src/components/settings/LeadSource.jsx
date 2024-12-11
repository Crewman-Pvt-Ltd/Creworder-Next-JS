import React, { useState, useEffect } from "react";
import {
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
  TextField,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";
import Swal from "sweetalert";

const LeadSource = () => {
  const [inputValues, setInputValues] = useState({ name: "" });
  const [errors, setErrors] = useState({});
  const [leadSource, setLeadSource] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);


  const handleInputChange = (field) => (event) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [field]: event.target.value,
    }));
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!inputValues.name) tempErrors.name = "Lead Source is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = { name: inputValues.name };

    try {
      const token = getToken();
      if (editMode) {
        await MainApi.put(`/api/lead_sources/${editId}/`, payload, {
          headers: { Authorization: `Token ${token}` },
        });
        Swal({
          icon: "success",
          title: "Updated!",
          text: "Lead Source details updated successfully!",
        });
      } else {
        await MainApi.post("/api/lead_sources/", payload, {
          headers: { Authorization: `Token ${token}` },
        });
        Swal({
          icon: "success",
          title: "Saved!",
          text: "Lead Source details added successfully!",
        });
      }
      fetchLeadSourceDetails();
      setInputValues({ name: "" });
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      console.error("Error saving Lead Source details:", error);
      Swal({
        icon: "error",
        title: "Error!",
        text: "Failed to save Lead Source details.",
      });
    }
  };

  const fetchLeadSourceDetails = async () => {
    try {
      const token = getToken();
      const response = await MainApi.get("/api/lead_sources/", {
        headers: { Authorization: `Token ${token}` },
      });
      setLeadSource(response.data.results);
    } catch (error) {
      console.error("Failed to fetch Lead Source details:", error);
    }
  };

  const handleEditClick = (id, detail) => {
    setInputValues({ name: detail.name });
    setEditMode(true);
    setEditId(id);
  };

  const handleDeleteClick = (id) => {
    Swal({
      title: "Are you sure?",
      text: "You will not be able to recover this Lead Source!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        handleDeleteConfirm(id);
      }
    });
  };
  
  const handleDeleteConfirm = async (id) => {
    try {
      const token = getToken();
      await MainApi.delete(`/api/lead_sources/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      fetchLeadSourceDetails();
      Swal({
        icon: "success",
        title: "Deleted!",
        text: "Lead Source deleted successfully!",
      });
    } catch (error) {
      console.error("Failed to delete Lead Source:", error);
      Swal({
        icon: "error",
        title: "Error!",
        text: "Failed to delete Lead Source.",
      });
    }
  };
  

  useEffect(() => {
    fetchLeadSourceDetails();
  }, []);

  return (
    <Grid container spacing={2}>
      {/* Add/Edit Lead Source Form */}
      <Grid item xs={12}>
        <Typography variant="h6">
          <b>{editMode ? "Edit Lead Source" : "Add Lead Source"}</b>
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Lead Source"
                value={inputValues.name}
                onChange={handleInputChange("name")}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            {editMode ? "Update" : "Save"}
          </Button>
        </form>
      </Grid>

      {/* Lead Source Details Table */}
      <Grid item xs={12}>
        <Typography variant="h6">
          <b>Lead Source Details</b>
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Lead Source</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leadSource.map((detail) => (
                <TableRow key={detail.id}>
                  <TableCell>{detail.name}</TableCell>
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
      </Grid>

    
    </Grid>
  );
};

export default LeadSource;