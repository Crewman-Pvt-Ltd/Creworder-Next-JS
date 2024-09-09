import React, { useState } from "react";
import CustomCard from "../CustomCard";
import {
  CardContent,
  Grid,
  Typography,
  Box,
  Divider,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/CloudUpload";
import { Poppins } from "next/font/google";
import CustomLabel from "../CustomLabel";
import CustomTextField from "../CustomTextField";
import useGetAllUsers from "@/api-manage/react-query/useGetAllUsers";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const AddLeave = ({ onLeaveList }) => {
  const token = getToken();
  const { data: userData } = useGetAllUsers();
  const [formData, setFormData] = useState({
    duration: "",
    user: "",
    status: "",
    type: "",
    reason: "",
    date: "",
    attachment: null,
  });
  const [error, setError] = useState("");

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (event) => {
    setFormData((prev) => ({ ...prev, attachment: event.target.files[0] }));
  };

  const handleDurationChange = (event) => {
    setFormData((prev) => ({ ...prev, duration: event.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    try {
      const response = await MainApi.post(
        "/api/leaves/",
        formDataToSubmit,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        onLeaveList();
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      setError("Error submitting form: " + error.message);
      console.error(error);
    }
  };

  return (
    <Grid container spacing={2} sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
              Add Leave
            </Typography>
            <Divider sx={{ my: 2 }} />
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <CustomLabel htmlFor="choosemember" required>
                    Choose Member
                  </CustomLabel>
                  <Box display="flex" flexDirection="column">
                    <FormControl fullWidth>
                      <Select
                        labelId="choosemember-label"
                        id="choosemember"
                        name="user"
                        value={formData.user}
                        onChange={handleFormChange}
                        displayEmpty
                        sx={{ height: "40px" }}
                      >
                        {userData &&
                          userData.results.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                              {user.first_name} {user.last_name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <CustomLabel htmlFor="leavetype" required>
                    Leave Type
                  </CustomLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="leavetype-label"
                      id="leavetype"
                      name="type"
                      value={formData.type}
                      onChange={handleFormChange}
                      displayEmpty
                      sx={{ height: "40px" }}
                    >
                      <MenuItem value="casual">Casual</MenuItem>
                      <MenuItem value="sick">Sick</MenuItem>
                      <MenuItem value="earned">Earned</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <CustomLabel htmlFor="status" required>
                    Status
                  </CustomLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="status-label"
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleFormChange}
                      displayEmpty
                      sx={{ height: "40px" }}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="approved">Approved</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <CustomLabel htmlFor="date" required>
                    Date
                  </CustomLabel>
                  <CustomTextField
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date || ""}
                    onChange={handleFormChange}
                    fullWidth
                  />
                  <CustomLabel htmlFor="selectduration" required>
                    Select Duration
                  </CustomLabel>
                  <Box mt={1}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleDurationChange}
                        row
                      >
                        <FormControlLabel
                          value="full"
                          control={<Radio />}
                          label="Full Day"
                          sx={{ marginRight: 2 }}
                        />
                        <FormControlLabel
                          value="first"
                          control={<Radio />}
                          label="First Half"
                          sx={{ marginRight: 2 }}
                        />
                        <FormControlLabel
                          value="second"
                          control={<Radio />}
                          label="Second Half"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <CustomLabel htmlFor="photo" required>
                    Upload Photo
                  </CustomLabel>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    height="150px"
                    border="1px dashed grey"
                    borderRadius="4px"
                    sx={{ cursor: "pointer" }}
                  >
                    <input
                      type="file"
                      id="photo"
                      onChange={handlePhotoChange}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="photo">
                      <UploadFileIcon fontSize="large" />
                      <Typography className={poppins.className} variant="body2">
                        Choose a file
                      </Typography>
                    </label>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <CustomLabel htmlFor="reason" required>
                    Reason for Absence
                  </CustomLabel>
                  <CustomTextField
                    id="reason"
                    name="reason"
                    type="text"
                    value={formData.reason || ""}
                    onChange={handleFormChange}
                    fullWidth
                    multiline
                    rows="2"
                  />
                </Grid>
              </Grid>

              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}

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
            </form>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default AddLeave;
