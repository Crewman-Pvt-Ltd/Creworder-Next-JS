import React, { useState } from "react";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../CustomLabel";
import { useRouter } from "next/router";
import { getToken } from "@/utils/getToken";
import MainApi from "@/api-manage/MainApi";
import { Typography, Button, Grid, Card, CardContent, Divider } from "@mui/material";

const CreateCategory = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    category_name: "",
    description: "",
    category_image: null,
    status: "1",
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

  const handleImageUpload = (file) => {
    setFormData((prevData) => ({
      ...prevData,
      category_image: file,
    }));
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const token = getToken();
        if (!token) {
          throw new Error("No authentication token found.");
        }

        const form = new FormData();
        form.append("name", formData.category_name);
        form.append("description", formData.description);
        form.append("image", formData.category_image);
        form.append("status", formData.status);
        const response = await MainApi.post("/api/category/", form, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 201) {
          router.push("/admin/category/");
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
                Add Category
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
                <CustomLabel htmlFor="category_name" required>
                  Category Name:
                </CustomLabel>
                <CustomTextField
                  id="category_name"
                  name="category_name"
                  placeholder="Category Name"
                  type="text"
                  value={formData.category_name}
                  onChange={(e) => handleInputChange("category_name", e.target.value)}
                  error={!!errors.category_name}
                  helperText={errors.category_name}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <CustomLabel htmlFor="category_image" required>
                  Category Image:
                </CustomLabel>
                <CustomTextField
                  id="category_image"
                  name="category_image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files[0])} // Handle image upload
                  error={!!errors.category_image}
                  helperText={errors.category_image}
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
                  Description:
                </CustomLabel>
                <CustomTextField
                  id="description"
                  name="description"
                  type="text"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Description"
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

export default CreateCategory;
