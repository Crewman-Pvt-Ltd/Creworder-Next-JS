import React, { useState } from "react";
import CustomTextField from "@/components/CustomTextField";  
import CustomLabel from "../customLabel";  
import { useRouter } from "next/router";
import { getToken } from "@/utils/getToken";
import MainApi from "@/api-manage/MainApi";
import { Typography, Button, Grid, Card, CardContent, Divider, Select, MenuItem, FormControl } from "@mui/material";
import { Home, Info, ContactMail, School, Settings } from "@mui/icons-material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';  
import useGetAllMenu from "@/api-manage/react-query/useGetAllMenu";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const iconsList = [
  { value: 'home', label: 'Home', icon: <Home /> },
  { value: 'info', label: 'Info', icon: <Info /> },
  { value: 'contact', label: 'Contact', icon: <ContactMail /> },
  { value: 'school', label: 'School', icon: <School /> },
  { value: 'settings', label: 'Settings', icon: <Settings /> },
];

const submenuiconsList = [
  { value: 'arrow', icon: <ArrowRightAltIcon /> },
];

const CreateMenu = () => {
  const router = useRouter();
  const { data: menuData } = useGetAllMenu(); 
  
  const [menuFormData, setMenuFormData] = useState({
    name: "",
    icon: "", 
    url: "",
    user: 1,
  });
  const [submenuFormData, setSubmenuFormData] = useState({
    name: "",
    menu: "",
    icon: "", 
    url: "",
  });

  const [menuErrors, setMenuErrors] = useState({});
  const [submenuErrors, setSubmenuErrors] = useState({});

  const validateMenuForm = (data) => {
    let formErrors = {};
    Object.keys(data).forEach((key) => {
      if (!data[key]) { 
        formErrors[key] = "This field is required";
      }
    });
    setMenuErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const validateSubmenuForm = (data) => {
    let formErrors = {};
    Object.keys(data).forEach((key) => {
      if (!data[key]) { 
        formErrors[key] = "This field is required";
      }
    });
    setSubmenuErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleInputChange = (dataType, field, value) => {
    if (dataType === 'menu') {
      setMenuFormData((prevState) => ({
        ...prevState,
        [field]: value,
      }));
      if (value) {
        setMenuErrors((prevErrors) => ({
          ...prevErrors,
          [field]: "",
        }));
      }
    } else if (dataType === 'submenu') {
      setSubmenuFormData((prevState) => ({
        ...prevState,
        [field]: value,
      }));
      if (value) {
        setSubmenuErrors((prevErrors) => ({
          ...prevErrors,
          [field]: "",
        }));
      }
    }
  };

  const handleMenuSubmit = async () => {
    if (validateMenuForm(menuFormData)) {
      try {
        const token = getToken();
        if (!token) {
          throw new Error("No authentication token found.");
        }

        const form = new FormData();
        Object.keys(menuFormData).forEach((key) => {
          form.append(key, menuFormData[key]);
        });

        const response = await MainApi.post("/api/menu/", form, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 201) {
          router.push("/superadmin/menu");
        }
      } catch (error) {
        console.error("Error submitting menu form:", error.response?.data || error.message);
      }
    }
  };

  const handleSubmenuSubmit = async () => {
    if (validateSubmenuForm(submenuFormData)) {
      try {
        const token = getToken();
        if (!token) {
          throw new Error("No authentication token found.");
        }

        const form = new FormData();
        Object.keys(submenuFormData).forEach((key) => {
          form.append(key, submenuFormData[key]);
        });

        const response = await MainApi.post("/api/submenu/", form, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 201) {
          router.push("/superadmin/menu");
        }
      } catch (error) {
        console.error("Error submitting submenu form:", error.response?.data || error.message);
      }
    }
  };

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12} sm={12} md={12}>
        <Card>
          <CardContent>
            <Grid item>
              <Typography className={poppins.className} sx={{ fontSize: "16px", fontWeight: "600" }}>
                Add Menu
              </Typography>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={12} sm={3} md={3}>
                <CustomLabel htmlFor="name" required>
                  Menu
                </CustomLabel>
                <CustomTextField
                  id="name"
                  name="name"
                  placeholder="Name"
                  type="text"
                  value={menuFormData.name}
                  onChange={(e) => handleInputChange('menu', "name", e.target.value)}
                  error={!!menuErrors.name}
                  helperText={menuErrors.name}
                  required
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={3} md={3}>
                <FormControl fullWidth required error={!!menuErrors.icon}>
                  <CustomLabel htmlFor="icon" required>
                    Icon
                  </CustomLabel>
                  <Select
                    id="icon"
                    name="icon"
                    value={menuFormData.icon}
                    onChange={(e) => handleInputChange('menu', "icon", e.target.value)}
                    label="Icon"
                    sx={{ height: "40px" }}
                  >
                    {iconsList.map((icon) => (
                      <MenuItem key={icon.value} value={icon.value} sx={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {icon.icon}
                          <Typography sx={{ ml: 1 }}>{icon.label}</Typography>
                        </div>
                      </MenuItem>
                    ))}
                  </Select>
                  {menuErrors.icon && <Typography color="error">{menuErrors.icon}</Typography>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <CustomLabel htmlFor="url" required>
                  URL
                </CustomLabel>
                <CustomTextField
                  id="url"
                  name="url"
                  type="text"
                  value={menuFormData.url}
                  onChange={(e) => handleInputChange('menu', "url", e.target.value)}
                  placeholder="URL"
                  error={!!menuErrors.url}
                  helperText={menuErrors.url}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={12} sx={{ marginTop: 3, display: "flex", justifyContent: "flex-end" }}>
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
                onClick={handleMenuSubmit}
                className={poppins.className}
              >
                Save
              </Button>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ marginTop: 2 }}>
          <CardContent>
            <Grid item>
              <Typography className={poppins.className} sx={{ fontSize: "16px", fontWeight: "600" }}>
                Add Sub Menu
              </Typography>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={12} sm={3} md={3}>
                <CustomLabel htmlFor="submenu" required>
                  Sub Menu
                </CustomLabel>
                <CustomTextField
                  id="submenu"
                  name="submenu"
                  placeholder="Name"
                  type="text"
                  value={submenuFormData.name}
                  onChange={(e) => handleInputChange('submenu', "name", e.target.value)}
                  error={!!submenuErrors.name}
                  helperText={submenuErrors.name}
                  required
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={3} md={3}>
                <FormControl fullWidth required error={!!submenuErrors.menu}>
                  <CustomLabel htmlFor="menu" required>
                    Menu
                  </CustomLabel>
                  <Select
                    id="menu"
                    name="menu"
                    value={submenuFormData.menu}
                    onChange={(e) => handleInputChange('submenu', "menu", e.target.value)}
                    label="Menu"
                    sx={{ height: "40px" }}
                  >
                    {menuData?.results.map((menu) => (
                      <MenuItem key={menu.id} value={menu.id}>
                        {menu.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {submenuErrors.menu && <Typography color="error">{submenuErrors.menu}</Typography>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={3} md={3}>
                <FormControl fullWidth required error={!!submenuErrors.icon}>
                  <CustomLabel htmlFor="icon" required>
                    Icon
                  </CustomLabel>
                  <Select
                    id="icon"
                    name="icon"
                    value={submenuFormData.icon}
                    onChange={(e) => handleInputChange('submenu', "icon", e.target.value)}
                    label="Icon"
                    sx={{ height: "40px" }}
                  >
                    {submenuiconsList.map((icon) => (
                      <MenuItem key={icon.value} value={icon.value} sx={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {icon.icon}
                          
                        </div>
                      </MenuItem>
                    ))}
                  </Select>
                  {submenuErrors.icon && <Typography color="error">{submenuErrors.icon}</Typography>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={3} md={3}>
                <CustomLabel htmlFor="url" required>
                  URL
                </CustomLabel>
                <CustomTextField
                  id="url"
                  name="url"
                  type="text"
                  value={submenuFormData.url}
                  onChange={(e) => handleInputChange('submenu', "url", e.target.value)}
                  placeholder="URL"
                  error={!!submenuErrors.url}
                  helperText={submenuErrors.url}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid item  xs={12} sm={12} md={12} sx={{ marginTop: 3, display: "flex", justifyContent: "flex-end" }}>
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
                onClick={handleSubmenuSubmit}
                className={poppins.className}
              >
                Save
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CreateMenu;
