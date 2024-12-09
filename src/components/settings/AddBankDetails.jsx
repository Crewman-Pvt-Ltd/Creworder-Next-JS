import React, { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Button,
  MenuItem,
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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import swal from "sweetalert"; // Import SweetAlert
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";
import { usePermissions } from "@/contexts/PermissionsContext";

const AddBankDetails = () => {
  const [inputValues, setInputValues] = useState({
    account_number: "",
    reenter_account_no: "",
    account_type: "",
    account_holder_name: "",
    ifsc_code: "",
    bank_name: "",
    branch_name: "",
    priority: "",
  });
  const [errors, setErrors] = useState({});
  const [bankDetails, setBankDetails] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [bankDetailToDelete, setBankDetailToDelete] = useState(null);

  const { permissionsData } = usePermissions();

  const handleInputChange = (field) => (event) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [field]: event.target.value,
    }));
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!inputValues.account_number)
      tempErrors.account_number = "Account number is required.";
    if (!inputValues.reenter_account_no)
      tempErrors.reenter_account_no = "Re-entering account number is required.";
    if (inputValues.account_number !== inputValues.reenter_account_no)
      tempErrors.reenter_account_no = "Account numbers do not match.";
    if (!inputValues.account_type)
      tempErrors.account_type = "Account type is required.";
    if (!inputValues.account_holder_name)
      tempErrors.account_holder_name = "Account holder name is required.";
    if (!inputValues.ifsc_code) tempErrors.ifsc_code = "IFSC code is required.";
    if (!inputValues.bank_name) tempErrors.bank_name = "Bank name is required.";
    if (!inputValues.branch_name)
      tempErrors.branch_name = "Branch name is required.";
    if (!inputValues.priority) tempErrors.priority = "Priority is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      account_number: inputValues.account_number,
      re_account_number: inputValues.reenter_account_no,
      account_type: inputValues.account_type,
      ifsc_code: inputValues.ifsc_code,
      bank_name: inputValues.bank_name,
      account_holder_name: inputValues.account_holder_name,
      branch_name: inputValues.branch_name,
      priority: inputValues.priority,
      user: permissionsData?.user?.id,
      branch: permissionsData?.user?.profile?.branch,
      company: permissionsData?.user?.profile?.company,
    };

    try {
      const token = getToken();
      if (editMode) {
        await MainApi.put(`/api/admin-bank-details/${editId}/`, payload, {
          headers: { Authorization: `Token ${token}` },
        });
        swal({
          title: "Bank Details Updated",
          text: "Successfully updated bank details!",
          icon: "success",
          button: "Ok",
        });
        setEditMode(false);
        setEditId(null);
      } else {
        await MainApi.post("/api/admin-bank-details/", payload, {
          headers: { Authorization: `Token ${token}` },
        });
        swal({
          title: "Bank Details Added",
          text: "Successfully added new bank details!",
          icon: "success",
          button: "Ok",
        });
      }
      fetchBankDetails();
      setInputValues({
        account_number: "",
        reenter_account_no: "",
        account_type: "",
        account_holder_name: "",
        ifsc_code: "",
        bank_name: "",
        branch_name: "",
        priority: "",
      });
    } catch (error) {
      swal({
        title: "Action Failed",
        text: "Failed to save bank details!",
        icon: "error",
        button: "Ok",
      });
      console.error("An error occurred while saving bank details:", error);
    }
  };

  const fetchBankDetails = async () => {
    try {
      const token = getToken();
      const response = await MainApi.get("/api/admin-bank-details/", {
        headers: { Authorization: `Token ${token}` },
      });
      setBankDetails(response.data.results);
    } catch (error) {
      console.error("Failed to fetch bank details:", error);
    }
  };

  const handleEditClick = (id, detail) => {
    setInputValues({
      account_number: detail.account_number,
      reenter_account_no: detail.re_account_number,
      account_type: detail.account_type,
      account_holder_name: detail.account_holder_name,
      ifsc_code: detail.ifsc_code,
      bank_name: detail.bank_name,
      branch_name: detail.branch_name,
      priority: detail.priority,
    });
    setEditMode(true);
    setEditId(id);
  };

  const handleDeleteClick = (id) => {
    setBankDetailToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = getToken();
      await MainApi.delete(`/api/admin-bank-details/${bankDetailToDelete}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      fetchBankDetails();
      swal({
        title: "Bank Details Deleted",
        text: "Successfully deleted bank details!",
        icon: "success",
        button: "Ok",
      });
      setOpenDeleteDialog(false);
      setBankDetailToDelete(null);
    } catch (error) {
      swal({
        title: "Action Failed",
        text: "Failed to delete bank details!",
        icon: "error",
        button: "Ok",
      });
      console.error("Failed to delete bank details:", error);
    }
  };

  React.useEffect(() => {
    fetchBankDetails();
  }, []);


  return (
    <Grid container spacing={2}>
      {/* Add Bank Details Form */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">
             <b> {editMode ? "Edit Bank Details" : "Add Bank Details"}</b>
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Account Number"
                    value={inputValues.account_number}
                    onChange={handleInputChange("account_number")}
                    error={!!errors.account_number}
                    helperText={errors.account_number}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Re-enter Account Number"
                    value={inputValues.reenter_account_no}
                    onChange={handleInputChange("reenter_account_no")}
                    error={!!errors.reenter_account_no}
                    helperText={errors.reenter_account_no}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    select
                    label="Account Type"
                    value={inputValues.account_type}
                    onChange={handleInputChange("account_type")}
                    error={!!errors.account_type}
                    helperText={errors.account_type}
                    fullWidth
                    required
                  >
                    <MenuItem value="saving_account">Saving Account</MenuItem>
                    <MenuItem value="current_account">Current Account</MenuItem>
                    <MenuItem value="salary_account">Salary Account</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Account Holder Name"
                    value={inputValues.account_holder_name}
                    onChange={handleInputChange("account_holder_name")}
                    error={!!errors.account_holder_name}
                    helperText={errors.account_holder_name}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="IFSC Code"
                    value={inputValues.ifsc_code}
                    onChange={handleInputChange("ifsc_code")}
                    error={!!errors.ifsc_code}
                    helperText={errors.ifsc_code}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Bank Name"
                    value={inputValues.bank_name}
                    onChange={handleInputChange("bank_name")}
                    error={!!errors.bank_name}
                    helperText={errors.bank_name}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Branch Name"
                    value={inputValues.branch_name}
                    onChange={handleInputChange("branch_name")}
                    error={!!errors.branch_name}
                    helperText={errors.branch_name}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    select
                    label="Priority"
                    value={inputValues.priority}
                    onChange={handleInputChange("priority")}
                    error={!!errors.priority}
                    helperText={errors.priority}
                    fullWidth
                    required
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                {editMode ? "Update" : "Save"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>

      {/* Bank Details Table */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">
              <b>Bank Details</b>
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Account No.</TableCell>
                    <TableCell>Account Type</TableCell>
                    <TableCell>IFSC Code</TableCell>
                    <TableCell>Bank Name</TableCell>
                    <TableCell>Branch Name</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bankDetails.map((detail) => (
                    <TableRow key={detail.id}>
                      <TableCell>{detail.account_number}</TableCell>
                      <TableCell>{detail.account_type}</TableCell>
                      <TableCell>{detail.ifsc_code}</TableCell>
                      <TableCell>{detail.bank_name}</TableCell>
                      <TableCell>{detail.branch_name}</TableCell>
                      <TableCell>{detail.priority}</TableCell>
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
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this bank detail?
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

export default AddBankDetails;
