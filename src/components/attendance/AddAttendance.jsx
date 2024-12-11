import React, { useState, useRef, useEffect } from "react";

import {
  Grid,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CustomCard from "../CustomCard";
import CustomTextField from "../CustomTextField";
import CustomLabel from "../CustomLabel";
import "react-quill/dist/quill.snow.css";
import Flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
const AddAttendance = ({ onAttendanceList }) => {
  const dateRef = useRef(null);

  useEffect(() => {
    const today = new Date();
    const flatpickrInstance = Flatpickr(dateRef.current, {
      mode: "range",
      dateFormat: "d M, Y",
      defaultDate: [today, today],
    });

    return () => {
      flatpickrInstance.destroy();
    };
  }, []);

  const [value, setValue] = useState("date");
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    setDate("");
    setStartDate("");
    setEndDate("");
    setYear("");
    setMonth("");
  };
  const [isLate, setIsLate] = useState("no");
  const [isHalfDay, setIsHalfDay] = useState("no");
  const handleLateChange = (event) => {
    setIsLate(event.target.value);
  };

  const handleHalfDayChange = (event) => {
    setIsHalfDay(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onAttendanceList();
  };
  const [workingFrom, setWorkingFrom] = useState("");
  const handleWorkingFromChange = (event) => {
    setWorkingFrom(event.target.value);
  };
  return (
    <Grid container spacing={2} sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
              Attendance Details
            </Typography>
            <Divider sx={{ my: 2 }} />
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="department" required>
                    Department
                  </CustomLabel>
                  <CustomTextField
                    id="department"
                    name="department"
                    placeholder="department"
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={8}>
                  <CustomLabel htmlFor="employees" required>
                    Employees
                  </CustomLabel>
                  <CustomTextField id="employees" name="employees" fullWidth />
                </Grid>

                <Grid item xs={12} sm={3} md={4}>
                  <CustomLabel htmlFor="location" required>
                    Location
                  </CustomLabel>
                  <CustomTextField id="location" name="location" fullWidth />
                </Grid>

                <Grid item xs={3} sm={3} md={3}>
                  <FormControl component="fieldset" fullWidth>
                    <CustomLabel component="legend">
                      Assign Shift By
                    </CustomLabel>
                    <RadioGroup
                      aria-label="assign-shift-by"
                      name="assignshiftby"
                      value={value}
                      onChange={handleChange}
                      row
                    >
                      <FormControlLabel
                        value="date"
                        control={<Radio />}
                        label="Date"
                      />

                      <FormControlLabel
                        value="month"
                        control={<Radio />}
                        label="Month"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                {value === "date" && (
                  <>
                    <Grid item xs={12} sm={6} md={3} mt={2}>
                      <div
                        style={{
                          padding: "8px",
                          borderRadius: "4px",
                          position: "relative",
                          backgroundColor: "#fff",
                          border: "2px solid black",
                        }}
                      >
                        <input
                          ref={dateRef}
                          type="text"
                          placeholder="Select date range"
                          style={{
                            padding: "5px",
                            borderRadius: "4px",
                            color: "#333",
                            width: "100%",
                            fontSize: "15px",

                            outline: "none",
                          }}
                          onFocus={(e) => {
                            e.target.style.border = "none";
                            e.target.style.outline = "none";
                          }}
                          onBlur={(e) => {
                            e.target.style.border = "none";
                            e.target.style.outline = "none";
                          }}
                        />

                        <CalendarMonthIcon
                          style={{
                            position: "absolute",
                            top: "50%",
                            transform: "translateY(-50%)",
                            fontSize: "35px",
                            color: "white",
                            right: "1px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            backgroundColor: "#405189",
                            padding: "4px",
                          }}
                          onClick={() => dateRef.current.focus()} // This will focus the input
                        />
                      </div>
                    </Grid>
                  </>
                )}

                {value === "month" && (
                  <>
                    <Grid item xs={12} sm={3} md={2}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="year">Year</InputLabel>
                        <Select
                          id="year"
                          name="year"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                        >
                          {/* Example years */}
                          {[2022, 2023, 2024].map((yr) => (
                            <MenuItem key={yr} value={yr}>
                              {yr}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3} md={2}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="month">Month</InputLabel>
                        <Select
                          id="month"
                          name="month"
                          value={month}
                          onChange={(e) => setMonth(e.target.value)}
                        >
                          {/* Example months */}
                          {[
                            { value: 1, label: "January" },
                            { value: 2, label: "February" },
                            // More months...
                          ].map((mn) => (
                            <MenuItem key={mn.value} value={mn.value}>
                              {mn.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </>
                )}

                <Grid item xs={12} sm={12} md={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                      <CustomLabel htmlFor="clockin" required>
                        Clock In
                      </CustomLabel>
                      <CustomTextField
                        id="clockin"
                        name="clockin"
                        type="time"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <CustomLabel htmlFor="clockout" required>
                        Clock Out
                      </CustomLabel>
                      <CustomTextField
                        id="clockout"
                        name="clockout"
                        type="time"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <CustomLabel htmlFor="late" required>
                    Late
                  </CustomLabel>
                  <RadioGroup
                    row
                    name="late"
                    value={isLate}
                    onChange={handleLateChange}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <CustomLabel htmlFor="halfday" required>
                    Half Day
                  </CustomLabel>
                  <RadioGroup
                    row
                    name="halfday"
                    value={isHalfDay}
                    onChange={handleHalfDayChange}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <CustomLabel htmlFor="workingfrom" required>
                    Working From
                  </CustomLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="workingfrom-label"
                      id="workingfrom"
                      value={workingFrom}
                      onChange={handleWorkingFromChange}
                      fullWidth
                      sx={{ height: "40px" }}
                    >
                      <MenuItem value="office">Office</MenuItem>
                      <MenuItem value="home">Home</MenuItem>
                      <MenuItem value="remote">Remote</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <CustomLabel htmlFor="attendanceoverwrite" required>
                    Attendance Overwrite
                  </CustomLabel>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="attendanceoverwrite"
                        name="attendanceoverwrite"
                        color="primary"
                      />
                    }
                    label="Overwrite Attendance"
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
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default AddAttendance;
