import React, { useState } from "react";
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
  TextField 
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import CallIcon from "@mui/icons-material/Call";
import CustomLabel from "../CustomLabel";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});
const ScheduleOrder = () => {
  const [startDate, setStartDate] = useState(dayjs(null));
  const [endDate, setEndDate] = useState(dayjs(null));
  const router = useRouter();

  const createOrder = () => {
    router.push("/admin/orders/createorders");
  };
  
  const rows = [
    {
      id: 1,
      order_id: "PRXTW987",
      name: "Shivam",
      city: "Noida",
      product: "Weight loss",
      amount: "2024",
      agent: "Vikash",
      status: "Pending",
      payment_mode: "COD",
      order_date: "2024-08-01",
      remark:
        "You can override the style of the component.",
      action: "Edit",
    },
  ];

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  return (
    <Grid container spacing={2} p={3}>
       <Grid item xs={12}>
        <CustomCard padding="15px">
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
                Schedule Orders
              </Typography><br></br>
          <Grid
            container
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
            >           
            <Grid item xs={12} sm={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "#212121",
                            height: "55px",
                          },
                        "& .MuiFormLabel-root.Mui-error": {
                          color: "#212121",
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
             
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={handleEndDateChange}                 
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "#212121",
                            height: "55px",
                          },
                        "& .MuiFormLabel-root.Mui-error": {
                          color: "#212121",
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                sx={{
                
                  padding: "14px 16px",
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
                View Accepted Orders
              </Button>
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
            <TableContainer
              component={Paper}
              sx={{ overflowY: "auto", maxHeight: "340px" }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>Sr.</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Order ID
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Customer Name
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>City</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>Product</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>Amount</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>Agent</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Order Status
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Payment Mode
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Order Date
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>Remark</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      C.C Call
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.id}.
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.order_id}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.name}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.city}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.product}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.amount}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.agent}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.status}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.payment_mode}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.order_date}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.remark}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <IconButton aria-label="call" sx={{ color: "green" }}>
                          <CallIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <IconButton aria-label="edit" sx={{ color: "#007BFF" }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          sx={{ color: "#FF0000" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default ScheduleOrder;
