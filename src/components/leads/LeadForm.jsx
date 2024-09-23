import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Switch,
  TextField,
  FormControlLabel,
  Paper,
  Button,
  Typography,
  Select,
  MenuItem,
  FormHelperText,
  IconButton,
  Box,
  InputLabel,
  FormControl,
  TableFooter,
  TablePagination,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import CustomTextField from "@/components/CustomTextField";
import CustomCard from "../CustomCard";
const LeadForm = () => {
  // State for enabling/disabling input fields
  const [fields, setFields] = useState({
    nameEnabled: true,
    emailEnabled: false,
    phoneEnabled: true,
    addressEnabled: false,
    pincodeEnabled: false,
    cityEnabled: false,
    stateEnabled: false,
    messageEnabled: false,
    productEnabled: false,
    sourceEnabled: false,
  });

  // State for holding input values
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
    message: "",
    product: "",
    source: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // State for status selection
  const [status, setStatus] = useState("");

  // Toggle switch handler to show/hide input fields
  const handleToggleChange = (field) => (event) => {
    setFields({ ...fields, [field]: event.target.checked });
  };

  // Input change handler to capture user input
  const handleInputChange = (field) => (event) => {
    setInputValues({ ...inputValues, [field]: event.target.value });
  };

  // Handle change for status selection
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  // Validate form inputs
  const validateForm = () => {
    let formErrors = {};
    if (fields.nameEnabled && !inputValues.name)
      formErrors.name = "Name is required";
    if (fields.emailEnabled && !inputValues.email)
      formErrors.email = "Email is required";
    if (fields.phoneEnabled && !inputValues.phone)
      formErrors.phone = "Phone is required";
    if (fields.addressEnabled && !inputValues.address)
      formErrors.address = "Address is required";
    if (fields.pincodeEnabled && !inputValues.pincode)
      formErrors.pincode = "Pincode is required";
    if (fields.cityEnabled && !inputValues.city)
      formErrors.city = "City is required";
    if (fields.stateEnabled && !inputValues.state)
      formErrors.state = "State is required";
    if (fields.messageEnabled && !inputValues.message)
      formErrors.message = "Message is required";
    if (fields.productEnabled && !inputValues.product)
      formErrors.product = "Product is required";
    if (fields.sourceEnabled && !inputValues.source)
      formErrors.source = "Source is required";
    return formErrors;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      // Process form data here (e.g., API call)
      console.log("Form submitted successfully with data: ", inputValues);
    }
  };

  return (
    <Grid container spacing={3} padding={3}>
      <Grid item xs={12} md={6}>
        <CustomCard padding="27px">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Si.</b>
                  </TableCell>
                  <TableCell>
                    <b>Name</b>
                  </TableCell>
                  <TableCell>
                    <b>Status</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { id: 1, label: "Name", key: "nameEnabled" },
                  { id: 2, label: "Email", key: "emailEnabled" },
                  { id: 3, label: "Phone", key: "phoneEnabled" },
                  { id: 4, label: "Address", key: "addressEnabled" },
                  { id: 5, label: "Pin Code", key: "pincodeEnabled" },
                  { id: 6, label: "City", key: "cityEnabled" },
                  { id: 7, label: "State", key: "stateEnabled" },
                  { id: 8, label: "Message", key: "messageEnabled" },
                  { id: 9, label: "Product", key: "productEnabled" },
                  { id: 10, label: "Source", key: "sourceEnabled" },
                ].map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}.</TableCell>
                    <TableCell>{row.label}</TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={fields[row.key]}
                            onChange={handleToggleChange(row.key)}
                            color="primary"
                          />
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomCard>
      </Grid>

      {/* Preview Section */}
      <Grid item xs={12} md={6}>
        <CustomCard padding="20px">
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "20px",
              whiteSpace: "nowrap",
              textTransform: "capitalize",
              color: "black",
              marginBottom: "20px",
            }}
          >
            Preview
          </Typography>

          {/* Display Input Fields based on Toggle */}
          <Grid container spacing={2}>
            {fields.nameEnabled && (
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={inputValues.name}
                  onChange={handleInputChange("name")}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
            )}
            {fields.emailEnabled && (
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  type="email"
                  fullWidth
                  value={inputValues.email}
                  onChange={handleInputChange("email")}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
            )}
            {fields.phoneEnabled && (
              <Grid item xs={12}>
                <TextField
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  value={inputValues.phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value) && value.length <= 10) {
                      handleInputChange("phone")(e);
                    }
                  }}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  inputProps={{
                    type: "text",
                    maxLength: 10,
                  }}
                />
              </Grid>
            )}

            {fields.addressEnabled && (
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  value={inputValues.address}
                  onChange={handleInputChange("address")}
                  error={!!errors.address}
                  helperText={errors.address}
                />
              </Grid>
            )}
            {fields.pincodeEnabled && (
              <Grid item xs={12}>
                <TextField
                  label="Postal Code"
                  variant="outlined"
                  fullWidth
                  value={inputValues.pincode}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value) && value.length <= 6) {
                      handleInputChange("pincode")(e);
                    }
                  }}
                  error={!!errors.pincode}
                  helperText={errors.pincode}
                  inputProps={{
                    type: "text",
                    maxLength: 6,
                  }}
                />
              </Grid>
            )}
            {fields.cityEnabled && (
              <Grid item xs={12}>
                <TextField
                  label="City"
                  variant="outlined"
                  fullWidth
                  value={inputValues.city}
                  onChange={handleInputChange("city")}
                  error={!!errors.city}
                  helperText={errors.city}
                />
              </Grid>
            )}
            {fields.stateEnabled && (
              <Grid item xs={12}>
                <TextField
                  label="State"
                  variant="outlined"
                  fullWidth
                  value={inputValues.state}
                  onChange={handleInputChange("state")}
                  error={!!errors.state}
                  helperText={errors.state}
                />
              </Grid>
            )}
            {fields.messageEnabled && (
              <Grid item xs={12}>
                <CustomTextField
                  label="Message"
                  variant="outlined"
                  fullWidth
                  value={inputValues.message}
                  onChange={handleInputChange("message")}
                  multiline
                  rows={4}
                  error={!!errors.message}
                  helperText={errors.message}
                />
              </Grid>
            )}
            {fields.productEnabled && (
             <Grid item xs={12}>
             <Select
               labelId="product-select-label"
               id="product"
               name="product"
               value={inputValues.product}
               onChange={handleInputChange("product")}
               displayEmpty
               fullWidth
               sx={{ fontFamily: "Poppins, sans-serif", height: "55px" }}
               MenuProps={{
                 PaperProps: {
                   style: {
                     maxHeight: 200, // Adjust the dropdown's max height
                     overflowY: 'auto', // Enable vertical scrolling
                   },
                 },
               }}
             >
               <MenuItem value="" disabled>
                 Select Product
               </MenuItem>
               <MenuItem value="1">Weight Loss</MenuItem>
               <MenuItem value="2">Weight Gain</MenuItem>
               <MenuItem value="3">Muscle Building</MenuItem>
               <MenuItem value="4">Energy Boost</MenuItem>
               <MenuItem value="5">Vitamins & Supplements</MenuItem>
               <MenuItem value="6">Protein Powders</MenuItem>
             </Select>
             {errors.product && (
               <FormHelperText>{errors.product}</FormHelperText>
             )}
           </Grid>
           
            )}
            {fields.sourceEnabled && (
            <Grid item xs={12} error={!!errors.source}>
            <Select
              labelId="source-select-label"
              id="source"
              value={inputValues.source}
              onChange={handleInputChange("source")}
              displayEmpty
              fullWidth
              sx={{ fontFamily: "Poppins, sans-serif", height: "55px" }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200, // Adjust this to control the dropdown height
                    overflowY: 'auto', // Enable vertical scrolling
                  },
                },
              }}
            >
              <MenuItem value="" disabled>
                Select Lead Source
              </MenuItem>
              <MenuItem value="1">Facebook</MenuItem>
              <MenuItem value="2">Instagram</MenuItem>
              <MenuItem value="3">Google</MenuItem>
              <MenuItem value="4">Youtube</MenuItem>
              <MenuItem value="5">LinkedIn</MenuItem>
              <MenuItem value="6">Twitter</MenuItem>
              <MenuItem value="7">Snapchat</MenuItem>
              <MenuItem value="8">Pinterest</MenuItem>
            </Select>
            {errors.source && (
              <FormHelperText>{errors.source}</FormHelperText>
            )}
          </Grid>
          
            )}
          </Grid>

          <Button
            onClick={handleSubmit}
            sx={{
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: "bold",
              backgroundColor: "#405189",
              color: "white",
              marginTop: "20px",
              "&:hover": {
                backgroundColor: "#334a6c",
              },
            }}
          >
            Save
          </Button>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default LeadForm;
