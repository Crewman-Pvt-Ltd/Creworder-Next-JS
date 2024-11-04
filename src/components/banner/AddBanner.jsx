import React, { useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
} from "@mui/material";
import CustomLabel from "../CustomLabel";
import CustomTextField from "../CustomTextField";

const AddBanner = () => {
  const [banners, setBanners] = useState([{ image: null, link: "" }]);

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const newBanners = [...banners];
      newBanners[index].image = URL.createObjectURL(file);
      setBanners(newBanners);
    }
  };

  const handleLinkChange = (index, event) => {
    const newBanners = [...banners];
    newBanners[index].link = event.target.value;
    setBanners(newBanners);
  };

  const handleAddBanner = () => {
    setBanners([...banners, { image: null, link: "" }]);
  };

  const handleDeleteBanner = (index) => {
    const newBanners = banners.filter((_, i) => i !== index);
    setBanners(newBanners);
  };

  const handleSave = () => {
    console.log("Banners:", banners);
  };

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid item>
              <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                Add Banners
              </Typography>
            </Grid>
            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              {banners.map((banner, index) => (
                <Grid container item xs={12} spacing={2} key={index}>
                  <Grid item xs={6}>
                    <CustomLabel>Banner</CustomLabel>
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
                        onChange={(event) => handleImageChange(index, event)}
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
                        {banner.image ? "Change Image" : "Upload Banner Image"}
                      </label>

                      {banner.image && (
                        <div style={{ marginTop: "10px" }}>
                          <img
                            src={banner.image}
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

                  <Grid item xs={6}>
                    <CustomLabel>Link</CustomLabel>
                    <CustomTextField
                      variant="outlined"
                      fullWidth
                      value={banner.link}
                      onChange={(event) => handleLinkChange(index, event)}
                      placeholder="Enter link for the banner"
                      sx={{ marginTop: 2 }}
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteBanner(index)}
                      sx={{ marginTop: 2 }}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              ))}

              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleAddBanner}
                  sx={{ marginTop: 2 }}
                >
                  Add Another Banner
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  sx={{ marginTop: 2 }}
                >
                  Save All
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
