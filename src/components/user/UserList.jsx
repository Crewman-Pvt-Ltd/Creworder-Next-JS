import React, { useState } from "react";
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
  DialogTitle,
} from "@mui/material";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import {
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  LockOpen as LockOpenIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

const UserList = () => {
    const router = useRouter();
  const [users, setUsers] = useState([
    {
      id: 1,
      userId: "1234",
      username: "John Doe",
      phone: "123-456-7890",
      email: "john.doe@example.com",
      gender: "Male",
      role: "Admin",
      status: "Approved",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const handleCreateUser = () => {
    router.push("user/createuser");
  };
  const handleToggleStatus = (userId, newStatus) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  };

  const handleDeleteUser = () => {
    setUsers(users.filter((user) => user.id !== userIdToDelete));
    setOpen(false);
  };

  const handleOpenDialog = (userId) => {
    setUserIdToDelete(userId);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
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
                    User List
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    onClick={handleCreateUser}
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
                    Add User
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
                    <HeaderCell>Sr.</HeaderCell>
                    <HeaderCell>User ID</HeaderCell>
                    <HeaderCell>Username</HeaderCell>
                    <HeaderCell>Phone</HeaderCell>
                    <HeaderCell>Email</HeaderCell>
                    <HeaderCell>Gender</HeaderCell>
                    <HeaderCell>Role</HeaderCell>
                    <HeaderCell>Status</HeaderCell>
                    <HeaderCell>Action</HeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow key={user.id}>
                      <DataCell>{index + 1}</DataCell>
                      <DataCell>{user.userId}</DataCell>
                      <DataCell>{user.username}</DataCell>
                      <DataCell>{user.phone}</DataCell>
                      <DataCell>{user.email}</DataCell>
                      <DataCell>{user.gender}</DataCell>
                      <DataCell>{user.role}</DataCell>
                      <DataCell>{user.status}</DataCell>
                      <TableCell>
                        <IconButton aria-label="edit" sx={{ color: "#007BFF" }}>
                          <EditIcon />
                        </IconButton>
                        {user.status === "Approved" ? (
                          <IconButton
                            aria-label="suspend"
                            onClick={() =>
                              handleToggleStatus(user.id, "Suspended")
                            }
                            sx={{ color: "#DC3545" }}
                          >
                            <CancelIcon />
                          </IconButton>
                        ) : (
                          <IconButton
                            aria-label="activate"
                            onClick={() =>
                              handleToggleStatus(user.id, "Approved")
                            }
                            sx={{ color: "#28A745" }}
                          >
                            <CheckCircleIcon />
                          </IconButton>
                        )}
                        <IconButton
                          aria-label="change password"
                          sx={{ color: "blue" }}
                        >
                          <LockOpenIcon sx={{ marginRight: "8px" }} />
                        </IconButton>
                        <IconButton
                          aria-label="force logout"
                          sx={{ color: "#FF0000" }}
                        >
                          <LogoutIcon sx={{ marginRight: "8px" }} />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleOpenDialog(user.id)}
                          sx={{ color: "#FF0000" }}
                        >
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

        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this user?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              No
            </Button>
            <Button onClick={handleDeleteUser} color="secondary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default UserList;
