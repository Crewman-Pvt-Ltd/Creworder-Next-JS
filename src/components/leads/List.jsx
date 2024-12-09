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
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
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
      id: 1,
      customer_name: "Rahul",
      customer_phone: "9876543210",
      username: "testUser",
      remark: "Lorem Ipsum has been the industry's standard dummy text ever since.",
      status: "Pending",
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
               All Leads
              </Typography>
            </Grid><br />
          <Grid
            container
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
          >                    
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
                      Customer Name
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                    Customer Phone
                    </TableCell>                   
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      User Name</TableCell>                   
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Remark
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Status
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Date
                    </TableCell>                   
                    <TableCell sx={{ whiteSpace: "nowrap" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.id}.
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.customer_name}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.customer_phone}
                      </TableCell>                     
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.username}
                      </TableCell>   
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.remark}
                      </TableCell> 
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.status}
                      </TableCell>                     
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.created_date}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <IconButton aria-label="edit" sx={{ color: "#007BFF" }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          sx={{ color: "#FF0000" }}
                        >
                          <DeleteIcon />
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

export default List;
