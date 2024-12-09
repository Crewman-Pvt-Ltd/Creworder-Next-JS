import React, { useState } from "react";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import useGetAllEmployees from "@/api-manage/react-query/useGetAllEmployees";
import { getToken } from "@/utils/getToken";
import MainApi from "@/api-manage/MainApi";
import {
  Grid,
  Typography,
  Button,
  Box,
  IconButton,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const initialData = [
  {
   },
];

const EmployeeList = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const { data, refetch } = useGetAllEmployees();
  const handleEdit = (row) => {
    router.push(`/superadmin/employees/editemployee?id=${row.id}`);
  };
  const handleCreatePackage = () => {
    router.push("/superadmin/employees/createemployee");
  };

  const handleDelete = (id) => {
    console.log("Delete", id);
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
                    Employee List
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
                    Add Employee
                  </Button>
                </Grid>
              </Grid>
            </CustomCard>
          </Grid>
        </Grid>
       
            <CustomCard>
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>UserName</HeaderCell>
                        <HeaderCell>Name</HeaderCell>
                        <HeaderCell>Email</HeaderCell>
                        <HeaderCell>Profile Image</HeaderCell>
                        <HeaderCell>Action</HeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.results?.map((row, index) => (
                        <TableRow key={row.id}>
                          <DataCell>{index + 1}</DataCell>
                          <DataCell>{row.username}</DataCell>
                          <DataCell>{row.first_name} {row.last_name}</DataCell>
                          <DataCell>{row.email}</DataCell>                          
                          <DataCell>
                            <img src={row?.profile?.profile_image}
                              height={100}
                              width={100}/>
                          </DataCell>
                          <TableCell>
                            <IconButton
                              onClick={() => handleEdit(row)}
                              aria-label="edit"
                              sx={{ color: "green" }}>
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDelete(row.id)}
                              aria-label="delete"
                              sx={{ color: "red" }}>
                              <DeleteIcon />
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

export default EmployeeList;
