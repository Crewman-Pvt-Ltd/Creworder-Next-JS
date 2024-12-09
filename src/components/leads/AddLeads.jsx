import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  Box,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  Switch,
} from "@mui/material";
import { TextField } from "@mui/material";
import CustomCard from "../CustomCard";
import CustomTextField from "@/components/CustomTextField";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadFileIcon from "@mui/icons-material/Download";
const AddLeads = () => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const sampleFileUrl = "C:/Users/dell/Desktop/Frontend Creworder/Creworder-Next-JS/src/images/sample.csv";

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

  // Input change handler to capture user input
  const handleInputChange = (field) => (event) => {
    setInputValues({ ...inputValues, [field]: event.target.value });
  };

  // Validate form inputs
  const validateForm = () => {
    let tempErrors = {};

    // Simple validation rules
    if (!inputValues.name) tempErrors.name = "Name is required";
    if (!inputValues.email) tempErrors.email = "Email is required";
    if (!inputValues.phone || inputValues.phone.length !== 10)
      tempErrors.phone = "Valid phone number is required";
    if (!inputValues.pincode || inputValues.pincode.length !== 6)
      tempErrors.pincode = "Valid postal code is required";
    if (!inputValues.city) tempErrors.city = "City is required";
    if (!inputValues.state) tempErrors.state = "State is required";
    if (!inputValues.product) tempErrors.product = "Product is required";
    if (!inputValues.source) tempErrors.source = "Lead source is required";

    return tempErrors;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Display validation errors
    } else {
      setErrors({});
      // Process form data here (e.g., API call)
      console.log("Form submitted successfully with data: ", inputValues);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12} sm={12} md={12}>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            marginTop: "20px",
            marginLeft: "30px",
          }}
        >
          {/* Add Lead Contact */}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              fontWeight: "600",
              textTransform: "none",
              backgroundColor: "#405189",
              color: "white",
              "&:hover": {
                backgroundColor: "#b71c1c",
              },
            }}
          >
            Add Lead Contact
          </Button>


          {/* Import Leads */}
          <Button
            variant="outlined"
            startIcon={<UploadFileIcon />}
            sx={{
              fontWeight: "600",
              textTransform: "none",
              color: "#0d47a1",
              borderColor: "#0d47a1",
            }}
            onClick={handleClickOpen}
          >
            Import
          </Button>

          {/* Export Leads */}
          <Button
            variant="outlined"
            startIcon={<DownloadFileIcon />}
            component="a"
            href={sampleFileUrl}
            download=" "
            sx={{
              fontWeight: "600",
              textTransform: "none",
              color: "#0d47a1",
              borderColor: "#0d47a1",
            }}
          >
            Export
          </Button>
        </Box>
        <br></br>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomCard padding="20px">
              {/* Display Input Fields */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
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

                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={inputValues.email}
                    onChange={handleInputChange("email")}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
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

                <Grid item xs={12} sm={6} md={4}>
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

                <Grid item xs={12} sm={6} md={4}>
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

                <Grid item xs={12} sm={6} md={4}>
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

                <Grid item xs={12} sm={6} md={6}>
                  <CustomTextField
                    label="Address"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    value={inputValues.address}
                    onChange={handleInputChange("address")}
                    error={!!errors.address}
                    helperText={errors.address}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <CustomTextField
                    label="Message"
                    variant="outlined"
                    fullWidth
                    value={inputValues.message}
                    onChange={handleInputChange("message")}
                    multiline
                    rows={2}
                    error={!!errors.message}
                    helperText={errors.message}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <Select
                    labelId="product-select-label"
                    id="product"
                    name="product"
                    value={inputValues.product}
                    onChange={handleInputChange("product")}
                    displayEmpty
                    sx={{ fontFamily: "Poppins, sans-serif", height: "55px" }}
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Select Product
                    </MenuItem>
                    <MenuItem value="1">Weight Loss</MenuItem>
                    <MenuItem value="2">Weight Gain</MenuItem>
                  </Select>
                  {errors.product && (
                    <FormHelperText>{errors.product}</FormHelperText>
                  )}
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <Select
                    labelId="source-select-label"
                    id="source"
                    value={inputValues.source}
                    onChange={handleInputChange("source")}
                    displayEmpty
                    sx={{ fontFamily: "Poppins, sans-serif", height: "55px" }}
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Select Lead Source
                    </MenuItem>
                    <MenuItem value="1">Facebook</MenuItem>
                    <MenuItem value="2">Instagram</MenuItem>
                    <MenuItem value="3">Google</MenuItem>
                    <MenuItem value="4">Youtube</MenuItem>
                    <MenuItem value="5">LinkedIn</MenuItem>
                  </Select>
                  {errors.source && (
                    <FormHelperText>{errors.source}</FormHelperText>
                  )}
                </Grid>
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

        {/* Dialog */}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <Typography variant="h6">
          <b>Import Lead</b>
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ mt: 2, mb: 2 }}
        >
          Date format should be in Y-m-d (e.g. 2024-09-17) format. Make sure the date format is correct in the excel file.
        </Typography>
        <div
          style={{
            border: '1px solid #ddd',
            padding: '10px',
            borderRadius: '4px',
          }}
        >
          <input
            type="file"
            accept=".csv,.xls,.xlsx,.doc,.docx"
            style={{ display: 'none' }}
            id="upload-file"
            onChange={handleFileChange}
          />
          <label
            htmlFor="upload-file"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100px',
              border: '2px dashed #ddd',
              cursor: 'pointer',
              borderRadius: '4px',
            }}
          >
            <UploadFileIcon sx={{ fontSize: 48, color: '#aaa' }} />
            <Typography>
              {selectedFile ? selectedFile.name : 'Choose a file'}
            </Typography>
          </label>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <Button onClick={handleClose} fullWidth sx={{ mt: 1 }}>
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 1 }}
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
      </Grid>
    </Grid>
  );
};

export default AddLeads;
