import React, { useState, useEffect } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CustomTextField from "@/components/CustomTextField";
import useGetAllDepartments from "@/api-manage/react-query/useGetAllDepartments";
import useGetAllDesignations from "@/api-manage/react-query/useGetAllDesignations";
import { usePermissions } from "@/contexts/PermissionsContext";
import CustomLabel from "../customLabel";
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { getToken } from "@/utils/getToken";
import MainApi from "@/api-manage/MainApi";
const handleFileChange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById("preview").src = e.target.result;
  };
  if (file) {
    reader.readAsDataURL(file);
  }
};

const EditEmployee = () => {
  const router = useRouter();
  const { id } = router.query;
  const {permissionsData} = usePermissions();
  const { data: departmentData, refetch: departmentRefetch } =
  useGetAllDepartments();
  const { data: designationData, refetch: designationRefetch } =
  useGetAllDesignations();
  const [employees, setEmployees] = useState({
    username: "",
    first_name: "",
    last_name: "",
    profile_image: null,
    email: "",
    date_joined: "",
    profile: {
      gender: "",
      date_of_joining: "",
      date_of_birth: "",
      marital_status: "",
      contact_no: "",
      profile_image: null,
      company: permissionsData?.user?.profile?.company
    },
    role: {
      role: permissionsData?.role,
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployees((prevEmployees) => ({
      ...prevEmployees,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found.");
      }

      const formData = new FormData();
      for (const key in employees) {
        formData.append(key, employees[key]);
      }

      console.log("Employee Form Data", formData);

      const response = await MainApi.put(`/api/users/${id}/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("Employees updated successfully");
        router.push("/admin/employees");
      } else {
        console.error("Failed to update the Employees");
        setError("Failed to update the Employees");
      }
    } catch (error) {
      console.error("An error occurred while updating the Employees:", error);
      setError("An error occurred while updating the Employees");
    }
  };

  useEffect(() => {
    if (id) {
      const fetchEmployee = async () => {
        try {
          setLoading(true);
          const token = getToken();
          if (!token) {
            throw new Error("No authentication token found.");
          }

          const response = await MainApi.get(`/api/users/${id}`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });

          if (response.status === 200) {
            setEmployees(response.data);
          } else {
            console.error("Failed to fetch the employee");
            setError("Failed to fetch the employee");
          }
        } catch (error) {
          console.error(
            "An error occurred while fetching the employee:",
            error
          );
          setError("An error occurred while fetching the employee");
        } finally {
          setLoading(false);
        }
      };

      fetchEmployee();
    }
  }, [id]);

  const formatDate = (dateString) => {
    var date = new Date(dateString);
    date = date.toLocaleDateString();
    const parts = date.split("/");
  
  // Check if we have exactly three parts (month, day, year)
  if (parts.length !== 3) {
    console.error("Invalid date format. Expected format: 'M/D/YYYY'");
    return null;
  }

  // Extract month, day, and year from the split parts
  const [month, day, year] = parts;

  // Check if month, day, and year are not undefined
  if (!month || !day || !year) {
    console.error("Invalid date format. Month, day, or year is missing.");
    return null;
  }

  // Pad month and day with leading zeros if necessary
  const paddedMonth = month.padStart(2, '0');
  const paddedDay = day.padStart(2, '0');

  // Format the date in "YYYY-MM-DD"
  return `${year}-${paddedMonth}-${paddedDay}`;
  };

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <Grid item>
            <Typography
              sx={{ mt: 2, ml: 2, fontSize: "16px", fontWeight: "600" }}
            >
              Update Employee .
            </Typography>
          </Grid>
          <Divider sx={{ my: 2 }} />

          <CardContent>
            <Grid item>
              <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                Personal Information.
              </Typography>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                marginTop: 2,
              }}
            >
              <Grid item sx={{ flex: 1 }}>
                <CustomLabel htmlFor="username" required>
                  Username: :
                </CustomLabel>
                <CustomTextField
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter UserName"
                  required
                  fullWidth
                  value={employees.username}
                  onChange={handleInputChange}
                />
              </Grid>

              
              <Grid item sx={{ flex: 1 }}>
                <CustomLabel htmlFor="password" required>
                  Password: :
                </CustomLabel>
                <CustomTextField
                  id="password"
                  name="password"
                  type="password"
                  required
                  fullWidth
                  value={employees.password}
                  onChange={handleInputChange}
                />
              </Grid>
        


              <Grid item sx={{ flex: 1 }}>
                <CustomLabel htmlFor="first_name" required>
                  First Name
                </CustomLabel>
                <CustomTextField
                  id="first_name"
                  name="first_name"
                  placeholder="First Name"
                  type="text"
                  value={employees.first_name}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
              </Grid>

              <Grid item sx={{ flex: 1 }}>
                <CustomLabel htmlFor="last_name" required>
                  Last Name
                </CustomLabel>
                <CustomTextField
                  id="last_name"
                  name="last_name"
                  placeholder="Last Name"
                  type="text"
                  value={employees.last_name}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                marginTop: 2,
              }}
            >
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="category" required>
                  Gender
                </CustomLabel>
                <Select
                  labelId="gender"
                  id="gender"
                  name="gender"
                  value={employees.profile.gender}
                  onChange={handleInputChange}
                  displayEmpty
                  sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Gender
                  </MenuItem>
                  <MenuItem value="m">Male</MenuItem>
                  <MenuItem value="f">Female</MenuItem>
                  <MenuItem value="t">Other</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="category" required>
                  Marital Status
                </CustomLabel>
                <Select
                  labelId="gender"
                  id="gender"
                  name="gender"
                  value={employees.profile.marital_status}
                  onChange={handleInputChange}
                  displayEmpty
                  sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Marital Status
                  </MenuItem>
                  <MenuItem value="married">Married</MenuItem>
                  <MenuItem value="unmarried">UnMarried</MenuItem>
                </Select>
              </Grid>

              <Grid item sx={{ flex: 1 }}>
                <CustomLabel htmlFor="dob" required>
                  Date of Birth:
                </CustomLabel>
                <CustomTextField
                  id="dob"
                  name="dob"
                  type="date"
                  value={employees.profile.date_of_birth}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                marginTop: 2,
              }}
            >
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="phone" required>
                  Phone Number
                </CustomLabel>
                <CustomTextField
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="(+91)"
                  value={employees.profile.contact_no}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="email" required>
                  Email
                </CustomLabel>
                <CustomTextField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g. test@creworder.com"
                  value={employees.email}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  sx={{ height: 40 }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="profile_images" required>
                  Upload Profile
                </CustomLabel>

                <img
                  id="preview"
                  src="https://static.vecteezy.com/system/resources/thumbnails/021/353/308/small_2x/user-icon-for-website-and-mobile-apps-png.png"
                  alt="Preview"
                  width="35%"
                  style={{ objectFit: "contain" }}
                />
                <input
                  type="file"
                  id="profile_images"
                  onChange={handleFileChange}
                  style={{ marginTop: "8px", display: "block", width: "100%" }}
                />
              </Grid>
            </Grid>

            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                marginTop: 2,
              }}
            >
              <Grid item xs={12} sm={12}>
                <CustomLabel htmlFor="address" required>
                  Address:
                </CustomLabel>
                <CustomTextField
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Address"
                  value={employees.profile.address}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  multiline
                  rows={4} // This makes it a textarea
                />
              </Grid>
            </Grid>
            <Grid container>
              {/* Other components/content above */}
              <Grid item xs={12}>
                <Divider sx={{ marginBottom: 2 }} />
              </Grid>
              <Grid item>
                <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                  Office Information.
                </Typography>
              </Grid>
              {/* Other components/content below */}
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                marginTop: 2,
              }}
            >
              <Grid item sx={{ flex: 1 }}>
                <CustomLabel htmlFor="designation" required>
                  Department:
                </CustomLabel>
                <Select
                  labelId="gender"
                  id="gender"
                  name="gender"
                  value={employees.profile.department}
                  onChange={handleInputChange}
                  displayEmpty
                  sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Department
                  </MenuItem>
                  {departmentData?.results.map((row, index) => (
                      <MenuItem value={row?.id}>{row.name}</MenuItem>
                    ))}
                </Select>
              </Grid>

              <Grid item sx={{ flex: 1 }}>
                <CustomLabel htmlFor="designation" required>
                  Designation:
                </CustomLabel>
                <Select
                  labelId="gender"
                  id="gender"
                  name="gender"
                  value={employees.profile.designation}
                  onChange={handleInputChange}
                  displayEmpty
                  sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Designation
                  </MenuItem>
                  {designationData?.results.map((row, index) => (
                      <MenuItem value={row?.id}>{row.name}</MenuItem>
                    ))}
                </Select>
              </Grid>
              <Grid item sx={{ flex: 1 }}>
                <CustomLabel htmlFor="doj" required>
                  Date of Joining:
                </CustomLabel>
                <CustomTextField
                  id="doj"
                  name="doj"
                  type="date"
                  // value="1984-08-09"
                  value={formatDate(employees.profile.date_of_joining)}
                  onChange={handleInputChange}
                  required
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

export default EditEmployee;
