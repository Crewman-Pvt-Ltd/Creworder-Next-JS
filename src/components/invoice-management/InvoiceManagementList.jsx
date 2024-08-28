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
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import CallIcon from "@mui/icons-material/Call";
import CustomLabel from "../CustomLabel";
import CustomTextField from "../CustomTextField";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";
import { DateRangePicker } from "@nextui-org/date-picker";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});
const InvoiceManagementList = () => {
  const router = useRouter();

  const createOrder = () => {
    router.push("/admin/orders/createorders");
  };
  const [state, setstate] = useState("");
  // Handle change for courseDuration
  const handlestate = (event) => {
    setstate(event.target.value);
  };

  const [product, setproduct] = useState("");
  // Handle change for courseDuration
  const handleproduct = (event) => {
    setproduct(event.target.value);
  };

  const [payment, setpayment] = useState("");
  // Handle change for courseDuration
  const handlepayment = (event) => {
    setpayment(event.target.value);
  };

  const [agent, setagent] = useState("");
  // Handle change for courseDuration
  const handleagent = (event) => {
    setagent(event.target.value);
  };

  const [agentname, setagentname] = useState("");
  // Handle change for courseDuration
  const handleagentname = (event) => {
    setagentname(event.target.value);
  };

  const [teamlead, setteamlead] = useState("");
  // Handle change for courseDuration
  const handleteamlead = (event) => {
    setteamlead(event.target.value);
  };

  const [status, setstatus] = useState("");
  // Handle change for courseDuration
  const handlestatus = (event) => {
    setstatus(event.target.value);
  };

  const [dateRange, setDateRange] = useState([null, null]);

  const rows = [
    {
      id: 1,
      invoice_id: "INVOI98765",
      name: "Shivam",
      amount: "10,000",
      status: "Pending",
      payment_mode: "COD",
      order_date: "2024-08-01",    
      action: "Edit",
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
               Total Order
              </Typography>
            </Grid><br></br>
          <Grid
            container
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={12} sm={3}>
              <CustomLabel htmlFor="order_id" >
                Order Id.
              </CustomLabel>
              <CustomTextField
                id="order_id"
                name="order_id"
                placeholder="e.g. PRO34XP"
                type="text"
                fullWidth
                sx={{ fontFamily: poppins.style.fontFamily }}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <CustomLabel htmlFor="awb_no">
                AWB No.
              </CustomLabel>
              <CustomTextField
                id="awb_no"
                name="awb_no"
                placeholder="e.g. AWBNo987"
                type="text"
                fullWidth
                sx={{ fontFamily: poppins.style.fontFamily }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <CustomLabel htmlFor="phone" >
                Phone No.
              </CustomLabel>
              <CustomTextField
                id="phone"
                name="phone"
                placeholder="e.g. 9876543221"
                type="text"
                fullWidth
                sx={{ fontFamily: poppins.style.fontFamily }}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <CustomLabel htmlFor="product" >
                Product Name
              </CustomLabel>
              <Select
                labelId="product"
                id="product"
                name="product"
                value={product}
                onChange={handleproduct}
                displayEmpty
                sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
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

            <Grid item xs={12} sm={3}>
              <CustomLabel htmlFor="payment" >
                Payment Type
              </CustomLabel>
              <Select
                labelId="payment"
                id="payment"
                name="payment"
                value={payment}
                onChange={handlepayment}
                displayEmpty
                sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                fullWidth
              >
                <MenuItem value="" disabled>
                  Select Payment
                </MenuItem>
                <MenuItem value={1}>COD</MenuItem>
                <MenuItem value={2}>Prepaid</MenuItem>
                <MenuItem value={3}>Parttial</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} sm={3}>
              <CustomLabel htmlFor="Agent Status" >
                Agent Status
              </CustomLabel>
              <Select
                labelId="Agent Status"
                id="agent"
                name="agent"
                value={agent}
                onChange={handleagent}
                displayEmpty
                sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                fullWidth
              >
                <MenuItem value="" disabled>
                  Select Agent
                </MenuItem>
                <MenuItem value={1}>Suspended</MenuItem>
                <MenuItem value={2}>InActive</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} sm={3}>
              <CustomLabel htmlFor="Agent Name" >
                Agent Name
              </CustomLabel>
              <Select
                labelId="Agent Name"
                id="agentname"
                name="agentname"
                value={agentname}
                onChange={handleagentname}
                displayEmpty
                sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                fullWidth
              >
                <MenuItem value="" disabled>
                  Select Agent Name
                </MenuItem>
                <MenuItem value={1}>Admin</MenuItem>
                <MenuItem value={2}>TL</MenuItem>
                <MenuItem value={2}>Omni</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} sm={3}>
              <CustomLabel htmlFor="Team Lead" >
                Team Lead
              </CustomLabel>
              <Select
                labelId="Team Lead"
                id="teamlead"
                name="teamlead"
                value={teamlead}
                onChange={handleteamlead}
                displayEmpty
                sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                fullWidth
              >
                <MenuItem value="" disabled>
                  Select Team Lead
                </MenuItem>
                <MenuItem value={2}>TL</MenuItem>
                <MenuItem value={2}>Omni</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} sm={4}>
              <CustomLabel htmlFor="state" >
                State
              </CustomLabel>
              <Select
                labelId="state"
                id="state"
                name="state"
                value={state}
                onChange={handlestate}
                displayEmpty
                sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
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
            <Grid item xs={12} sm={4}>
              <CustomLabel htmlFor="Order Status">
                Order Status
              </CustomLabel>
              <Select
                labelId="Order Status"
                id="status"
                name="status"
                value={status}
                onChange={handlestatus}
                displayEmpty
                sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                fullWidth
              >
                <MenuItem value="" disabled>
                  Select Order Status
                </MenuItem>
                <MenuItem value={1}>Suspended</MenuItem>
                <MenuItem value={2}>Active</MenuItem>
                <MenuItem value={3}>InActive</MenuItem>
                <MenuItem value={4}>Delete</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={4} style={{ backgroundColor: "#fff" }}>
              <CustomLabel htmlFor="dateRange">
                Date Range
              </CustomLabel>
              <DateRangePicker 
                label="Stay duration" 
                visibleMonths={2} 
                style={{
            
                  backgroundColor: '#fff',
                }}
                popoverProps={{
                  style: {
                    backgroundColor: '#fff', 
                  },
                }}
              />
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
                Submit
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
                      Invoice ID
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Customer Name
                    </TableCell>                   
                    <TableCell sx={{ whiteSpace: "nowrap" }}>Amount</TableCell>
                   
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Order Status
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Payment Mode
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Order Date
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
                        {row.invoice_id}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.name}
                      </TableCell>                     
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.amount}
                      </TableCell>                     
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.status}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.payment_mode}
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

export default InvoiceManagementList;
