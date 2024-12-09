import React, { useState, useEffect } from "react";
import CustomCard from "../CustomCard";
import {
  CardContent,
  Grid,
  Typography,
  Box,
  Divider,
  Button,
  TextField,
  Backdrop,
  CircularProgress,
  MenuItem,
  Select,
} from "@mui/material";
import dynamic from "next/dynamic";
import CustomTextField from "../CustomTextField";
import CustomLabel from "../CustomLabel";
import UploadFileIcon from "@mui/icons-material/CloudUpload";
import { Poppins } from "next/font/google";
import "react-quill/dist/quill.snow.css";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";
import { usePermissions } from "@/contexts/PermissionsContext";
import useGetAllAwards from "@/api-manage/react-query/useGetAllAwards";
import useGetAllUsers from "@/api-manage/react-query/useGetAllUsers";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const AddAppreciation = ({ onAppreciationList }) => {
  const { data: awardsData, refetch, isLoading, isError } = useGetAllAwards();
  const { data: userData, refetch: userRefetch } = useGetAllUsers();
  const [photo, setPhoto] = useState(null);
  const [summary, setSummary] = useState("");
  const [formData, setFormData] = useState({
    award: "",
    date_given: "",
    branch: "",
    user: "",
    award_image: "",
  });
  const [award, setAward] = useState({
    title: "",
    summary: "",
    branch: "",
  });
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [awardTitle, setAwardTitle] = useState("");
  const [awardSummary, setAwardSummary] = useState("");
  const [error, setError] = useState("");
  const [awardTitles, setAwardTitles] = useState([]);
  const [image, setImage] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // New state for selected user
  const { permissionsData } = usePermissions();
  const token = getToken();

  useEffect(() => {
    if (permissionsData?.user?.profile?.branch) {
      const branch = permissionsData.user.profile.branch;
      setFormData((prev) => ({ ...prev, branch }));
      setAward((prev) => ({ ...prev, branch }));
    }
  }, [permissionsData]);

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleDescriptionChange = (value) => {
    setSummary(value);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "user") {
      const selected = userData?.results.find((user) => user.id === value);
      setSelectedUser(selected); // Update selected user
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to handle file uploads
    const formDataToSubmit = new FormData();

    // Append form fields to FormData
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    // Append the image file separately if it exists
    if (photo) {
      formDataToSubmit.append("award_image", photo);
    }

    try {
      const response = await MainApi.post(
        "/api/appreciations/",
        formDataToSubmit,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data", // Ensure the correct content type for file upload
          },
        }
      );

      if (response.status === 201) {
        onAppreciationList();
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      setError("Error submitting form: " + error.message);
      console.error(error);
    }
  };

  const handleAwardSubmit = async () => {
    try {
      const response = await MainApi.post(
        "/api/awards/",
        {
          title: awardTitle,
          summary: awardSummary,
          branch: award.branch,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setAwardTitles((prev) => [...prev, awardTitle]);
        setFormData((prev) => ({
          ...prev,
          award: awardTitle,
          summary: awardSummary,
        }));
        handleOverlayClose();
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      setError("Error submitting award: " + error.message);
      console.error(error);
    }
  };

  const handleOverlayOpen = () => setOverlayOpen(true);
  const handleOverlayClose = () => {
    setOverlayOpen(false);
    setAwardTitle("");
    setAwardSummary("");
  };
  const handleImageUpload = (file) => {
    setImage(file);
  };
  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Error loading awards</Typography>;

  return (
    <Grid container spacing={2} sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
              Add Appreciation
            </Typography>
            <Divider sx={{ my: 2 }} />
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="award" required>
                    Award
                  </CustomLabel>
                  <Box display="flex" alignItems="center">
                    <Select
                      id="award"
                      name="award"
                      value={formData.award}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          award: e.target.value,
                        }))
                      }
                      fullWidth
                      displayEmpty
                      sx={{ height: "40px" }}
                    >
                      {awardsData &&
                        awardsData.results.map((award) => (
                          <MenuItem key={award.id} value={award.id}>
                            {award.title}
                          </MenuItem>
                        ))}
                    </Select>

                    <Button
                      variant="outlined"
                      onClick={handleOverlayOpen}
                      sx={{ height: "40px" }}
                    >
                      Add
                    </Button>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="givento" required>
                    Given To
                  </CustomLabel>
                  <Box display="flex" flexDirection="column">
                    <Select
                      id="givento"
                      name="user"
                      value={formData.user}
                      onChange={handleFormChange}
                      fullWidth
                      displayEmpty
                      sx={{ height: "40px" }}
                    >
                      {userData &&
                        userData?.results.map((user) => (
                          <MenuItem key={user?.id} value={user?.id}>
                            {user?.first_name} {user?.last_name}
                          </MenuItem>
                        ))}
                    </Select>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="date_given" required>
                    Date Given
                  </CustomLabel>
                  <CustomTextField
                    id="date_given"
                    name="date_given"
                    type="date"
                    fullWidth
                    value={formData.date_given}
                    onChange={handleFormChange}
                  />
                </Grid>

                <Grid item xs={12} sm={8} md={8}>
                  <CustomLabel htmlFor="summary" required>
                    Summary
                  </CustomLabel>
                  <ReactQuill
                    value={summary}
                    onChange={handleDescriptionChange}
                    placeholder=""
                    style={{ height: "200px", marginBottom: "20px" }}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="images" required>
                    Images
                  </CustomLabel>
                  <CustomTextField
                    id="images"
                    name="images"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                    required
                    fullWidth
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{
                    marginTop: 2,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    type="submit"
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
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </CardContent>
        </CustomCard>
      </Grid>

      <Backdrop
        open={isOverlayOpen}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {isOverlayOpen && (
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translate(-50%, 0)",
            width: "400px",
            padding: 2,
            backgroundColor: "white",
            border: "1px solid grey",
            borderRadius: "4px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 1300,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Create Award
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="awardTitle"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={awardTitle}
            onChange={(e) => setAwardTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="awardSummary"
            label="Summary"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={awardSummary}
            onChange={(e) => setAwardSummary(e.target.value)}
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={handleAwardSubmit}
              sx={{
                marginRight: 1,
                backgroundColor: "#405189",
                color: "white",
                "&:hover": {
                  backgroundColor: "#334a6c",
                },
              }}
            >
              Save
            </Button>
            <Button onClick={handleOverlayClose}>Cancel</Button>
          </Box>
        </Box>
      )}
    </Grid>
  );
};

export default AddAppreciation;
