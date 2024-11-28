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
import useGetAllBranches from "@/api-manage/react-query/useGetAllBranches";
import { Edit, Delete } from "@mui/icons-material";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";
import { usePermissions } from "@/contexts/PermissionsContext";

const QCSettings = () => {
  const { data: branchData } = useGetAllBranches();
  const [inputValues, setInputValues] = useState({
    question: "",
    branch: "",
  });
  const [errors, setErrors] = useState({});
  const [qcList, setQcList] = useState([]);
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
    if (!inputValues.question) tempErrors.question = "Question is required.";
    if (!inputValues.branch) tempErrors.branch = "Branch is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Submit the form (add or edit QC settings)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      question: inputValues.question,
      branch: inputValues.branch,
    };

    try {
      const token = getToken();
      if (editMode) {
        await MainApi.put(`/api/qc/${editId}/`, payload, {
          headers: { Authorization: `Token ${token}` },
        });
        alert("QC updated successfully!");
      } else {
        await MainApi.post("/api/qc/", payload, {
          headers: { Authorization: `Token ${token}` },
        });
        alert("QC added successfully!");
      }
      fetchQcList();
      resetForm();
    } catch (error) {
      console.error("Error saving QC settings:", error);
    }
  };

  // Fetch QC list from the server
  const fetchQcList = async () => {
    try {
      const token = getToken();
      const response = await MainApi.get("/api/qc/", {
        headers: { Authorization: `Token ${token}` },
      });
      const qcData = response.data.results.map((qcItem) => {
        const branchName =
          branchData?.results.find((branch) => branch.id === qcItem.branch)
            ?.name || "Unknown";
        return { ...qcItem, branchName };
      });
      setQcList(qcData);
    } catch (error) {
      console.error("Failed to fetch QC settings:", error);
    }
  };

  // Reset form and edit mode
  const resetForm = () => {
    setInputValues({ question: "", branch: "" });
    setEditMode(false);
    setEditId(null);
  };

  // Handle edit action
  const handleEditClick = (id, detail) => {
    setInputValues({
      question: detail.question,
      branch: detail.branch,
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
      await MainApi.delete(`/api/qc/${itemToDelete}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      fetchQcList();
      setOpenDeleteDialog(false);
      setItemToDelete(null);
      alert("QC setting deleted successfully!");
    } catch (error) {
      console.error("Failed to delete QC setting:", error);
    }
  };

  useEffect(() => {
    fetchQcList();
  }, [branchData]);

  return (
    <Grid container spacing={2}>
      {/* Add/Edit QC Form */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">
              <b>{editMode ? "Edit QC" : "Add QC"}</b>
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Question Field */}
                <Grid item xs={6}>
                  <TextField
                    label="Question"
                    value={inputValues.question}
                    onChange={handleInputChange("question")}
                    error={!!errors.question}
                    helperText={errors.question}
                    fullWidth
                    required
                  />
                </Grid>

                {/* Branch Dropdown */}
                <Grid item xs={6}>
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
                        {row.name}
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

      {/* QC Settings Table */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">
              <b>QC Settings</b>
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Question</TableCell>
                    <TableCell>Branch</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {qcList.map((detail) => (
                    <TableRow key={detail.id}>
                      <TableCell>{detail.question}</TableCell>
                      <TableCell>{detail.branchName}</TableCell>
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this QC setting?
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

export default QCSettings;
