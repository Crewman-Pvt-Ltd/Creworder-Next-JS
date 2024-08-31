import React, { useState } from "react";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
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

const CreatePackage = () => {
  const { permissionsData } = usePermissions();
  const router = useRouter();
  const { data: modulesData, refetch } = useGetAllModules();
  const token = getToken();
  const [formState, setFormState] = useState({
    name: "",
    type: "",
    max_admin: "",
    setup_fees: "",
    max_employees: "",
    monthly_price: 0,
    annual_price: 0,
    description: "",
    created_by: permissionsData.user.id,
    modules: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = (event) => {
    const name = event.target.value;
    setFormState((prevState) => ({
      ...prevState,
      modules: prevState.modules.includes(name)
        ? prevState.modules.filter((item) => item !== name)
        : [...prevState.modules, name],
    }));
    console.log("Form State", formState);
  };

  const handleSelectAll = (event) => {
    setFormState((prevState) => ({
      ...prevState,
      checkedModules: event.target.checked ? modules : [],
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

    const response = await MainApi.post("/api/packages/", formState, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (response.status === 201) {
      router.push("/superadmin/package");
    } else {
      throw new Error("Unexpected response from server");
    }
  };

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
              Add Package
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
                      type="number"
                      placeholder="e.g. 100"
                      required
                      fullWidth
                      value={formState.max_admin}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomLabel htmlFor="maxEmployees" required>
                      Max Employees
                    </CustomLabel>
                    <CustomTextField
                      id="max_employees"
                      name="max_employees"
                      type="number"
                      placeholder="e.g. 100"
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
                      type="number"
                      placeholder="e.g. 500"
                      fullWidth
                      value={formState.setup_fees}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {formState.type === "paid" && (
              <>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
                      Payment Gateway Plans
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Grid container spacing={2} mt={2}>
                      <Grid item xs={12} sm={4}>
                        <CustomLabel htmlFor="monthlyplanprice" required>
                          Monthly Plan Price
                        </CustomLabel>
                        <CustomTextField
                          id="monthlyplanprice"
                          name="monthly_price"
                          placeholder=""
                          type="number"
                          required
                          fullWidth
                          value={formState.monthly_price}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <CustomLabel htmlFor="quarterlyplanprice" required>
                          Quarterly Plan Price
                        </CustomLabel>
                        <CustomTextField
                          id="quarterlyplanprice"
                          name="quarterly_price"
                          type="number"
                          placeholder=""
                          required
                          fullWidth
                          value={formState.quarterly_price}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <CustomLabel htmlFor="annualprice" required>
                          Anually Plan Price
                        </CustomLabel>
                        <CustomTextField
                          id="annualprice"
                          name="annual_price"
                          type="number"
                          placeholder=""
                          required
                          fullWidth
                          value={formState.annual_price}
                          onChange={handleInputChange}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Select Modules for this package
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleSelectAll}
                        checked={
                          formState.modules.length === modules.length
                        }
                      />
                    }
                    label="Select All"
                  />
                </FormGroup>
              </Grid>

              <Grid
                container
                spacing={2}
                sx={{ width: "900px", margin: "20px" }}
                    >
                   {modulesData?.results.map((row, index) => (
                  <Grid item xs={12} sm={6} md={2} key={index}>
                    <FormControlLabel control={<Checkbox />} label={row?.name} onChange={handleCheckboxChange} value={row?.id}/>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Grid item xs={12} sm={12} md={12}>
              <CustomLabel htmlFor="description">Description</CustomLabel>
              <CustomTextField
                id="description"
                name="description"
                placeholder="e.g. description"
                multiline
                // rows={2}
                required
                fullWidth
                value={formState.description}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid
              item
              sx={{
                marginTop: 3,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                sx={{
                  padding: "8px 16px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  backgroundColor: "#405189",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#334a6c",
                  },
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default CreatePackage;
