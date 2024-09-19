import React from "react";
import { CardContent, Grid, Button, MenuItem, Divider, TableHead, Table, TableBody, TableContainer, TableRow, IconButton, Typography, TableCell } from "@mui/material";
import CustomCard from "../CustomCard";
import CustomLabel from "../CustomLabel";
import CustomTextField from "../CustomTextField";
import { Poppins } from "next/font/google";
import { Edit, Delete } from "@mui/icons-material";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const AddOrderStatus = ({ onAdd, onEdit }) => {
  const orderStatusList = [
    { id: 1, orderStatus: "Active" },
    { id: 2, orderStatus: "Inactive"},
    { id: 2, orderStatus: "Pending"},
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <CustomCard>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  className={poppins.className}
                  sx={{ fontSize: "18px", fontWeight: "600" }}
                >
                  Add Order Status
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <CustomLabel htmlFor="name" required>
                 Name
                </CustomLabel>
                <CustomTextField
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter Name"
                  required
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}md={6}>
                <CustomLabel htmlFor="remark" required>
                 Remark
                </CustomLabel>
                <CustomTextField
                  id="remark"
                  name="remark"
                  type="text"
                  placeholder="Enter remark"
                  required
                  fullWidth
                />
              </Grid>


              <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  sx={{
                    backgroundColor: "#405189",
                    color: "white",
                  }}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>

      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Grid container display="flex" justifyContent="space-between" alignItems="center">
              <Typography sx={{ fontWeight: "600", fontSize: "20px", textTransform: "capitalize", color: "black" }} className={poppins.className}>
                Order Status List
              </Typography>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={poppins.className}>ID</TableCell>
                    <TableCell className={poppins.className}>Name</TableCell>
                    <TableCell className={poppins.className}>remark</TableCell>
                    <TableCell className={poppins.className}>Action</TableCell>
                 
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderStatusList.map((OrderStatus) => (
                    <TableRow key={OrderStatus.id}>
                      <TableCell className={poppins.className}>{OrderStatus.id}</TableCell>
                      <TableCell className={poppins.className}>{OrderStatus.orderStatus}</TableCell>
                      <TableCell className={poppins.className}>{OrderStatus.orderStatus}</TableCell>
                      <TableCell>
                        <IconButton aria-label="edit" sx={{ color: "green" }} onClick={() => onEdit(OrderStatus)}>
                          <Edit />
                        </IconButton>
                        <IconButton aria-label="delete" sx={{ color: "red" }}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default AddOrderStatus;
