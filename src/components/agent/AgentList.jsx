import React, { useState } from "react";
import useGetAllUsers from "@/api-manage/react-query/useGetAllUsers";
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
  Tooltip,
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
const AgentList = () => {
  const router = useRouter();
  const { data, refetch } = useGetAllUsers();
  const [open, setOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const handleCreateAgent = () => {
    router.push("agent/createagent");
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
                    Agent List
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    onClick={handleCreateAgent}
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
                    Add Agent
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
                  {data?.results.map((row, index) => (
                    <TableRow key={row.id}>
                      <DataCell>{index + 1}</DataCell>
                      <DataCell>{row?.profile?.employee_id}</DataCell>
                      <DataCell>{row?.username}</DataCell>
                      <DataCell>{row?.profile?.contact_no}</DataCell>
                      <DataCell>{row?.email}</DataCell>                      
                      <DataCell>{row?.profile?.gender === "m" ? "Male" : row?.profile?.gender === "f" ? "Female"
                            : "Other"}
                      </DataCell>
                      <DataCell>{row?.role?.role}</DataCell>
                      <DataCell>
                        {row?.profile?.status == true ? "Active" : "Inactive"}
                      </DataCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <IconButton
                            aria-label="edit"
                            sx={{ color: "#007BFF" }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>

                        {row.status === "Approved" ? (
                          <Tooltip title="Suspend">
                            <IconButton
                              aria-label="suspend"
                              onClick={() =>
                                handleToggleStatus(row.id, "Suspended")
                              }
                              sx={{ color: "#DC3545" }}
                            >
                              <CancelIcon />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Activate">
                            <IconButton
                              aria-label="activate"
                              onClick={() =>
                                handleToggleStatus(row.id, "Approved")
                              }
                              sx={{ color: "#28A745" }}
                            >
                              <CheckCircleIcon />
                            </IconButton>
                          </Tooltip>
                        )}

                        <Tooltip title="Change Password">
                          <IconButton
                            aria-label="change password"
                            sx={{ color: "blue" }}
                          >
                            <LockOpenIcon sx={{ marginRight: "8px" }} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Force Logout">
                          <IconButton
                            aria-label="force logout"
                            sx={{ color: "#FF0000" }}
                          >
                            <LogoutIcon sx={{ marginRight: "8px" }} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete">
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleOpenDialog(row.id)}
                            sx={{ color: "#FF0000" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
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

export default AgentList;
