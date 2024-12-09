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
  TableFooter,
  TablePagination,
  FormControl,
  IconButton,
} from "@mui/material";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});
const FormEnquiryList = () => {
  const router = useRouter();
  const rows = [
    {
      id: 1,
      name: "Shivam",
      phone: "+91999999999",
      email: "info@Creworder.com",
      address: "Noida sector 136",
      message:
        "You can override the style of the component using one of these customization options.",
      created_at: "2024-08-01",
      action: "Edit",
    },
  ];

  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={12}>
        <CustomCard>
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "auto 1fr auto",
              maxHeight: "400px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "20px",
                whiteSpace: "nowrap",
                textTransform: "capitalize",
                color: "black",
                margin: "20px",
              }}
            >
              Form Enquiry
            </Typography>
            <TableContainer
              component={Paper}
              sx={{ overflowY: "auto", maxHeight: "340px" }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>Sr.</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>Name</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>Phone</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Email Id
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>Address</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>Message</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Created At
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
                        {row.name}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.phone}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.email}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.address}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.message}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.created_at}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <Box sx={{ display: "flex", gap: "8px" }}>
                          <IconButton color="primary">
                            <EditIcon />
                          </IconButton>
                          <IconButton color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Box>
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

export default FormEnquiryList;
