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

const CreatePackage = () => {
  const router = useRouter();
  const [checkedItems, setCheckedItems] = useState({});
  const [checkedSubmenus, setCheckedSubmenus] = useState({});
  const [packageDetails, setPackageDetails] = useState([]);

  const { data: menus = [] } = useGetAllMenu(); // Fetch all menus
  const { data: submenus = [] } = useGetAllSubmenu(); // Fetch all submenus

  const { permissionsData } = usePermissions();
  const token = getToken();

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
    setFormState((prevState) => ({
      ...prevState,
      package: {
        ...prevState.package,
        [name]: value,
      },
    }));
  };

  const handlePlanChange = (event) => {
    setFormState((prevState) => ({
      ...prevState,
      package: {
        ...prevState.package,
        type: event.target.value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalFormState = {
      ...formState,
      package_details: packageDetails,
    };

    const response = await MainApi.post("/api/packages/", finalFormState, {
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
      {/* Form fields for package data */}
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
                    value={formState.package.type}
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
                          formState.package.type === "free" ? "#e3f2fd" : "transparent",
                        borderColor:
                          formState.package.type === "free" ? "#2196f3" : "#ccc",
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
                          formState.package.type === "paid" ? "#e3f2fd" : "transparent",
                        borderColor:
                          formState.package.type === "paid" ? "#2196f3" : "#ccc",
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

            <Grid container spacing={2} mt={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
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
                      value={formState.package.name}
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
                      value={formState.package.max_admin}
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
                      value={formState.package.max_employees}
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
                      value={formState.package.setup_fees}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>


            
            {formState.package.type === "paid" && (
              <>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
                      Payment Gateway Plans
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2} mt={2}>
                      <Grid item xs={12} sm={4}>
                        <CustomLabel htmlFor="monthlyplanprice" required>
                          Monthly Plan Price
                        </CustomLabel>
                        <CustomTextField
                          id="monthlyplanprice"
                          name="monthly_price"
                          type="number"
                          required
                          fullWidth
                          value={formState.package.monthly_price}
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
                          required
                          fullWidth
                          value={formState.package.quarterly_price}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <CustomLabel htmlFor="annualprice" required>
                          Annual Plan Price
                        </CustomLabel>
                        <CustomTextField
                          id="annualprice"
                          name="annual_price"
                          type="number"
                          required
                          fullWidth
                          value={formState.package.annual_price}
                          onChange={handleInputChange}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
             <Divider sx={{ my: 2 }} />

           <Divider sx={{ my: 2 }} />
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
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
                        {checkedItems[menu.name] &&
                          submenus
                            .filter((submenu) => submenu.menu === menu.id)
                            .map((submenu) => (
                              <ul
                                key={submenu.id}
                                style={{
                                  paddingLeft: "40px",
                                  listStyleType: "none",
                                }}
                              >
                                <li>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={
                                          checkedSubmenus[submenu.name] || false
                                        }
                                        onChange={(e) =>
                                          handleSubmenuChange(e, menu.id)
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

              <Grid item xs={12}>
              <CustomLabel htmlFor="description">Description</CustomLabel>
              <CustomTextField
                id="description"
                name="description"
                placeholder="e.g. description"
                multiline
                required
                fullWidth
                value={formState.package.description}
                onChange={handleInputChange}
              />
            </Grid><br></br>

              <Button type="submit" variant="contained">
                Save Package
              </Button>
            </form>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default CreatePackage;
