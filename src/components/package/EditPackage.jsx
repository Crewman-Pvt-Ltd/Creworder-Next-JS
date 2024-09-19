import React, { useState, useEffect } from "react";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../CustomLabel";
import { useRouter } from "next/router";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";
import useGetAllModules from "@/api-manage/react-query/useGetAllModules";
import { usePermissions } from "@/contexts/PermissionsContext";

import {
  Typography,
  Button,
  Grid,
  CardContent,
  Divider,
  Box,
  FormGroup,
  Checkbox,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import CustomCard from "../CustomCard";

const modules = [
  "Clients",
  "Invoices",
  "Leaves",
  "Reports",
  "Zoom",
  "Webhooks",
  "Employees",
  "Payments",
  "Leads",
  "Orders",
  "SMS",
  "QR Code",
  "Projects",
  "Time Logs",
  "Holidays",
  "Knowledge Base",
  "Recruit",
  "Biolinks",
  "Attendance",
  "Tickets",
  "Products",
  "Bank Account",
  "Payroll",
  "Tasks",
  "Events",
  "Expenses",
  "Messages",
  "Purchase",
  "Estimates",
  "Notices",
  "Contracts",
  "Assets",
  "Letter",
];

const EditPackage = () => {
  const { permissionsData } = usePermissions();
  const router = useRouter();
  const token = getToken();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = router.query;
  const { data: modulesData, refetch } = useGetAllModules();
  const [formState, setFormState] = useState({
    name: "",
    type: "",
    max_admin: "",
    setup_fees: "",
    max_employees: "",
    monthly_price: "",
    annual_price: "",
    description: "",
    created_by: permissionsData?.user?.id || "",
    modules: [], // Ensure this is initialized as an array
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = (event) => {
    const moduleId = event.target.value;
    setFormState((prevState) => ({
      ...prevState,
      modules: prevState.modules.includes(moduleId)
        ? prevState.modules.filter((item) => item !== moduleId)
        : [...prevState.modules, moduleId],
    }));
  };

  const handleSelectAll = (event) => {
    setFormState((prevState) => ({
      ...prevState,
      modules: event.target.checked ? modulesData.results.map((module) => module.id) : [],
    }));
  };

  const handlePlanChange = (event) => {
    setFormState((prevState) => ({ ...prevState, type: event.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formState).forEach((key) => {
      form.append(key, formState[key]);
    });

    try {
      const response = await MainApi.put(`/api/packages/${id}/`, formState, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.status === 200) {
        router.push("/superadmin/package");
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
      setError("An error occurred while submitting the form");
    }
  };

  useEffect(() => {
    if (id) {
      const fetchPackage = async () => {
        try {
          setLoading(true);
          const token = getToken();
          if (!token) {
            throw new Error("No authentication token found.");
          }

          const response = await MainApi.get(`/api/packages/${id}`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });

          if (response.status === 200) {
            setFormState((prevState) => ({
              ...prevState,
              ...response.data,
              modules: response.data.modules || [], // Ensure modules are set correctly
            }));
          } else {
            console.error("Failed to fetch the package");
            setError("Failed to fetch the package");
          }
        } catch (error) {
          console.error("An error occurred while fetching the package:", error);
          setError("An error occurred while fetching the package");
        } finally {
          setLoading(false);
        }
      };

      fetchPackage();
    }
  }, [id]);

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
              Edit Package
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2} sx={{ marginTop: 3 }}>
              <Grid item xs={12}>
                <Typography sx={{ fontSize: "15px" }}>
                  Choose Package Type
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="package-type"
                    name="row-radio-buttons-group"
                    value={formState.type}
                    onChange={handlePlanChange}
                  >
                    <Box
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "3px 5px",
                        display: "flex",
                        alignItems: "center",
                        marginRight: 2,
                        bgcolor:
                          formState.type === "free" ? "#e3f2fd" : "transparent",
                        borderColor:
                          formState.type === "free" ? "#2196f3" : "#ccc",
                      }}
                    >
                      <FormControlLabel
                        value="free"
                        control={
                          <Radio
                            sx={{
                              "&.Mui-checked": {
                                color: "#2196f3",
                              },
                              "& .MuiSvgIcon-root": {
                                fontSize: 12,
                              },
                            }}
                          />
                        }
                        label={
                          <Typography sx={{ fontSize: "16px" }}>
                            Free Plan
                          </Typography>
                        }
                      />
                    </Box>
                    <Box
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "3px 5px",
                        display: "flex",
                        alignItems: "center",
                        bgcolor:
                          formState.type === "paid" ? "#e3f2fd" : "transparent",
                        borderColor:
                          formState.type === "paid" ? "#2196f3" : "#ccc",
                      }}
                    >
                      <FormControlLabel
                        value="paid"
                        control={
                          <Radio
                            sx={{
                              "&.Mui-checked": {
                                color: "#2196f3",
                              },
                              "& .MuiSvgIcon-root": {
                                fontSize: 12,
                              },
                            }}
                          />
                        }
                        label={
                          <Typography sx={{ fontSize: "16px" }}>
                            Paid Plan
                          </Typography>
                        }
                      />
                    </Box>
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2} mt={2}>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Grid
                  container
                  spacing={2}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Grid item xs={12} sm={3}>
                    <CustomLabel htmlFor="name" required>
                      Package Name
                    </CustomLabel>
                    <CustomTextField
                      id="name"
                      name="name"
                      placeholder="e.g. creworder"
                      type="text"
                      required
                      fullWidth
                      value={formState.name}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomLabel htmlFor="max_admin" required>
                      Max Admin
                    </CustomLabel>
                    <CustomTextField
                      id="max_admin"
                      name="max_admin"
                      placeholder="e.g. 2"
                      type="number"
                      required
                      fullWidth
                      value={formState.max_admin}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomLabel htmlFor="max_employees" required>
                      Max Employees
                    </CustomLabel>
                    <CustomTextField
                      id="max_employees"
                      name="max_employees"
                      placeholder="e.g. 30"
                      type="number"
                      required
                      fullWidth
                      value={formState.max_employees}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomLabel htmlFor="setup_fees" required>
                      Setup Fees
                    </CustomLabel>
                    <CustomTextField
                      id="setup_fees"
                      name="setup_fees"
                      placeholder="e.g. 99"
                      type="number"
                      required
                      fullWidth
                      value={formState.setup_fees}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomLabel htmlFor="monthly_price" required>
                      Monthly Price
                    </CustomLabel>
                    <CustomTextField
                      id="monthly_price"
                      name="monthly_price"
                      placeholder="e.g. 99"
                      type="number"
                      required
                      fullWidth
                      value={formState.monthly_price}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomLabel htmlFor="annual_price" required>
                      Annual Price
                    </CustomLabel>
                    <CustomTextField
                      id="annual_price"
                      name="annual_price"
                      placeholder="e.g. 99"
                      type="number"
                      required
                      fullWidth
                      value={formState.annual_price}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <Typography sx={{ fontSize: "15px" }}>Select Modules</Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleSelectAll}
                      checked={formState.modules.length === modulesData?.results.length}
                      indeterminate={
                        formState.modules.length > 0 &&
                        formState.modules.length < modulesData?.results.length
                      }
                    />
                  }
                  label="Select All"
                />
              </Grid>
              <Grid item xs={12}>
                <FormGroup row>
                  {modulesData?.results.map((module, index) => (
                    <FormControlLabel
                      key={module.id}
                      control={
                        <Checkbox
                          checked={formState.modules.includes(module.id)}
                          onChange={handleCheckboxChange}
                          value={module.id}
                        />
                      }
                      label={module.name}
                    />
                  ))}
                </FormGroup>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Grid item xs={12} mt={2}>
              <CustomLabel htmlFor="description">Description</CustomLabel>
              <CustomTextField
                id="description"
                name="description"
                placeholder="e.g. description"
                type="text"
                fullWidth
                multiline
                rows={4}
                value={formState.description}
                onChange={handleInputChange}
              />
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2} mt={2}>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ float: "right" }}
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default EditPackage;
