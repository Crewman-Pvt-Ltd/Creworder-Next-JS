import React, { useState } from "react";
import useGetAllMenu from "@/api-manage/react-query/useGetAllMenu";
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
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const MenuList = () => {
  const router = useRouter();
  const { data, refetch } = useGetAllMenu();

  const [open, setOpen] = useState(false);
  const [menuToDelete, setMenuToDelete] = useState(null);
  const [viewMenu, setViewMenu] = useState(null);

  const handleEdit = (id) => {
    router.push(`/superadmin/menu/editmenu?id=${id}`);
  };

  const handleCreateMenu = () => {
    router.push("/superadmin/menu/createmenu");
  };

  const handleDeleteClick = (id) => {
    setMenuToDelete(id);
    setOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await MainApi.delete(`/api/menu/${menuToDelete}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.status === 204) {
        console.log("Module deleted successfully");
        refetch();
      } else {
        console.error("Failed to delete the Module");
      }
    } catch (error) {
      console.error("An error occurred while deleting the module:", error);
    }
    setOpen(false);
    setMenuToDelete(null);
  };

  const handleDeleteCancel = () => {
    setOpen(false);
    setMenuToDelete(null);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid item xs={12}>
              <Grid
                container
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "20px",
                    whiteSpace: "nowrap",
                    textTransform: "capitalize",
                    color: "black",
                    marginLeft: "30px",
                    flex: 1,
                  }}
                  className={poppins.className}
                >
                  Menu List
                </Typography>
                <Grid item display="flex" gap={1} sx={{ marginRight: 2 }}>
                  
                  <Button
                    onClick={handleCreateMenu}
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
                    className={poppins.className}
                  >
                    <AddIcon sx={{ fontSize: 20 }} />
                    Create Menu
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <HeaderCell className={poppins.className}>ID</HeaderCell>
                      <HeaderCell className={poppins.className}>
                        Menu
                      </HeaderCell>
                      <HeaderCell className={poppins.className}>
                        Icon
                      </HeaderCell>
                      <HeaderCell className={poppins.className}>URL</HeaderCell>
                      <HeaderCell className={poppins.className}>
                        Action
                      </HeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.map((row, index) => (
                      <TableRow key={index + 1}>
                        <DataCell className={poppins.className}>
                          {index + 1}{" "}
                        </DataCell>
                        <DataCell
                          className={poppins.className}
                          sx={{ maxWidth: "300px", overflowWrap: "anywhere" }}
                        >
                          {truncateDescription(row?.name)}
                        </DataCell>
                        <DataCell className={poppins.className}>
                          {row.icon}
                        </DataCell>
                        <DataCell className={poppins.className}>
                          {row.url}
                        </DataCell>

                        <TableCell>
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
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Dialog open={open} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Module</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this module? This action cannot be
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

export default MenuList;
