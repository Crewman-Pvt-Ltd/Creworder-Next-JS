import React, { useState } from "react";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../CustomLabel";
import { Typography, Button, Grid, Divider, CardContent } from "@mui/material";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const CreateIPAccess= ({role, onAdminList }) => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    designation: "",
    department: "",
    profile: {
      gender: "",
      date_of_joining: "",
      date_of_birth: "",
      marital_status: "",
      contact_no: "",
      profile_image: null
    },
    role: {
      role: role
    }
  });

  const [errors, setErrors] = useState({});

  const token = getToken();
  const router = useRouter();
  const [gst, setGst] = useState('');
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (name in formData.profile) {
      setFormData({
        ...formData,
        profile: {
          ...formData.profile,
          [name]: type === "file" ? files[0] : value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "file" ? files[0] : value,
      });
    }
  };



  const validateForm = () => {
    const newErrors = {};
    for (const [key, value] of Object.entries(formData)) {
      if (!value && key !== "profile_image") {
        newErrors[key] = "This field is required";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };


  return (
    <Grid container>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography className={poppins.className} sx={{ fontSize: "16px", fontWeight: "600" }}>
              IP Access
            </Typography>

            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={4}>
                <CustomLabel className={poppins.className}  htmlFor="username" required>
                  IP Name:
                </CustomLabel>
                <CustomTextField
                className={poppins.className} 
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter Username"
                  value={formData.username}
                  onChange={handleChange}
                  error={!!errors.username}
                  helperText={errors.username}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <CustomLabel className={poppins.className}  htmlFor="first_name" required>
                  IP Number:
                </CustomLabel>
                <CustomTextField
                className={poppins.className} 
                  id="first_name"
                  name="first_name"
                  placeholder="First Name"
                  type="text"
                  value={formData.first_name}
                  onChange={handleChange}
                  error={!!errors.first_name}
                  helperText={errors.first_name}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <CustomLabel className={poppins.className}  htmlFor="gst" required>
                 Branch
                </CustomLabel>
                <Select
                className={poppins.className} 
                  labelId="gst"
                  id="gst"
                  name="gst"
                  value={gst}
                  onChange={handleInputChange(setGst)}
                  displayEmpty
                  sx={{ fontFamily: 'Poppins, sans-serif', height: '40px' }}
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Brach
                  </MenuItem>
                  <MenuItem value="0">Branch 1</MenuItem>
                  <MenuItem value="5">Branch 2</MenuItem>
                  <MenuItem value="18">Branch 3</MenuItem>
                  <MenuItem value="28">Branch 4</MenuItem>

                </Select>
              </Grid>
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
                  marginTop: 3,
                }}
                onClick={onAdminList}
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

export default CreateIPAccess
