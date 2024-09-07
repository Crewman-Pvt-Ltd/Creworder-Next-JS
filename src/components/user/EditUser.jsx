import React, { useState } from "react";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";
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
} from "@mui/material";

const EditUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    dob: "",
    doj: "",
    address: "",
    contact_number: "",
    professionalemail: "",
    gender: "Select Gender",
    maritalStatus: "Select Marital Status",
    department: "Select Department",
    designation: "Select Designation",
    reportingto: "Select Reporting To",
    branch: "Select Branch",
    role: "Select Role",
    team: "Select Team",
    manager: "Select Manager",
    employeeType: "Employee Type",
    loginAllowed: "no",
  });

  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleRadioChange = (event) => {
    setFormData({ ...formData, loginAllowed: event.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "first_name",
      "last_name",
      "dob",
      "doj",
      "gender",
      "maritalStatus",
      "contact_number",
      "email",
      "professionalemail",
      "address",
      "department",
      "designation",
      "reportingto",
      "branch",
      "role",
      "team",
      "employeeType",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field] === "Select Gender" || formData[field] === "Select Marital Status" || formData[field] === "Employee Type") {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = getToken();
    try {
      const response = await MainApi.post("/api/users/", {
        ...formData,
        profile: {
          gender: formData.gender,
          contact_no: formData.contact_number,
          marital_status: formData.maritalStatus,
          date_of_joining: formData.doj,
          address: formData.address,
          professional_email: formData.professionalemail,
          date_of_birth: formData.dob,
          reporting: formData.reportingto,
          branch: formData.branch,
        },
        role: {
          role: formData.role,
        }
      }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.status === 201) {
        router.push("/admin/users");
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
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
              Add User
            </Typography>
            <Divider sx={{ my: 2 }} />
            <form onSubmit={handleSubmit}>
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
                    value={formData.dob || ""}
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
                    value={formData.gender}
                    onChange={handleChange}
                    error={!!errors.gender}
                    helperText={errors.gender}
                  >
                    <MenuItem value="Select Gender" disabled>
                      Select Gender
                    </MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
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
                    value={formData.maritalStatus}
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
                    value={formData.contact_number || ""}
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
                    value={formData.professionalemail || ""}
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
                    value={formData.doj || ""}
                    onChange={handleChange}
                    error={!!errors.doj}
                    helperText={errors.doj}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} mt={2}>
                <Grid item xs={12} sm={6}>
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
                    value={formData.address || ""}
                    onChange={handleChange}
                    error={!!errors.address}
                    helperText={errors.address}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomLabel htmlFor="department" required>
                    Department
                  </CustomLabel>
                  <CustomTextField
                    id="department"
                    name="department"
                    select
                    fullWidth
                    value={formData.department}
                    onChange={handleChange}
                    error={!!errors.department}
                    helperText={errors.department}
                  >
                    <MenuItem value="Select Department" disabled>
                      Select Department
                    </MenuItem>
                    <MenuItem value="HR">HR</MenuItem>
                    <MenuItem value="Engineering">Engineering</MenuItem>
                    <MenuItem value="Marketing">Marketing</MenuItem>
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
                    value={formData.designation}
                    onChange={handleChange}
                    error={!!errors.designation}
                    helperText={errors.designation}
                  >
                    <MenuItem value="Select Designation" disabled>
                      Select Designation
                    </MenuItem>
                    <MenuItem value="Developer">Developer</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="Analyst">Analyst</MenuItem>
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
                    value={formData.reportingto}
                    onChange={handleChange}
                    error={!!errors.reportingto}
                    helperText={errors.reportingto}
                  >
                    <MenuItem value="Select Reporting To" disabled>
                      Select Reporting To
                    </MenuItem>
                    <MenuItem value="Supervisor">Supervisor</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="Director">Director</MenuItem>
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
                    value={formData.branch}
                    onChange={handleChange}
                    error={!!errors.branch}
                    helperText={errors.branch}
                  >
                    <MenuItem value="Select Branch" disabled>
                      Select Branch
                    </MenuItem>
                    <MenuItem value="Head Office">Head Office</MenuItem>
                    <MenuItem value="Branch A">Branch A</MenuItem>
                    <MenuItem value="Branch B">Branch B</MenuItem>
                  </CustomTextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomLabel htmlFor="role" required>
                    Role
                  </CustomLabel>
                  <CustomTextField
                    id="role"
                    name="role"
                    select
                    fullWidth
                    value={formData.role}
                    onChange={handleChange}
                    error={!!errors.role}
                    helperText={errors.role}
                  >
                    <MenuItem value="Select Role" disabled>
                      Select Role
                    </MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                  </CustomTextField>
                </Grid>
              </Grid>

              <Grid container spacing={2} mt={2}>
                <Grid item xs={12} sm={6}>
                  <CustomLabel htmlFor="team" required>
                    Team
                  </CustomLabel>
                  <CustomTextField
                    id="team"
                    name="team"
                    select
                    fullWidth
                    value={formData.team}
                    onChange={handleChange}
                    error={!!errors.team}
                    helperText={errors.team}
                  >
                    <MenuItem value="Select Team" disabled>
                      Select Team
                    </MenuItem>
                    <MenuItem value="Team A">Team A</MenuItem>
                    <MenuItem value="Team B">Team B</MenuItem>
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
                    value={formData.employeeType}
                    onChange={handleChange}
                    error={!!errors.employeeType}
                    helperText={errors.employeeType}
                  >
                    <MenuItem value="Employee Type" disabled>
                      Employee Type
                    </MenuItem>
                    <MenuItem value="Full-time">Full-time</MenuItem>
                    <MenuItem value="Part-time">Part-time</MenuItem>
                  </CustomTextField>
                </Grid>
              </Grid>

              <Grid container spacing={2} mt={2}>
                <Grid item xs={12}>
                  <FormLabel component="legend">Login Allowed:</FormLabel>
                  <RadioGroup
                    aria-label="loginAllowed"
                    name="loginAllowed"
                    value={formData.loginAllowed}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>

              <Grid container spacing={2} mt={2}>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Save User
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default EditUser;
