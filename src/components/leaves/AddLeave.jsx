import React, { useState, useEffect, useRef } from "react";
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
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CustomCard from "../CustomCard";
import CustomLabel from "../CustomLabel";
import CustomTextField from "../CustomTextField";
import useGetAllUsers from "@/api-manage/react-query/useGetAllUsers";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";
import Flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import dayjs from "dayjs";

const AddLeave = ({ onLeaveList }) => {
  const dateRef = useRef(null);
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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const today = new Date();
    const flatpickrInstance = Flatpickr(dateRef.current, {
      mode: "range",
      dateFormat: "d M, Y",
      defaultDate: [today, today],
      onChange: (selectedDates) => {
        if (selectedDates.length === 2) {
          setStartDate(dayjs(selectedDates[0]));
          setEndDate(dayjs(selectedDates[1]));
        }
      },
    });

    return () => {
      flatpickrInstance.destroy();
    };
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (event) => {
    setFormData((prev) => ({ ...prev, attachment: event.target.files[0] }));
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
      const response = await MainApi.post("/api/leaves/", formDataToSubmit, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        onLeaveList(); 
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (err) {
      setError(`Error submitting form: ${err.message}`);
      console.error(err);
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
                  <FormControl fullWidth>
                    <Select
                      id="choosemember"
                      name="user"
                      value={formData.user}
                      onChange={handleFormChange}
                      displayEmpty
                      sx={{ height: "40px" }}
                    >
                      {userData?.results?.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.first_name} {user.last_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

               
                <Grid item xs={12} sm={6} md={4}>
                  <CustomLabel htmlFor="leavetype" required>
                    Leave Type
                  </CustomLabel>
                  <FormControl fullWidth>
                    <Select
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

                
                <Grid item xs={12} sm={3} md={4}>
                  <CustomLabel required>Select Date Range</CustomLabel>
                  <Box
                    sx={{
                      padding: "8px",
                      border: "2px solid gray",
                      borderRadius: "4px",
                      position: "relative",
                      backgroundColor: "#fff",
                    }}
                  >
                    <input
                      ref={dateRef}
                      type="text"
                      placeholder="Select date range"
                      style={{
                        width: "100%",
                        height: "30px",
                        border: "none",
                        outline: "none",
                        padding: "5px",
                        fontSize: "14px",
                      }}
                    />
                    <CalendarMonthIcon
                      sx={{
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        fontSize: "24px",
                        cursor: "pointer",
                        color: "#405189",
                      }}
                      onClick={() => dateRef.current.focus()}
                    />
                  </Box>
                </Grid>

                
                <Grid item xs={12} sm={6} md={4}>
                  <CustomLabel htmlFor="selectduration" required>
                    Select Duration
                  </CustomLabel>
                  <RadioGroup
                    name="duration"
                    value={formData.duration}
                    onChange={handleFormChange}
                    row
                  >
                    <FormControlLabel
                      value="full"
                      control={<Radio />}
                      label="Full Day"
                    />
                    <FormControlLabel
                      value="first"
                      control={<Radio />}
                      label="First Half"
                    />
                    <FormControlLabel
                      value="second"
                      control={<Radio />}
                      label="Second Half"
                    />
                  </RadioGroup>
                </Grid>

                
                <Grid item xs={12} sm={4} md={4}>
                  <CustomLabel htmlFor="photo" required>
                    Upload Photo
                  </CustomLabel>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height="150px"
                    border="1px dashed grey"
                    borderRadius="4px"
                  >
                    <input
                      type="file"
                      id="photo"
                      onChange={handlePhotoChange}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="photo">
                      <UploadFileIcon fontSize="large" />
                      <Typography>Choose a file</Typography>
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
                    value={formData.reason}
                    onChange={handleFormChange}
                    fullWidth
                    multiline
                    rows={2}
                  />
                </Grid>
              </Grid>

              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}

              {/* Submit Button */}
              <Grid
                item
                xs={12}
                sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#405189",
                    "&:hover": { backgroundColor: "#334a6c" },
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
