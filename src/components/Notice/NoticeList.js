import React, { useState } from "react";
import useGetAllNotices from "@/api-manage/react-query/useGetAllNotices";
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

const NoticeList = () => {
  const router = useRouter();
  const { data, refetch } = useGetAllNotices();
  const [open, setOpen] = useState(false);
  const [noticeToDelete, setNoticeToDelete] = useState(null);

  const handleCreateNotice = () => {
    router.push("/superadmin/notice/createnotice");
  };

  const handleView = (id) => {
    console.log("View", id);
  };

  const handleEdit = (id) => {
    console.log("Edit", id);
  };

  const handleDeleteClick = (id) => {
    setNoticeToDelete(id);
    setOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await MainApi.delete(`/api/notices/${noticeToDelete}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.status === 204) {
        console.log("Notice deleted successfully");
        refetch(); // Refetch the notices to update the list
      } else {
        console.error("Failed to delete the notice");
      }
    } catch (error) {
      console.error("An error occurred while deleting the notice:", error);
    }
    setOpen(false);
    setNoticeToDelete(null);
  };

  const handleDeleteCancel = () => {
    setOpen(false);
    setNoticeToDelete(null);
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
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "1rem",
                    whiteSpace: "nowrap",
                    textTransform: "capitalize",
                    color: "black",
                  }}
                >
                  Notice List
                </Typography>
                <Button
                  onClick={handleCreateNotice}
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
                  Create Notice
                </Button>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <HeaderCell>ID</HeaderCell>
                      <HeaderCell>Title</HeaderCell>
                      <HeaderCell>Message</HeaderCell>
                      <HeaderCell>Date</HeaderCell>
                      <HeaderCell>Action</HeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.map((row, index) => (
                      <TableRow key={index + 1}>
                        <DataCell>{index + 1}</DataCell>
                        <DataCell>{row.title}</DataCell>
                        <DataCell
                          sx={{ maxWidth: "300px", overflowWrap: "anywhere" }}
                        >
                          {truncateDescription(row.description)}
                        </DataCell>
                        <DataCell>{formatDate(row.created_at)}</DataCell>
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
        <DialogTitle>Delete Notice</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this notice? This action cannot be
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

export default NoticeList;
