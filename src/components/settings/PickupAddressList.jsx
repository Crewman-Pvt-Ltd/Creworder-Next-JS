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
  DialogContent,
  DialogActions,
  DialogTitle,
  IconButton,
  Dialog,
  MenuItem,
} from "@mui/material";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import { Poppins } from "next/font/google";
import CustomCard from "../CustomCard";
import useGetAllPickupPoint from "@/api-manage/react-query/useGetAllPickupPoint";
import CustomLabel from "../CustomLabel";
import CustomTextField from "../CustomTextField";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const PickupAddressList = ({ onAddPickup }) => {
  const { data, refetch } = useGetAllPickupPoint(); // Use refetch to refresh data
  const [expandedRow, setExpandedRow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPickup, setCurrentPickup] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [pickupPointToEdit, setPickupPointToEdit] = useState(null);
  const [formData, setFormData] = useState({ contact_person_name: "", contact_number: "" });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleExpand = (id) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  const handleEditClick = (pickupId) => {
    const pickup = data.results.find((item) => item.id === pickupId);
    setCurrentPickup(pickup);
    setPickupPointToEdit(pickupId); 
    setFormData({
      contact_person_name: pickup.contact_person_name,
      contact_number: pickup.contact_number,
    });
    setOpenEdit(true);
    handleClose();
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    setPickupPointToEdit(null);
    setFormData({ contact_person_name: "", contact_number: "" }); // Reset form data
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

      const response = await MainApi.patch(`/api/pick-up-point/${pickupPointToEdit}/`, formData, {
        headers: { Authorization: `Token ${token}` },
      });

      if (response.status === 200) {
        console.log("Pick-up point updated successfully");
        refetch(); 
        handleEditClose();
      } else {
        console.error("Failed to update pick-up-point");
      }
    } catch (error) {
      console.error("An error occurred while updating the pick-up-point:", error);
    }
  };

  const handleSwitchChange = (rowId) => {

    console.log(`Switch toggled for row: ${rowId}`);
  };

  return (
    <Grid container spacing={2} p={1}>
      <Grid item xs={12}>
        <CustomCard>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography className={poppins.className} sx={{ fontSize: "18px", fontWeight: "600" }}>
                    Pick Up Addresses
                  </Typography>
                  <Typography className={poppins.className} sx={{ fontSize: "12px", color: "gray" }}>
                    Manage all your pickup addresses from here
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button>
                    <DownloadRoundedIcon sx={{ color: "black" }} />
                  </Button>
                  <Button>
                    <UploadRoundedIcon sx={{ color: "black" }} />
                  </Button>
                  <Button onClick={onAddPickup} variant="contained" color="primary">
                    + Add Pickup Address
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className={poppins.className}>Address Nickname</TableCell>
                      <TableCell className={poppins.className}>Verification Status</TableCell>
                      <TableCell className={poppins.className}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.results.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Typography className={poppins.className} sx={{ fontWeight: "500", fontSize: "13px" }}>
                              {row.nickname}
                            </Typography>
                            {row.is_primary && (
                              <Chip
                                label="PRIMARY"
                                sx={{ backgroundColor: "#e4e0f6", color: "#705cdf", fontSize: "10px", ml: 1 }}
                                className={poppins.className}
                              />
                            )}
                          </Box>
                          <Typography className={poppins.className} sx={{ width: "400px", color: "gray", fontSize: "13px" }} mt={1}>
                            {row.complete_address}, {row.city}, {row.state}, {row.country}, {row.pincode}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Chip
                            className={poppins.className}
                            label={row.is_verified ? "VERIFIED" : "NOT VERIFIED"}
                            color={row.is_verified ? "success" : "error"}
                            sx={{ fontSize: "10px" }}
                          />
                        </TableCell>

                        <TableCell>
                          <Box display="flex" flexDirection="column">
                            <Box display="flex" alignItems="center">
                              <Switch
                                checked={row.status}
                                size="small"
                                onChange={() => handleSwitchChange(row.id)} // Add handler for switch change
                              />
                              <IconButton onClick={handleClick}>
                                <PendingOutlinedIcon />
                              </IconButton>
                            </Box>

                            <Button
                              className={poppins.className}
                              sx={{ color: "#7e57c2", mt: 1 }}
                              onClick={() => handleToggleExpand(row.id)}
                            >
                              {expandedRow === row.id ? "View Less" : "View More"}
                            </Button>

                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                              <MenuItem onClick={() => handleEditClick(row.id)} aria-label="edit">
                                Edit
                              </MenuItem>
                              <MenuItem onClick={handleClose}>Verify Address</MenuItem>
                              <MenuItem onClick={handleClose}>Mark as Primary Address</MenuItem>
                            </Menu>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>

          <Dialog open={openEdit} onClose={handleEditClose} fullWidth maxWidth="md" sx={{ overflowY: "scroll" }}>
            <DialogTitle>Edit Pickup Point</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <CustomLabel htmlFor="contact_person" required>
                    Contact Person
                  </CustomLabel>
                  <CustomTextField
                    id="contact_person"
                    name="contact_person_name"
                    type="text"
                    placeholder="Enter contact person name"
                    required
                    fullWidth
                    value={formData.contact_person_name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomLabel htmlFor="contact_number" required>
                    Contact Number
                  </CustomLabel>
                  <CustomTextField
                    id="contact_number"
                    name="contact_number"
                    type="text"
                    placeholder="Enter contact number"
                    required
                    fullWidth
                    value={formData.contact_number}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleEditSave} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default PickupAddressList;
