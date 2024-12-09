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
import { useRouter } from "next/router";
import useGetAllEmployees from "@/api-manage/react-query/useGetAllEmployees";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";
import { usePermissions } from "@/contexts/PermissionsContext";

const CreateTarget = () => {
  const router = useRouter();
  const [inputValues, setInputValues] = useState({
    agent: "",
    month: "",
    dailytarget: "",
    weeklytarget: "",
    target_order: "",
    amountInTerms: "",
    productInTerms: "",
  });
  const [errors, setErrors] = useState({});
  const { data } = useGetAllEmployees();
  const { permissionsData } = usePermissions();

  // Input change handler
  const handleInputChange = (field) => (event) => {
    setInputValues({ ...inputValues, [field]: event.target.value });
  };

  // Validate form inputs
  const validateForm = () => {
    let tempErrors = {};
    if (!inputValues.agent) tempErrors.agent = "Agent is required";
    if (!inputValues.month) tempErrors.month = "Month is required";
    if (!inputValues.dailytarget) tempErrors.dailytarget = "Daily target is required";
    if (!inputValues.weeklytarget) tempErrors.weeklytarget = "Weekly target is required";
    if (!inputValues.target_order) tempErrors.target_order = "Product target is required";
    if (!inputValues.amountInTerms) tempErrors.amountInTerms = "Amount target is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Prepare the payload
    const payload = {
      user: inputValues.agent,
      branch: permissionsData?.user?.profile?.branch,
      company: permissionsData?.user?.profile?.company,
      daily_target: inputValues.dailytarget,
      weekly_target: inputValues.weeklytarget,
      target_order: inputValues.target_order,
      interm_amount: inputValues.amountInTerms,
      interm_product: inputValues.productInTerms,
      target_amount: inputValues.dailytarget, // Assuming daily target as the total target
      month: inputValues.month,
    };

    try {
      const token = getToken();

      if (!token) {
        alert("User authentication token is missing.");
        return;
      }

      const response = await MainApi.post("/api/user-target/", payload, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.status === 201) {
        alert("Target created successfully!");
        router.push("/admin/manage/target-list");
      } else {
        console.error("Unexpected server response", response);
        alert("An error occurred while creating the target.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(error.response.data.message || "Failed to create target. Please try again.");
      } else {
        console.error("Error creating target:", error.message);
        alert("Failed to create target. Please try again.");
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
                Create Targets
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={4}>
                  <Select
                    labelId="agent-select-label"
                    id="agent"
                    value={inputValues.agent}
                    onChange={handleInputChange("agent")}
                    displayEmpty
                    fullWidth
                    sx={{ fontFamily: "Poppins, sans-serif", height: "55px" }}
                  >
                    <MenuItem value="" disabled>
                      Select Agent
                    </MenuItem>
                    {data?.results?.map((agent) => (
                      <MenuItem key={agent.id} value={agent.id}>
                        {`${agent.first_name} ${agent.last_name}`}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.agent && <FormHelperText error>{errors.agent}</FormHelperText>}
                </Grid>

                <Grid item xs={12} sm={4} md={4}>
                  <Select
                    labelId="month-select-label"
                    id="month"
                    value={inputValues.month}
                    onChange={handleInputChange("month")}
                    displayEmpty
                    fullWidth
                    sx={{ fontFamily: "Poppins, sans-serif", height: "55px" }}
                  >
                    <MenuItem value="" disabled>
                      Select Month
                    </MenuItem>
                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((month, index) => (
                      <MenuItem key={index} value={month.toLowerCase()}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.month && <FormHelperText error>{errors.month}</FormHelperText>}
                </Grid>

                {[{ label: "Daily Target", field: "dailytarget" },
                  { label: "Weekly Target", field: "weeklytarget" },
                  { label: "In Terms of Amount", field: "amountInTerms" },
                  { label: "In Terms of Product", field: "target_order" }].map(({ label, field }) => (
                  <Grid item xs={12} sm={4} md={4} key={field}>
                    <TextField
                      label={label}
                      value={inputValues[field]}
                      onChange={handleInputChange(field)}
                      fullWidth
                      type="number"
                      sx={{ height: "55px" }}
                    />
                    {errors[field] && <FormHelperText error>{errors[field]}</FormHelperText>}
                  </Grid>
                ))}
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
