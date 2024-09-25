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
  Box,
  IconButton,
} from "@mui/material";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

const TargetList = () => {
  const router = useRouter();
  const rows = [
    {
      id: 1,
      name: "Shivam",
      monthly_target: "200",
      quarterly_target: "500",
      created_at: "2024-08-01",
    },
  ];

  const createTarget = () => {
    router.push("/admin/manage/create-target");
  };

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
                          marginLeft: "30px",
                        }}
                      >
                        Target List
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        onClick={createTarget}
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
                        Create Target
                      </Button>
                    </Grid>
                  </Grid>
                </CustomCard>
              </Grid>
           
            <TableContainer
              component={Paper}
              sx={{ overflowY: "auto", maxHeight: "340px" }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>Sr.</b>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>Name</b>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>Monthly Target</b>
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <b>Quarterly Target</b>
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
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.id}.
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.name}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.monthly_target}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.quarterly_target}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.created_at}
                      </TableCell>
                      <TableCell>
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

export default TargetList;
