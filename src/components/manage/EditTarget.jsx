import React, { useState, useEffect } from "react";
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

const EditTarget = () => {
  const router = useRouter();
  const { id } = router.query;
  const [inputValues, setInputValues] = useState({
    agent: "",
    month: "",
    dailytarget: "",
    weeklytarget: "",
    amountInTerms: "",
    productInTerms: "",
  });
  const [errors, setErrors] = useState({});
  const { data } = useGetAllEmployees();
  const { permissionsData } = usePermissions();

  useEffect(() => {
    if (id) {
      const fetchTargetDetails = async () => {
        try {
          const token = getToken();
          const response = await MainApi.get(`/api/user-target/${id}/`, {
            headers: { Authorization: `Token ${token}` },
          });
          const targetData = response.data;
          setInputValues({
            agent: targetData.user,
            month: targetData.month,
            dailytarget: targetData.daily_target,
            weeklytarget: targetData.weekly_target || "",
            amountInTerms: targetData.target_amount || "",
            productInTerms: targetData.target_order || "",
          });
        } catch (error) {
          console.error("Failed to fetch target details:", error);
          alert("An error occurred while fetching the target details.");
        }
      };

      fetchTargetDetails();
    }
  }, [id]);

  const handleInputChange = (field) => (event) => {
    setInputValues({ ...inputValues, [field]: event.target.value });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!inputValues.agent) tempErrors.agent = "Agent is required";
    if (!inputValues.month) tempErrors.month = "Month is required";
    if (!inputValues.dailytarget)
      tempErrors.dailytarget = "Daily target is required";
    if (!inputValues.amountInTerms)
      tempErrors.amountInTerms = "Amount target is required";
    if (!inputValues.productInTerms)
      tempErrors.productInTerms = "Product target is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      user: inputValues.agent,
      branch: permissionsData?.user?.profile?.branch,
      company: permissionsData?.user?.profile?.company,
      daily_target: inputValues.dailytarget,
      weekly_target: inputValues.weeklytarget,
      target_amount: inputValues.amountInTerms,
      target_order: inputValues.productInTerms,
      month: inputValues.month,
    };

    try {
      const token = getToken();
      const response = await MainApi.patch(`http://127.0.0.1:8000/api/user-target/${id}/`, payload, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.status === 200) {
        alert("Target updated successfully!");
        router.push("/admin/manage/target-list");
      } else {
        alert("Failed to update the target.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(error.response.data.message || "Failed to update target.");
      } else {
        console.error("Error updating target:", error.message);
        alert("Failed to update target.");
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
                Edit Targets
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={4}>
                  <Select
                    id="agent"
                    value={inputValues.agent}
                    onChange={handleInputChange("agent")}
                    displayEmpty
                    fullWidth
                    sx={{ height: "55px" }}
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
                  {errors.agent && (
                    <FormHelperText error>{errors.agent}</FormHelperText>
                  )}
                </Grid>

                <Grid item xs={12} sm={4} md={4}>
                  <Select
                    id="month"
                    value={inputValues.month}
                    onChange={handleInputChange("month")}
                    displayEmpty
                    fullWidth
                    sx={{ height: "55px" }}
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
                  {errors.month && (
                    <FormHelperText error>{errors.month}</FormHelperText>
                  )}
                </Grid>

                {[
                  { label: "Daily Target", field: "dailytarget" },
                  { label: "Weekly Target", field: "weeklytarget" },
                  { label: "In Terms of Amount", field: "amountInTerms" },
                  { label: "In Terms of Product", field: "productInTerms" },
                ].map(({ label, field }) => (
                  <Grid item xs={12} sm={4} md={4} key={field}>
                    <TextField
                      label={label}
                      value={inputValues[field]}
                      onChange={handleInputChange(field)}
                      fullWidth
                      type="number"
                    />
                    {errors[field] && (
                      <FormHelperText error>{errors[field]}</FormHelperText>
                    )}
                  </Grid>
                ))}
              </Grid>
              <Button
                onClick={handleSubmit}
                sx={{
                  marginTop: "20px",
                  backgroundColor: "#405189",
                  color: "white",
                  "&:hover": { backgroundColor: "#334a6c" },
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

export default EditTarget;
