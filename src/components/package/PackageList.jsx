import React from "react";
import { useRouter } from "next/router";
import {
  Grid,
  Card,
  CardContent,
  Divider,
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  Visibility,
  Edit,
  Delete,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";
const data = [
  {
    id: 1,
    name: "Larger",
    monthlyPrice: "$1000",
    annualPrice: "$2000",
    package: "Gold Plan (Monthly)",
   fileStorage: "500(MB)",
   maxEmployees: "20",
   moduleinpackage: ["User", "Notepad Follow Up", "Export", "Orders"],
    status: "active",
  },
  {
    id: 2,
    name: "Medium",
    monthlyPrice: "$1000",
    annualPrice: "$3000",
    package: "Gold Plan (yearly)",
    fileStorage: "200(MB)",
    maxEmployees: "30",
    status: "suspended",
  },
];
const PackageList = ({ onCreatePackage }) => {
  const handleView = (id) => {
    console.log("View", id);
  };

  const handleEdit = (id) => {
    console.log("Edit", id);
  };

  const handleDelete = (id) => {
    console.log("Delete", id);
  };

  const handleStatusToggle = (id) => {
    setData(
      data.map((row) =>
        row.id === id
          ? { ...row, status: row.status === "active" ? "suspended" : "active" }
          : row
      )
    );
  };

  const HeaderCell = (props) => (
    <TableCell
      sx={{
        fontSize: "0.8rem",
        whiteSpace: "nowrap",
        fontWeight: "500",
        textTransform: "capitalize",
        color: "gray",
      }}
      {...props}
    />
  );

  const DataCell = (props) => (
    <TableCell
      sx={{
        color: "#999999",
        fontSize: "14px",
        whiteSpace: "nowrap",
        fontWeight: "500",
        textTransform: "capitalize",
      }}
      {...props}
    />
  );

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
      
          <Button
            onClick={onCreatePackage}
            sx={{
              padding: "8px 16px",
              fontSize: "14px",
              backgroundColor: "#405189",
              color: "white",
              "&:hover": {
                backgroundColor: "#334a6c",
              },
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <AddIcon sx={{ fontSize: 15 }} />
            Add Company
          </Button>
     

        <Card
          sx={{
            marginTop: 3,
          }}
        >
          <CardContent>
            <Grid item xs={12}>
              <Grid
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "1rem",
                    whiteSpace: "nowrap",
                    textTransform: "capitalize",
                    color: "black",
                  }}
                >
                  Company List
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <HeaderCell>ID</HeaderCell>
                      <HeaderCell>Name</HeaderCell>
                      <HeaderCell>Monthly Price</HeaderCell>
                      <HeaderCell>Annual Price</HeaderCell>
                      <HeaderCell>File Storage</HeaderCell>
                      <HeaderCell>Max Exployees</HeaderCell>
                      <HeaderCell>Module in Package</HeaderCell>
                      <HeaderCell>Action</HeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row) => (
                      <TableRow key={row.id}>
                        <DataCell>{row.id}</DataCell>
                        <DataCell>{row.name}</DataCell>
                        <DataCell>{row.monthlyPrice}</DataCell>
                        <DataCell>{row.annualPrice}</DataCell>
                        <DataCell>{row.fileStorage}</DataCell>
                        <DataCell>{row.maxEmployees}</DataCell>
                        <DataCell>{row.moduleinpackage}</DataCell>
                        <TableCell>
                         
                          <IconButton
                            onClick={() => handleEdit(row.id)}
                            aria-label="edit"
                            sx={{ color: "green" }}
                          >
                            <Edit />
                          </IconButton>
                          
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PackageList;
