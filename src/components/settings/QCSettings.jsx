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
} from "@mui/material";
import useGetAllBranches from "@/api-manage/react-query/useGetAllBranches";
import { Edit, Delete } from "@mui/icons-material";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";
import { usePermissions } from "@/contexts/PermissionsContext";
import Swal from "sweetalert";

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
        Swal({
          icon: "success",
          title: "Updated!",
          text: "QC details updated successfully!",
        });
      } else {
        await MainApi.post("/api/qc/", payload, {
          headers: { Authorization: `Token ${token}` },
        });
        Swal({
          icon: "success",
          title: "Saved!",
          text: "QC details added successfully!",
        });
      }
      fetchQcList();
      resetForm();
    } catch (error) {
      console.error("Error saving QC settings:", error);
      Swal({
        icon: "error",
        title: "Error!",
        text: "Failed to save QC details.",
      });
    }
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
    Swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this QC setting!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const token = getToken();
          await MainApi.delete(`/api/qc/${id}/`, {
            headers: { Authorization: `Token ${token}` },
          });
          fetchQcList();
          Swal({
            icon: "success",
            title: "Deleted!",
            text: "QC setting deleted successfully!",
          });
        } catch (error) {
          console.error("Failed to delete QC setting:", error);
          Swal({
            icon: "error",
            title: "Error!",
            text: "Failed to delete QC setting.",
          });
        }
      }
    });
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
    </Grid>
  );
};

export default QCSettings;

