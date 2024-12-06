import React, { useState } from "react";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "./CustomLabel";
import CustomCard from "./CustomCard";
import UploadFileIcon from "@mui/icons-material/CloudUpload";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ReviewsIcon from "@mui/icons-material/Reviews";
import HighlightIcon from "@mui/icons-material/Highlight";
import HandshakeIcon from "@mui/icons-material/Handshake";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import DeleteIcon from "@mui/icons-material/Delete";
import { Poppins } from "next/font/google";
import useGetAllSliders from "@/api-manage/react-query/useGetAllSliders";
import useGetAllFeaturesProduct from "@/api-manage/react-query/useGetAllFeaturesProduct";
import useGetAllTestimonials from "@/api-manage/react-query/useGetAllTestimonials";
import useGetAllClients from "@/api-manage/react-query/useGetAllClients";
import useGetAllHighlights from "@/api-manage/react-query/useGetAllHighlights";
import axios from "axios";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { getToken } from "@/utils/getToken"; // Import getToken
import MainApi from "@/api-manage/MainApi"; // Import MainApi
import {
  Typography,
  Grid,
  CardContent,
  Divider,
  Tabs,
  Tab,
  Box,
  Tooltip,
  IconButton,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
const poppins = Poppins({
  weight: "300",
  subsets: ["latin"],
});

const initialData = [
  {
    id: 1,
    heading:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer",
    created: "2023-07-14",
  },
];

const LandingPageSettings = () => {
  const [activeSection, setActiveSection] = useState("slider");
  const [sliderFile, setSliderFile] = useState(null);
  const [featuresFile, setFeaturesFile] = useState(null);
  const [slidersToDelete, setSlidersToDelete] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [testimonialsToDelete, setTestimonialsToDelete] = useState(null);
  const [clientsToDelete, setClientsToDelete] = useState(null);
  const [highlightsToDelete, setHighlightsToDelete] = useState(null);
  const [testimonialsFile, setTestimonialsFile] = useState(null);
  const [highlightsFile, setHighlightsFile] = useState(null);
  const [clientsFile, setClientsFile] = useState(null);
  const [settingsFile, setSettingsFile] = useState(null);
  const [highheading, setHighHeading] = useState(null);
  const [highsubheading, setHighSubHeading] = useState(null);
  const [highFile, setHighFile] = useState(null);

  // const [data, setData] = useState(initialData);
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };
  const [open, setOpen] = useState(false);
  const {
    data: sliderData,
    isLoading: isSlidersLoading,
    isError: isSlidersError,
    refetch: refetchSliders,
  } = useGetAllSliders();

  // Fetch data from  useGetAllTestimonials
  const {
    data: featuresData,
    isLoading: isFeaturesLoading,
    isError: isFeaturesError,
    refetch: refetchFeatures,
  } = useGetAllFeaturesProduct();

  // Fetch data from useGetAllTestimonials
  const {
    data: testimonialsData,
    isLoading: isTestimonialsLoading,
    isError: isTestimonialsError,
    refetch: refetchTestimonials,
  } = useGetAllTestimonials();

  // Fetch data from useGetAllClients
  const {
    data: clientsData,
    isLoading: isClientsLoading,
    isError: isClientsError,
    refetch: refetchClients,
  } = useGetAllClients();

    // Fetch data from useGetAllHighlights
    const {
      data: highlightsData,
      isLoading: isHighlightsLoading,
      isError: isHighlightsError,
      refetch: refetchHighlights,
    } = useGetAllHighlights();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (activeSection === "slider") {
        setSliderFile(file);
      } else if (activeSection === "features") {
        setFeaturesFile(file);
      } else if (activeSection === "testimonials") {
        setTestimonialsFile(file);
      } else if (activeSection === "highlights") {
        setHighFile(file);
      } else if (activeSection === "clients") {
        setClientsFile(file);
      } else if (activeSection === "settings") {
        setSettingsFile(file);
      }
    }
  };

  const handleFileChangeProduct = (e) => {
    const file = e.target.files[0];
    setFeaturesFile(file);
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const HeaderCell = (props) => (
    <TableCell
      sx={{
        fontSize: "1rem",
        whiteSpace: "nowrap",
        fontWeight: "500",
        textTransform: "capitalize",
        color: "black",
      }}
      {...props}
    />
  );

  const DataCell = (props) => (
    <TableCell
      sx={{
        color: "#999999",
        fontSize: "14px",
        whiteSpace: "nowrap",
        fontWeight: "500",
        textTransform: "capitalize",
      }}
      {...props}
    />
  );
  const [formData, setFormData] = useState({
    heading: "",
    subheading: "",
    emailtextbutton: "",
    belowtextheading: "",
    secondsectiontitle: "",
    subtitle: "",
    featureonetitle: "",
    image: null,
    testimonialtitle: "",
    testimonial: "",
    headingtestimonial: "",
    testimonialsubheading: "",
    highlightsheading: "",
    highlightssubheading: "",
    highheading: "",
    highsubheading: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object to send both the form data and file
    const form = new FormData();
    form.append("heading", formData.heading);
    form.append("subheading", formData.subheading);
    form.append("button1", formData.emailtextbutton);
    form.append("button2", formData.belowtextheading);
    if (sliderFile) form.append("image", sliderFile);

    try {
      // Get token from getToken function
      const token = getToken();

      // Prepare headers including Authorization token
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };

      // Make the API request using axios
      const response = await MainApi.post("/api/sliders/", form, { headers });

      if (response.data.Success) {
        alert("Slider added successfully!");
        // Reset form data or handle as needed
        setFormData({
          heading: "",
          subheading: "",
          emailtextbutton: "",
          belowtextheading: "",
        });
        setSliderFile(null);
      } else {
        setErrors(response.data.Errors);
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };
  const handleDeleteClick = (id) => {
    setSlidersToDelete(id);
    setOpen(true);
  };
  const handleDeleteConfirm = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await MainApi.delete(
        `/api/sliders/${slidersToDelete}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 204) {
        console.log("Sliders deleted successfully");
        refetch();
      } else {
        console.error("Failed to delete the Sliders");
      }
    } catch (error) {
      console.error("An error occurred while deleting the Sliders:", error);
    }
    setOpen(false);
    setSlidersToDelete(null);
  };

  const handleDeleteCancel = () => {
    setOpen(false);
    setSlidersToDelete(null);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  // Handle form data change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formDataToSend = new FormData();
    formDataToSend.append("heading", formData.secondsectiontitle);
    formDataToSend.append("subheading", formData.subtitle);
    formDataToSend.append("url", formData.featureonetitle);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/product-features/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      if (response.data.Success) {
        alert("Data submitted successfully");
        setFormData({
          secondsectiontitle: "",
          subtitle: "",
          featureonetitle: "",
          image: null,
        });
        setFeaturesFile(null);
      } else {
        setErrors(response.data.Errors);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClickProduct = (id) => {
    setProductToDelete(id); // Fix: Set the correct state
    setOpen(true);
  };

  const handleDeleteProductConfirm = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found.");
      }

      // Make the DELETE request
      const response = await MainApi.delete(
        `/api/product-features/${productToDelete}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 204) {
        console.log("Product deleted successfully");
        refetch(); // Refresh the data after successful deletion
      } else {
        console.error("Failed to delete the product");
      }
    } catch (error) {
      console.error("An error occurred while deleting the product:", error);
    } finally {
      setOpen(false);
      setProductToDelete(null); // Clear state after operation
    }
  };

  const handleDeleteProductCancel = () => {
    setOpen(false);
    setProductToDelete(null);
  };

  // Handle form submission
  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.testimonialtitle);
    formDataToSend.append("message", formData.testimonial);
    formDataToSend.append("designation", formData.headingtestimonial);
    formDataToSend.append("subheading", formData.testimonialsubheading);
    if (testimonialsFile) {
      formDataToSend.append("profile_img", testimonialsFile);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/testimonials/",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Success:", response.data);
      alert("Testimonial added successfully!");
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.Errors);
      } else {
        console.error("Error:", error);
      }
    }
  };

  const handleDeleteClickTestimonials = (id) => {
    setTestimonialsToDelete(id); // Fix: Set the correct state
    setOpen(true);
  };

  const handleDeleteTestimonialsConfirm = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found.");
      }

      // Make the DELETE request
      const response = await MainApi.delete(
        `/api/testimonials/${testimonialsToDelete}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 204) {
        console.log("Testimonials deleted successfully");
        refetch(); // Refresh the data after successful deletion
      } else {
        console.error("Failed to delete the Testimonials");
      }
    } catch (error) {
      console.error(
        "An error occurred while deleting the Testimonials:",
        error
      );
    } finally {
      setOpen(false);
      setTestimonialsToDelete(null); // Clear state after operation
    }
  };

  const handleDeleteTestimonialsCancel = () => {
    setOpen(false);
    setTestimonialsToDelete(null);
  };

  const handleSubmitClients = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.highlightsheading);
    data.append("url", formData.highlightssubheading);
    data.append("logo", clientsFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/clients/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Success:", response.data);
    } catch (error) {
      if (error.response && error.response.data.Errors) {
        setErrors(error.response.data.Errors);
      } else {
        console.error("Error:", error);
      }
    }
  };

  const handleDeleteClickClients = (id) => {
    setClientsToDelete(id); // Fix: Set the correct state
    setOpen(true);
  };

  const handleDeleteClientsConfirm = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found.");
      }

      // Make the DELETE request
      const response = await MainApi.delete(
        `/api/clients/${clientsToDelete}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 204) {
        console.log("Clients deleted successfully");
        refetch(); // Refresh the data after successful deletion
      } else {
        console.error("Failed to delete the Clients");
      }
    } catch (error) {
      console.error(
        "An error occurred while deleting the Clients:",
        error
      );
    } finally {
      setOpen(false);
      setClientsToDelete(null); // Clear state after operation
    }
  };

  const handleDeleteClientsCancel = () => {
    setOpen(false);
    setClientsToDelete(null);
  };

  const handleHighSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous errors
    setErrors({});

    // Prepare FormData
    const formData = new FormData();
    formData.append("title", highheading); // Title field
    formData.append("description", highsubheading); // Description field
    formData.append("image", highFile); // Image field

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/highlights/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.Success) {
        alert("Data saved successfully!");
        // Clear the form if needed
        setHighHeading("");
        setHighSubHeading("");
        setHighlightsFile(null);
      } else {
        setErrors(response.data.Errors || {});
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("An error occurred while saving the data.");
    }
  };

  const handleDeleteClickHighlights = (id) => {
    setHighlightsToDelete(id); // Fix: Set the correct state
    setOpen(true);
  };

  const handleDeleteHighlightsConfirm = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found.");
      }

      // Make the DELETE request
      const response = await MainApi.delete(
        `/api/highlights/${highlightsToDelete}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 204) {
        console.log("Highlights deleted successfully");
        refetch(); // Refresh the data after successful deletion
      } else {
        console.error("Failed to delete the Highlights");
      }
    } catch (error) {
      console.error(
        "An error occurred while deleting the Highlights:",
        error
      );
    } finally {
      setOpen(false);
      setHighlightsToDelete(null); // Clear state after operation
    }
  };

  const handleDeleteHighlightsCancel = () => {
    setOpen(false);
    setHighlightsToDelete(null);
  };

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12} sm={12} md={12}>
        <CustomCard>
          <CardContent>
            <Grid container spacing={2}>
              <Tabs
                value={activeSection}
                onChange={(event, newValue) => handleSectionChange(newValue)}
                TabIndicatorProps={{
                  style: { display: "none" },
                }}
                sx={{
                  display: "flex",
                  // m: 2,
                  alignItems: "center",
                  "& .MuiTabs-flexContainer": {
                    display: "flex",
                  },
                }}
              >
                <Tab
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <HomeWorkIcon sx={{ fontSize: 20 }} />
                      <Typography>Home</Typography>
                    </Box>
                  }
                  value="slider"
                  sx={{
                    fontSize: "14px",
                    color: activeSection === "slider" ? "#00796b" : "black",
                    backgroundColor:
                      activeSection === "slider" ? "#eff2f7" : "transparent",
                    borderTop:
                      activeSection === "slider" ? "3px solid #00796b" : "none",
                    borderBottom:
                      activeSection !== "slider" ? "1px solid #d6d6d6" : "none",
                    textTransform: "none",
                    "& .MuiSvgIcon-root": {
                      color: activeSection === "slider" ? "#00796b" : "black", // Color for icon
                    },
                    "& .MuiTypography-root": {
                      color: activeSection === "slider" ? "#00796b" : "black", // Color for text
                    },
                    "&:hover": {
                      color: "#405189",
                    },
                  }}
                />
                <Tab
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <ProductionQuantityLimitsIcon sx={{ fontSize: 20 }} />
                      <Typography>Product Features</Typography>
                    </Box>
                  }
                  value="features"
                  sx={{
                    fontSize: "14px",
                    color: activeSection === "features" ? "#00796b" : "black",
                    backgroundColor:
                      activeSection === "features" ? "#eff2f7" : "transparent",
                    borderTop:
                      activeSection === "features"
                        ? "3px solid #00796b"
                        : "none",
                    borderBottom:
                      activeSection !== "features"
                        ? "1px solid #d6d6d6"
                        : "none",
                    textTransform: "none",
                    "& .MuiSvgIcon-root": {
                      color: activeSection === "features" ? "#00796b" : "black", // Color for icon
                    },
                    "& .MuiTypography-root": {
                      color: activeSection === "features" ? "#00796b" : "black", // Color for text
                    },
                    "&:hover": {
                      color: "#405189",
                    },
                  }}
                />
                <Tab
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <ReviewsIcon sx={{ fontSize: 20 }} />
                      <Typography>Testimonials</Typography>
                    </Box>
                  }
                  value="testimonials"
                  sx={{
                    fontSize: "14px",
                    color:
                      activeSection === "testimonials" ? "#00796b" : "black",
                    backgroundColor:
                      activeSection === "testimonials"
                        ? "#eff2f7"
                        : "transparent",
                    borderTop:
                      activeSection === "testimonials"
                        ? "3px solid #00796b"
                        : "none",
                    borderBottom:
                      activeSection !== "testimonials"
                        ? "1px solid #d6d6d6"
                        : "none",
                    textTransform: "none",
                    "& .MuiSvgIcon-root": {
                      color:
                        activeSection === "testimonials" ? "#00796b" : "black", // Color for icon
                    },
                    "& .MuiTypography-root": {
                      color:
                        activeSection === "testimonials" ? "#00796b" : "black", // Color for text
                    },
                    "&:hover": {
                      color: "#405189",
                    },
                  }}
                />
                <Tab
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <HandshakeIcon sx={{ fontSize: 20 }} />
                      <Typography>Clients</Typography>
                    </Box>
                  }
                  value="clients"
                  sx={{
                    fontSize: "14px",
                    color: activeSection === "clients" ? "#00796b" : "black",
                    backgroundColor:
                      activeSection === "clients" ? "#eff2f7" : "transparent",
                    borderTop:
                      activeSection === "clients"
                        ? "3px solid #00796b"
                        : "none",
                    borderBottom:
                      activeSection !== "clients"
                        ? "1px solid #d6d6d6"
                        : "none",
                    textTransform: "none",
                    "& .MuiSvgIcon-root": {
                      color: activeSection === "clients" ? "#00796b" : "black", // Color for icon
                    },
                    "& .MuiTypography-root": {
                      color: activeSection === "clients" ? "#00796b" : "black", // Color for text
                    },
                    "&:hover": {
                      color: "#405189",
                    },
                  }}
                />

<Tab
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <SettingsSuggestIcon sx={{ fontSize: 20 }} />
                      <Typography>Highlights</Typography>
                    </Box>
                  }
                  value="highlights"
                  sx={{
                    fontSize: "14px",
                    color: activeSection === "highlights" ? "#00796b" : "black",
                    backgroundColor:
                      activeSection === "highlights" ? "#eff2f7" : "transparent",
                    borderTop:
                      activeSection === "highlights"
                        ? "3px solid #00796b"
                        : "none",
                    borderBottom:
                      activeSection !== "highlights"
                        ? "1px solid #d6d6d6"
                        : "none",
                    textTransform: "none",
                    "& .MuiSvgIcon-root": {
                      color: activeSection === "highlights" ? "#00796b" : "black", // Color for icon
                    },
                    "& .MuiTypography-root": {
                      color: activeSection === "highlights" ? "#00796b" : "black", // Color for text
                    },
                    "&:hover": {
                      color: "#405189",
                    },
                  }}
                />

                <Tab
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <SettingsSuggestIcon sx={{ fontSize: 20 }} />
                      <Typography>Settings</Typography>
                    </Box>
                  }
                  value="settings"
                  sx={{
                    fontSize: "14px",
                    color: activeSection === "settings" ? "#00796b" : "black",
                    backgroundColor:
                      activeSection === "settings" ? "#eff2f7" : "transparent",
                    borderTop:
                      activeSection === "settings"
                        ? "3px solid #00796b"
                        : "none",
                    borderBottom:
                      activeSection !== "settings"
                        ? "1px solid #d6d6d6"
                        : "none",
                    textTransform: "none",
                    "& .MuiSvgIcon-root": {
                      color: activeSection === "settings" ? "#00796b" : "black", // Color for icon
                    },
                    "& .MuiTypography-root": {
                      color: activeSection === "settings" ? "#00796b" : "black", // Color for text
                    },
                    "&:hover": {
                      color: "#405189",
                    },
                  }}
                />
              </Tabs>

              <Grid item xs={12} md={12} sm={12}>
                {activeSection === "slider" && (
                  <>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: "600",
                        fontFamily: poppins.style.fontFamily,
                      }}
                    >
                      Slider Section
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    {/* Slider Section Content */}
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <CustomLabel htmlFor="heading" required>
                            Heading
                          </CustomLabel>
                          <CustomTextField
                            id="heading"
                            name="heading"
                            placeholder="e.g. heading"
                            type="text"
                            fullWidth
                            value={formData.heading}
                            onChange={handleChange}
                            error={Boolean(errors.heading)}
                            helperText={
                              errors.heading ? errors.heading.join(", ") : ""
                            }
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <CustomLabel htmlFor="subheading" required>
                            Subheading
                          </CustomLabel>
                          <CustomTextField
                            id="subheading"
                            name="subheading"
                            placeholder="e.g. subheading"
                            type="text"
                            fullWidth
                            value={formData.subheading}
                            onChange={handleChange}
                            error={Boolean(errors.subheading)}
                            helperText={
                              errors.subheading
                                ? errors.subheading.join(", ")
                                : ""
                            }
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <CustomLabel htmlFor="emailtextbutton" required>
                            Email Text Button
                          </CustomLabel>
                          <CustomTextField
                            id="emailtextbutton"
                            name="emailtextbutton"
                            placeholder="e.g. button text"
                            type="text"
                            fullWidth
                            value={formData.emailtextbutton}
                            onChange={handleChange}
                            error={Boolean(errors.button1)}
                            helperText={
                              errors.button1 ? errors.button1.join(", ") : ""
                            }
                          />
                          <CustomLabel htmlFor="belowtextheading" required>
                            Below Text Heading
                          </CustomLabel>
                          <CustomTextField
                            id="belowtextheading"
                            name="belowtextheading"
                            placeholder="e.g. Heading"
                            type="text"
                            fullWidth
                            value={formData.belowtextheading}
                            onChange={handleChange}
                            error={Boolean(errors.button2)}
                            helperText={
                              errors.button2 ? errors.button2.join(", ") : ""
                            }
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Box>
                            <Typography variant="body1">
                              Image
                              <Tooltip title="Upload your front website logo here">
                                <IconButton>
                                  <HelpOutlineIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Typography>

                            <div
                              style={{
                                border: "1px solid #ddd",
                                padding: "10px",
                                borderRadius: "4px",
                              }}
                            >
                              <input
                                type="file"
                                style={{ display: "none" }}
                                id="upload-slider-file"
                                onChange={handleFileChange}
                              />
                              <label
                                htmlFor="upload-slider-file"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "100px",
                                  border: "2px dashed #ddd",
                                  cursor: "pointer",
                                  borderRadius: "4px",
                                }}
                              >
                                <UploadFileIcon
                                  sx={{ fontSize: 48, color: "#aaa" }}
                                />
                                <Typography>
                                  {sliderFile
                                    ? sliderFile.name
                                    : "Choose a file"}
                                </Typography>
                              </label>
                            </div>
                          </Box>
                        </Grid>

                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            sx={{
                              marginLeft: "20px",
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

                    <Grid>
                      <br></br>
                      <CustomCard>
                        <CardContent>
                          <TableContainer>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <HeaderCell>ID</HeaderCell>
                                  <HeaderCell>Heading</HeaderCell>
                                  <HeaderCell>Created Date</HeaderCell>
                                  <HeaderCell>Action</HeaderCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {sliderData?.Data?.map((row, index) => (
                                  <TableRow key={index + 1}>
                                    <DataCell className={poppins.className}>
                                      {index + 1}{" "}
                                    </DataCell>
                                    <DataCell>{row.heading}</DataCell>
                                    <DataCell>{row.created_at}</DataCell>
                                    <TableCell>
                                      <IconButton
                                        onClick={() =>
                                          handleDeleteClick(row.id)
                                        }
                                        aria-label="delete"
                                        sx={{ color: "red" }}
                                      >
                                        <Delete />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </CardContent>
                      </CustomCard>

                      <Dialog open={open} onClose={handleDeleteCancel}>
                        <DialogTitle>Delete Module</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Are you sure you want to delete this module? This
                            action cannot be undone.
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleDeleteCancel} color="primary">
                            Cancel
                          </Button>
                          <Button
                            onClick={handleDeleteConfirm}
                            color="primary"
                            autoFocus
                          >
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                  </>
                )}

                {activeSection === "features" && (
                  <>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: "600",
                        fontFamily: poppins.style.fontFamily,
                      }}
                    >
                      Product features
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    {/* Product Features Content */}
                    <form onSubmit={handleProductSubmit}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6}>
                          <CustomLabel htmlFor="secondsectiontitle" required>
                            Title
                          </CustomLabel>
                          <CustomTextField
                            id="secondsectiontitle"
                            name="secondsectiontitle"
                            type="text"
                            placeholder="e.g. secondsectiontitle"
                            value={formData.secondsectiontitle}
                            onChange={handleInputChange}
                            fullWidth
                            error={!!errors?.heading}
                            helperText={errors?.heading?.[0]}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} md={6}>
                          <CustomLabel htmlFor="subtitle" required>
                            Sub Title
                          </CustomLabel>
                          <CustomTextField
                            id="subtitle"
                            name="subtitle"
                            type="text"
                            placeholder="e.g. subtitle"
                            value={formData.subtitle}
                            onChange={handleInputChange}
                            fullWidth
                            error={!!errors?.subheading}
                            helperText={errors?.subheading?.[0]}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} md={6}>
                          <CustomLabel htmlFor="featureonetitle" required>
                            URL
                          </CustomLabel>
                          <CustomTextField
                            id="featureonetitle"
                            name="featureonetitle"
                            type="text"
                            placeholder="e.g. featureonetitle"
                            value={formData.featureonetitle}
                            onChange={handleInputChange}
                            fullWidth
                            error={!!errors?.url}
                            helperText={errors?.url?.[0]}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Box>
                            <Typography
                              variant="body1"
                              sx={{ fontFamily: "Poppins, sans-serif" }}
                            >
                              Image
                              <Tooltip title="Upload your front website logo here">
                                <IconButton>
                                  <HelpOutlineIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Typography>

                            <div
                              style={{
                                border: "1px solid #ddd",
                                padding: "10px",
                                borderRadius: "4px",
                              }}
                            >
                              <input
                                type="file"
                                style={{ display: "none" }}
                                id="upload-features-file"
                                onChange={handleFileChangeProduct}
                              />
                              <label
                                htmlFor="upload-features-file"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "100px",
                                  border: "2px dashed #ddd",
                                  cursor: "pointer",
                                  borderRadius: "4px",
                                }}
                              >
                                <UploadFileIcon
                                  sx={{ fontSize: 48, color: "#aaa" }}
                                />
                                <Typography>
                                  {featuresFile
                                    ? featuresFile.name
                                    : "Choose a file"}
                                </Typography>
                              </label>
                              {errors?.image && (
                                <Typography color="error" variant="body2">
                                  {errors?.image?.[0]}
                                </Typography>
                              )}
                            </div>
                          </Box>
                        </Grid>

                        <Button
                          type="submit"
                          sx={{
                            marginLeft: "20px",
                            padding: "8px 16px",
                            fontSize: "14px",
                            fontWeight: "bold",
                            backgroundColor: "#405189",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "#334a6c",
                            },
                          }}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                      </Grid>
                    </form>
                    <Grid>
                      <CustomCard>
                        <CardContent>
                          <TableContainer>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <HeaderCell>ID</HeaderCell>
                                  <HeaderCell>Heading</HeaderCell>
                                  <HeaderCell>Created Date</HeaderCell>
                                  <HeaderCell>Action</HeaderCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {featuresData?.Data?.map((row, index) => (
                                  <TableRow key={row.id}>
                                    <DataCell>{index + 1}.</DataCell>
                                    <DataCell>{row.heading}</DataCell>
                                    <DataCell>{row.created_at}</DataCell>
                                    <TableCell>
                                      <IconButton
                                        onClick={() =>
                                          handleDeleteClickProduct(row.id)
                                        }
                                        aria-label="delete"
                                        sx={{ color: "red" }}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </CardContent>
                      </CustomCard>

                      {/* Delete Confirmation Dialog */}
                      <Dialog open={open} onClose={handleDeleteProductCancel}>
                        <DialogTitle>Delete Module</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Are you sure you want to delete this module? This
                            action cannot be undone.
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={handleDeleteProductCancel}
                            color="primary"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleDeleteProductConfirm}
                            color="primary"
                            autoFocus
                          >
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                  </>
                )}

                {activeSection === "testimonials" && (
                  <>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "600",
                        fontFamily: poppins.style.fontFamily,
                      }}
                    >
                      Testimonials
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    {/* Testimonials Content */}
                    <form onSubmit={handleTestimonialSubmit}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6}>
                          <CustomLabel htmlFor="testimonialtitle" required>
                            Title
                          </CustomLabel>
                          <CustomTextField
                            id="testimonialtitle"
                            name="testimonialtitle"
                            type="text"
                            placeholder="e.g. testimonialtitle"
                            value={formData.testimonialtitle}
                            onChange={handleInputChange}
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name ? errors.name[0] : ""}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <CustomLabel htmlFor="testimonial" required>
                            Testimonial
                          </CustomLabel>
                          <CustomTextField
                            id="testimonial"
                            name="testimonial"
                            type="text"
                            placeholder="e.g. testimonial"
                            value={formData.testimonial}
                            onChange={handleInputChange}
                            fullWidth
                            error={!!errors.message}
                            helperText={errors.message ? errors.message[0] : ""}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <CustomLabel htmlFor="headingtestimonial" required>
                            Heading
                          </CustomLabel>
                          <CustomTextField
                            id="headingtestimonial"
                            name="headingtestimonial"
                            type="text"
                            placeholder="e.g. headingtestimonial"
                            value={formData.headingtestimonial}
                            onChange={handleInputChange}
                            fullWidth
                            error={!!errors.designation}
                            helperText={
                              errors.designation ? errors.designation[0] : ""
                            }
                          />
                          <CustomLabel htmlFor="testimonialsubheading" required>
                            Subheading
                          </CustomLabel>
                          <CustomTextField
                            id="testimonialsubheading"
                            name="testimonialsubheading"
                            type="text"
                            placeholder="e.g. Sub title"
                            value={formData.testimonialsubheading}
                            onChange={handleInputChange}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Box>
                            <Typography variant="body1">
                              Testimonial Image
                              <Tooltip title="Upload your front website logo here">
                                <IconButton>
                                  <HelpOutlineIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Typography>

                            <div
                              style={{
                                border: "1px solid #ddd",
                                padding: "10px",
                                borderRadius: "4px",
                              }}
                            >
                              <input
                                type="file"
                                style={{ display: "none" }}
                                id="upload-testimonials-file"
                                onChange={handleFileChange}
                              />
                              <label
                                htmlFor="upload-testimonials-file"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "100px",
                                  border: "2px dashed #ddd",
                                  cursor: "pointer",
                                  borderRadius: "4px",
                                }}
                              >
                                <UploadFileIcon
                                  sx={{ fontSize: 48, color: "#aaa" }}
                                />
                                <Typography>
                                  {testimonialsFile
                                    ? testimonialsFile.name
                                    : "Choose a file"}
                                </Typography>
                              </label>
                            </div>
                          </Box>
                        </Grid>
                        <Button
                          type="submit"
                          sx={{
                            marginLeft: "20px",
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
                    </form>
                    <Grid>
                      <br></br>
                      <CustomCard>
                        <CardContent>
                          <TableContainer>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <HeaderCell>ID</HeaderCell>
                                  <HeaderCell>Name</HeaderCell>
                                  <HeaderCell>Designation</HeaderCell>
                                  <HeaderCell>Created Date</HeaderCell>
                                  <HeaderCell>Action</HeaderCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {testimonialsData?.Data?.map((row, index) => (
                                  <TableRow key={row.id}>
                                    <DataCell>{index + 1}.</DataCell>
                                    <DataCell>{row.name}</DataCell>
                                    <DataCell>{row.designation}</DataCell>
                                    <DataCell>{row.created_at}</DataCell>
                                    <TableCell>
                                      <IconButton
                                        onClick={() =>
                                          handleDeleteClickTestimonials(row.id)
                                        }
                                        aria-label="delete"
                                        sx={{ color: "red" }}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </CardContent>
                      </CustomCard>
                      {/* Delete Confirmation Dialog */}
                      <Dialog
                        open={open}
                        onClose={handleDeleteTestimonialsCancel}
                      >
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Are you sure you want to delete this testimonial?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={handleDeleteTestimonialsCancel}
                            color="primary"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleDeleteTestimonialsConfirm}
                            color="secondary"
                          >
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                  </>
                )}

                {activeSection === "highlights" && (
                  <>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: "600",
                        fontFamily: poppins.style.fontFamily,
                      }}
                    >
                      Highlights
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    {/* Highlights Content */}
                    <form onSubmit={handleHighSubmit}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={6}>
                            <CustomLabel htmlFor="highheading" required>
                              Heading
                            </CustomLabel>
                            <CustomTextField
                              id="highheading"
                              name="highheading"
                              type="text"
                              placeholder="e.g. heading"
                              value={highheading}
                              onChange={(e) => setHighHeading(e.target.value)}
                              fullWidth
                              error={!!errors.title}
                              helperText={errors.title?.[0]}
                            />
                            <CustomLabel htmlFor="highsubheading" required>
                              Subheading
                            </CustomLabel>
                            <CustomTextField
                              id="highsubheading"
                              name="highsubheading"
                              type="text"
                              placeholder="e.g. Sub title"
                              value={highsubheading}
                              onChange={(e) => setHighSubHeading(e.target.value)}
                              fullWidth
                              error={!!errors.description}
                              helperText={errors.description?.[0]}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6} md={6}>
                            <Box>
                              <Typography variant="body1" sx={{ fontFamily: "Poppins, sans-serif" }}>
                                Highlights Image
                                <Tooltip title="Upload your front website logo here">
                                  <IconButton>
                                    <HelpOutlineIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Typography>

                              <div
                                style={{
                                  border: "1px solid #ddd",
                                  padding: "10px",
                                  borderRadius: "4px",
                                }}
                              >
                                <input
                                  type="file"
                                  style={{ display: "none" }}
                                  id="upload-highlights-file"
                                  onChange={handleFileChange}
                                />
                                <label
                                  htmlFor="upload-highlights-file"
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100px",
                                    border: "2px dashed #ddd",
                                    cursor: "pointer",
                                    borderRadius: "4px",
                                  }}
                                >
                                  <UploadFileIcon sx={{ fontSize: 48, color: "#aaa" }} />
                                  <Typography>
                                    {highlightsFile ? highlightsFile.name : "Choose a file"}
                                  </Typography>
                                </label>
                                {errors.image && (
                                  <Typography color="error" variant="body2">
                                    {errors.image[0]}
                                  </Typography>
                                )}
                              </div>
                            </Box>
                          </Grid>
                        </Grid>

                        <Button
                          type="submit"
                          sx={{
                            marginTop: "20px",
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
                      </form>
                    <Grid>
                      <br></br>
                      <CustomCard>
                        <CardContent>
                          <TableContainer>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <HeaderCell>ID</HeaderCell>
                                  <HeaderCell>Title</HeaderCell>
                                  <HeaderCell>Created Date</HeaderCell>
                                  <HeaderCell>Action</HeaderCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                              {highlightsData?.Data?.map((row, index) => (
                                  <TableRow key={row.id}>
                                    <DataCell>{index + 1}.</DataCell>
                                    <DataCell>{row.title}</DataCell>
                                    <DataCell>{row.created_at}</DataCell>
                                    <TableCell>
                                      <IconButton
                                          onClick={() => handleDeleteClickHighlights(row.id)}
                                        aria-label="delete"
                                        sx={{ color: "red" }}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </CardContent>
                      </CustomCard>

                        {/* Delete Confirmation Dialog */}
                        <Dialog
                        open={open}
                        onClose={handleDeleteHighlightsCancel}
                      >
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Are you sure you want to delete this Highlights?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={handleDeleteHighlightsCancel}
                            color="primary"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleDeleteHighlightsConfirm}
                            color="secondary"
                          >
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                  </>
                )}

                {activeSection === "clients" && (
                  <>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: "600",
                        fontFamily: poppins.style.fontFamily,
                      }}
                    >
                      Clients
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    {/* Clients Content */}
                    <form onSubmit={handleSubmitClients}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6}>
                          <CustomLabel htmlFor="highlightsheading" required>
                            Heading
                          </CustomLabel>
                          <CustomTextField
                            id="highlightsheading"
                            name="highlightsheading"
                            type="text"
                            placeholder="e.g. heading"
                            fullWidth
                            value={formData.highlightsheading}
                            onChange={handleInputChange}
                            error={!!errors.name}
                            helperText={errors.name?.[0]}
                          />
                          <CustomLabel htmlFor="highlightssubheading" required>
                            Subheading
                          </CustomLabel>
                          <CustomTextField
                            id="highlightssubheading"
                            name="highlightssubheading"
                            type="text"
                            placeholder="e.g. Sub title"
                            fullWidth
                            value={formData.highlightssubheading}
                            onChange={handleInputChange}
                            error={!!errors.url}
                            helperText={errors.url?.[0]}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Box>
                            <Typography
                              variant="body1"
                              sx={{ fontFamily: poppins.style.fontFamily }}
                            >
                              Clients Image
                              <Tooltip title="Upload your front website logo here">
                                <IconButton>
                                  <HelpOutlineIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Typography>

                            <div
                              style={{
                                border: "1px solid #ddd",
                                padding: "10px",
                                borderRadius: "4px",
                              }}
                            >
                              <input
                                type="file"
                                style={{ display: "none" }}
                                id="upload-clients-file"
                                onChange={handleFileChange}
                              />
                              <label
                                htmlFor="upload-clients-file"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "100px",
                                  border: "2px dashed #ddd",
                                  cursor: "pointer",
                                  borderRadius: "4px",
                                }}
                              >
                                <UploadFileIcon
                                  sx={{ fontSize: 48, color: "#aaa" }}
                                />
                                <Typography>
                                  {clientsFile
                                    ? clientsFile.name
                                    : "Choose a file"}
                                </Typography>
                              </label>
                            </div>
                            {errors.logo && (
                              <Typography color="error">
                                {errors.logo[0]}
                              </Typography>
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                      <Button
                        type="submit"
                        sx={{
                          marginLeft: "20px",
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
                    </form>
                    <Grid>
                      <br></br>
                      <CustomCard>
                        <CardContent>
                          <TableContainer>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <HeaderCell>ID</HeaderCell>
                                  <HeaderCell>Heading</HeaderCell>
                                  <HeaderCell>Created Date</HeaderCell>
                                  <HeaderCell>Action</HeaderCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                              {clientsData?.Data?.map((row, index) => (
                                  <TableRow key={row.id}>
                                    <DataCell>{index + 1}.</DataCell>
                                    <DataCell>{row.name}</DataCell>
                                    <DataCell>{row.created_at}</DataCell>
                                    <TableCell>
                                      <IconButton
                                        onClick={() => handleDeleteClickClients(row.id)}
                                        aria-label="delete"
                                        sx={{ color: "red" }}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))} 
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </CardContent>
                      </CustomCard>

                      
                       {/* Delete Confirmation Dialog */}
                       <Dialog
                        open={open}
                        onClose={handleDeleteClientsCancel}
                      >
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Are you sure you want to delete this Clients?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={handleDeleteClientsCancel}
                            color="primary"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleDeleteClientsConfirm}
                            color="secondary"
                          >
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>


                    </Grid>
                  </>
                )}

                {activeSection === "settings" && (
                  <>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: "600",
                        fontFamily: poppins.style.fontFamily,
                      }}
                    >
                      Social Media Settings
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    {/* Deleted Users Content */}
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={6}>
                        <CustomLabel htmlFor="aboutheading" required>
                          About Company Heading
                        </CustomLabel>
                        <CustomTextField
                          id="aboutheading"
                          name="aboutheading"
                          type="text"
                          placeholder="e.g. heading"
                          fullWidth
                        />
                        <CustomLabel htmlFor="aboutsubheading" required>
                          Tag Lines for company
                        </CustomLabel>
                        <CustomTextField
                          id="aboutsubheading"
                          name="aboutsubheading"
                          type="text"
                          placeholder="e.g. Sub title"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Box>
                          <Typography
                            variant="body1"
                            sx={{ fontFamily: poppins.style.fontFamily }}
                          >
                            logo Image
                            <Tooltip title="Upload your front website logo here">
                              <IconButton>
                                <HelpOutlineIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Typography>

                          <div
                            style={{
                              border: "1px solid #ddd",
                              padding: "10px",
                              borderRadius: "4px",
                            }}
                          >
                            <input
                              type="file"
                              style={{ display: "none" }}
                              id="upload-settings-file"
                              onChange={handleFileChange}
                            />
                            <label
                              htmlFor="upload-settings-file"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100px",
                                border: "2px dashed #ddd",
                                cursor: "pointer",
                                borderRadius: "4px",
                              }}
                            >
                              <UploadFileIcon
                                sx={{ fontSize: 48, color: "#aaa" }}
                              />
                              <Typography>
                                {settingsFile
                                  ? settingsFile.name
                                  : "Choose a file"}
                              </Typography>
                            </label>
                          </div>
                        </Box>
                      </Grid>
                      <Button
                        type="submit"
                        sx={{
                          marginLeft: "20px",
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

                    
                    <Grid>
                      <br></br>
                      <CustomCard>
                        <CardContent>
                          <TableContainer>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <HeaderCell>ID</HeaderCell>
                                  <HeaderCell>Heading</HeaderCell>
                                  <HeaderCell>Created Date</HeaderCell>
                                  <HeaderCell>Action</HeaderCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {/* {data.map((row, index) => (
                                  <TableRow key={row.id}>
                                    <DataCell>{index + 1}.</DataCell>
                                    <DataCell>{row.heading}</DataCell>
                                    <DataCell>{row.created}</DataCell>
                                    <TableCell>
                                      <IconButton
                                        onClick={() => handleDelete(row.id)}
                                        aria-label="delete"
                                        sx={{ color: "red" }}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                ))} */}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </CardContent>
                      </CustomCard>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default LandingPageSettings;
