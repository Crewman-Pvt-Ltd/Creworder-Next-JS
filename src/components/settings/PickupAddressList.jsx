import CustomCard from "../CustomCard";
import {
  Grid,
  Typography,
  Button,
  MenuItem,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Chip,
  Switch,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { Poppins } from "next/font/google";
import SearchBar from "../SearchBar";
import CustomLabel from "../CustomLabel";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import CustomTextField from "../CustomTextField";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const PickupAddressList = ({ onAddPickup }) => {
  const [selectedValue, setSelectedValue] = useState(10);
  const [verificationStatus, setVerificationStatus] = useState("");
  const [addressStatus, setAddressStatus] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleVerificationChange = (event) => {
    setVerificationStatus(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddressStatus(event.target.value);
  };
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
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
              <TableContainer>
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
                            // fontWeight:"500",
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
                            <PendingOutlinedIcon />
                          </Box>
                          <Button
                            className={poppins.className}
                            sx={{ color: "#7e57c2", mt: 1 }}
                          >
                            View More
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default PickupAddressList;
