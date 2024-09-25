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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = router.query;

  const [checkedItems, setCheckedItems] = useState({});
  const [checkedSubmenus, setCheckedSubmenus] = useState({});
  const [packageDetails, setPackageDetails] = useState([]);
  const { data: menus = [] } = useGetAllMenu();
  const { data: submenus = [] } = useGetAllSubmenu();

  const [formState, setFormState] = useState({
    name: "",
    type: "",
    max_admin: "",
    max_employees: "",
    setup_fees: "",
    monthly_price: 0,
    quarterly_price: 0,
    annual_price: 0,
    description: "",
    package_details: [],
    created_by: permissionsData?.user?.id || "",
  });

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

  useEffect(() => {
    if (id) {
      fetchPackageDetails();
    }
  }, [id]);

  const fetchPackageDetails = async () => {
    try {
      setLoading(true);
      const response = await MainApi.get(`/api/packages/${id}`, {
        headers: { Authorization: `Token ${token}` },
      });

      if (response.status === 200) {
        const packageData = response.data;
        setFormState({
          name: packageData.name,
          type: packageData.type,
          max_admin: packageData.max_admin,
          max_employees: packageData.max_employees,
          setup_fees: packageData.setup_fees,
          monthly_price: packageData.monthly_price,
          quarterly_price: packageData.quarterly_price,
          annual_price: packageData.annual_price,
          description: packageData.description,
          package_details: packageData.package_details || [],
        });
      } else {
        setError("Failed to load package details.");
      }
    } catch (err) {
      setError("Error occurred while fetching package details.");
    } finally {
      setLoading(false);
    }
  };

  const handleMainMenuChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prevState) => ({
      ...prevState,
      [name]: checked,
    }));

    const menu = menus.find((menu) => menu.name === name);
    setPackageDetails((prevDetails) => {
      if (checked) {
        return [...prevDetails, { menu: menu.id }];
      } else {
        return prevDetails.filter((detail) => detail.menu !== menu.id);
      }
    });
  };

  const handleSubmenuChange = (event, menuId) => {
    const { name, checked } = event.target;
    setCheckedSubmenus((prevState) => ({
      ...prevState,
      [name]: checked,
    }));

    const submenu = submenus.find((submenu) => submenu.name === name);
    setPackageDetails((prevDetails) => {
      return prevDetails.map((detail) => {
        if (detail.menu === menuId) {
          if (checked) {
            return { menu: detail.menu, submenu: submenu.id };
          } else {
            return { menu: detail.menu };
          }
        }
        return detail;
      });
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: formState.name,
        type: formState.type,
        max_admin: formState.max_admin,
        max_employees: formState.max_employees,
        setup_fees: formState.setup_fees,
        monthly_price: formState.monthly_price,
        quarterly_price: formState.quarterly_price,
        annual_price: formState.annual_price,
        description: formState.description,
        package_details: packageDetails,
        created_by: formState.created_by,
      };

      const response = await MainApi.put(`/api/packages/${id}/`, payload, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        router.push("/superadmin/package");
      } else {
        setError("Failed to update the package.");
      }
    } catch (err) {
      setError("Error occurred while updating the package.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
              Edit Package
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={3}>
                <CustomLabel htmlFor="name">Name</CustomLabel>
                <CustomTextField
                  placeholder="Name"
                  name="name"
                  id="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  required
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
                  required
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomLabel htmlFor="max_employees">Max Employees</CustomLabel>
                <CustomTextField
                  placeholder="Max Employees"
                  name="max_employees"
                  id="max_employees"
                  value={formState.max_employees}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            {/* Package Type Selection */}
            <FormControl component="fieldset">
              <Typography>Choose Package Type</Typography>
              <RadioGroup
                row
                aria-label="package-type"
                name="type"
                value={formState.type}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  value="free"
                  control={<Radio />}
                  label="Free Plan"
                />
                <FormControlLabel
                  value="paid"
                  control={<Radio />}
                  label="Paid Plan"
                />
              </RadioGroup>
            </FormControl>
            <Divider sx={{ my: 2 }} />
            {/* Description */}
            <CustomLabel htmlFor="description">Description</CustomLabel>
            <CustomTextField
              id="description"
              name="description"
              placeholder="Package description"
              multiline
              required
              fullWidth
              value={formState.description}
              onChange={handleInputChange}
            />
            {/* Menu and Submenu Selection */}
            <Typography sx={{ mt: 3 }}>Select Menus and Submenus</Typography>
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
                        <FormControlLabel
                          key={submenu.id}
                          control={
                            <Checkbox
                              checked={checkedSubmenus[submenu.name] || false}
                              onChange={(e) => handleSubmenuChange(e, menu.id)}
                              name={submenu.name}
                            />
                          }
                          label={submenu.name}
                        />
                      ))}
                </li>
              ))}
            </ul>
            <Divider sx={{ my: 2 }} />
            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Package"}
              </Button>
            </Box>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default EditPackage;
