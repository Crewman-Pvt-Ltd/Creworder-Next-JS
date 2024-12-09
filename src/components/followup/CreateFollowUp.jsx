import React, { useState } from "react";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../CustomLabel";
import { useRouter } from "next/router";
import { getToken } from "@/utils/getToken";
import MainApi from "@/api-manage/MainApi";
import { usePermissions } from "@/contexts/PermissionsContext";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

const CreateFollowUp = () => {
  const router = useRouter();
  const { permissionsData } = usePermissions();
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    reminder_date: "",
    follow_status: "",
    snooze: "",
    call_id: "",
    description: "",
    user: 1,
    follow_add_by: permissionsData?.user?.id || "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        formErrors[key] = "This field is required";
      }
    });
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    if (value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
    }
  };

  const handleSubmit = async () => {

    if (validateForm()) {
      try {

        const token = getToken();
        if (!token) {
          throw new Error("No authentication token found.");
        }
        const form = new FormData();
        Object.keys(formData).forEach((key) => {
          form.append(key, formData[key]);
        });

        const response = await MainApi.post("/api/follow-up/", form, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 201) {
          router.push("/followup");
        }
      } catch (error) {
        console.error("Error submitting form:", error.response?.data || error.message);
      }
    }
  };

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid item>
              <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                Add Follow Up
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
              <Grid item xs={6}>
                <CustomLabel htmlFor="customer_name" required>
                  Customer Name :
                </CustomLabel>
                <CustomTextField
                  id="customer_name"
                  name="customer_name"
                  placeholder="Customer Name"
                  type="text"
                  value={formData.customer_name}
                  onChange={(e) =>
                    handleInputChange("customer_name", e.target.value)
                  }
                  error={!!errors.customer_name}
                  helperText={errors.customer_name}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <CustomLabel htmlFor="customer_phone" required>
                  Customer Phone :
                </CustomLabel>
                <CustomTextField
                  id="customer_phone"
                  name="customer_phone"
                  placeholder="Customer Phone"
                  type="text"
                  value={formData.customer_phone}
                  onChange={(e) =>
                    handleInputChange("customer_phone", e.target.value)
                  }
                  error={!!errors.customer_phone}
                  helperText={errors.customer_phone}
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
              <Grid item xs={3}>
                <CustomLabel htmlFor="Call Id" required>
                  Call Id :
                </CustomLabel>
                <CustomTextField
                  id="call_id"
                  name="call_id"
                  placeholder="Call Id"
                  type="text"
                  value={formData.call_id}
                  onChange={(e) => handleInputChange("call_id", e.target.value)}
                  error={!!errors.call_id}
                  helperText={errors.call_id}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <CustomLabel htmlFor="reminder_date" required>
                  Reminder Date :
                </CustomLabel>
                <CustomTextField
                  id="reminder_date"
                  name="Reminder Date"
                  placeholder="Reminder Date and Time"
                  type="datetime-local"
                  value={formData.reminder_date}
                  onChange={(e) =>
                    handleInputChange("reminder_date", e.target.value)
                  }
                  error={!!errors.reminder_date}
                  helperText={errors.reminder_date}
                  required
                  fullWidth
                />
              </Grid>

              <Grid item xs={3}>
                <CustomLabel htmlFor="follow_status" required>
                  Follow Status :
                </CustomLabel>
                <FormControl fullWidth required>
                 
                  <Select
                    id="follow_status"
                    name="follow_status"
                    value={formData.follow_status}
                    onChange={(e) =>
                      handleInputChange("follow_status", e.target.value)
                    }
                    error={!!errors.follow_status}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="responded">Responded</MenuItem>
                    <MenuItem value="deleted">Deleted</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <CustomLabel htmlFor="snooze" required>
                  Snooze :
                </CustomLabel>
                <FormControl fullWidth required>
                 
                  <Select
                    id="snooze"
                    name="snooze"
                    value={formData.snooze}
                    onChange={(e) => handleInputChange("snooze", e.target.value)}
                    error={!!errors.snooze}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="snooze">Snooze</MenuItem>
                  </Select>
                </FormControl>
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
                <CustomLabel htmlFor="description" required>
                  Description:
                </CustomLabel>
                <CustomTextField
                  id="description"
                  name="description"
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="description"
                  error={!!errors.description}
                  helperText={errors.description}
                  required
                  fullWidth
                  multiline
                  rows={4}
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
        </Card>
      </Grid>
    </Grid>
  );
};

export default CreateFollowUp;
