import React, { useState } from "react";
import CustomCard from "../CustomCard";
import {
  CardContent,
  Grid,
  Tooltip,
  IconButton,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";
import dynamic from "next/dynamic";
import CustomTextField from "../CustomTextField";
import CustomLabel from "../CustomLabel";
import UploadFileIcon from "@mui/icons-material/CloudUpload";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Poppins } from "next/font/google";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const AddEmployees = ({ onEmployeesList }) => {
  const [photo, setPhoto] = useState(null);
  const [summary, setSummary] = useState("");

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleDescriptionChange = (value) => {
    setSummary(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onEmployeesList();
  };

  return (
    <Grid container spacing={2} sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
              Add Employees
            </Typography>
            <Divider sx={{ my: 2 }} />
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={3} md={3}>
                  <CustomLabel htmlFor="employeeid" required>
                    Employee Id
                  </CustomLabel>
                  <CustomTextField
                    id="employeeid"
                    name="employeeid"
                    placeholder="employeeid"
                    type="text"
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={3} md={3}>
                  <CustomLabel htmlFor="salutation" required>
                    Salutation
                  </CustomLabel>
                  <CustomTextField
                    id="salutation"
                    name="salutation"
                    type="text"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={3} md={3}>
                  <CustomLabel htmlFor="employeename" required>
                    Employee Name
                  </CustomLabel>
                  <CustomTextField
                    id="employeename"
                    name="employeename"
                    type="employeename"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <CustomLabel htmlFor="employeeemail" required>
                    Employee Email
                  </CustomLabel>
                  <CustomTextField
                    id="employeeemail"
                    name="employeeemail"
                    type="employeeemail"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <CustomLabel htmlFor="dob" required>
                    Date of Birth
                  </CustomLabel>
                  <CustomTextField id="dob" name="dob" type="dob" fullWidth />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <CustomLabel htmlFor="designation" required>
                    Designation
                  </CustomLabel>
                  <CustomTextField
                    id="designation"
                    name="designation"
                    type="designation"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <CustomLabel htmlFor="department" required>
                    Department
                  </CustomLabel>
                  <CustomTextField
                    id="department"
                    name="department"
                    type="department"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <CustomLabel htmlFor="fileUpload" required>
                    Upload File
                  </CustomLabel>
                  <input
                    id="fileUpload"
                    name="fileUpload"
                    type="file"
                    style={{ width: "100%" }}
                  />
                </Grid>

                <Grid item xs={12} sm={3} md={3}>
                  <CustomLabel htmlFor="country" required>
                    Country
                  </CustomLabel>
                  <CustomTextField
                    id="country"
                    name="country"
                    type="country"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <CustomLabel htmlFor="mobile" required>
                    Mobile
                  </CustomLabel>
                  <CustomTextField
                    id="mobile"
                    name="mobile"
                    type="mobile"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <CustomLabel htmlFor="gender" required>
                    Gender
                  </CustomLabel>
                  <CustomTextField
                    id="gender"
                    name="gender"
                    type="gender"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <CustomLabel htmlFor="joiningdate" required>
                    Joining Date
                  </CustomLabel>
                  <CustomTextField
                    id="joiningdate"
                    name="joiningdate"
                    type="joiningdate"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <CustomLabel htmlFor="reporting_to" required>
                    Reporting To
                  </CustomLabel>
                  <CustomTextField
                    id="reporting_to"
                    name="reporting_to"
                    type="reporting_to"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <CustomLabel htmlFor="userrole" required>
                    User Role
                  </CustomLabel>
                  <CustomTextField
                    id="userrole"
                    name="userrole"
                    type="userrole"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <CustomLabel htmlFor="address" required>
                    Address
                  </CustomLabel>
                  <CustomTextField
                    id="address"
                    name="address"
                    type="address"
                    fullWidth
                    multiline
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <CustomLabel htmlFor="about" required>
                    About
                  </CustomLabel>
                  <CustomTextField
                    id="about"
                    name="about"
                    type="about"
                    fullWidth
                    multiline
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12} mt={2}>
                  <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                    Other Details
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4} md={4}>
                  <CustomLabel htmlFor="hourlyrate" required>
                    Hourly Rate
                  </CustomLabel>
                  <CustomTextField
                    id="hourlyrate"
                    name="hourlyrate"
                    type="hourlyrate"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <CustomLabel htmlFor="slackmemberid" required>
                    Slack Member Id
                  </CustomLabel>
                  <CustomTextField
                    id="slackmemberid"
                    name="slackmemberid"
                    type="slackmemberid"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <CustomLabel htmlFor="skills" required>
                    Skills
                  </CustomLabel>
                  <CustomTextField
                    id="skills"
                    name="skills"
                    type="skills"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={4} md={4}>
                  <CustomLabel htmlFor="date" required>
                  Probation End Date 
                  </CustomLabel>
                  <CustomTextField
                    id="date"
                    name="date"
                    type="date"
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <CustomLabel htmlFor="date" required>
                  Notice Period Start Date 
                  </CustomLabel>
                  <CustomTextField
                    id="date"
                    name="date"
                    type="date"
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <CustomLabel htmlFor="date" required>
                  Notice Period End Date 
                  </CustomLabel>
                  <CustomTextField
                    id="date"
                    name="date"
                    type="date"
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <CustomLabel htmlFor="date" required>
                  Employment Type

                  </CustomLabel>
                  <CustomTextField
                    id="date"
                    name="date"
                    type="date"
                    style={{ width: "100%" }}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  marginTop: 2,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  type="submit"
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
                >
                  Submit
                </Button>
              </Grid>
            </form>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default AddEmployees;
