import React, { useState, useEffect } from "react";
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
import { getToken } from "@/utils/getToken";
import MainApi from "@/api-manage/MainApi";

const EditBanner = () => {
  const [banner, setBanner] = useState({
    title: "",
    image: null, // for new uploaded image
    imageUrl: "", // for previously fetched image URL
    link: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchBannerData(id);
    }
  }, [id]);

  const fetchBannerData = async (bannerId) => {
    try {
      setLoading(true);
      const token = getToken();
      const response = await MainApi.get(`/api/banner/${bannerId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const data = response.data;
      setBanner({
        title: data.title,
        image: null,
        imageUrl: data.banner_img, // Assume `banner_img` is the field for image URL
        link: data.link,
      });
    } catch (error) {
      Swal({
        icon: "error",
        title: "Error",
        text: "Failed to fetch banner data.",
        button: "Close",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setBanner({ ...banner, [field]: value });
  };

  const handleSave = async () => {
    setLoading(true);
    setErrors({});

    const token = getToken();
    const formData = new FormData();
    if (banner.image) {
      formData.append("banner_img", banner.image);
    }
    formData.append("link", banner.link);
    formData.append("title", banner.title);

    try {
      await MainApi.patch(`/api/banner/${id}/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      Swal({
        icon: "success",
        title: "Success!",
        text: "Banner updated successfully.",
        button: "Okay",
      });

      router.push("/superadmin/banner");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
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
      setLoading(false);
    }
  };

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ fontSize: "16px", fontWeight: "600" }}
            >
              Edit Banner
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  <b>Title</b>
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={banner.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter banner title"
                  error={!!errors.title}
                  helperText={errors.title?.[0]}
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
                  onChange={(e) => handleInputChange("link", e.target.value)}
                  placeholder="Enter banner URL"
                  error={!!errors.link}
                  helperText={errors.link?.[0]}
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
                      handleInputChange("image", e.target.files[0])
                    }
                    style={{ display: "none" }}
                    id="file-input"
                  />
                  <label
                    htmlFor="file-input"
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
                    {banner.image || banner.imageUrl
                      ? "Change Image"
                      : "Upload Image"}
                  </label>

                  {banner.image ? (
                    <div style={{ marginTop: "10px" }}>
                      <img
                        src={URL.createObjectURL(banner.image)}
                        alt="Banner Preview"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "150px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                  ) : banner.imageUrl ? (
                    <div style={{ marginTop: "10px" }}>
                      <img
                        src={banner.imageUrl}
                        alt="Existing Banner"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "150px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              </Grid>

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

export default EditBanner;
