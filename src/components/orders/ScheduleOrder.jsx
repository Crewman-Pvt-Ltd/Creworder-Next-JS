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
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";
import { DateRangePicker } from "@nextui-org/date-picker";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});
const ScheduleOrder = () => {
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
                Schedule Orders
              </Typography>
            </Grid>
           
          </Grid>
        </CustomCard>
      </Grid>

      <Grid item xs={12}>
        <CustomCard padding="13px">
          <Grid
            container
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
            >           
            <Grid item xs={12} sm={6} style={{ backgroundColor: "#fff" }}>
              <CustomLabel htmlFor="dateRange" required>
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
            <Grid item xs={12} sm={6}>
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
