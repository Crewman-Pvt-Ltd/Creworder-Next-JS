import React, { useState, useRef, useEffect } from "react";
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Select,
  Box,
  IconButton,
  TableFooter,
  TablePagination,
  FormControl,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Flatpickr from "flatpickr";
import Rating from "@mui/material/Rating";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import Link from "next/link";
import { format } from "date-fns";
import CallIcon from "@mui/icons-material/Call";
import CustomLabel from "../CustomLabel";
import CustomTextField from "../CustomTextField";
import CustomCard from "../CustomCard";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useGetAllOrders from "@/api-manage/react-query/useGetAllOrders";
const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});
const OrderList = () => {
  const dateRef = useRef(null);
  const [startDate, setStartDate] = useState(dayjs(null));
  const [endDate, setEndDate] = useState(dayjs(null));
  const router = useRouter();
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

  const { data, refetch } = useGetAllOrders();

  const createOrder = () => {
    router.push("/admin/orders/createorders");
  };
  const [state, setstate] = useState("");

  const handlestate = (event) => {
    setstate(event.target.value);
  };

  const [product, setproduct] = useState("");

  const handleproduct = (event) => {
    setproduct(event.target.value);
  };

  const [payment, setpayment] = useState("");

  const handlepayment = (event) => {
    setpayment(event.target.value);
  };

  const [agent, setagent] = useState("");

  const handleagent = (event) => {
    setagent(event.target.value);
  };

  const [agentname, setagentname] = useState("");

  const handleagentname = (event) => {
    setagentname(event.target.value);
  };

  const [teamlead, setteamlead] = useState("");

  const handleteamlead = (event) => {
    setteamlead(event.target.value);
  };

  const [status, setstatus] = useState("");

  const handlestatus = (event) => {
    setstatus(event.target.value);
  };

  const [dateRange, setDateRange] = useState([null, null]);

  const rows = [{}];

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset ratings when closing
    setQuestions((prev) => prev.map((q) => ({ ...q, rating: 0 })));
  };

  const handleRatingChange = (index, newValue) => {
    // Update the rating for the specific question
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, rating: newValue } : q))
    );
  };
  const [rating, setRating] = useState(0); // State to store the rating
  const [questions, setQuestions] = useState([
    { question: "How satisfied are you with our service?", rating: 0 },
    { question: "How likely are you to recommend us?", rating: 0 },
    { question: "What is your overall experience?", rating: 0 },
  ]);
  const handleEdit = (id) => {
    router.push(`/admin/orders/editorders?id=${id}`);
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
                  marginLeft: "30px",
                }}
              >
                Order List
              </Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={createOrder}
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
                Add Order
              </Button>
            </Grid>
          </Grid>
          <div>
            {/* Accordion for Order Details */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Order Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={1}>
                  {/* Order ID */}
                  <Grid item xs={12} sm={3}>
                    <CustomLabel htmlFor="order_id">Order Id.</CustomLabel>
                    <CustomTextField
                      id="order_id"
                      name="order_id"
                      placeholder="e.g. PRO34XP"
                      type="text"
                      fullWidth
                      sx={{ height: "50px" }}
                    />
                  </Grid>

                  {/* AWB Number */}
                  <Grid item xs={12} sm={3}>
                    <CustomLabel htmlFor="awb_no">AWB No.</CustomLabel>
                    <CustomTextField
                      id="awb_no"
                      name="awb_no"
                      placeholder="e.g. AWBNo987"
                      type="text"
                      fullWidth
                      sx={{ height: "50px" }}
                    />
                  </Grid>

                  {/* Phone Number */}
                  <Grid item xs={12} sm={3}>
                    <CustomLabel htmlFor="phone">Phone No.</CustomLabel>
                    <CustomTextField
                      id="phone"
                      name="phone"
                      placeholder="e.g. 9876543221"
                      type="text"
                      fullWidth
                      sx={{ height: "50px" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <CustomLabel htmlFor="product">Product Name</CustomLabel>
                    <Select
                      id="product"
                      name="product"
                      value={product}
                      onChange={handleproduct}
                      displayEmpty
                      sx={{ fontFamily: "Poppins, sans-serif", height: "50px" }}
                      fullWidth
                    >
                      <MenuItem value="" disabled>
                        Select Product
                      </MenuItem>
                      <MenuItem value={1}>Kidney Detox</MenuItem>
                      <MenuItem value={2}>Weight Loss</MenuItem>
                      <MenuItem value={3}>Weight Gain</MenuItem>
                    </Select>
                  </Grid>

                  {/* Payment Type */}
                  <Grid item xs={12} sm={3}>
                    <CustomLabel htmlFor="payment">Payment Type</CustomLabel>
                    <Select
                      id="payment"
                      name="payment"
                      value={payment}
                      onChange={handlepayment}
                      displayEmpty
                      sx={{ fontFamily: "Poppins, sans-serif", height: "50px" }}
                      fullWidth
                    >
                      <MenuItem value="" disabled>
                        Select Payment
                      </MenuItem>
                      <MenuItem value={1}>COD</MenuItem>
                      <MenuItem value={2}>Prepaid</MenuItem>
                      <MenuItem value={3}>Partial</MenuItem>
                    </Select>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <CustomLabel htmlFor="agent">Agent Status</CustomLabel>
                    <Select
                      id="agent"
                      name="agent"
                      value={agent}
                      onChange={handleagent}
                      displayEmpty
                      sx={{ fontFamily: "Poppins, sans-serif", height: "50px" }}
                      fullWidth
                    >
                      <MenuItem value="" disabled>
                        Select Agent
                      </MenuItem>
                      <MenuItem value={1}>Suspended</MenuItem>
                      <MenuItem value={2}>Active</MenuItem>
                    </Select>
                  </Grid>

                  {/* Agent Name */}
                  <Grid item xs={12} sm={3}>
                    <CustomLabel htmlFor="agentname">Agent Name</CustomLabel>
                    <Select
                      id="agentname"
                      name="agentname"
                      value={agentname}
                      onChange={handleagentname}
                      displayEmpty
                      sx={{ fontFamily: "Poppins, sans-serif", height: "50px" }}
                      fullWidth
                    >
                      <MenuItem value="" disabled>
                        Select Agent Name
                      </MenuItem>
                      <MenuItem value={1}>Admin</MenuItem>
                      <MenuItem value={2}>TL</MenuItem>
                      <MenuItem value={3}>Omni</MenuItem>
                    </Select>
                  </Grid>

                  {/* Team Lead */}
                  <Grid item xs={12} sm={3}>
                    <CustomLabel htmlFor="teamlead">Team Lead</CustomLabel>
                    <Select
                      id="teamlead"
                      name="teamlead"
                      value={teamlead}
                      onChange={handleteamlead}
                      displayEmpty
                      sx={{ fontFamily: "Poppins, sans-serif", height: "50px" }}
                      fullWidth
                    >
                      <MenuItem value="" disabled>
                        Select Team Lead
                      </MenuItem>
                      <MenuItem value={2}>TL</MenuItem>
                      <MenuItem value={3}>Omni</MenuItem>
                    </Select>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <CustomLabel htmlFor="state">State</CustomLabel>
                    <Select
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

                  {/* Order Status */}
                  <Grid item xs={12} sm={3}>
                    <CustomLabel htmlFor="status">Order Status</CustomLabel>
                    <Select
                      id="status"
                      name="status"
                      value={status}
                      onChange={handlestatus}
                      displayEmpty
                      sx={{ fontFamily: "Poppins, sans-serif", height: "50px" }}
                      fullWidth
                    >
                      <MenuItem value="" disabled>
                        Select Order Status
                      </MenuItem>
                      <MenuItem value={1}>Suspended</MenuItem>
                      <MenuItem value={2}>Active</MenuItem>
                      <MenuItem value={3}>Inactive</MenuItem>
                      <MenuItem value={4}>Deleted</MenuItem>
                    </Select>
                  </Grid>

                  <Grid item xs={12} sm={3} md={3}>
                    <CustomLabel>
                      Select Date Range
                    </CustomLabel>
                    <div
                      style={{
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid black",
                        position: "relative",
                        backgroundColor: "#fff",
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
                  <Grid item xs={12} sm={12} md={12}>
                    <Button
                      sx={{
                        marginTop: "24px",
                        padding: "8px 16px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        backgroundColor: "#405189",
                        color: "white",
                        "&:hover": { backgroundColor: "#334a6c" },
                      }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </div>
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
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <strong>Sr.</strong>{" "}
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <strong> Order ID</strong>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <strong>Customer Name</strong>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <strong>City</strong>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <strong>Product</strong>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <strong>Amount</strong>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <strong>Agent</strong>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <strong>Order Status</strong>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <strong>Payment Mode</strong>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <strong>Order Date</strong>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      {" "}
                      <strong>Remark </strong>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <strong>C.C Call</strong>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <strong>Action</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.Data.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.id}.
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap", cursor: "pointer" }}
                      >
                        <Link href={`/admin/orders/order-details?Id=${row.id}`}>
                          <b>{row.order_id}</b>
                        </Link>
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.customer_name}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.customer_city}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.product_details[0]?.product_name}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.total_amount}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.order_created_by_username}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "orange", color: "black" }}
                        >
                          {row.order_status_title}
                        </Button>
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.payment_mode}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {format(
                          new Date(row.created_at),
                          "yyyy-MM-dd HH:mm:ss"
                        )}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.order_remark}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <IconButton aria-label="call" sx={{ color: "green" }}>
                          <CallIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <IconButton
                          onClick={() => handleEdit(row.id)}
                          aria-label="edit"
                          sx={{ color: "green" }}
                        >
                          <EditIcon sx={{ color: "green" }} />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          sx={{ color: "#FF0000" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          aria-label="open-dialog"
                          sx={{ color: "#FF0000" }}
                        >
                          <QuestionAnswerIcon onClick={handleClickOpen} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </CustomCard>
        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle>{"Feedback Questions"}</DialogTitle>
          <DialogContent>
            {questions.map((q, index) => (
              <Box key={index} sx={{ marginBottom: 3 }}>
                <Typography variant="h6">
                  {index + 1}. {q.question} {/* Add ID here */}
                </Typography>
                <Rating
                  name={`rating-${index}`}
                  value={q.rating}
                  onChange={(event, newValue) =>
                    handleRatingChange(index, newValue)
                  }
                />
              </Box>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default OrderList;
