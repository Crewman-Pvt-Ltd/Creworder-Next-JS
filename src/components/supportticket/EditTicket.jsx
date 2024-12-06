import React, { useState, useEffect } from "react";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
import CustomCard from "../CustomCard";
import useGetAllCompanies from "@/api-manage/react-query/useGetAllCompanies";
import useGetAllUsers from "@/api-manage/react-query/useGetAllUsers";
import { getToken } from "@/utils/getToken";
import { Poppins } from "next/font/google";

import {
  Typography,
  Button,
  Grid,
  Select,
  MenuItem,
  TextField,
  CardContent,
  Divider,
} from "@mui/material";
import { useRouter } from "next/router";
import MainApi from "@/api-manage/MainApi";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const EditTicket = () => {
  const router = useRouter();
  const { id } = router.query; 
  const token = getToken();

  const {
    data: companiesData,
    isLoading: companiesLoading,
    error: companiesError,
  } = useGetAllCompanies();
  const {
    data: usersData,
    isLoading: usersLoading,
    error: usersError,
  } = useGetAllUsers();

  const [formData, setFormData] = useState({
    company: "",
    subject: "",
    description: "",
    type: "",
    priority: "",
    agent: "",
    attachment: null,
  });

  // Fetch the ticket data by ID
  useEffect(() => {
    if (id) {
      const fetchTicketData = async () => {
        try {
          const response = await MainApi.get(`/api/support-tickets/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const ticketData = response.data;
          setFormData({
            company: ticketData.company || "",
            subject: ticketData.subject || "",
            description: ticketData.description || "",
            type: ticketData.type || "",
            priority: ticketData.priority || "",
            agent: ticketData.agent || "",
          });
        } catch (error) {
          console.error("Error fetching ticket data", error);
        }
      };

      fetchTicketData();
    }
  }, [id, token]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file change for attachments
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById("preview").src = e.target.result;
    };
    if (file) {
      reader.readAsDataURL(file);
      setFormData((prev) => ({ ...prev, attachment: file }));
    }
  };

  // Handle form submission for updating the ticket
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      const response = await MainApi.put(`/api/support-tickets/${id}/`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Ticket updated successfully", response.data);
      router.push("/superadmin/supportticket");
    } catch (error) {
      console.error("Error updating the ticket", error);
    }
  };

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography
              className={poppins.className}
              sx={{ fontSize: "16px", fontWeight: "600" }}
            >
              Edit Ticket Details
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="company" required>
                  Company Name
                </CustomLabel>
                <Select
                  labelId="company"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  displayEmpty
                  sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                  fullWidth
                  className={poppins.className}
                >
                  <MenuItem value="" disabled>
                    Select Company
                  </MenuItem>
                  {companiesLoading ? (
                    <MenuItem disabled>Loading...</MenuItem>
                  ) : companiesError ? (
                    <MenuItem disabled>Error fetching companies</MenuItem>
                  ) : (
                    companiesData?.results.map((company) => (
                      <MenuItem key={company.id} value={company.id}>
                        {company.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </Grid>
              <Grid item xs={12} sm={8}>
                <CustomLabel htmlFor="subject" required>
                  Ticket Subject
                </CustomLabel>
                <CustomTextField
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="e.g. Login Issue"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                marginTop: "10px",
              }}
            >
              <Grid item xs={12} sm={8}>
                <CustomLabel htmlFor="description" required>
                  Description
                </CustomLabel>
                <TextField
                  id="description"
                  name="description"
                  placeholder="e.g. Cannot log in with the provided credentials"
                  type="text"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <Typography variant="subtitle1" htmlFor="attachment">
                  Upload Attachment
                </Typography>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="attachment"
                    name="attachment"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png"
                  />
                </div>
                <img
                  id="preview"
                  alt="Preview"
                  style={{ marginTop: "10px", maxWidth: "100%" }}
                />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                marginTop: "10px",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="agent" required>
                  Agent
                </CustomLabel>
                <Select
                  labelId="agent"
                  id="agent"
                  name="agent"
                  value={formData.agent}
                  onChange={handleInputChange}
                  displayEmpty
                  sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Agent
                  </MenuItem>
                  {usersLoading ? (
                    <MenuItem disabled>Loading...</MenuItem>
                  ) : usersError ? (
                    <MenuItem disabled>Error fetching users</MenuItem>
                  ) : (
                    usersData?.results.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.username}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="priority" required>
                  Priority
                </CustomLabel>
                <Select
                  labelId="priority"
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  displayEmpty
                  sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Priority
                  </MenuItem>
                  <MenuItem value="urgent">Urgent</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="type" required>
                  Type
                </CustomLabel>
                <Select
                  labelId="type"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  displayEmpty
                  sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Type
                  </MenuItem>
                  <MenuItem value="ques">Question</MenuItem>
                  <MenuItem value="problem">Problem</MenuItem>
                  <MenuItem value="gen_query">General Query</MenuItem>
                </Select>
              </Grid>
            </Grid>

            <Button
              sx={{
                backgroundColor: "#405189",
                backgroundImage: "#405189",
                fontSize: "16px",
                fontFamily: "Poppins, sans-serif",
                marginTop: "20px",
                color: "#fff",
                "&:hover": {
                  background: "#1976d2",
                },
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default EditTicket;
