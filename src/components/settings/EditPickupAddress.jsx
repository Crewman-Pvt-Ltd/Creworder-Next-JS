import React, { useState } from "react";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../CustomLabel";
import { Poppins } from "next/font/google";
import {
  Typography,
  Button,
  Grid,
  Checkbox,
  Divider,
  CardContent,
  IconButton,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import CustomCard from "../CustomCard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import useGetAllBranches from "@/api-manage/react-query/useGetAllBranches";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const EditPickupAdress = ({ onPickupList }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [rtoChecked, setRtoChecked] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  const { data } = useGetAllBranches();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
    if (onPickupList) {
      onPickupList();
    }
  };

  const handleToggle = () => {
    setIsVisible((prev) => !prev);
  };

  const handleCheckboxRtoChange = (event) => {
    setRtoChecked(event.target.checked);
  };

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const addressOptions = [
    { value: "address1", label: "Address 1" },
    { value: "address2", label: "Address 2" },
    { value: "address3", label: "Address 3" },
  ];

  return (
    
        <CustomCard>
          <CardContent>
            <Typography
              className={poppins.className}
              sx={{ fontSize: "16px", fontWeight: "600", mb: 2 }}
            >
              Edit Pick Up Address
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Grid item xs={12} sm={3} md={3}>
              <CustomLabel>Select Branch</CustomLabel>
              <FormControl fullWidth>
                <Select
                  id="select_branch"
                  name="select_branch"
                  value={selectedBranch}
                  onChange={handleBranchChange}
                  sx={{ height: "35px" }}
                >
                  {data?.results?.map((branch) => (
                    <MenuItem key={branch.id} value={branch.name}>
                      {branch.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Typography
              className={poppins.className}
              sx={{ fontSize: "14px", fontWeight: "500" }}
              mb={1}
            >
              Contact information for this location
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <CustomLabel htmlFor="contact_person" required>
                  Contact Person
                </CustomLabel>
                <CustomTextField
                  id="contact_person"
                  name="contact_person"
                  type="text"
                  placeholder="Enter contact person name"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
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
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomLabel htmlFor="email_address" required>
                  Email Address
                </CustomLabel>
                <CustomTextField
                  id="email_address"
                  name="email_address"
                  type="email"
                  placeholder="Enter email address"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomLabel htmlFor="alternate_phone">
                  Alternate Phone No. (Optional)
                </CustomLabel>
                <CustomTextField
                  id="alternate_phone"
                  name="alternate_phone"
                  type="text"
                  placeholder="Enter 10 digit mobile number"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  className={poppins.className}
                  sx={{ fontSize: "14px", fontWeight: "500" }}
                >
                  How can the delivery person reach the address?
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="complete_address">
                  Complete Address
                </CustomLabel>
                <CustomTextField
                  id="complete_address"
                  name="complete_address"
                  type="text"
                  placeholder="House/Floor No., Building Name or Street, Locality"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="landmark">Landmark</CustomLabel>
                <CustomTextField
                  id="landmark"
                  name="landmark"
                  type="text"
                  placeholder="Any nearby post office, market, hospital as the landmark"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomLabel htmlFor="pincode">Pincode</CustomLabel>
                <CustomTextField
                  id="pincode"
                  name="pincode"
                  type="text"
                  placeholder="Add pincode"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomLabel htmlFor="city">City</CustomLabel>
                <CustomTextField
                  id="city"
                  name="city"
                  type="text"
                  placeholder="City"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomLabel htmlFor="state">State</CustomLabel>
                <CustomTextField
                  id="state"
                  name="state"
                  type="text"
                  placeholder="State"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomLabel htmlFor="country">Country</CustomLabel>
                <CustomTextField
                  id="country"
                  name="country"
                  type="text"
                  placeholder="Country"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>
              <Grid item xs={12}>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#405189",
                        fontWeight: "500",
                        cursor: "pointer",
                      }}
                      className={poppins.className}
                      onClick={handleToggle}
                    >
                      {isVisible ? "- Remove RTO Address" : "+ Add RTO Address"}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={handleToggle}>
                      {isVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              {isVisible && (
                <Grid
                  container
                  spacing={2}
                  m={1}
                  sx={{ backgroundColor: "#fafafa", borderRadius: "4px" }}
                >
                  <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={6} display="flex">
                        <Checkbox
                          checked={rtoChecked}
                          onChange={handleCheckboxRtoChange}
                        />
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#000",
                            fontWeight: "500",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          Use a different RTO Address
                        </Typography>
                      </Grid>
                      {rtoChecked && (
                        <Grid item xs={12} sm={6} pr={1} mt={1}>
                          <Grid container direction="column" spacing={2}>
                            <Grid item xs={12}>
                              <CustomLabel htmlFor="select_address">
                                Select Address
                              </CustomLabel>
                              <FormControl fullWidth>
                                <Select
                                  id="select_address"
                                  name="select_address"
                                  value={selectedAddress}
                                  onChange={handleAddressChange}
                                  sx={{ height: "35px" }}
                                >
                                  {addressOptions.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                              <CustomLabel htmlFor="rto_complete_address">
                                Complete RTO Address
                              </CustomLabel>
                              <CustomTextField
                                id="rto_complete_address"
                                name="rto_complete_address"
                                type="text"
                                placeholder="RTO House/Floor No., Building Name or Street, Locality"
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <CustomLabel htmlFor="rto_landmark">RTO Landmark</CustomLabel>
                              <CustomTextField
                                id="rto_landmark"
                                name="rto_landmark"
                                type="text"
                                placeholder="Any nearby post office, market, hospital as the RTO landmark"
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Button
                                variant="contained"
                                onClick={handleSubmit}
                                sx={{ mt: 2 }}
                              >
                                Submit
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </CustomCard>
     
  );
};

export default EditPickupAdress;
