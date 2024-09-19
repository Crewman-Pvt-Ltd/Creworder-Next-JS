import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});
const List = () => {
  const router = useRouter();
  const rows = [
    {
      order_id: "ORD987",
      customer_name: "Rahul Kumar",
      agent: "testUser",
      username: "testUser",
      remark: "Lorem Ipsum .",
      order_status: "Pending",
      payment_mode: "COD",
      created_date: "2024-08-01",
      waybill_no: "WAYBILL984XX",
    },
  ];

  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={6}>
        <CustomCard padding="20px">
          <Grid
            container
            spacing={2}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item>
              <FormControlLabel
                sx={{ marginLeft: "30px", fontWeight: "800" }}
                control={<Checkbox color="primary" />}
                label="Search New Order"
              />
            </Grid>
          </Grid>
        </CustomCard>
      </Grid>

      <Grid item xs={6}>
        <CustomCard padding="14px">
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
            ></Typography>
          </Grid>

          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={9}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search New Orders"
                sx={{ marginLeft: "30px" }}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                sx={{ height: "56px" }}
              >
                Search
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
            <Typography style={{ margin: "20px" }}>
              <b>Orders</b>
            </Typography>
            <TableContainer
              component={Paper}
              sx={{ overflowY: "auto", maxHeight: "340px" }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>Order ID</b>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>Customer Name</b>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>Agent</b>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>Order Status</b>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>Payment Mode</b>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>Order Date</b>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>WayBill No.</b>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>Remark</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.order_id}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.customer_name}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.agent}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.order_status}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.payment_mode}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.created_date}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.waybill_no}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.remark}
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

export default List;
