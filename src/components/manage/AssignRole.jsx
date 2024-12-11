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
import swal from "sweetalert"; 
import CustomCard from "../CustomCard";
import useGetAllEmployees from "@/api-manage/react-query/useGetAllEmployees";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";
import { usePermissions } from "@/contexts/PermissionsContext";
import axios from "axios"; 
const AssignRole = () => {
const [inputValues, setInputValues] = useState({
    manager: "",
    team: "",
    agent: [],
  });

  const [errors, setErrors] = useState({});
  const { data } = useGetAllEmployees();
  const { permissionsData } = usePermissions();
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      const payload = {
        teamlead: inputValues.team,
        manager: inputValues.manager,
        agent_list: inputValues.agent,
      };

      try {
        const token = getToken();
        if (!token) {
          alert("User authentication token is missing.");
          return;
        }
        const response = await MainApi.post("/api/assign-role/", payload, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (response.status === 201 || response.status === 200) {
          swal("Success", "Roles assigned successfully!", "success");
          setInputValues({ manager: "", team: "", agent: [] });
        }
      } catch (error) {
        console.error("Error assigning roles: ", error);
        swal("Error", "Failed to assign roles. Please try again.", "error");
      }
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
                    {data?.results?.map((agent) => (
                      <MenuItem key={agent.id} value={agent.id}>
                        {`${agent.first_name} ${agent.last_name}`}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.manager && (
                    <FormHelperText error>{errors.manager}</FormHelperText>
                  )}
                </Grid>

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
                    {data?.results?.map((agent) => (
                      <MenuItem key={agent.id} value={agent.id}>
                        {`${agent.first_name} ${agent.last_name}`}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.team && (
                    <FormHelperText error>{errors.team}</FormHelperText>
                  )}
                </Grid>

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
                      selected.length
                        ? data?.results
                            ?.filter((agent) => selected.includes(agent.id))
                            .map((agent) => `${agent.first_name} ${agent.last_name}`)
                            .join(", ")
                        : "Select Agent"
                    }
                  >
                    {data?.results?.map((agent) => (
                      <MenuItem key={agent.id} value={agent.id}>
                        <Checkbox
                          checked={inputValues.agent.indexOf(agent.id) > -1}
                        />
                        <ListItemText
                          primary={`${agent.first_name} ${agent.last_name}`}
                        />
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
