import React, { useState } from "react";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { Grid, Typography, Button } from "@mui/material";
import useGetAllCloudTelephonicChannels from "@/api-manage/react-query/useGetAllCloudTelephonicChannels";

const TelephonicChannelsList = () => {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    providerName: "",
    image: null,
    credentials: "",
  });
  const [errors, setErrors] = useState({});

  // Fetch data using the custom hook
  const { data: apiData, isLoading, isError } = useGetAllCloudTelephonicChannels();

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setFormData({
      name: "",
      providerName: "",
      image: null,
      credentials: "",
    });
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (file) => {
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.providerName || !formData.credentials) {
      setErrors({ message: "Please fill in all fields." });
      return;
    }
    // Submit form logic (future implementation)
    handleCloseDialog();
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container sx={{ marginBottom: "10px" }}>
          <Grid item xs={12}>
            <CustomCard padding="13px">
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                      whiteSpace: "nowrap",
                      textTransform: "capitalize",
                      color: "black",
                      marginLeft: "20px",
                    }}
                  >
                    Cloud Telephonic Channels
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    onClick={handleOpenDialog}
                    sx={{
                      padding: "8px",
                      fontSize: "14px",
                      backgroundColor: "#405189",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#334a6c",
                      },
                      borderRadius: "30px",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <AddIcon sx={{ fontSize: 15 }} />
                    Add Cloud Telephonic
                  </Button>
                </Grid>
              </Grid>
            </CustomCard>
          </Grid>
        </Grid>

        {/* Display Cards */}
        <Grid container spacing={2} sx={{ marginBottom: "10px" }}>
          {isLoading && (
            <Typography variant="body1">Loading...</Typography>
          )}
          {isError && (
            <Typography variant="body1" color="error">
              Error loading data
            </Typography>
          )}
          {apiData?.Data?.map((item) => (
            <Grid item xs={12} sm={4} key={item.id}>
              <CustomCard padding="20px">
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Image
                      src={item.logo || "/images/default-placeholder.png"}
                      alt={item.name}
                      width={100}
                      height={60}
                      style={{ borderRadius: "4px" }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        whiteSpace: "nowrap",
                        textTransform: "capitalize",
                        color: "black",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        whiteSpace: "nowrap",
                        textTransform: "capitalize",
                        color: "#999999",
                      }}
                    >
                      {item.cloud_celephony_provider_name}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container justifyContent="flex-end" alignItems="center" sx={{ marginTop: 2 }}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleOpenDialog}
                      sx={{ textTransform: "capitalize" }}
                    >
                      Create Channels
                    </Button>
                  </Grid>
                </Grid>
              </CustomCard>
            </Grid>
          ))}
        </Grid>

        {/* Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Add Cloud Connect</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Name"
                  fullWidth
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Cloud Connect Provider Name"
                  fullWidth
                  value={formData.providerName}
                  onChange={(e) =>
                    handleInputChange("providerName", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Credentials"
                  fullWidth
                  value={formData.credentials}
                  onChange={(e) =>
                    handleInputChange("credentials", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="images"
                  name="images"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default TelephonicChannelsList;
