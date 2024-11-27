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
  TableFooter,
  TablePagination,
  FormControl,
} from "@mui/material";
import Flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CustomLabel from "../CustomLabel";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";
import { DateRangePicker } from "@nextui-org/date-picker";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});
const FollowUp = () => {
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
  const router = useRouter();
  const [status, setstatus] = useState("");
  // Handle change for courseDuration
  const handlestatus = (event) => {
    setstatus(event.target.value);
  };
  const rows = [
    {
      id: 1,
      customer_name: "Rahul",
      customer_phone: "9876543210",
      remainder_date: "2024-12-01",
      description: "Lorem Ipsum has been the industry's standard",
      agent: "testUser",
      created_date: "2024-08-01",
    },
  ];

  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={12}>
        <CustomCard padding="13px">
          <Grid item>
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "20px",
                whiteSpace: "nowrap",
                textTransform: "capitalize",
                color: "black",
                marginLeft: "30px",
              }}
            >
              Export FollowUp
            </Typography>
          </Grid>
          <br></br>
          <Grid
            container
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
          ></Grid>
          <Grid item xs={12}>
            <CustomCard padding="13px">
              <Grid
                container
                spacing={1}
                justifyContent="space-between"
                alignItems="center"
              >
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
                      <input
                        ref={dateRef}
                        id="date_range"
                        type="text"
                        placeholder="Select date range"
                        style={{
                          padding: "5px",
                          borderRadius: "4px",
                          color: "#333",
                          width: "100%",
                          fontSize: "15px",
                          border: "none",
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
                        onClick={() => dateRef.current.focus()} // Focuses the input field
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="status" required>
                    Order Status
                  </CustomLabel>
                  <Select
                    labelId="status"
                    id="status"
                    name="status"
                    value={status}
                    onChange={handlestatus}
                    displayEmpty
                    sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Select Status
                    </MenuItem>
                    <MenuItem value={1}>Pending</MenuItem>
                    <MenuItem value={2}>Accepted</MenuItem>
                    <MenuItem value={3}>Rejected</MenuItem>
                    <MenuItem value={4}>Delevered</MenuItem>
                    <MenuItem value={5}>RTO</MenuItem>
                  </Select>
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
                  >
                    View
                  </Button>
                  <Button
                    sx={{
                      marginLeft: "20px",
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
                  >
                    Export
                  </Button>
                </Grid>
              </Grid>
            </CustomCard>
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
            <TableContainer
              component={Paper}
              sx={{ overflowY: "auto", maxHeight: "340px" }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>Sr.</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Customer Name
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Customer Phone
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Remainder Date
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Description
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>Agent</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>Created</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.id}.
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.customer_name}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.customer_phone}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.remainder_date}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.description}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.agent}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.created_date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50]}
                  colSpan={12}
                  count={rows.length}
                  rowsPerPage={10}
                  page={0}
                  onPageChange={() => {}}
                  onRowsPerPageChange={() => {}}
                />
              </TableRow>
            </TableFooter>
          </Box>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default FollowUp;
