import React from "react";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

const RtoList = () => {
  const router = useRouter();
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
        "You can override the style of the component using one of these customization options.",
      action: "Edit",
    },
  ];

  const HeaderCell = (props) => (
    <TableCell
      sx={{
        fontSize: "1rem",
        whiteSpace: "nowrap",
        fontWeight: "700",
        textTransform: "capitalize",
      }}
      {...props}
    />
  );

  const DataCell = (props) => (
    <TableCell
      sx={{
        color: "#000",
        fontSize: "14px",
        whiteSpace: "nowrap",
        fontWeight: "500",
        textTransform: "capitalize",
      }}
      {...props}
    />
  );

  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={12}>
        <CustomCard>
          <div
            style={{
              display: "grid",
              gridTemplateRows: "auto 1fr auto",
              maxHeight: "400px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "20px",
                whiteSpace: "nowrap",
                textTransform: "capitalize",
                color: "black",
                margin: "20px",
              }}
            >
              RTO List
            </Typography>
            <TableContainer
              component={Paper}
              sx={{ overflowY: "auto", maxHeight: "340px" }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <HeaderCell>Sr.</HeaderCell>
                    <HeaderCell>Order ID</HeaderCell>
                    <HeaderCell>Customer Name</HeaderCell>
                    <HeaderCell>City</HeaderCell>
                    <HeaderCell>Product</HeaderCell>
                    <HeaderCell>Amount</HeaderCell>
                    <HeaderCell>Agent</HeaderCell>
                    <HeaderCell>Order Status</HeaderCell>
                    <HeaderCell>Payment Mode</HeaderCell>
                    <HeaderCell>Order Date</HeaderCell>
                    <HeaderCell>Remark</HeaderCell>
                    <HeaderCell>Action</HeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <DataCell>{row.id}.</DataCell>
                      <DataCell>{row.order_id}</DataCell>
                      <DataCell>{row.name}</DataCell>
                      <DataCell>{row.city}</DataCell>
                      <DataCell>{row.product}</DataCell>
                      <DataCell>{row.amount}</DataCell>
                      <DataCell>{row.agent}</DataCell>
                      <DataCell>{row.status}</DataCell>
                      <DataCell>{row.payment_mode}</DataCell>
                      <DataCell>{row.order_date}</DataCell>
                      <DataCell>{row.remark}</DataCell>
                      <DataCell>
                        <IconButton aria-label="edit" sx={{ color: "#007BFF" }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          sx={{ color: "#FF0000" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </DataCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default RtoList;
