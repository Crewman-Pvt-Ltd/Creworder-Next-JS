import React, { useState, useEffect } from "react";
import CustomCard from "../CustomCard";
import CustomTextField from "../CustomTextField";
import { Poppins } from "next/font/google";
import {
  Typography,
  Divider,
  Grid,
  Button,
  CardContent,
  IconButton,
  TableHead,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import CustomLabel from "../CustomLabel";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";
import { Edit, Delete } from "@mui/icons-material";
import swal from "sweetalert";
import { usePermissions } from "@/contexts/PermissionsContext";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const EmailSettings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [emailSettings, setEmailSettings] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    hostname: "",
    mail_smtp: "",
    mail_port: "",
    user: "", // Default to empty string
    branch: "", // Default to empty string
    company: "", // Default to empty string
  });
  const [formErrors, setFormErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const { permissionsData } = usePermissions();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Fetch Email Settings
  const fetchEmailSettings = async () => {
    try {
      const token = getToken();
      const response = await MainApi.get("/api/user-mail-setup/", {
        headers: { Authorization: `Token ${token}` },
      });
      setEmailSettings(response.data.results);
    } catch (error) {
      console.error("Failed to fetch User mail Setup:", error);
    }
  };

  useEffect(() => {
    fetchEmailSettings();
  }, []);

  // Set formData after permissionsData is available
  useEffect(() => {
    if (permissionsData?.user) {
      setFormData((prevData) => ({
        ...prevData,
        user: permissionsData.user.id,
        branch: permissionsData.user.profile.branch,
        company: permissionsData.user.profile.company,
      }));
    }
  }, [permissionsData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required.";
    if (!formData.email) errors.email = "Email is required.";
    if (!formData.username) errors.username = "Username is required.";
    if (!formData.password) errors.password = "Password is required.";
    if (!formData.hostname) errors.hostname = "Hostname is required.";
    if (!formData.mail_smtp) errors.mail_smtp = "SMTP is required.";
    if (!formData.mail_port) errors.mail_port = "Port is required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const token = getToken();
      const endpoint = editId
        ? `/api/user-mail-setup/${editId}/`
        : "/api/user-mail-setup/";
      const method = editId ? "put" : "post";
      const response = await MainApi[method](endpoint, formData, {
        headers: { Authorization: `Token ${token}` },
      });

      if (response.status === 201 || response.status === 200) {
        swal({
          title: editId
            ? "User Email Setup Updated"
            : "User Email Setup Created",
          text: editId ? "Successfully Updated!" : "Successfully Created!",
          icon: "success",
          button: "Ok",
        });
      }

      if (editId) {
        setEmailSettings((prev) =>
          prev.map((item) =>
            item.id === editId ? { ...item, ...response.data } : item
          )
        );
      } else {
        setEmailSettings((prev) => [...prev, response.data]);
      }

      setFormData({
        name: "",
        email: "",
        username: "",
        password: "",
        hostname: "",
        mail_smtp: "",
        mail_port: "",
        user: permissionsData?.user?.id,
        branch: permissionsData?.user?.profile?.branch,
        company: permissionsData?.user?.profile?.company,
      });
      setEditId(null);
      setFormErrors({});
    } catch (error) {
      swal({
        title: "Action Failed",
        text: editId ? "Failed to Update!" : "Failed to Create!",
        icon: "error",
        button: "Ok",
      });
    }
  };

  const handleEdit = (detail) => {
    setFormData(detail);
    setEditId(detail.id);
  };

  const handleDelete = async (id) => {
    try {
      const token = getToken();
      const response = await MainApi.delete(`/api/user-mail-setup/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });

      if (response.status === 204) {
        swal({
          title: "User Email Setup Deleted",
          text: "Successfully Deleted!",
          icon: "success",
          button: "Ok",
        });
        setEmailSettings((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      swal({
        title: "Action Failed",
        text: "Failed to Delete!",
        icon: "error",
        button: "Ok",
      });
    }
  };

  return (
    <CustomCard>
      <CardContent>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab className={poppins.className} label="Setup Email" />
          <Tab className={poppins.className} label="Otp For Mail" />
          <Tab className={poppins.className} label="Reports" />
        </Tabs>
        <Divider sx={{ my: 2 }} />

        {activeTab === 0 && (
          <Box>
            <Grid container spacing={2}>
              {[
                "name",
                "email",
                "username",
                "password",
                "hostname",
                "mail_smtp",
                "mail_port",
              ].map((field) => (
                <Grid item xs={12} sm={4} key={field}>
                  <CustomLabel htmlFor={field} required>
                    {field.replace("_", " ").toUpperCase()}
                  </CustomLabel>
                  <CustomTextField
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    placeholder={`Enter ${field}`}
                    fullWidth
                    error={!!formErrors[field]}
                    helperText={formErrors[field]}
                  />
                </Grid>
              ))}
              <Grid
                item
                xs={12}
                md={12}
                sm={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  onClick={handleSave}
                  sx={{
                    backgroundColor: "#405189",
                    color: "white",
                    "&:hover": { backgroundColor: "#405189" },
                  }}
                  className={poppins.className}
                >
                  {editId ? "Update" : "Save"}
                </Button>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ mt: 4 }}>
              <CustomCard>
                <CardContent>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "20px",
                      textTransform: "capitalize",
                      color: "black",
                    }}
                    className={poppins.className}
                  >
                    User Mail Setup List
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell className={poppins.className}>
                            ID
                          </TableCell>
                          <TableCell className={poppins.className}>
                            Mail From Name
                          </TableCell>
                          <TableCell className={poppins.className}>
                            Mail SMTP
                          </TableCell>
                          <TableCell className={poppins.className}>
                            Username
                          </TableCell>
                          <TableCell className={poppins.className}>
                            Action
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {emailSettings.map((detail) => (
                          <TableRow key={detail.id}>
                            <TableCell className={poppins.className}>
                              {detail.id}
                            </TableCell>
                            <TableCell className={poppins.className}>
                              {detail.name}
                            </TableCell>
                            <TableCell className={poppins.className}>
                              {detail.mail_smtp}
                            </TableCell>
                            <TableCell className={poppins.className}>
                              {detail.username}
                            </TableCell>
                            <TableCell className={poppins.className}>
                              <IconButton
                                color="primary"
                                onClick={() => handleEdit(detail)}
                              >
                                <Edit />
                              </IconButton>
                              <IconButton
                                color="secondary"
                                onClick={() => handleDelete(detail.id)}
                              >
                                <Delete />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </CustomCard>
            </Grid>
          </Box>
        )}

        {/* Additional Tabs */}
        {activeTab === 1 && (
          <Box>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={4} md={6}>
                <CustomLabel
                  className={poppins.className}
                  htmlFor="mailotp"
                  required
                >
                  OTP
                </CustomLabel>
                <CustomTextField
                  id="mailotp"
                  name="mailotp"
                  placeholder="e.g. creworder"
                  type="text"
                  fullWidth
                />
              </Grid>

              <Grid
                item
                xs={12}
                md={12}
                sm={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  sx={{
                    backgroundColor: "#405189",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#405189",
                    },
                  }}
                  className={poppins.className}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
        {activeTab === 2 && (
          <Box>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={4} md={6}>
                <CustomLabel
                  className={poppins.className}
                  htmlFor="mailotp"
                  required
                >
                  Reports
                </CustomLabel>
                <CustomTextField
                  id="mailotp"
                  name="mailotp"
                  placeholder="e.g. creworder"
                  type="text"
                  fullWidth
                />
              </Grid>

              <Grid
                item
                xs={12}
                md={12}
                sm={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  sx={{
                    backgroundColor: "#405189",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#405189",
                    },
                  }}
                  className={poppins.className}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </CardContent>
    </CustomCard>
  );
};

export default EmailSettings;
