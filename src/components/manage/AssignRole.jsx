import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  FormHelperText,
  Checkbox,
  ListItemText,
} from "@mui/material";
import CustomCard from "../CustomCard";

const AssignRole = () => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // State for holding input values
  const [inputValues, setInputValues] = useState({
    tl: [],
    agent: "",
    manager: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Input change handler to capture user input
  const handleInputChange = (field) => (event) => {
    const value = field === "agent" ? event.target.value : event.target.value;
    setInputValues({ ...inputValues, [field]: value });
  };

  // Validate form inputs
  const validateForm = () => {
    let tempErrors = {};
    if (!inputValues.tl.length) tempErrors.tl = "At least one TL is required";
    if (!inputValues.agent) tempErrors.agent = "Manager is required";
    
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

      // Open the next tab (replace with the actual URL)
      window.open("http://www.example.com/next-step", "_blank"); // Opens a new tab
    }
  };

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomCard padding="20px">
              {/* Display Input Fields */}
              <Typography
                sx={{
                  fontWeight: "500",
                  margin: "5px",
                  fontSize: "20px",
                  whiteSpace: "nowrap",
                  textTransform: "capitalize",
                  color: "black",
                  marginLeft: "10px",
                }}
              >
                Assign Role
              </Typography>
              <Grid container spacing={2}>

                {/* Manager Select with Single Select */}
                <Grid item xs={12} sm={4} md={4}>
                  <Select
                    labelId="manager-select-label"
                    id="manager"
                    value={inputValues.manager}
                    onChange={handleInputChange("manager")}
                    displayEmpty
                    sx={{ fontFamily: "Poppins, sans-serif", height: "55px" }}
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Select Manager
                    </MenuItem>
                    {["Test1", "Test2", "Test3"].map((name) => (
                      <MenuItem key={name} value={name}>
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.manager && (
                    <FormHelperText>{errors.manager}</FormHelperText>
                  )}
                </Grid>

                {/* TeamLead Select with Single Select */}
                <Grid item xs={12} sm={4} md={4}>
                  <Select
                    labelId="teamlead-select-label"
                    id="teamlead"
                    value={inputValues.manager}
                    onChange={handleInputChange("teamlead")}
                    displayEmpty
                    sx={{ fontFamily: "Poppins, sans-serif", height: "55px" }}
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Select TeamLead
                    </MenuItem>
                    {["Test1", "Test2", "Test3"].map((name) => (
                      <MenuItem key={name} value={name}>
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.teamlead && (
                    <FormHelperText>{errors.teamlead}</FormHelperText>
                  )}
                </Grid>
                
                {/* TL Select with Multi-Select and Checkboxes */}
                <Grid item xs={12} sm={4} md={4}>
                  <Select
                    labelId="select-agent"
                    id="tl"
                    value={inputValues.tl}
                    onChange={handleInputChange("tl")}
                    multiple
                    displayEmpty
                    sx={{ fontFamily: "Poppins, sans-serif", height: "55px" }}
                    fullWidth
                    renderValue={(selected) => (selected.length ? selected.join(", ") : "Select Agent")}
                  >
                    <MenuItem value="" disabled>
                      Select Agent
                    </MenuItem>
                    {["TL 1", "TL 2", "TL 3"].map((tl) => (
                      <MenuItem key={tl} value={tl}>
                        <Checkbox checked={inputValues.tl.indexOf(tl) > -1} />
                        <ListItemText primary={tl} />
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.tl && (
                    <FormHelperText>{errors.tl}</FormHelperText>
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
                Submit
              </Button>
            </CustomCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AssignRole;
