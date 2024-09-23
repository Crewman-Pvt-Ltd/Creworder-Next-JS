import React, { useState, useEffect } from "react";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../CustomLabel";
import { useRouter } from "next/router";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";
import useGetAllMenu from "@/api-manage/react-query/useGetAllMenu";
import useGetAllSubmenu from "@/api-manage/react-query/useGetAllSubmenu";
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

const EditPackage = () => {
  const { permissionsData } = usePermissions();
  const router = useRouter();
  const token = getToken();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = router.query;

  const [checkedItems, setCheckedItems] = useState({});
  const [checkedSubmenus, setCheckedSubmenus] = useState({});
  const [packageDetails, setPackageDetails] = useState([]);
  const { data: menus = [] } = useGetAllMenu(); // Fetch all menus
  const { data: submenus = [] } = useGetAllSubmenu(); // Fetch all submenus
  const [formState, setFormState] = useState({
    package: {
      name: "",
      type: "",
      max_admin: "",
      setup_fees: "",
      max_employees: "",
      monthly_price: 0,
      quarterly_price: 0,
      annual_price: 0,
      description: "",
      created_by: permissionsData?.user?.id || "",
    },
    package_details: [],
  });

  // Set initial states for checkedItems and checkedSubmenus
  useEffect(() => {
    const initialCheckedItems = menus.reduce((acc, menu) => {
      acc[menu.name] = false;
      return acc;
    }, {});
    setCheckedItems(initialCheckedItems);

    const initialCheckedSubmenus = submenus.reduce((acc, submenu) => {
      acc[submenu.name] = false;
      return acc;
    }, {});
    setCheckedSubmenus(initialCheckedSubmenus);
  }, [menus, submenus]);

  // Handle main menu selection
  const handleMainMenuChange = (event) => {
    const { name, checked } = event.target;
    const menu = menus.find((menu) => menu.name === name);

    setCheckedItems((prevState) => ({
      ...prevState,
      [name]: checked,
    }));

    // Add or remove menu from package_details
    setPackageDetails((prevDetails) => {
      if (checked) {
        return [...prevDetails, { menu: menu.id }];
      } else {
        return prevDetails.filter((detail) => detail.menu !== menu.id);
      }
    });
  };

  // Handle submenu selection
  const handleSubmenuChange = (event, menuId) => {
    const { name, checked } = event.target;
    const submenu = submenus.find((submenu) => submenu.name === name);

    setCheckedSubmenus((prevState) => ({
      ...prevState,
      [name]: checked,
    }));

    // Update the submenu under the corresponding menu
    setPackageDetails((prevDetails) => {
      return prevDetails.map((detail) => {
        if (detail.menu === menuId) {
          // If checked, include both `menu` and `submenu`
          if (checked) {
            return {
              menu: detail.menu,
              submenu: submenu.id, // Include submenu
            };
          } else {
            // Only include `menu` if submenu is unchecked
            return {
              menu: detail.menu,
            };
          }
        }
        return detail; // Return other details unchanged
      });
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
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
                    <CustomLabel htmlFor="name">Name</CustomLabel>
                    <CustomTextField
                      placeholder="Name"
                      name="name"
                      id="name"
                      value={formState.name}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomLabel htmlFor="max_admin">Max Admin</CustomLabel>
                    <CustomTextField
                      placeholder="Max Admin"
                      name="max_admin"
                      id="max_admin"
                      value={formState.max_admin}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomLabel htmlFor="max_employees">
                      Max Employees
                    </CustomLabel>
                    <CustomTextField
                      placeholder="Max Employees"
                      name="max_employees"
                      id="max_employees"
                      value={formState.max_employees}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              {/* Add your form inputs like name, type, price, etc. */}
              <Grid item xs={12}>
                <Typography sx={{ fontSize: "15px" }}>
                  Select Menus and Submenus
                </Typography>
                <ul>
                  {menus.map((menu) => (
                    <li key={menu.id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checkedItems[menu.name] || false}
                            onChange={handleMainMenuChange}
                            name={menu.name}
                          />
                        }
                        label={menu.name}
                      />
                      {/* Show submenus only if the main menu is checked */}
                      {checkedItems[menu.name] &&
                        submenus
                          .filter((submenu) => submenu.menu === menu.id)
                          .map((submenu) => (
                            <ul key={submenu.id} style={{ paddingLeft: "40px" }}>
                              <li>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={
                                        checkedSubmenus[submenu.name] || false
                                      }
                                      onChange={(event) =>
                                        handleSubmenuChange(event, menu.id)
                                      }
                                      name={submenu.name}
                                    />
                                  }
                                  label={submenu.name}
                                />
                              </li>
                            </ul>
                          ))}
                    </li>
                  ))}
                </ul>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Update Package"}
            </Button>

            {error && <Typography color="error">{error}</Typography>}
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default EditPackage;
