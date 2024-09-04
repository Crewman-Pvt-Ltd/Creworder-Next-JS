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
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  selectedType,
} from "@mui/material";
import { baseApiUrl } from "@/api-manage/ApiRoutes";
import CustomLabel from "../CustomLabel";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";
import { DateRangePicker } from "@nextui-org/date-picker";
import { getToken } from "@/utils/getToken";
import axios from "axios";
import { parse } from "json2csv";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});
const Order = () => {
  const token = getToken();
  const router = useRouter();
  const [status, setstatus] = useState("");
  var [rowData, setRowData] = useState([]);
  // Handle change for courseDuration
  const handlestatus = (event) => {
    setstatus(event.target.value);
  };
  const [orderDateType, setorderDateType] = useState("created_at");
  const handleTypeChange = (event) => {
    setorderDateType(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const exportToCSV = (data) => {
    try {
      const csv = parse(data, {
        fields: [
          { label: "Order ID", value: "order_id" },
          { label: "Customer Name", value: "customer_name" },
          { label: "Customer Phone", value: "customer_phone" },
          { label: "Customer Address", value: "customer_address" },
          { label: "Customer City", value: "customer_city" },
          { label: "Customer Country", value: "customer_country" },
          {
            label: "Product Details",
            value: (row) =>
              row.product_details
                .map(
                  (product) =>
                    `${product.product_name} (Qty: ${product.product_qty})`
                )
                .join("; "),
          },
          { label: "Total Amount", value: "total_amount" },
          { label: "Payment Mode", value: "payment_mod" },
          { label: "Customer Address", value: "customer_address" },
          { label: "Pin Code", value: "customer_postal" },
          { label: "Gross Amount", value: "gross_amount" },

        ],
      });

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "orders.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };
  const getOrders = async (type) => {
    try {
      let data = JSON.stringify({
        data_range: "08/28/2024 - 08/28/2024",
        date_type: orderDateType,
        status: 1,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${baseApiUrl}export-order/`,
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios.request(config);
      if (type === "export") {
        exportToCSV(response.data.Data);
      } else if (type === "view") {
        setRowData(response.data.Data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
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
              Export Order
            </Typography>
          </Grid>
          <br></br>
          <Grid
            container
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
          ></Grid>
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
                <Grid item xs={12} sm={5} style={{ backgroundColor: "#fff" }}>
                  <CustomLabel htmlFor="dateRange" required>
                    Date Range
                  </CustomLabel>
                  <DateRangePicker
                    visibleMonths={2}
                    style={{
                      backgroundColor: "#fff",
                    }}
                    popoverProps={{
                      style: {
                        backgroundColor: "#fff",
                      },
                    }}
                  />
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
                  <Grid component="fieldset">
                    <CustomLabel htmlFor="dateRange" required>
                      Select Type
                    </CustomLabel>
                    <RadioGroup
                      aria-label="select-type"
                      name="selectType"
                      value={orderDateType}
                      onChange={handleTypeChange}
                      row // Makes the radio buttons appear in a row
                    >
                      <FormControlLabel
                        value="created_at"
                        control={<Radio />}
                        label="Via Create Date"
                      />
                      <FormControlLabel
                        value="updated_at"
                        control={<Radio />}
                        label="Via Update Date"
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button
                    onClick={() => getOrders("view")}
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
                    onClick={() => getOrders("export")}
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
                      Order Id.
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Customer Name
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Customer Phone
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Payment Mode
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Final Amount
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Description
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>Agent</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>Created</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.id}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.order_id}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.customer_name}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.customer_phone}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.payment_mod}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.total_amount}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.order_remark}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.order_created_by_username}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.created_at}
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

export default Order;
