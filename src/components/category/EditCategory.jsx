import React, { useState, useEffect } from "react";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
import { useRouter } from "next/router";
import { getToken } from "@/utils/getToken";

import MainApi from "@/api-manage/MainApi";
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

  const EditCategory = () => {
  const router = useRouter();
  const { id } = router.query; 
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [formData, setFormData] = useState({
    category_name: "",
    images: "", 
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(""); 

  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        try {
          const token = getToken();
          if (!token) {
            throw new Error("No authentication token found.");
          }

          const response = await MainApi.get(`/api/category/${id}`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });

          if (response.status === 200) {
            setFormData({
              category_name: response.data?.Data?.[0]?.name,
              images: response.data?.Data?.[0]?.image || "", // Set image URL for preview
              description: response.data?.Data?.[0]?.description,
            });
            setPreviewImage(response.data.image); // Set preview image URL
          }
        } catch (error) {
          console.error("Error fetching category data:", error.response?.data || error.message);
        }
      };

      fetchCategory();
    }
  }, [id]); 

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
    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        images: file, 
      }));
      setPreviewImage(URL.createObjectURL(file)); s
      setErrors((prevErrors) => ({
        ...prevErrors,
        images: "",
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
        form.append("name", formData.category_name);
        form.append("description", formData.description);
        if (formData.images instanceof File) {
          form.append("image", formData.images); 
        }

        const response = await MainApi.put(`/api/category/${id}`, form, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          router.push("/admin/category"); 
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
                Edit Category
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
                {formData?.images && (
                  <div style={{ marginBottom: "10px" }}>
                    <img 
                      src={`${BASE_URL}${formData.images}`} 
                      alt="Preview" 
                      style={{ width: "30%", maxHeight: "200px" }} 
                    />
                  </div>
                )}
                <CustomTextField
                  id="category_image"
                  name="category_image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                  error={!!errors.images}
                  helperText={errors.images}
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

export default EditCategory;
