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
  IconButton,
  Box,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Link } from "@mui/material";
import CustomCard from "../CustomCard";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import useGetAllProduct from "@/api-manage/react-query/useGetAllProduct";
import { getToken } from "@/utils/getToken";
import MainApi from "@/api-manage/MainApi";

const ProductList = () => {
  const router = useRouter();

  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const { data, refetch } = useGetAllProduct();

  const createOrder = () => {
    router.push("/admin/product/createproduct");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleEdit = (row) => {
    router.push(`/admin/product/editproduct?id=${row.id}`);
  };

  const handleProductDetails = (row) => {
    router.push(`/admin/product/product-details?${row.product_id}`);
  };

  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={12}></Grid>

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
                  marginLeft: "10px",
                }}
              >
                Product List
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
                Add Product
              </Button>
            </Grid>
          </Grid>
        </CustomCard>
        <CustomCard>
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "auto 1fr auto",
              maxHeight: "400px",
            }}>
            <TableContainer
              component={Paper}
              sx={{ overflowY: "auto", maxHeight: "340px" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>Sr.</b>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>Product ID</b>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>Product Name</b>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>Status</b>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>Created At</b>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>Action</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.id}.
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <b>
                          <Link href={`/admin/product/product-details?Id=${row.id}`}>
                            {row.product_id}
                          </Link>
                        </b>
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.product_name}
                      </TableCell>
                      <TableCell
                        sx={{
                          whiteSpace: "nowrap",
                          color:
                            row.product_status === 1
                              ? "green"
                              : row.product_status === 2
                              ? "yellow"
                              : "red",
                        }}
                      >
                        {row.product_status === 1
                          ? "Active"
                          : row.product_status === 2
                          ? "Pending"
                          : "Inactive"}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {formatDate(row.product_created)}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <IconButton
                          onClick={() => handleEdit(row)}
                          aria-label="edit"
                          sx={{ color: "#009330", backgroundColor: "#f7f7f7" }}
                        >
                          <Edit />
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

export default ProductList;
