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
import CustomCard from "../CustomCard";
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
    companyName: "Company A",
    package: "Gold Plan (Monthly)",
    registerDate: "15 Jun, 2024",
    employees: "5/200",
    totalUsers: "10",
    lastActivity: "2024-07-10",
    date: "2024-07-01",
    status: "active",
  },
  {
    id: 2,
    companyName: "Company B",
    package: "Gold Plan (yearly)",
    registerDate: "05 Jun, 2024",
    employees: "1/100",
    totalUsers: "1",
    lastActivity: "2024-07-09",
    date: "2024-06-30",
    status: "suspended",
  },
];
const CompanyList = ({ onCreateCompany }) => {
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
        fontSize: "1rem",
        whiteSpace: "nowrap",
        fontWeight: "500",
        textTransform: "capitalize",
        color: "black",
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
        onClick={onCreateCompany}
        sx={{
          padding: "8px 16px",
          fontSize: "14px",
          backgroundColor: "#405189",
          color: "white",
          "&:hover": {
            backgroundColor: "#334a6c",
          },
          marginLeft: '20px',
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <AddIcon sx={{ fontSize: 15 }} />
        Add Company
      </Button>
  
      <CustomCard sx={{ marginTop: 3 }}>
        <CardContent>
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
          <Divider sx={{ my: 2 }} />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <HeaderCell>ID</HeaderCell>
                  <HeaderCell>Company Name</HeaderCell>
                  <HeaderCell>Package</HeaderCell>
                  <HeaderCell>Details</HeaderCell>
                  <HeaderCell>Last Activity</HeaderCell>
                  <HeaderCell>Date</HeaderCell>
                  <HeaderCell>Action</HeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <DataCell>{row.id}</DataCell>
                    <DataCell>{row.companyName}</DataCell>
                    <DataCell>{row.package}</DataCell>
                    <DataCell>
                      <Typography
                        sx={{
                          fontSize: "0.875em",
                          color: "black",
                          whiteSpace: "nowrap",
                          fontWeight: "500",
                        }}
                      >
                        Register Date: {row.registerDate}
                        <br />
                        Employees: {row.employees}
                        <br />
                        Total Users: {row.totalUsers}
                      </Typography>
                    </DataCell>
                    <DataCell>{row.lastActivity}</DataCell>
                    <DataCell>{row.date}</DataCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleView(row.id)}
                        aria-label="view"
                        sx={{ color: "blue" }}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        onClick={() => handleEdit(row.id)}
                        aria-label="edit"
                        sx={{ color: "green" }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(row.id)}
                        aria-label="delete"
                        sx={{ color: "red" }}
                      >
                        <Delete />
                      </IconButton>
                      <IconButton
                        onClick={() => handleStatusToggle(row.id)}
                        aria-label={
                          row.status === "active" ? "suspend" : "activate"
                        }
                        sx={{
                          color:
                            row.status === "active" ? "orange" : "green",
                        }}
                      >
                        {row.status === "active" ? (
                          <Cancel />
                        ) : (
                          <CheckCircle />
                        )}
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

export default CompanyList;
