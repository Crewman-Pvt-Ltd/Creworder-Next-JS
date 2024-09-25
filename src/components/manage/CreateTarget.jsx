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

const CreateTarget = () => {
  const [inputValues, setInputValues] = useState({
    agent: "",
    dailytarget: "",
    weeklytarget: "",
    monthlytarget: "",
    quartelytarget: "",
    amountInTerms: "",
    productInTerms: "",
  });

  const [errors, setErrors] = useState({});

  // Input change handler to capture user input
  const handleInputChange = (field) => (event) => {
    setInputValues({ ...inputValues, [field]: event.target.value });
  };

  // Validate form inputs
  const validateForm = () => {
    let tempErrors = {};
    if (!inputValues.agent) tempErrors.agent = "Agent is required";
    if (!inputValues.dailytarget) tempErrors.dailytarget = "Daily target is required";
    if (!inputValues.weeklytarget) tempErrors.weeklytarget = "Weekly target is required";
    if (!inputValues.amountInTerms) tempErrors.amountInTerms = "Amount target is required";
    if (!inputValues.productInTerms) tempErrors.productInTerms = "Product target is required";

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
                Create Targets
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
                    <MenuItem value="1">Agent 1</MenuItem>
                    <MenuItem value="2">Agent 2</MenuItem>
                  </Select>
                  {errors.agent && (
                    <FormHelperText error>{errors.agent}</FormHelperText>
                  )}
                </Grid>

                {/* Daily Target */}
                <Grid item xs={12} sm={4} md={4}>
                  <TextField
                    label="Daily Target"
                    value={inputValues.dailytarget}
                    onChange={handleInputChange("dailytarget")}
                    fullWidth
                    text="number"
                    sx={{ height: "55px" }}
                  />
                  {errors.dailytarget && (
                    <FormHelperText error>{errors.dailytarget}</FormHelperText>
                  )}
                </Grid>

                {/* Weekly Target */}
                <Grid item xs={12} sm={4} md={4}>
                  <TextField
                    label="Weekly Target"
                    value={inputValues.weeklytarget}
                    onChange={handleInputChange("weeklytarget")}
                    text="number"
                    fullWidth
                    sx={{ height: "55px" }}
                  />
                  {errors.weeklytarget && (
                    <FormHelperText error>{errors.weeklytarget}</FormHelperText>
                  )}
                </Grid>

                {/* In Terms of Amount */}
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="In Terms of Amount"
                    value={inputValues.amountInTerms}
                    onChange={handleInputChange("amountInTerms")}
                    text="number"
                    fullWidth
                    sx={{ height: "55px" }}
                  />
                  {errors.amountInTerms && (
                    <FormHelperText error>{errors.amountInTerms}</FormHelperText>
                  )}
                </Grid>

                {/* In Terms of Product */}
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="In Terms of Product"
                    value={inputValues.productInTerms}
                    onChange={handleInputChange("productInTerms")}
                    text="number"
                    fullWidth
                    sx={{ height: "55px" }}
                  />
                  {errors.productInTerms && (
                    <FormHelperText error>{errors.productInTerms}</FormHelperText>
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

export default CreateTarget;
