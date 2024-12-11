import React from "react";
import CustomCard from "../CustomCard";
import useGetAllCompanies from "@/api-manage/react-query/useGetAllCompanies";
import {
  Grid,
  Typography,
  Button,
  Divider,
  Box,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";

import {
  Email,
  Phone,
  Delete,
  Link,
  LocationOn,
  CheckCircle,
} from "@mui/icons-material";

const companyData = {
  name: "Truevital Private Limited",
  expiryDate: "28 Nov, 2024",
  contactDetails: [
    { icon: <Email sx={{ color: "#708090" }} />, text: "info@truevital.in" },
    { icon: <Phone sx={{ color: "#001F3F" }} />, text: "9876543210" },
    { icon: <Link sx={{ color: "#333333" }} />, text: "https://truevital.in" },
    {
      icon: <LocationOn sx={{ color: "#003366" }} />,
      text: "Noida sec.-63 UP",
    },
    { icon: <CheckCircle sx={{ color: "#004d00" }} />, text: "Active" },
  ],

  bankDetails: [
    { name: "Bank Name:", detail: "True Vital Bank" },
    { name: "Bank Branch:", detail: "Sector 63, Noida" },
    { name: "Account Number:", detail: "1234567890" },
    { name: "IFSC:", detail: "TRVI0001234" },
    { name: "Account Type:", detail: "Savings" },
  ],
  companyActivity: [
    { time: "Created:", detail: "10-30 hrs / week" },
    { time: "Updated:", detail: "response time" },
    { time: "Last Login:", detail: "response time" },
    { time: "IFSC:", detail: "English/ Spanish" },
  ],
};
const orders = [
  {
    id: "01",
    name: "Tiger Nixon",
    package: "#54605",
    paymentdate: "2011/04/25",
    nextpaymentdate: "2011/04/25",
    product: "Clothes",
    amount: "$109.00",
    paymentgateway: "phonepay",
    transactionid: "#12345",
    vendor: "Zoetic Fashion",
    status: "Paid",
    rating: { score: 5.0, votes: 61 },
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
const ViewCompany = () => {
  const { name, expiryDate, contactDetails, bankDetails, companyActivity } =
    companyData;

  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12}>
        <CustomCard>
          <Typography
            sx={{
              padding: "10px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Company Details
          </Typography>
        </CustomCard>
      </Grid>

      <Grid item xs={12}>
        <Grid
          container
          spacing={2}
          sx={{
            padding: 2,
          }}
        >
          <Grid item xs={12}>
            <CustomCard>
              <Grid
                container
                sx={{
                  padding: 3,
                }}
              >
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    {name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "gray",
                      marginTop: "10px",
                    }}
                  >
                    Expires - {expiryDate}
                  </Typography>
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: 1 }}>
                  <Grid item>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#3ac977",
                      }}
                    >
                      Edit
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#ff5e5e",
                      }}
                    >
                      Update Package
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </CustomCard>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{
            padding: 2,
          }}
        >
          <Grid item xs={12} md={4}>
            <CustomCard>
              <Grid
                container
                direction="column"
                spacing={2}
                sx={{
                  padding: 2,
                }}
              >
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Contact Details
                  </Typography>
                </Grid>
                <Divider sx={{ my: 2 }} />
                {contactDetails.map((detail, index) => (
                  <Grid
                    item
                    key={index}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    {detail.icon}
                    <Typography sx={{ ml: 1 }}>{detail.text}</Typography>
                  </Grid>
                ))}
              </Grid>
            </CustomCard>
          </Grid>
          <Grid item xs={12} md={8}>
            <CustomCard>
              <Grid
                container
                direction="column"
                spacing={2}
                sx={{
                  padding: 2,
                }}
              >
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Bank Details
                  </Typography>
                </Grid>
                <Divider sx={{ my: 2 }} />
                {bankDetails.map((bank, index) => (
                  <Grid
                    item
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      {bank.name}
                    </Typography>
                    <Typography
                      sx={{
                        color: "gray",
                        textAlign: "right",
                        flex: 1,
                        ml: 2,
                      }}
                    >
                      {bank.detail}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </CustomCard>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{
            padding: 2,
          }}
        >
          <Grid item xs={12} md={4}>
            <CustomCard>
              <Grid
                container
                direction="column"
                spacing={2}
                sx={{
                  padding: 2,
                }}
              >
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Company Activity
                  </Typography>
                </Grid>
                <Divider sx={{ my: 2 }} />
                {companyActivity.map((activity, index) => (
                  <Grid
                    item
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      {activity.time}
                    </Typography>
                    <Typography
                      sx={{
                        color: "gray",
                      }}
                    >
                      {activity.detail}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </CustomCard>
          </Grid>

          <Grid item xs={12} md={8}>
            <CustomCard>
              <Box sx={{ overflowX: "scroll" }}>
                <Box display="flex" p={2} justifyContent="space-between" mb={2}>
                  <Typography
                    sx={{ fontSize: "16px", fontWeight: 600, color: "#495057" }}
                  >
                    Billing
                  </Typography>
                </Box>
                <Table sx={{}}>
                  <TableHead>
                    <TableRow>
                      <HeaderCell>Si.No.</HeaderCell>
                      <HeaderCell>Company Name</HeaderCell>
                      <HeaderCell>Package</HeaderCell>
                      <HeaderCell>Payment Date</HeaderCell>
                      <HeaderCell>Next Payment Date</HeaderCell>
                      <HeaderCell>Transaction Id</HeaderCell>
                      <HeaderCell>Amount</HeaderCell>
                      <HeaderCell>Payment Gateway</HeaderCell>
                      <HeaderCell>Action</HeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <DataCell>{order.id}</DataCell>
                        <DataCell>{order.name}</DataCell>
                        <DataCell>{order.package}</DataCell>
                        <DataCell>{order.paymentdate}</DataCell>
                        <DataCell>{order.nextpaymentdate}</DataCell>
                        <DataCell>{order.transactionid}</DataCell>
                        <DataCell>{order.amount}</DataCell>
                        <DataCell>{order.paymentgateway}</DataCell>
                        <DataCell>
                          <IconButton
                            onClick={() => handleDelete(row.id)}
                            aria-label="delete"
                            sx={{ color: "red" }}
                          >
                            <Delete />
                          </IconButton>
                        </DataCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </CustomCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ViewCompany;
