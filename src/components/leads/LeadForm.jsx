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

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleToggleChange = (field) => (event) => {
    setFields({ ...fields, [field]: event.target.checked });
  };

  const handleInputChange = (field) => (event) => {
    setInputValues({ ...inputValues, [field]: event.target.value });
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      console.log("Form submitted successfully with data: ", inputValues);
    }
  };

  // Generate the JSON format for enabled fields
  const generateJson = () => {
    const enabledFields = [];
    for (let key in fields) {
      if (fields[key]) {
        enabledFields.push(key.replace("Enabled", ""));
      }
    }
    return { fields: enabledFields };
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
                <TextField
                  label="Product"
                  variant="outlined"
                  fullWidth
                  value={inputValues.product}
                  onChange={handleInputChange("product")}
                  error={!!errors.product}
                  helperText={errors.product}
                />
              </Grid>
            )}
            {fields.sourceEnabled && (
              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.source}>
                  <InputLabel>Source</InputLabel>
                  <Select
                    value={inputValues.source}
                    onChange={handleInputChange("source")}
                  >
                    <MenuItem value="Web">Web</MenuItem>
                    <MenuItem value="Mobile">Mobile</MenuItem>
                    <MenuItem value="Referral">Referral</MenuItem>
                  </Select>
                  <FormHelperText>{errors.source}</FormHelperText>
                </FormControl>
              </Grid>
            )}
          </Grid>

          <Box
            sx={{
              marginTop: "20px",
              padding: "20px",
              borderRadius: "5px",
              backgroundColor: "#f1f1f1",
            }}
          >
            <Typography variant="h6" component="h3">
              Form Data (JSON format):
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#333" }}>
              {JSON.stringify(generateJson(), null, 2)}
            </Typography>
          </Box>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default LeadForm;
