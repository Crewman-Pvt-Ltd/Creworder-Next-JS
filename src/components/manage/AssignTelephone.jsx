import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
} from "@mui/material";
import CustomCard from "../CustomCard";

const AssignTelephone = () => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // State for holding input values
  const [inputValues, setInputValues] = useState({
    telephone: "",
    agent: "",
    username: "",
    password: "",
    telephonicAgentId: "", // For Sans Software only
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
    if (!inputValues.telephone)
      tempErrors.telephone = "Telephone Channel is required";
    if (!inputValues.agent) tempErrors.agent = "Agent is required";
    if (!inputValues.username) tempErrors.username = "Username is required";
    if (!inputValues.password) tempErrors.password = "Password is required";
    if (
      inputValues.telephone === "sans" &&
      !inputValues.telephonicAgentId
    ) {
      tempErrors.telephonicAgentId = "Telephonic Agent ID is required";
    }
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
                Assign Telephone
              </Typography>
              <Grid container spacing={2}>
                {/* Agent Select */}
                <Grid item xs={12} sm={4} md={4}>
                  <Select
                    labelId="agent-select-label"
                    id="agent"
                    value={inputValues.agent}
                    onChange={handleInputChange("agent")}
                    displayEmpty
                    sx={{ fontFamily: "Poppins, sans-serif", height: "55px" }}
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Select Agent
                    </MenuItem>
                    <MenuItem value="1">Test1</MenuItem>
                    <MenuItem value="2">Test2</MenuItem>
                  </Select>
                  {errors.agent && (
                    <FormHelperText>{errors.agent}</FormHelperText>
                  )}
                </Grid>
                
                {/* Telephone Channel Select */}
                <Grid item xs={12} sm={4} md={4}>
                  <Select
                    labelId="Telephone-channel-select-label"
                    id="telephone"
                    name="telephone"
                    value={inputValues.telephone}
                    onChange={handleInputChange("telephone")}
                    displayEmpty
                    sx={{ fontFamily: "Poppins, sans-serif", height: "55px" }}
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Select Telephone Channel
                    </MenuItem>
                    <MenuItem value="sans">Sans Software</MenuItem>
                    <MenuItem value="sampark">Sampark</MenuItem>
                  </Select>
                  {errors.telephone && (
                    <FormHelperText>{errors.telephone}</FormHelperText>
                  )}
                </Grid>

                
              </Grid>

              {/* Conditional Input Fields */}
              {(inputValues.telephone === "sans" || inputValues.telephone === "sampark") && (
                <>
                  <Grid container spacing={2} mt={2}>
                    {/* Username Field */}
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        label="Username"
                        value={inputValues.username}
                        onChange={handleInputChange("username")}
                        fullWidth
                        sx={{ height: "55px" }}
                      />
                      {errors.username && (
                        <FormHelperText error>{errors.username}</FormHelperText>
                      )}
                    </Grid>

                    {/* Password Field */}
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        label="Password"
                        type="password"
                        value={inputValues.password}
                        onChange={handleInputChange("password")}
                        fullWidth
                        sx={{ height: "55px" }}
                      />
                      {errors.password && (
                        <FormHelperText error>{errors.password}</FormHelperText>
                      )}
                    </Grid>
                  </Grid>

                  {/* Telephonic Agent ID for Sans Software */}
                  {inputValues.telephone === "sans" && (
                    <Grid container spacing={2} mt={2}>
                      <Grid item xs={12} sm={6} md={6}>
                        <TextField
                          label="Telephonic Agent ID"
                          value={inputValues.telephonicAgentId}
                          onChange={handleInputChange("telephonicAgentId")}
                          fullWidth
                          sx={{ height: "55px" }}
                        />
                        {errors.telephonicAgentId && (
                          <FormHelperText error>
                            {errors.telephonicAgentId}
                          </FormHelperText>
                        )}
                      </Grid>
                    </Grid>
                  )}
                </>
              )}

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

export default AssignTelephone;
