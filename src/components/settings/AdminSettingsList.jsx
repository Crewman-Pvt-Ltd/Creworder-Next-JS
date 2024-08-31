import React from "react";
import CustomCard from "../CustomCard";
import { Grid, Typography, Button, IconButton, CardContent, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useGetAllEmployees from "@/api-manage/react-query/useGetAllEmployees";

const AdminSettingsList = ({ onAddAdmin, onEditAdmin }) => {
  const { data, refetch } = useGetAllEmployees();

  const handleEdit = (row) => {
    onEditAdmin(row); // Call the onEditAdmin prop with the selected row data
  };

  const handleDelete = (id) => {
    console.log("Delete", id);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container sx={{ marginBottom: "10px" }}>
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
                    Admin List
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    onClick={onAddAdmin}
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
                    Add Admin
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
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Profile Image</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.results?.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.first_name} {row.last_name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>
                        <img src={row.profile_image} height={100} width={100} />
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEdit(row)} aria-label="edit" sx={{ color: "green" }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(row.id)} aria-label="delete" sx={{ color: "red" }}>
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

export default AdminSettingsList;
