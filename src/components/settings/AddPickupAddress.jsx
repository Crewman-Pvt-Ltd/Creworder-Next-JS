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
import { getToken } from "@/utils/getToken";
import { usePermissions } from "@/contexts/PermissionsContext";
import { useRouter } from "next/router";
import MainApi from "@/api-manage/MainApi";
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const AddPickupAddress = ({ onPickupList }) => {
  const router = useRouter();
  const token = getToken();
  const { permissionsData } = usePermissions();
  const [isVisible, setIsVisible] = useState(false);
  const [rtoChecked, setRtoChecked] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const { data } = useGetAllBranches();

  // Corrected useState for formData
  const [formData, setFormData] = useState({
    created_by: permissionsData.user.id,
    contact_person_name: "",
    contact_number: "",
    contact_email: "",
    alternate_contact_number: "",
    complete_address: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    is_verified: "0",
    created_at: "",
    status: "0",
    country: "",
    updated_at: "",
    company: 2,
    branches: [6],
    
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });
  
    try {
      const response = await MainApi.post("/api/pick-up-point/", form, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
  
      if (response.status === 201) {
        router.push("/admin/settings");
        window.location.reload();
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography
              className={poppins.className}
              sx={{ fontSize: "16px", fontWeight: "600", mb: 2 }}
            >
              Add New Pick Up Address
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
                <CustomLabel htmlFor="contact_person_name" required>
                  Contact Person
                </CustomLabel>
                <CustomTextField
                  id="contact_person_name"
                  name="contact_person_name"
                  type="text"
                  value={formData.contact_person_name}
                  onChange={handleInputChange}
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
                  value={formData.contact_number}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomLabel htmlFor="contact_email" required>
                  Email Address
                </CustomLabel>
                <CustomTextField
                  id="contact_email"
                  name="contact_email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.contact_email}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomLabel htmlFor="alternate_contact_number">
                  Alternate Phone No. (Optional)
                </CustomLabel>
                <CustomTextField
                  id="alternate_contact_number"
                  name="alternate_contact_number"
                  type="text"
                  placeholder="Enter 10 digit mobile number"
                  value={formData.alternate_contact_number}
                  onChange={handleInputChange}
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
                  value={formData.complete_address}
                  onChange={handleInputChange}
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
                  value={formData.landmark}
                  onChange={handleInputChange}
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
                  value={formData.pincode}
                  onChange={handleInputChange}
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
                  value={formData.city}
                  onChange={handleInputChange}
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
                  value={formData.state}
                  onChange={handleInputChange}
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
                  value={formData.country}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>
              {/* <Grid item xs={12}>
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
              </Grid> */}

              {/* {isVisible && (
                <>
                  <Grid item xs={12} sm={6}>
                    <CustomLabel htmlFor="rto_complete_address">
                      RTO Complete Address
                    </CustomLabel>
                    <CustomTextField
                      id="rto_complete_address"
                      name="rto_complete_address"
                      type="text"
                      placeholder="Enter complete RTO address"
                      value={formData.rto_complete_address}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomLabel htmlFor="rto_pincode">RTO Pincode</CustomLabel>
                    <CustomTextField
                      id="rto_pincode"
                      name="rto_pincode"
                      type="text"
                      placeholder="Add RTO pincode"
                      value={formData.rto_pincode}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                </>
              )} */}
              {/* <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid> */}
              <Grid container spacing={2} justifyContent="flex-end" mt={2}>
                <Grid item>
                  <Button variant="outlined" onClick={onPickupList}>
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleSubmit}>
                    Verify and Save Address
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default AddPickupAddress;
