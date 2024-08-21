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
  TableFooter,
  TablePagination
} from "@mui/material";
import CustomCard from "../CustomCard";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";

const ProductList = () => {
  const router = useRouter();
  
  const createOrder = () => {
    router.push("/admin/product/createproduct");
  };
  
  const rows = [
    {
      id: 1,
      product_id: "PRXTW987",
      product_name: "Slim Fit Combo",
      status: "Pending",
      created_at: "2024-08-01",
      action: "Edit"
    },
    // Add more rows as needed
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
                  marginLeft: "30px"
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
                    backgroundColor: "#334a6c"
                  },
                  borderRadius: "30px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1
                }}
              >
                <AddIcon sx={{ fontSize: 15 }} />
                Add Product
              </Button>
            </Grid>
          </Grid>
        </CustomCard>
      </Grid>

      <Grid item xs={12}>
        <CustomCard>
          <Box sx={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', maxHeight: '400px' }}>
            <TableContainer component={Paper} sx={{ overflowY: 'auto', maxHeight: '340px' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                  <TableCell  sx={{ whiteSpace: 'nowrap' }}>Sr.</TableCell>
                    <TableCell  sx={{ whiteSpace: 'nowrap' }}>Product ID</TableCell>
                    <TableCell  sx={{ whiteSpace: 'nowrap' }}>Product Name</TableCell>
                    <TableCell  sx={{ whiteSpace: 'nowrap' }}>Status</TableCell>
                    <TableCell  sx={{ whiteSpace: 'nowrap' }}>Created At</TableCell>
                    <TableCell  sx={{ whiteSpace: 'nowrap' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.id}.</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.product_id}</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.product_name}</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.status}</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.created_at}</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.action}</TableCell>
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

export default ProductList;
