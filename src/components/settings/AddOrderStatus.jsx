import React, { useState } from "react";
import {
  CardContent,
  Grid,
  Button,
  Divider,
  TableHead,
  Table,
  TextField,
  TableBody,
  TableContainer,
  TableRow,
  IconButton,
  Typography,
  TableCell,
  FormHelperText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CustomCard from "../CustomCard";
import CustomLabel from "../CustomLabel";
import CustomTextField from "../CustomTextField";
import { Poppins } from "next/font/google";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit } from "@mui/icons-material";
import useGetAllOrderStatus from "@/api-manage/react-query/useGetAllOrderStatus";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";
import { usePermissions } from "@/contexts/PermissionsContext";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const AddOrderStatus = ({ onAdd, onEdit }) => {
  const [inputValues, setInputValues] = useState({ name: "", description: "" });
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [errors, setErrors] = useState({});
  const { data, refetch } = useGetAllOrderStatus();
  const { permissionsData } = usePermissions();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [targetToDelete, setTargetToDelete] = useState(null);
  const [orderstatusToEdit, setOrderStatusToEdit] = useState(null);

  // Input change handlers
  const handleInputChange = (field) => (event) => {
    setInputValues({ ...inputValues, [field]: event.target.value });
  };

  const handleFormDataChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  // Validate form inputs
  const validateForm = () => {
    let tempErrors = {};
    if (!inputValues.name) tempErrors.name = "Name is required";
    if (!inputValues.description)
      tempErrors.description = "Description is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      branch: permissionsData?.user?.profile?.branch,
      company: permissionsData?.user?.profile?.company,
      name: inputValues.name,
      description: inputValues.description,
    };

    try {
      const token = getToken();
      const response = await MainApi.post("/api/order_status/", payload, {
        headers: { Authorization: `Token ${token}` },
      });

      if (response.status === 201) {
        alert("Order Status created successfully!");
        refetch();
        setInputValues({ name: "", description: "" });
      } else {
        alert("Failed to create Order Status.");
      }
    } catch (error) {
      alert("An error occurred while creating the Order Status.");
    }
  };

  // Handle delete
  const handleDeleteClick = (id) => {
    setTargetToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = getToken();
      await MainApi.delete(`/api/order_status/${targetToDelete}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      refetch();
      setOpenDeleteDialog(false);
      setTargetToDelete(null);
    } catch (error) {
      console.error("Failed to delete the Order Status.");
    }
  };

  // Handle edit
  const handleEditClick = async (id) => {
    setOrderStatusToEdit(id);
    try {
      const token = getToken();
      const response = await MainApi.get(`/api/order_status/${id}`, {
        headers: { Authorization: `Token ${token}` },
      });

      if (response.status === 200) {
        setFormData({
          name: response.data.name,
          description: response.data.description,
        });
        setOpenEditDialog(true);
      }
    } catch (error) {
      console.error("Failed to fetch Order Status data for editing.");
    }
  };

  const handleEditSave = async () => {
    try {
      const token = getToken();
      await MainApi.patch(`/api/order_status/${orderstatusToEdit}/`, formData, {
        headers: { Authorization: `Token ${token}` },
      });
      refetch();
      setOpenEditDialog(false);
    } catch (error) {
      console.error("Failed to update the Order Status.");
    }
  };

  return (
    <Grid container spacing={2}>
      {/* Add Order Status Form */}
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography
              className={poppins.className}
              sx={{ fontSize: "18px", fontWeight: "600" }}
            >
              Add Order Status
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="name" required>
                  Name
                </CustomLabel>
                <CustomTextField
                  id="name"
                  placeholder="Enter Name"
                  fullWidth
                  value={inputValues.name}
                  onChange={handleInputChange("name")}
                />
                {errors.name && (
                  <FormHelperText error>{errors.name}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="description" required>
                  Remark
                </CustomLabel>
                <CustomTextField
                  id="description"
                  placeholder="Enter Remark"
                  fullWidth
                  value={inputValues.description}
                  onChange={handleInputChange("description")}
                />
                {errors.description && (
                  <FormHelperText error>{errors.description}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "right" }}>
                <Button
                  onClick={handleSubmit}
                  sx={{
                    backgroundColor: "#405189",
                    color: "white",
                    "&:hover": { backgroundColor: "#334a6c" },
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>

      {/* Order Status List */}
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography
              className={poppins.className}
              sx={{ fontSize: "20px", fontWeight: "600" }}
            >
              Order Status List
            </Typography>
            <Divider sx={{ my: 2 }} />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Remark</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((row, index) => (
                      <TableRow key={row.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleEditClick(row.id)}
                          sx={{ color: "green" }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteClick(row.id)}
                          sx={{ color: "red" }}
                        >
                          <DeleteIcon />
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

      {/* Delete Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Order Status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Order Status?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Order Status</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                value={formData.name}
                onChange={handleFormDataChange("name")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Remark"
                fullWidth
                value={formData.description}
                onChange={handleFormDataChange("description")}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default AddOrderStatus;
