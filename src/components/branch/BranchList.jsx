import React, { useState } from "react";
import useGetAllBranches from "@/api-manage/react-query/useGetAllBranches";
import { useRouter } from "next/router";
import {
  Grid,
  Card,
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
import AddIcon from "@mui/icons-material/Add";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";

const BranchList = () => {
  const router = useRouter();
  const { data, refetch } = useGetAllBranches();
  const [open, setOpen] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState(null);
  const [viewBranch, setViewBranch] = useState(null);

  const handleCreateBranch = () => {
    router.push("/admin/branch/createbranch");
  };

  const handleView = (branch) => {
    setViewBranch(branch);
  };

  const handleEdit = (id) => {
    router.push(`/admin/branch/editbranch?id=${id}`);
  };

  const handleDeleteClick = (id) => {
    setBranchToDelete(id);
    setOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await MainApi.delete(`/api/branches/${branchToDelete}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.status === 204) {
        console.log("Branch deleted successfully");
        refetch();
      } else {
        console.error("Failed to delete the branch");
      }
    } catch (error) {
      console.error("An error occurred while deleting the branch:", error);
    }
    setOpen(false);
    setBranchToDelete(null);
  };

  const handleDeleteCancel = () => {
    setOpen(false);
    setBranchToDelete(null);
  };

  const handleViewClose = () => {
    setViewBranch(null);
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

  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 50) {
      return words.slice(0, 50).join(" ") + "...";
    }
    return description;
  };

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container alignItems="center" justifyContent="space-between">
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "1rem",
                  whiteSpace: "nowrap",
                  textTransform: "capitalize",
                  color: "black",
                }}
              >
                Branch List
              </Typography>
              <Button
                onClick={handleCreateBranch}
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
                <AddIcon sx={{ fontSize: 20 }} />
                Create Branch
              </Button>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <HeaderCell>ID</HeaderCell>
                    <HeaderCell>Branch Name</HeaderCell>
                    <HeaderCell>Branch Address</HeaderCell>
                    <HeaderCell>Action</HeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.results.map((row, index) => (
                    <TableRow key={row.id}>
                      <DataCell>{index + 1}</DataCell>
                      <DataCell sx={{ maxWidth: "300px", overflowWrap: "anywhere" }}>{row.name}</DataCell>
                      <DataCell sx={{ maxWidth: "300px", overflowWrap: "anywhere" }}>{row.address}</DataCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleView(row)}
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
                          onClick={() => handleDeleteClick(row.id)}
                          aria-label="delete"
                          sx={{ color: "red" }}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>

      <Dialog open={open} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Branch</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this branch? This action cannot be undone.
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

      <Dialog open={Boolean(viewBranch)} onClose={handleViewClose}>
        <DialogTitle>{viewBranch?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>{viewBranch?.address}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default BranchList;
