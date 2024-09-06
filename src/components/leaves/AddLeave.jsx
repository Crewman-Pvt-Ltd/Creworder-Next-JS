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
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/CloudUpload";
import { Poppins } from "next/font/google";
import CustomLabel from "../CustomLabel";
import CustomTextField from "../CustomTextField";
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const AddLeave = ({ onLeaveList }) => {
  const [photo, setPhoto] = useState(null);
  const [summary, setSummary] = useState("");
  const [duration, setDuration] = useState("");

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic for form submission if needed
    onLeaveList(); // Notify parent component to switch view
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
                  <CustomTextField
                    id="choosemember"
                    name="choosemember"
                    placeholder="choosemember"
                    type="text"
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <CustomLabel htmlFor="leavetype" required>
                    Leave Type
                  </CustomLabel>
                  <CustomTextField
                    id="leavetype"
                    name="leavetype"
                    type="text"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <CustomLabel htmlFor="status" required>
                    Status
                  </CustomLabel>
                  <CustomTextField
                    id="status"
                    name="status"
                    type="text"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <CustomLabel htmlFor="date" required>
                    Date
                  </CustomLabel>
                  <CustomTextField
                    id="date"
                    name="date"
                    type="date"
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
                        value={duration}
                        onChange={handleDurationChange}
                        row
                      >
                        <FormControlLabel
                          value="full-day"
                          control={<Radio />}
                          label="Full Day"
                          sx={{ marginRight: 2 }}
                        />
                        <FormControlLabel
                          value="multiple"
                          control={<Radio />}
                          label="Multiple"
                          sx={{ marginRight: 2 }}
                        />
                        <FormControlLabel
                          value="first-half"
                          control={<Radio />}
                          label="First Half"
                          sx={{ marginRight: 2 }}
                        />
                        <FormControlLabel
                          value="second-half"
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
                    fullWidth
                    multiline
                    rows="2"
                  />
                </Grid>
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
            </form>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default AddLeave;
