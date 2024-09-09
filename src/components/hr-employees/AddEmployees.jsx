import React, { useState } from "react";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../CustomLabel";
import { Typography, Button, Grid, Divider, CardContent } from "@mui/material";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { usePermissions } from "@/contexts/PermissionsContext";
import useGetAllDepartments from "@/api-manage/react-query/useGetAllDepartments";
import useGetAllDesignations from "@/api-manage/react-query/useGetAllDesignations";
const AddEmployees = ({ role }) => {

  const {permissionsData} = usePermissions();
  const { data: departmentData, refetch: departmentRefetch } =
  useGetAllDepartments();
  const { data: designationData, refetch: designationRefetch } =
  useGetAllDesignations();
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    profile: {
      gender: "",
      date_of_joining: "",
      date_of_birth: "",
      marital_status: "",
      contact_no: "",
      profile_image: null,
      address: "",
      department: "Select Department",
      designation: "Select Designation",
      company: permissionsData?.user?.profile?.company,
      branch: permissionsData?.user?.profile?.branch
    },
    role: {
      role: permissionsData?.role,
    },
  });

  const [errors, setErrors] = useState({});
  const token = getToken();
  const router = useRouter();

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



  const handleImageUpload = (file) => {
    setFormData((prevData) => ({
      ...prevData,
      profile_image: file,
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await MainApi.post("/api/users/", formData, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (response.status === 201) {
          alert("Employee added successfully!");
          window.location.reload();
          router.push("/hr/employees");
        } else {
          throw new Error("Unexpected response from server");
        }
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
              Personal Information.
            </Typography>

            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2} mt={2}>
             
              <Grid item xs={12} md={6}>
                <CustomLabel htmlFor="first_name" required>
                  First Name:
                </CustomLabel>
                <CustomTextField
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

              <Grid item xs={12} md={6}>
                <CustomLabel htmlFor="last_name" required>
                  Last Name:
                </CustomLabel>
                <CustomTextField
                  id="last_name"
                  name="last_name"
                  placeholder="Last Name"
                  type="text"
                  value={formData.last_name}
                  onChange={handleChange}
                  error={!!errors.last_name}
                  helperText={errors.last_name}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={4}>
                <CustomLabel htmlFor="gender" required>
                  Gender:
                </CustomLabel>
                <FormControl fullWidth required sx={{ height: 40 }}>
                  <InputLabel htmlFor="gender">Choose</InputLabel>
                  <Select
                    id="gender"
                    name="gender"
                    value={formData.profile.gender}
                    onChange={handleChange}
                    error={!!errors["profile.gender"]}
                    sx={{ height: 40 }}
                    >
                    <MenuItem value="m">Male</MenuItem>
                    <MenuItem value="f">Female</MenuItem>
                    <MenuItem value="t">Transgender</MenuItem>
                  </Select>
                  {errors["profile.gender"] && (
                    <Typography color="error">
                      {errors["profile.gender"]}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <CustomLabel htmlFor="maritalStatus" required>
                  Marital Status:
                </CustomLabel>
                <FormControl fullWidth required sx={{ height: 40 }}>
                  <InputLabel htmlFor="marital_status">Choose</InputLabel>
                  <Select
                    id="marital_status"
                    name="marital_status"
                    value={formData.profile.marital_status}
                    onChange={handleChange}
                    error={!!errors["profile.marital_status"]}
                    sx={{ height: 40 }}
                  >
                    <MenuItem value="married">Married</MenuItem>
                    <MenuItem value="unmarried">Unmarried</MenuItem>
                  </Select>
                  {errors["profile.marital_status"] && (
                    <Typography color="error">
                      {errors["profile.marital_status"]}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <CustomLabel htmlFor="date_of_birth" required>
                  Date of Birth:
                </CustomLabel>
                <CustomTextField
                  id="date_of_birth"
                  name="date_of_birth"
                  type="date"
                  value={formData.profile.date_of_birth}
                  onChange={handleChange}
                  error={!!errors["profile.date_of_birth"]}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={4}>
                <CustomLabel htmlFor="contact_no" required>
                  Phone Number
                </CustomLabel>
                <CustomTextField
                  id="phone"
                  name="contact_no"
                  type="text"
                  placeholder="(+91)"
                  value={formData.profile.contact_no}
                  onChange={handleChange}
                  error={!!errors["profile.contact_no"]}
                  helperText={errors["profile.contact_no"]}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomLabel htmlFor="email" required>
                  Email
                </CustomLabel>
                <CustomTextField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g. test@creworder.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  fullWidth
                />
              </Grid>

              <Grid item xs={4}>
                <CustomLabel htmlFor="profile_image" required>
                  Category Image:
                </CustomLabel>
                <CustomTextField
                  id="profile_image"
                  name="profile_image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files[0])} // Handle image upload
                  error={!!errors.profile_image}
                  helperText={errors.profile_image}
                  required
                  fullWidth
                />
              </Grid>

             
            </Grid>

            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} sm={12}>
                <CustomLabel htmlFor="address" required>
                  Address:
                </CustomLabel>
                <CustomTextField
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Address"
                  value={formData.profile.address}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12}>
                <Divider sx={{ marginBottom: 2 }} />
              </Grid>
              <Grid item>
                <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                  Office Information.
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>

               <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="department" required>
                    Department
                  </CustomLabel>
                  <CustomTextField
                    id="department"
                    name="department"
                    select
                    fullWidth
                    value={formData.profile.department}
                    onChange={handleChange}
                    error={!!errors.department}
                    helperText={errors.department}
                  >
                    <MenuItem value="Select Department" disabled>
                      Select Department
                    </MenuItem>
                    {departmentData?.results.map((row, index) => (
                      <MenuItem value={row?.id}>{row.name}</MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="designation" required>
                    Designation
                  </CustomLabel>
                  <CustomTextField
                    id="designation"
                    name="designation"
                    select
                    fullWidth
                    value={formData.profile.designation}
                    onChange={handleChange}
                    error={!!errors.designation}
                    helperText={errors.designation}
                  >
                    <MenuItem value="Select Designation" disabled>
                      Select Designation
                    </MenuItem>
                    {designationData?.results.map((row, index) => (
                      <MenuItem value={row?.id}>{row.name}</MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>

             
              <Grid item xs={12} md={4}>
                <CustomLabel htmlFor="date_of_joining" required>
                  Date of Joining:
                </CustomLabel>
                <CustomTextField
                  id="date_of_joining"
                  name="date_of_joining"
                  type="date"
                  value={formData.profile.date_of_joining}
                  onChange={handleChange}
                  error={!!errors["profile.date_of_joining"]}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={4}>
                <CustomLabel htmlFor="username" required>
                  Username:
                </CustomLabel>
                <CustomTextField
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
                <CustomLabel htmlFor="username" required>
                  Password:
                </CustomLabel>
                <CustomTextField
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  fullWidth
                />
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

export default AddEmployees;
