import React, { useState } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import MainApi from "@/api-manage/MainApi"; 
import { getToken } from "@/utils/getToken"; 

const CompanyList = () => {
  const { data, refetch } = useGetAllCompanies();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);

  const handleEdit = (row) => {
    router.push(`/superadmin/company/editcompany?id=${row.id}`);
  };

  const handleCreatePackage = () => {
    router.push("/superadmin/company/createcompany");
  };

  const handleView = (row) => {
    router.push(`/superadmin/company/viewcompany?id=${row.id}`);
  };

  const handleDeleteClick = (id) => {
    setCompanyToDelete(id);
    setOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await MainApi.delete(`/api/companies/${companyToDelete}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.status === 204) {
        console.log("Company deleted successfully");
        refetch(); 
      } else {
        console.error("Failed to delete the company");
      }
    } catch (error) {
      console.error("An error occurred while deleting the company:", error);
    }
    setOpen(false);
    setCompanyToDelete(null);
  };

  const handleDeleteCancel = () => {
    setOpen(false);
    setCompanyToDelete(null);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

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
                    <HeaderCell>Package Name</HeaderCell>
                    <HeaderCell>Details</HeaderCell>
                    <HeaderCell>Created Date</HeaderCell>
                    <HeaderCell>Action</HeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.results.map((row, index) =>(
                    <TableRow key={row.id}>
                      <DataCell>{index + 1}</DataCell>
                      <DataCell>{row.name}</DataCell>
                      <DataCell>{row.package_name}</DataCell>
                      <DataCell>
                        <Typography
                          sx={{
                            fontSize: "0.875em",
                            color: "black",
                            whiteSpace: "nowrap",
                            fontWeight: "500",
                          }}
                        >
                          Register Date: {formatDate(row.created_at)}
                          {/* <br />
                          Employees: {row.employees} */}
                          <br />
                          Total Users: {row.total_user_count}
                        </Typography>
                      </DataCell>
                      <DataCell>{formatDate(row.created_at)}</DataCell>
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
                        {/* <IconButton
                          onClick={() => handleDeleteClick(row.id)}
                          aria-label="delete"
                          sx={{ color: "red" }}
                        >
                          <Delete />
                        </IconButton> */}
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

      <Dialog open={open} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Company</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this company? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default CompanyList;