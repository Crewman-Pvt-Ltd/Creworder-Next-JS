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
  const [inputValues, setInputValues] = useState({
    manager: "", // Single selection for Manager
    team: "", // Single selection for Team
    agent: [], // Multiple selection for Agent
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field) => (event) => {
    const value = field === "agent" ? event.target.value : event.target.value;
    setInputValues({ ...inputValues, [field]: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!inputValues.agent.length)
      tempErrors.agent = "At least one Agent is required";
    if (!inputValues.manager) tempErrors.manager = "Manager is required";
    if (!inputValues.team) tempErrors.team = "Team Leader is required";
    return tempErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      console.log("Form submitted successfully with data: ", inputValues);
      window.open("http://www.example.com/next-step", "_blank");
    }
  };

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
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
                Assign Role
              </Typography>
              <Grid container spacing={2}>
                {/* Manager Dropdown */}
                <Grid item xs={12} sm={4}>
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
                    {["Manager 1", "Manager 2", "Manager 3"].map((manager) => (
                      <MenuItem key={manager} value={manager}>
                        <ListItemText primary={manager} />
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.manager && (
                    <FormHelperText error>{errors.manager}</FormHelperText>
                  )}
                </Grid>

                {/* Team Leader Dropdown */}
                <Grid item xs={12} sm={4}>
                  <Select
                    labelId="team-select-label"
                    id="team"
                    value={inputValues.team}
                    onChange={handleInputChange("team")}
                    displayEmpty
                    sx={{ fontFamily: "Poppins, sans-serif", height: "55px" }}
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Select Team Leader
                    </MenuItem>
                    {["Team 1", "Team 2", "Team 3"].map((team) => (
                      <MenuItem key={team} value={team}>
                        <ListItemText primary={team} />
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.team && (
                    <FormHelperText error>{errors.team}</FormHelperText>
                  )}
                </Grid>

                {/* Agent Dropdown */}
                <Grid item xs={12} sm={4}>
                  <Select
                    labelId="agent-select-label"
                    id="agent"
                    value={inputValues.agent}
                    onChange={handleInputChange("agent")}
                    multiple
                    displayEmpty
                    sx={{ fontFamily: "Poppins, sans-serif", height: "55px" }}
                    fullWidth
                    renderValue={(selected) =>
                      selected.length ? selected.join(", ") : "Select Agent"
                    }
                  >
                    {["Agent 1", "Agent 2", "Agent 3"].map((agent) => (
                      <MenuItem key={agent} value={agent}>
                        <Checkbox
                          checked={inputValues.agent.indexOf(agent) > -1}
                        />
                        <ListItemText primary={agent} />
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.agent && (
                    <FormHelperText error>{errors.agent}</FormHelperText>
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
