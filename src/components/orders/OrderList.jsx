import { Grid, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from "@mui/material";
import CustomCard from "../CustomCard";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";

const OrderList = () => {
    const router = useRouter();
  const createorder = () => {
    router.push("/admin/orders/createorders");
  }
  const rows = [
    { id: 1, company: "Company A", package: "Basic", details: "Details A", lastActivity: "2024-08-01", date: "2024-08-01", action: "Edit" },
    { id: 2, company: "Company B", package: "Standard", details: "Details B", lastActivity: "2024-08-02", date: "2024-08-02", action: "Edit" },

  ];

  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={12} sm={12} md={12}>
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
                Order List
              </Typography>
            </Grid>
            <Grid item>
              <Button
              onClick={createorder}
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
                Add Order
              </Button>
            </Grid>
          </Grid>
        </CustomCard>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <CustomCard>
          <Box sx={{ overflowX: 'auto' }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Company Name</TableCell>
                    <TableCell>Package</TableCell>
                    <TableCell>Details</TableCell>
                    <TableCell>Last Activity</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Action</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.company}</TableCell>
                      <TableCell>{row.package}</TableCell>
                      <TableCell>{row.details}</TableCell>
                      <TableCell>{row.lastActivity}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.action}</TableCell>
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

export default OrderList;
