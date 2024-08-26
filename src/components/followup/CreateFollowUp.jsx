import React, { useState } from "react";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
import { useRouter } from "next/router";
import { getToken } from "@/utils/getToken";
import MainApi from "@/api-manage/MainApi";
import { Typography, Button, Grid, Card, CardContent, Divider } from "@mui/material";

const CreateFollowUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    remainder_date: "",
    remainder_time: "",
    remark: "",
    user: 1,
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

        const response = await MainApi.post("/api/followup/", form, {
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
                  onChange={(e) => handleInputChange("customer_name", e.target.value)}
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
                  onChange={(e) => handleInputChange("customer_phone", e.target.value)}
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
              <Grid item xs={4}>
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
              <Grid item xs={4}>
                <CustomLabel htmlFor="remainder_date" required>
                Reminder Date :
                </CustomLabel>
                <CustomTextField
                  id="remainder_date"
                  name="Reminder Date"
                  placeholder="Reminder Date"
                  type="date"
                  value={formData.remainder_date}
                  onChange={(e) => handleInputChange("remainder_date", e.target.value)}
                  error={!!errors.remainder_date}
                  helperText={errors.remainder_date}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <CustomLabel htmlFor="remainder_time" required>
                Reminder Time :
                </CustomLabel>
                <CustomTextField
                  id="remainder_time"
                  name="remainder_time"
                  placeholder="Reminder Time"
                  type="time"
                  value={formData.remainder_time}
                  onChange={(e) => handleInputChange("remainder_time", e.target.value)}
                  error={!!errors.remainder_time}
                  helperText={errors.remainder_time}
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
              <Grid item xs={12} sm={12}>
                <CustomLabel htmlFor="remark" required>
                Remark:
                </CustomLabel>
                <CustomTextField
                  id="remark"
                  name="remark"
                  type="text"
                  value={formData.remark}
                  onChange={(e) => handleInputChange("remark", e.target.value)}
                  placeholder="Remark"
                  error={!!errors.remark}
                  helperText={errors.remark}
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