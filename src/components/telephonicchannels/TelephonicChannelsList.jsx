import React, { useState, useEffect } from "react";
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
import axios from "axios";
import useGetAllCloudTelephonicChannels from "@/api-manage/react-query/useGetAllCloudTelephonicChannels";
import { getToken } from "@/utils/getToken";
import MainApi from "@/api-manage/MainApi";
import { Poppins } from "next/font/google";

const TelephonicChannelsList = () => {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const token = getToken();
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    providerName: "",
    image: null,
    credentials: "",
    authTokenType: "",
    status: "",
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const {
    data: apiData,
    isLoading,
    isError,
  } = useGetAllCloudTelephonicChannels();

  const handleOpenDialog = (editItem = null) => {
    if (editItem) {
      setEditMode(true);
      setFormData({
        id: editItem.id,
        name: editItem.name,
        providerName: editItem.cloud_celephony_provider_name,
        image: null,
        credentials: editItem.creadentials_json,
        authTokenType: editItem.auth_tokent_ype,
        status: editItem.status,
      });
    } else {
      setEditMode(false);
      setFormData({
        id: null,
        name: "",
        providerName: "",
        image: null,
        credentials: "",
        authTokenType: "",
        status: "",
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setFormData({
      id: null,
      name: "",
      providerName: "",
      image: null,
      credentials: "",
      authTokenType: "",
      status: "",
    });
    setErrors({});
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (file) => {
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.providerName || !formData.credentials) {
      setErrors({ message: "Please fill in all fields." });
      return;
    }

    const apiUrl = editMode
  ? `${BASE_URL}/api/updateCloudTelephoneyChannel/${formData.id}/`
  : `${BASE_URL}/api/createCloudTelephoneyChannel/`;

    const method = editMode ? "PUT" : "POST";
    const requestData = new FormData();
    requestData.append("name", formData.name);
    requestData.append("cloud_celephony_provider_name", formData.providerName);
    requestData.append("creadentials_json", formData.credentials);
    requestData.append("auth_tokent_ype", formData.authTokenType);
    requestData.append("status", formData.status);
    if (formData.image) {
      requestData.append("image", formData.image);
    }

    try {
      const response = await axios({
        method,
        url: apiUrl,
        data: requestData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      });

      if (response.data.Success) {
        alert("Success: Cloud Telephony Channel saved!");
        setDialogOpen(false);
      } else {
        setErrors(response.data.Errors);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ message: "An error occurred while saving the data." });
    }
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
                    onClick={() => handleOpenDialog()}
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

        <Grid container spacing={2} sx={{ marginBottom: "10px" }}>
          {isLoading && <Typography variant="body1">Loading...</Typography>}
          {isError && (
            <Typography variant="body1" color="error">
              Error loading data
            </Typography>
          )}
          {apiData?.Data?.map((item) => (
            <Grid item xs={12} sm={4} key={item.id}>
              <CustomCard padding="20px">
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Image
                      src={item.logo ? `${BASE_URL}${item.logo}` : "/placeholder-image.png"}
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
                  <Button
                    onClick={() => handleOpenDialog(item)}
                    color="primary"
                  >
                    Edit
                  </Button>
                </Grid>
              </CustomCard>
            </Grid>
          ))}
        </Grid>

        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>
            {editMode ? "Edit Cloud Connect" : "Add Cloud Connect"}
          </DialogTitle>
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
                  label="Auth Token Type"
                  fullWidth
                  value={formData.authTokenType}
                  onChange={(e) =>
                    handleInputChange("authTokenType", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Status"
                  fullWidth
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="images"
                  name="images"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                  fullWidth
                />
              </Grid>
            </Grid>
            {errors.message && (
              <Typography color="error" variant="body2">
                {errors.message}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit}>
              {editMode ? "Update" : "Submit"}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default TelephonicChannelsList;
