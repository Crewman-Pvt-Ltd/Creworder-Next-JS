import React, { useState } from "react";
import { useRouter } from "next/router";
import CustomCard from "../CustomCard";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import useGetAllCategories from "@/api-manage/react-query/useGetAllCategories";
import { getToken } from "@/utils/getToken";
import MainApi from "@/api-manage/MainApi";
import {
  Grid,
  Typography,
  Button,
  IconButton,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
const CategoryList = () => {
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const router = useRouter();
  const { data, refetch } = useGetAllCategories();
  const handleEdit = (id) => {
    router.push(`/admin/category/edit-category?id=${id}`);
  };
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const handleCreateCategory = () => {
    router.push("/admin/category/create-category");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleDeleteClick = (id) => {
    setCategoryToDelete(id);
    setOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found.");
      }
      const response = await MainApi.delete(
        `/api/category/${categoryToDelete}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 204) {
        console.log("Category deleted successfully");
        refetch();
      } else {
        console.error("Failed to delete the Category");
      }
    } catch (error) {
      console.error("An error occurred while deleting the Category:", error);
    }
    setOpen(false);
    setCategoryToDelete(null);
  };

  const handleDeleteCancel = () => {
    setOpen(false);
    setCategoryToDelete(null);
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
                All Categories
              </Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={handleCreateCategory}
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
                Add Category
              </Button>
            </Grid>
          </Grid>
        </CustomCard>
        <CustomCard>
          <CardContent>
            {error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <HeaderCell>ID</HeaderCell>
                      <HeaderCell>Category Name</HeaderCell>
                      <HeaderCell>Status</HeaderCell>
                      <HeaderCell>Images</HeaderCell>
                      <HeaderCell>Created At</HeaderCell>
                      <HeaderCell>Updated At</HeaderCell>
                      <HeaderCell>Action</HeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.Data?.map((row, index) => (
                      <TableRow key={row.id}>
                        <DataCell>{index + 1}.</DataCell>
                        <DataCell>{row.name}</DataCell>
                        <DataCell>
                          {row.status === 1 ? "Active" : "Inactive"}
                        </DataCell>
                        <DataCell>
                          <img
                            src={`${BASE_URL}${row.image}`}
                            alt={row.name}
                            height={100}
                            width={100}
                          />
                        </DataCell>
                        <DataCell>{formatDate(row.created_at)}</DataCell>
                        <DataCell>{formatDate(row.updated_at)}</DataCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleEdit(row.id)}
                            aria-label="edit"
                            sx={{ color: "green" }}
                          >
                            <EditIcon sx={{ color: "green" }} />
                          </IconButton>
                          <IconButton sx={{ color: "red" }}>
                            <BlockIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteClick(row.id)}
                            aria-label="delete"
                            sx={{ color: "red" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </CustomCard>

        {/* Confirmation Dialog */}
        <Dialog
          open={open}
          onClose={handleDeleteCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this category?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default CategoryList;
