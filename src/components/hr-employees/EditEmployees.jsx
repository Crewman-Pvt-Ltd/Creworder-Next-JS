import React, { useEffect, useState } from "react";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../CustomLabel";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";
import useGetAllBranches from "@/api-manage/react-query/useGetAllBranches";
import useGetAllDepartments from "@/api-manage/react-query/useGetAllDepartments";
import useGetAllDesignations from "@/api-manage/react-query/useGetAllDesignations";
import useGetAllUsers from "@/api-manage/react-query/useGetAllUsers";
import { usePermissions } from "@/contexts/PermissionsContext";
import {
  Typography,
  Button,
  Grid,
  CardContent,
  Divider,
  MenuItem,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Tooltip,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { get_username_suggestions } from "@/api-manage/ApiRoutes";
  const EditEmployee = () => {
  const { data: branchData, refetch: branchRefetch } = useGetAllBranches();
  const { data: departmentData, refetch: departmentRefetch } =
    useGetAllDepartments();
  const { data: designationData, refetch: designationRefetch } =
    useGetAllDesignations();
  const { data: usersData, refetch: usersRefetch } = useGetAllUsers();
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    date_joined: "",
    profile: {
      gender: "",
      date_of_joining: "",
      date_of_birth: "",
      marital_status: "",
      professional_email: "",
      contact_no: "",
      address: "",
      department: "",
      designation: "",
      branch: "",
      company: "",
      reporting: "",
      employment_type: "",
      enrollment_id: "",
      reporting: "",
      employee_id: "",
    },
    role: {
      role: "superadmin",
    },
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      if (id) {
        try {
          setLoading(true);
          const token = getToken();
          const response = await MainApi.get(`/api/users/${id}/`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          if (response.status === 200) {
            // Pre-fill form with fetched data
            setFormData(response.data);
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchEmployee();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found.");
      }

      const compareFields = (formData, originalData) => {
        const updatedFields = {};
        for (const key in formData) {
          if (typeof formData[key] === "object" && formData[key] !== null) {
            const nestedUpdatedFields = compareFields(
              formData[key],
              originalData[key]
            );
            if (Object.keys(nestedUpdatedFields).length > 0) {
              updatedFields[key] = nestedUpdatedFields;
            }
          } else if (formData[key] !== originalData[key]) {
            updatedFields[key] = formData[key];
          }
        }
        return updatedFields;
      };

      const updatedFields = compareFields(formData, employees);
      console.log("Updated Fields", updatedFields);
      const response = await MainApi.patch(`/api/users/${id}/`, updatedFields, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("Employee updated successfully");
        router.push("/hr/employees");
      } else {
        console.error("Failed to update the employee");
        setError("Failed to update the employee");
      }
    } catch (error) {
      console.error("An error occurred while updating the employee:", error);
      setError("An error occurred while updating the employee");
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
            const employeeData = response.data;
            setEmployees(employeeData);
            setFormData(employeeData);
          } else {
            console.error("Failed to fetch the Agent");
            setError("Failed to fetch the Agent");
          }
        } catch (error) {
          console.error("An error occurred while fetching the Agent:", error);
          setError("An error occurred while fetching the Agent");
        } finally {
          setLoading(false);
        }
      };
      fetchEmployee();
    }
  }, [id]);

  const [errors, setErrors] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const handleRadioChange = (event) => {
    setFormData({ ...formData, loginAllowed: event.target.value });
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData((prevData) => ({ ...prevData, username: suggestion }));
    setSuggestions([]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
              Edit Employee
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                  Personal Info.
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="first_name" required>
                  First Name:
                </CustomLabel>
                <CustomTextField
                  id="first_name"
                  name="first_name"
                  placeholder="e.g. firstname"
                  type="text"
                  fullWidth
                  value={formData.first_name || ""}
                  onChange={handleChange}
                  error={!!errors.first_name}
                  helperText={errors.first_name}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="last_name" required>
                  Last Name:
                </CustomLabel>
                <CustomTextField
                  id="last_name"
                  name="last_name"
                  type="text"
                  placeholder="e.g. lastname"
                  fullWidth
                  value={formData.last_name || ""}
                  onChange={handleChange}
                  error={!!errors.last_name}
                  helperText={errors.last_name}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="dob" required>
                  Date of Birth:
                </CustomLabel>
                <CustomTextField
                  id="dob"
                  name="dob"
                  type="date"
                  fullWidth
                  value={formData?.profile?.date_of_birth}
                  onChange={handleChange}
                  error={!!errors.dob}
                  helperText={errors.dob}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="gender" required>
                  Select Gender
                </CustomLabel>
                <CustomTextField
                  id="gender"
                  name="gender"
                  select
                  fullWidth
                  value={formData?.profile?.gender}
                  onChange={handleChange}
                  error={!!errors.gender}
                  helperText={errors.gender}
                >
                  <MenuItem value="Select Gender" disabled>
                    Select Gender
                  </MenuItem>
                  <MenuItem value="m">Male</MenuItem>
                  <MenuItem value="f">Female</MenuItem>
                  <MenuItem value="o">Other</MenuItem>
                </CustomTextField>
              </Grid>

              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="maritalStatus" required>
                  Marital Status
                </CustomLabel>
                <CustomTextField
                  id="maritalStatus"
                  name="maritalStatus"
                  select
                  fullWidth
                  value={formData?.profile?.marital_status}
                  onChange={handleChange}
                  error={!!errors.maritalStatus}
                  helperText={errors.maritalStatus}
                >
                  <MenuItem value="Select Marital Status" disabled>
                    Select Marital Status
                  </MenuItem>
                  <MenuItem value="married">Married</MenuItem>
                  <MenuItem value="unmarried">Unmarried</MenuItem>
                </CustomTextField>
              </Grid>

              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="contact_number" required>
                  Contact Number
                </CustomLabel>
                <CustomTextField
                  id="contact_number"
                  name="contact_number"
                  type="tel"
                  placeholder="e.g. 9999999999"
                  fullWidth
                  value={formData?.profile?.contact_no}
                  onChange={handleChange}
                  error={!!errors.contact_number}
                  helperText={errors.contact_number}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="email" required>
                  Personal Email:
                </CustomLabel>
                <CustomTextField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g. email@example.com"
                  fullWidth
                  value={formData.email || ""}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="professionalemail" required>
                  Professional Email:
                </CustomLabel>
                <CustomTextField
                  id="professionalemail"
                  name="professionalemail"
                  type="email"
                  placeholder="e.g. email@example.com"
                  fullWidth
                  value={formData?.profile?.professional_email}
                  onChange={handleChange}
                  error={!!errors.professionalemail}
                  helperText={errors.professionalemail}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="doj" required>
                  Date of Joining:
                </CustomLabel>
                <CustomTextField
                  id="doj"
                  name="doj"
                  type="date"
                  fullWidth
                  value={formData?.profile?.date_of_joining}
                  onChange={handleChange}
                  error={!!errors.doj}
                  helperText={errors.doj}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={8}>
                <CustomLabel htmlFor="address" required>
                  Address:
                </CustomLabel>
                <CustomTextField
                  id="address"
                  name="address"
                  type="text"
                  placeholder="e.g. Address"
                  fullWidth
                  multiline
                  rows={2}
                  value={formData?.profile?.address}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="department" required>
                  Department
                </CustomLabel>
                <CustomTextField
                  id="department"
                  name="department"
                  select
                  fullWidth
                  value={formData?.profile?.department}
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
            </Grid>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="designation" required>
                  Designation
                </CustomLabel>
                <CustomTextField
                  id="designation"
                  name="designation"
                  select
                  fullWidth
                  value={formData?.profile?.designation}
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

              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="reportingto" required>
                  Reporting To
                </CustomLabel>
                <CustomTextField
                  id="reportingto"
                  name="reportingto"
                  select
                  fullWidth
                  value={formData?.profile?.reporting}
                  onChange={handleChange}
                  error={!!errors.reportingto}
                  helperText={errors.reportingto}
                >
                  <MenuItem value="Select Reporting To" disabled>
                    Select Reporting To
                  </MenuItem>
                  {usersData?.results.map((row, index) => (
                    <MenuItem value={row?.id}>{row.username}</MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="branch" required>
                  Branch
                </CustomLabel>
                <CustomTextField
                  id="branch"
                  name="branch"
                  select
                  fullWidth
                  value={formData?.profile?.branch}
                  onChange={handleChange}
                  error={!!errors.branch}
                  helperText={errors.branch}
                >
                  <MenuItem value="Select Branch" disabled>
                    Select Branch
                  </MenuItem>
                  {branchData?.results.map((row, index) => (
                    <MenuItem value={row?.id}>{row.name}</MenuItem>
                  ))}
                </CustomTextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="employeeType" required>
                  Employee Type
                </CustomLabel>
                <CustomTextField
                  id="employeeType"
                  name="employeeType"
                  select
                  fullWidth
                  value={formData?.profile?.employment_type}
                  onChange={handleChange}
                  error={!!errors.employeeType}
                  helperText={errors.employeeType}
                >
                  <MenuItem value="Employee Type" disabled>
                    Employee Type
                  </MenuItem>
                  <MenuItem value="full">Full-time</MenuItem>
                  <MenuItem value="part">Part-time</MenuItem>
                  <MenuItem value="trainee">Trainee</MenuItem>
                  <MenuItem value="intern">Internship</MenuItem>
                </CustomTextField>
              </Grid>
            </Grid>

            <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
              User Details
            </Typography>
            <Divider sx={{ my: 2 }} />
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
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                {suggestions.length > 0 && (
                  <List>
                    {suggestions.map((suggestion, index) => (
                      <ListItem
                        key={index}
                        button
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <ListItemText primary={suggestion} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                <CustomLabel htmlFor="password" required>
                  Password:
                </CustomLabel>
                <CustomTextField
                  id="password"
                  name="password"
                  type="text"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <FormLabel component="legend">
                  <b>Login Allowed:</b>
                </FormLabel>
                <RadioGroup
                  aria-label="loginAllowed"
                  name="loginAllowed"
                  value={String(formData?.profile?.login_allowed)}
                  onChange={(e) => handleRadioChange(e, "login_allowed")}
                  row
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSubmit}
                >
                  Update Agent
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default EditEmployee;
