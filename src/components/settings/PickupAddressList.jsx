import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Chip,
  Switch,
  TableHead,
  TableRow,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import { Poppins } from "next/font/google";
import { getToken } from "@/utils/getToken";
import CustomCard from "../CustomCard";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import useGetAllPickupPoint from "@/api-manage/react-query/useGetAllPickupPoint";
import MainApi from "@/api-manage/MainApi";
import axios from "axios"; // Import Axios

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const PickupAddressList = ({ onAddPickup, onEditPickup }) => {
  const { data } = useGetAllPickupPoint();
  const [expandedRow, setExpandedRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    contact_person_name: "",
    contact_number: "",
    contact_email: "",
    complete_address: "",
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleExpand = (id) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setFormData({
      complete_address: row.complete_address,
      contact_person_name: row.contact_person_name,
      contact_number: row.contact_number,
      contact_email: row.contact_email,
      landmark: row.landmark,
      pincode: row.pincode,
      city: row.city,
      state: row.state,
      country: row.country,
      company: row.company,
      branches: row.branches,
    });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    let formErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        formErrors[key] = "This field is required";
      }
    });
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleFormSubmit = async () => {
    if (validateForm()) {
      try {
        const token = getToken();
        if (!token) {
          throw new Error("No authentication token found.");
        }
        const response = await MainApi.put(
          `/api/pick-up-point/${selectedRow.id}/`,
          formData,
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Updated Data: ", response.data);
        setOpenDialog(false);
      } catch (error) {
        console.error("Error updating data: ", error);
      }
    }
  };

  return (
    <Grid container spacing={2} p={1}>
      <Grid item xs={12}>
        <CustomCard>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    className={poppins.className}
                    sx={{ fontSize: "18px", fontWeight: "600" }}
                  >
                    Pick Up Addresses
                  </Typography>
                  <Typography
                    className={poppins.className}
                    sx={{ fontSize: "12px", color: "gray" }}
                  >
                    Manage all your pickup addresses from here
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button>
                    <DownloadRoundedIcon sx={{ color: "black" }} />
                  </Button>
                  <Button>
                    <UploadRoundedIcon sx={{ color: "black" }} />
                  </Button>
                  <Button
                    onClick={onAddPickup}
                    variant="contained"
                    color="primary"
                  >
                    + Add Pickup Address
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className={poppins.className}>SI</TableCell>
                      <TableCell className={poppins.className}>
                        Full Address
                      </TableCell>
                      <TableCell className={poppins.className}>
                        Verification Status
                      </TableCell>
                      <TableCell className={poppins.className}>
                        Status
                      </TableCell>
                      <TableCell className={poppins.className}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.results.map((row, index) => (
                      <React.Fragment key={row.id}>
                        <TableRow>
                          <TableCell>{index + 1}.</TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Typography
                                className={poppins.className}
                                sx={{ fontWeight: "500", fontSize: "13px" }}
                              >
                                {row.nickname}
                              </Typography>
                              {row.is_primary && (
                                <Chip
                                  label="PRIMARY"
                                  sx={{
                                    backgroundColor: "#e4e0f6",
                                    color: "#705cdf",
                                    fontSize: "10px",
                                    ml: 1,
                                  }}
                                  className={poppins.className}
                                />
                              )}
                            </Box>
                            <Typography
                              className={poppins.className}
                              sx={{
                                width: "400px",
                                color: "gray",
                                fontSize: "13px",
                              }}
                              mt={1}
                            >
                              {row.complete_address}, {row.city}, {row.state},{" "}
                              {row.country}, {row.pincode}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Chip
                              className={poppins.className}
                              label={
                                row.is_verified ? "VERIFIED" : "NOT VERIFIED"
                              }
                              color={row.is_verified ? "success" : "error"}
                              sx={{ fontSize: "10px" }}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              className={poppins.className}
                              label={row.status ? "ACTIVE" : "INACTIVE"}
                              color={row.status ? "success" : "default"}
                              sx={{ fontSize: "10px" }}
                            />
                          </TableCell>

                          <TableCell>
                            <Box display="flex" flexDirection="column">
                              <Box display="flex" alignItems="center">
                                <Switch checked={row.status} size="small" />
                                <IconButton
                                  onClick={() => handleEditClick(row)}
                                >
                                  <EditOutlinedIcon />
                                </IconButton>
                                <IconButton
                                  onClick={() => handleToggleExpand(row.id)}
                                >
                                  <VisibilityOutlinedIcon />
                                </IconButton>
                                <IconButton onClick={handleClick}>
                                  <PendingOutlinedIcon />
                                </IconButton>
                              </Box>
                              <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                              >
                                <MenuItem onClick={handleClose}>
                                  Verify Address
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                  Mark as Primary Address
                                </MenuItem>
                              </Menu>
                            </Box>
                          </TableCell>
                        </TableRow>

                        {/* Expanded Row */}
                        {expandedRow === row.id && (
                          <TableRow>
                            <TableCell colSpan={4}>
                              <Box
                                mt={2}
                                p={2}
                                sx={{
                                  border: "1px solid #e0e0e0",
                                  borderRadius: "4px",
                                  width: "100%",
                                }}
                              >
                                <Typography variant="h6" gutterBottom>
                                  Contact Info
                                </Typography>
                                <Box display="flex" flexDirection="row">
                                  <Typography className={poppins.className}>
                                    Name: {row.contact_person_name}
                                  </Typography>
                                  <Typography
                                    className={poppins.className}
                                    ml={2}
                                  >
                                    Phone: {row.contact_number}
                                  </Typography>
                                  <Typography
                                    className={poppins.className}
                                    ml={2}
                                  >
                                    Email: {row.contact_email}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CustomCard>
      </Grid>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Edit Pickup Address</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                margin="dense"
                name="contact_person_name"
                label="Contact Person Name"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.contact_person_name}
                onChange={handleFormChange}
                error={Boolean(errors.contact_person_name)}
                helperText={errors.contact_person_name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                margin="dense"
                name="contact_number"
                label="Contact Number"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.contact_number}
                onChange={handleFormChange}
                error={Boolean(errors.contact_number)}
                helperText={errors.contact_number}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                margin="dense"
                name="contact_email"
                label="Contact Email"
                type="email"
                fullWidth
                variant="outlined"
                value={formData.contact_email}
                onChange={handleFormChange}
                error={Boolean(errors.contact_email)}
                helperText={errors.contact_email}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                margin="dense"
                name="complete_address"
                label="Complete Address"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.complete_address}
                onChange={handleFormChange}
                error={Boolean(errors.complete_address)}
                helperText={errors.complete_address}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                margin="dense"
                name="landmark"
                label="Land Mark"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.landmark}
                onChange={handleFormChange}
                error={Boolean(errors.landmark)}
                helperText={errors.landmark}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                margin="dense"
                name="city"
                label="City"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.city}
                onChange={handleFormChange}
                error={Boolean(errors.city)}
                helperText={errors.city}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                margin="dense"
                name="pincode"
                label="Pin code"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.pincode}
                onChange={handleFormChange}
                error={Boolean(errors.pincode)}
                helperText={errors.pincode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                margin="dense"
                name="state"
                label="State"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.state}
                onChange={handleFormChange}
                error={Boolean(errors.state)}
                helperText={errors.state}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                margin="dense"
                name="country"
                label="Country"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.country}
                onChange={handleFormChange}
                error={Boolean(errors.country)}
                helperText={errors.country}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default PickupAddressList;
