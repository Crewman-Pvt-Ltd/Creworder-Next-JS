import React from "react";
import {
  Box,
  Grid,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LabelPreview = () => {
  const router = useRouter();
  const [selectedOrders, setSelectedOrders] = useState([]);

  useEffect(() => {
    if (router.query.selectedRows) {
      const parsedOrders = JSON.parse(router.query.selectedRows); // Parse the selected rows data from query
      setSelectedOrders(parsedOrders);
    }
  }, [router.query]);

  const renderLabelBox = (order) => (
    <Box
      key={order.id}
      sx={{
        border: "2px solid #000",
        padding: 2,
        width: "auto",
        bgcolor: "#f9f9f9",
        marginBottom: 4, // Add margin between labels
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">
            <strong>Deliver To:</strong>
          </Typography>
          <Typography variant="body1">
            <strong>{order.name},</strong>
            <br />
            House No.211, First Floor, {order.city}
            <br />
            Sector- 63, Uttar Pradesh, India - 201304
            <br />
            Phone: 9110998103
            <br />
            Email: test@gmail.com
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ marginY: 1 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography>
            Order Date: <strong>{order.order_date}</strong>
          </Typography>
          <Typography>
            Invoice No: <strong>{order.order_id}</strong>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src="https://www.pngall.com/wp-content/uploads/2/Barcode-PNG-Images.png"
            alt="AWB Product Code"
            style={{ maxWidth: "80%", height: "auto" }}
          />
        </Grid>
      </Grid>
      <Divider sx={{ marginY: 1 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
          <Typography>
            <strong style={{ fontSize: "24px" }}>COD:</strong>
          </Typography>
          <Typography>
            <strong style={{ fontSize: "22px" }}>₹{order.amount}</strong>
          </Typography>
          <Typography>Weight: 1.5 KG</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2zmm39pKpY2coD0De8cWvlLdZUBzHE9z8Ie7Yu0RiygKZAaAvT5yb2mXvqwj-E5DePhE&usqp=CAU"
            alt="AWB Product Code"
            style={{ maxWidth: "80%", height: "auto" }}
          />
          <Typography>Dimensions: 12x12x12</Typography>
        </Grid>
      </Grid>
      <Divider />
      <TableContainer>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell style={{ padding: "4px 8px" }}>
                <Typography>
                  <strong>SKU</strong>
                </Typography>
              </TableCell>
              <TableCell style={{ padding: "4px 8px" }}>
                <Typography>
                  <strong>OPSKU9844</strong>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ padding: "4px 8px" }}>
                <Typography>
                  <strong>Quantity</strong>
                </Typography>
              </TableCell>
              <TableCell style={{ padding: "4px 8px" }}>
                <Typography>
                  <strong>2</strong>
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body1">
        <strong>Pickup and Return Address:</strong>
        <br /> New Delhi, 110095
      </Typography>
      <Divider />
      <Typography variant="body1" style={{ fontSize: "13px" }}>
        This is a system generated document, hence does not require signature.
        <br />
        <strong>Note:</strong> All disputes are subject to Delhi jurisdiction.
        Goods once sold will only be taken back or exchanged as per the store
        exchange/return policy.
      </Typography>
    </Box>
  );

  return (
    <div>
      {selectedOrders.map((order) => renderLabelBox(order))}
    </div>
  );
};

export default LabelPreview;
