import CustomCard from "../CustomCard";
import {
  Grid,
  Typography,
  Button,
  MenuItem,
  Box,
  IconButton,
  Menu,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Chip,
  Switch,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { Poppins } from "next/font/google";
import SearchBar from "../SearchBar";
import CustomTextField from "../CustomTextField";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const PickupAddressList = ({ onAddPickup, onEditPickup }) => {
  const [selectedValue, setSelectedValue] = useState(10);
  const [verificationStatus, setVerificationStatus] = useState("");
  const [addressStatus, setAddressStatus] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleVerificationChange = (event) => {
    setVerificationStatus(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddressStatus(event.target.value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
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
            <Grid item xs={12} sm={12} md={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <CustomTextField
                    labelId="dropdown-label"
                    value={selectedValue}
                    onChange={handleChange}
                    sx={{ height: "40px", fontSize: "12px" }}
                    className={poppins.className}
                    select
                  >
                    <MenuItem value={10}>Phone Number</MenuItem>
                    <MenuItem value={20}>City</MenuItem>
                    <MenuItem value={30}>Pincode</MenuItem>
                  </CustomTextField>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <SearchBar />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <CustomTextField
                    id="verification"
                    name="verification"
                    select
                    fullWidth
                    value={verificationStatus}
                    onChange={handleVerificationChange}
                    className={poppins.className}
                  >
                    <MenuItem value="Select verification" disabled>
                      Select verification
                    </MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="verified">Verified</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                  </CustomTextField>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <CustomTextField
                    id="address"
                    name="address"
                    select
                    fullWidth
                    value={addressStatus}
                    onChange={handleAddressChange}
                    className={poppins.className}
                  >
                    <MenuItem value="Select address" disabled>
                      Select Address
                    </MenuItem>
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="srf">SRF</MenuItem>
                  </CustomTextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} mt={2}>
              <TableContainer >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className={poppins.className}>
                        Address Nickname
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
                    <TableRow>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Typography
                            className={poppins.className}
                            sx={{
                              fontWeight: "500",
                              fontSize: "13px",
                            }}
                          >
                            Primary
                          </Typography>
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
                          H-211 Sector 63, Gautam Buddha Nagar, Uttar Pradesh,
                          India, 201301
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Chip
                          className={poppins.className}
                          label="VERIFIED"
                          color="success"
                          sx={{ fontSize: "10px" }}
                        />
                      </TableCell>

                      <TableCell>
                        <Chip
                          className={poppins.className}
                          label="ACTIVE"
                          color="success"
                          sx={{ fontSize: "10px" }}
                        />
                      </TableCell>

                      <TableCell>
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="flex-start"
                        >
                          <Box display="flex" alignItems="center">
                            <Switch defaultChecked size="small" />
                            <IconButton onClick={handleClick}>
                              <PendingOutlinedIcon />
                            </IconButton>
                          </Box>

                          <Button
                            className={poppins.className}
                            sx={{ color: "#7e57c2", mt: 1 }}
                            onClick={handleToggleExpand}
                          >
                            View More
                          </Button>

                          <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                          >
                            <MenuItem onClick={onEditPickup}>Edit</MenuItem>
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
                  </TableBody>
                </Table>
              </TableContainer>

              {isExpanded && (
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
                  <Box
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    mb={1}
                  >
                    <Box sx={{ mr: 2, flex: 1 }}>
                      <Typography
                        className={poppins.className}
                        sx={{
                          fontWeight: "500",
                          fontSize: "12px",
                          color: "#000", 
                        }}
                      >
                        Name:
                        <br />
                        <span style={{ color: "#9e9e9e" }}>Crewman</span>
                      </Typography>
                    </Box>
                    <Box sx={{ mr: 2, flex: 1 }}>
                      <Typography
                        className={poppins.className}
                        sx={{
                          fontWeight: "500",
                          fontSize: "12px",
                          color: "#000",
                        }}
                      >
                        Phone:
                        <br />
                        <span style={{ color: "#9e9e9e" }}>9529076777</span>
                      </Typography>
                    </Box>
                    <Box sx={{ mr: 2, flex: 1 }}>
                      <Typography
                        className={poppins.className}
                        sx={{
                          fontWeight: "500",
                          fontSize: "12px",
                          color: "#000", 
                        }}
                      >
                        Email:
                        <br />
                        <span style={{ color: "#9e9e9e" }}>
                          crewman@gmail.com
                        </span>
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        className={poppins.className}
                        sx={{
                          fontWeight: "500",
                          fontSize: "12px",
                          color: "#000",
                        }}
                      >
                        Location Id:
                        <br />
                        <span style={{ color: "#9e9e9e" }}>3458173</span>
                      </Typography>
                    </Box>
                  </Box>
                  <Divider />
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Typography
                      className={poppins.className}
                      sx={{
                        fontWeight: "500",
                        fontSize: "12px",
                        color: "#000", 
                        marginRight: "16px", 
                      }}
                    >
                      The associated RTO address is the same as the pickup
                      address
                    </Typography>
                    <Button variant="outlined" color="primary">
                      Send Pickup and RTO Updates
                    </Button>
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default PickupAddressList;
