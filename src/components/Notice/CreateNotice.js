import React, { useState } from "react";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
import { useRouter } from "next/router";
import { getToken } from "@/utils/getToken";
import MainApi from "@/api-manage/MainApi";
import { Typography, Button, Grid, Card, CardContent, Divider } from "@mui/material";

const CreateNotice = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
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

        const response = await MainApi.post("/api/notices/", form, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 201) {
          router.push("/superadmin/notice");
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
                Add Notice
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
              <Grid item xs={12}>
                <CustomLabel htmlFor="title" required>
                  Title
                </CustomLabel>
                <CustomTextField
                  id="title"
                  name="title"
                  placeholder="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  error={!!errors.title}
                  helperText={errors.title}
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
                <CustomLabel htmlFor="description" required>
                  Description
                </CustomLabel>
                <CustomTextField
                  id="description"
                  name="description"
                  type="text"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Full Description"
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

export default CreateNotice;
