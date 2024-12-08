import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  MenuItem,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  Box,
  IconButton,
  TextField,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CustomLabel from "../CustomLabel";
import CustomTextField from "../CustomTextField";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import Flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns"; 
import axios from "axios";
import MainApi from "@/api-manage/MainApi"; 
import { getToken } from "@/utils/getToken";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

const ReadyToShip = () => {
  const dateRef = useRef(null);
  const [startDate, setStartDate] = useState(dayjs(null));
  const [endDate, setEndDate] = useState(dayjs(null));
  const [state, setState] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  const [pickupPoint, setPickupPoint] = useState("");
  const [dateRange, setDateRange] = useState("");
  const handlePickupPoint = (event) => {
    setPickupPoint(event.target.value);
  };
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
  const [formattedRange, setFormattedRange] = useState("");

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };
  const [zone, setzone] = useState("");
  const handlezone = (event) => {
    setzone(event.target.value);
  };

  const [shipment, setshipment] = useState("");
  const handleshipment = (event) => {
    setshipment(event.target.value);
  };

  const handlestate = (event) => {
    setstate(event.target.value);
  };
  const [hyperlocal, sethyperlocal] = useState("");
  const handlehyperlocal = (event) => {
    sethyperlocal(event.target.value);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const rows = [
    {
      id: 1,
      order_id: "PRXTW987",
      name: "Shivam Kumar Sain",
      city: "Noida",
      product: "Weight loss",
      order_date: "2024-11-08",
    },
    {
      id: 2,
      order_id: "PRXTW988",
      name: "Amit Kumar",
      city: "Delhi",
      product: "Health Supplement",
      order_date: "2024-10-25",
    },
  ];

  const filterDataByDate = () => {
    if (!startDate || !endDate) {
      setFilteredRows(rows);
      return;
    }

    const filtered = rows.filter((row) => {
      const orderDate = dayjs(row.order_date);
      return (
        orderDate.isSameOrAfter(startDate, "day") &&
        orderDate.isSameOrBefore(endDate, "day")
      );
    });
    setFilteredRows(filtered);
  };

  useEffect(() => {
    filterDataByDate();
  }, [startDate, endDate]);

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(filteredRows.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleApply = () => {
    setOpenDialog(true); 
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); 
  };

  const handleSubmit = () => {
    console.log("Form submitted");
    handleCloseDialog();
  };
  const handleDate = (e) => {
    const value = e.target.value;
    setSelectedDateRange(value);
    console.log(value);
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setSelectedDateRange(dates);

    if (start && end) {
      const formattedStart = format(start, "yyyy-MM-dd");
      const formattedEnd = format(end, "yyyy-MM-dd");
      const range = `${formattedStart} ${formattedEnd}`;
      setFormattedRange(range);
      console.log("Formatted Date Range:", range); 
    }
  };

  const submitFilter = async () => {
    try {
      const token = await getToken();
      const data = {
        date_range: formattedRange,
      };
      const response = await MainApi.post(
        `/api/filter-orders/`,
        data,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json", 
          },
          maxBodyLength: Infinity,
        }
      );
      setFilteredRows(response.data.results);
      console.log("Response Data:", response.data);
    } catch (error) {
      console.error("Error during filter request:", error);
    }
  };

  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={12}>
        <CustomCard padding="13px">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "20px",
                  whiteSpace: "nowrap",
                  textTransform: "capitalize",
                  color: "black",
                  marginLeft: "0px",
                }}
              >
                Ready to Ship
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Grid
                container
                spacing={1}
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={12} sm={3}>
                  <CustomLabel htmlFor="pickupPoint" required>
                    Pickup Point
                  </CustomLabel>
                  <Select
                    labelId="pickupPoint"
                    id="pickupPoint"
                    name="pickupPoint"
                    value={pickupPoint}
                    onChange={handlePickupPoint}
                    displayEmpty
                    sx={{ fontFamily: "Poppins, sans-serif", height: "50px" }}
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Select Pickup Point
                    </MenuItem>
                    <MenuItem value={1}>Noida-16</MenuItem>
                    <MenuItem value={2}>Noida-18</MenuItem>
                    <MenuItem value={3}>Noida-63</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <CustomLabel htmlFor="zone" required>
                    Zone
                  </CustomLabel>
                  <Select
                    labelId="zone"
                    id="zone"
                    name="zone"
                    value={zone}
                    onChange={handlezone}
                    displayEmpty
                    sx={{ fontFamily: "Poppins, sans-serif", height: "50px" }}
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Select Zone
                    </MenuItem>
                    <MenuItem value={1}>East Delhi</MenuItem>
                    <MenuItem value={2}>New Delhi</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <CustomLabel htmlFor="state" required>
                    Within State
                  </CustomLabel>
                  <Select
                    labelId="state"
                    id="state"
                    name="state"
                    value={state}
                    onChange={handlestate}
                    displayEmpty
                    sx={{ fontFamily: "Poppins, sans-serif", height: "50px" }}
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Select State
                    </MenuItem>
                    <MenuItem value={1}>Delhi</MenuItem>
                    <MenuItem value={2}>Uttar Pradesh</MenuItem>
                    <MenuItem value={3}>West Bengal</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <CustomLabel htmlFor="SKU Product" required>
                    SKU Product.
                  </CustomLabel>
                  <CustomTextField
                    id="sku"
                    name="SKU Product"
                    placeholder="e.g. PRO34XP"
                    type="text"
                    fullWidth
                    sx={{ fontFamily: poppins.style.fontFamily }}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <CustomLabel htmlFor="hyperlocal">Hyperlocal</CustomLabel>
                  <Select
                    labelId="hyperlocal"
                    id="hyperlocal"
                    name="hyperlocal"
                    value={hyperlocal}
                    onChange={handlehyperlocal}
                    displayEmpty
                    sx={{ fontFamily: "Poppins, sans-serif", height: "50px" }}
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Select Hyperlocal
                    </MenuItem>
                    <MenuItem value={1}>Delhi</MenuItem>
                    <MenuItem value={2}>Uttar Pradesh</MenuItem>
                    <MenuItem value={3}>West Bengal</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={12} sm={3} md={3}>
                  <CustomLabel htmlFor="date_range" required>
                    Date Range
                  </CustomLabel>
                  <Grid
                    container
                    alignItems="center"
                    style={{
                      backgroundColor: "#fff",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid black",
                    }}
                  >
                    <Grid item xs={11}>
                      <DatePicker
                        selected={selectedDateRange[0]}
                        startDate={selectedDateRange[0]}
                        endDate={selectedDateRange[1]}
                        onChange={handleDateChange}
                        selectsRange
                        inline
                        placeholderText="Select date range"
                      />
                    </Grid>
                    <Grid item xs={1} container justifyContent="center">
                      <CalendarMonthIcon
                        style={{
                          fontSize: "35px",
                          color: "white",
                          backgroundColor: "#405189",
                          borderRadius: "5px",
                          cursor: "pointer",
                          padding: "4px",
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Button
                    sx={{
                      marginTop: "24px",
                      padding: "8px 16px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      backgroundColor: "#405189",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#334a6c",
                      },
                      fontFamily: poppins.style.fontFamily,
                    }}
                    onClick={submitFilter}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CustomCard>
      </Grid>

      <Grid item xs={12}>
        <CustomCard>
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "auto 1fr auto",
              maxHeight: "400px",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TableContainer
                component={Paper}
                sx={{ overflowY: "auto", maxHeight: "340px" }}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          indeterminate={
                            selectedRows.length > 0 &&
                            selectedRows.length < filteredRows.length
                          }
                          checked={
                            filteredRows.length > 0 &&
                            selectedRows.length === filteredRows.length
                          }
                          onChange={handleSelectAll}
                        />
                      </TableCell>
                      <TableCell>
                        <b>Sr.</b>
                      </TableCell>
                      <TableCell>
                        <b>Order ID</b>
                      </TableCell>
                      <TableCell>
                        <b>Customer Name</b>
                      </TableCell>
                      <TableCell>
                        <b>City</b>
                      </TableCell>
                      <TableCell>
                        <b>Product</b>
                      </TableCell>
                      <TableCell>
                        <b>Order Date</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRows.length > 0 ? (
                      filteredRows.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedRows.includes(row.id)}
                              onChange={() => handleSelectRow(row.id)}
                            />
                          </TableCell>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.order_id}</TableCell>
                          <TableCell>{row.customer_name}</TableCell>
                          <TableCell>{row.customer_city}</TableCell>
                          <TableCell>{row.order_wayBill}</TableCell>
                          <TableCell>{row.created_at}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          No data available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </CustomCard>

        <Grid container padding={2}>
          <Grid item xs={6} sm={6} md={6}>
            <CustomCard padding="13px">
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={12} sm={8}>
                  <Select
                    labelId="shipment"
                    id="shipment"
                    name="shipment"
                    value={shipment}
                    onChange={handleshipment}
                    displayEmpty
                    sx={{ fontFamily: "Poppins, sans-serif", height: "50px" }}
                    fullWidth
                    disabled={selectedRows.length === 0}
                  >
                    <MenuItem value="" disabled>
                      Select Shipment Channels
                    </MenuItem>
                    <MenuItem value={1}>Shiprocket</MenuItem>
                  </Select>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  display="flex"
                  justifyContent="flex-start"
                >
                  <Box sx={{ marginLeft: "16px" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleApply}
                      disabled={selectedRows.length === 0}
                    >
                      Apply
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CustomCard>
          </Grid>
        </Grid>
      </Grid>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Selected Shipment Channels</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel control={<Checkbox />} label="E-Kart" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel control={<Checkbox />} label="E-Com" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel control={<Checkbox />} label="Blue Dart" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
export default ReadyToShip;
