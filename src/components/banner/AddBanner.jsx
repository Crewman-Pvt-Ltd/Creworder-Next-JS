import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
  TextField,
} from "@mui/material";
import Swal from "sweetalert";
import { getToken } from "@/utils/getToken";  // Import getToken function
import MainApi from "@/api-manage/MainApi";  // Import MainApi

const AddBanner = () => {
  const [banners, setBanners] = useState([{ title: "", image: null, link: "" }]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  // Handle changes to input fields
  const handleInputChange = (index, field, value) => {
    const updatedBanners = [...banners];
    updatedBanners[index][field] = value;
    setBanners(updatedBanners);
  };

  // Handle save operation
  const handleSave = async () => {
    setLoading(true);
    setErrors({});

    // Get the token
    const token = getToken();  // Fetch token

    // Create form data for banner upload
    const formData = new FormData();
    banners.forEach((banner, index) => {
      if (banner.image) {
        formData.append("banner_img", banner.image);
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [`banner_img_${index}`]: ["Image is required."],
        }));
      }
      formData.append("link", banner.link);
      formData.append("title", banner.title);
    });

    try {
      // Debug log to check the form data
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      // Send the API request
      const response = await MainApi.post("/api/banner/", formData, {
        headers: {
          Authorization: `Token ${token}`,  // Use token in request header
          "Content-Type": "multipart/form-data",
        },
      });

      // Show success message
      Swal({
        icon: "success",
        title: "Success!",
        text: "Banners saved successfully.",
        button: "Okay",
      });

      // Clear form fields and redirect
      setBanners([{ title: "", image: null, link: "" }]);
      router.push("/superadmin/banner");

    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);  // Handle API error response
        Swal({
          icon: "error",
          title: "Error",
          text: "Please check the errors and try again.",
          button: "Close",
        });
      } else {
        Swal({
          icon: "error",
          title: "Error",
          text: "Unexpected error occurred.",
          button: "Okay",
        });
      }
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: "600" }}>
              Add Banners
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              {banners.map((banner, index) => (
                <Grid container item xs={12} spacing={2} key={index}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      <b>Title</b>
                    </Typography>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={banner.title}
                      onChange={(e) => handleInputChange(index, "title", e.target.value)}
                      placeholder="Enter banner title"
                      error={!!errors[`title_${index}`]}
                      helperText={errors[`title_${index}`]?.[0]}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      <b>URL</b>
                    </Typography>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={banner.link}
                      onChange={(e) => handleInputChange(index, "link", e.target.value)}
                      placeholder="Enter banner URL"
                      error={!!errors[`link_${index}`]}
                      helperText={errors[`link_${index}`]?.[0]}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      <b>Image</b>
                    </Typography>
                    <div
                      style={{
                        border: "2px dashed #ccc",
                        borderRadius: "8px",
                        padding: "20px",
                        textAlign: "center",
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleInputChange(index, "image", e.target.files[0])
                        }
                        style={{ display: "none" }}
                        id={`file-input-${index}`}
                      />
                      <label
                        htmlFor={`file-input-${index}`}
                        style={{
                          display: "block",
                          cursor: "pointer",
                          margin: "0 auto",
                          width: "100%",
                          height: "100%",
                          lineHeight: "100px",
                          color: "#007bff",
                          fontWeight: "bold",
                        }}
                      >
                        {banner.image ? "Change Image" : "Upload Image"}
                      </label>

                      {banner.image && (
                        <div style={{ marginTop: "10px" }}>
                          <img
                            src={URL.createObjectURL(banner.image)}
                            alt={`Banner Preview ${index + 1}`}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "150px",
                              objectFit: "cover",
                              borderRadius: "4px",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </Grid>
                </Grid>
              ))}

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  sx={{ marginTop: 2 }}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AddBanner;
