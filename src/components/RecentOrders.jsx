import React from "react";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import CustomCard from "./CustomCard";

const RecentOrders = () => {
  const orders = [
    {
      id: "#VZ2112",
      customer: {
        name: "Alex Smith",
        avatar: "https://www.themesbrand.com/velzon/html/master/assets/images/users/avatar-1.jpg",
      },
      product: "Clothes",
      amount: "$109.00",
      vendor: "Zoetic Fashion",
      status: "Paid",
      rating: { score: 5.0, votes: 61 },
    },
    {
      id: "#VZ2111",
      customer: {
        name: "Jansh Brown",
        avatar: "https://www.themesbrand.com/velzon/html/master/assets/images/users/avatar-2.jpg",
      },
      product: "Kitchen Storage",
      amount: "$149.00",
      vendor: "Micro Design",
      status: "Pending",
      rating: { score: 4.5, votes: 61 },
    },
    {
      id: "#VZ2109",
      customer: {
        name: "Ayaan Bowen",
        avatar: "https://www.themesbrand.com/velzon/html/master/assets/images/users/avatar-3.jpg",
      },
      product: "Bike Accessories",
      amount: "$215.00",
      vendor: "Nesta Technologies",
      status: "Paid",
      rating: { score: 4.9, votes: 89 },
    },
    {
      id: "#VZ2108",
      customer: {
        name: "Prezy Mark",
        avatar: "https://www.themesbrand.com/velzon/html/master/assets/images/users/avatar-4.jpg",
      },
      product: "Furniture",
      amount: "$199.00",
      vendor: "Syntyce Solutions",
      status: "Unpaid",
      rating: { score: 4.3, votes: 47 },
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "green";
      case "Pending":
        return "orange";
      case "Unpaid":
        return "red";
      default:
        return "gray";
    }
  };

  const HeaderCell = (props) => (
    <TableCell
      sx={{
        fontSize: "12px",
        whiteSpace: "nowrap",
        fontWeight: "600",
        textTransform: "capitalize",
        color: "gray",
        backgroundColor: "#f3f6f9",
      }}
      {...props}
    />
  );

  const DataCell = (props) => (
    <TableCell
      sx={{
        fontSize: "13px",
        whiteSpace: "nowrap",
        color: "black",
        textTransform: "capitalize",
      }}
      {...props}
    />
  );

  return (
    <CustomCard>
      <Box sx={{ height: 450, overflowY: "scroll"}}>
        <Box display="flex" p={2} justifyContent="space-between" mb={2}>
          <Typography  sx={{fontSize: "16px", fontWeight: 600, color: "#495057"}}>Recent Orders</Typography>
          <Button variant="outlined" startIcon={<i className="fas fa-file-alt"></i>}>
            Generate Report
          </Button>
        </Box>
        <Table sx={{ }}>
          <TableHead>
            <TableRow>
              <HeaderCell>Order ID</HeaderCell>
              <HeaderCell>Customer</HeaderCell>
              <HeaderCell>Product</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Vendor</HeaderCell>
              <HeaderCell>Status</HeaderCell>
              <HeaderCell>Rating</HeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <DataCell>{order.id}</DataCell>
                <DataCell>
                  <Box display="flex" alignItems="center">
                    <Avatar src={order.customer.avatar} alt={order.customer.name} sx={{ width: "30px", height: "30px" }} />
                    <Typography sx={{ fontSize: "12px", marginLeft: "6px" }}>{order.customer.name}</Typography>
                  </Box>
                </DataCell>
                <DataCell>{order.product}</DataCell>
                <DataCell>{order.amount}</DataCell>
                <DataCell>{order.vendor}</DataCell>
                <DataCell>
                  <Box
                    px={1}
                    py={0.5}
                    bgcolor={getStatusColor(order.status)}
                    color="white"
                    borderRadius="4px"
                    display="inline-block"
                  >
                    {order.status}
                  </Box>
                </DataCell>
                <DataCell>
                  {order.rating.score} ({order.rating.votes} votes)
                </DataCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </CustomCard>
  );
};

export default RecentOrders;
