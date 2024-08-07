import React from "react";
import useGetAllCompanies from "@/api-manage/react-query/useGetAllCompanies";
import { useRouter } from "next/router";
import {
  Grid,
  CardContent,
  Divider,
  Typography,
  Button,
  TableContainer,
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

const CompanyList = ({ }) => {
  const { data } = useGetAllCompanies();
  const router = useRouter();

  const handleEdit = () => {
    router.push("/superadmin/company/editcompany");
  };

  const handleCreatePackage = () => {
    router.push("/superadmin/company/createcompany");
  };


  const handleView = () => {
    router.push("/superadmin/company/viewcompany");
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
        <Grid container sx={{ marginBottom: "10px" }}>
          <Grid item xs={12}>
            <CustomCard padding="13px">
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
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
                    Company List
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    onClick={handleCreatePackage}
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
                    Add Company
                  </Button>
                </Grid>
              </Grid>
            </CustomCard>
          </Grid>
        </Grid>

        <CustomCard>
          <CardContent>
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
                  {data?.results.map((row, index) =>(
                    <TableRow key={row.id}>
                      <DataCell>{index+1}</DataCell>
                      <DataCell>{row.name}</DataCell>
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
                          onClick={() => handleView(row)}
                          aria-label="view"
                          sx={{ color: "#708090" }}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          onClick={() => handleEdit(row)}
                          aria-label="edit"
                          sx={{ color: "#001F3F" }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(row.id)}
                          aria-label="delete"
                          sx={{ color: "#333333" }}
                        >
                          <Delete />
                        </IconButton>
                        <IconButton
                          onClick={() => handleStatusToggle(row.id)}
                          aria-label={
                            row.status === "active" ? "suspend" : "activate"
                          }
                          sx={{
                            color: row.status === "active" ? "orange" : "green",
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
