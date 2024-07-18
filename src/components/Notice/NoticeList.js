import React from "react";
import { useRouter } from 'next/router';
import {
  Grid,
  Card,
  CardContent,
  Divider,
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,

} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {
  Visibility,
  Edit,
  Delete,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";
const data = [
  {
    id: 1,
    title: "Test Title",
    message: "Message for notice",
    lastActivity: "2024-07-10",
    date: "2024-07-18",
    status: "active",
  },

];
const NoticeList = ({onNotice}) => { 

  const handleView = (id) => {
    console.log("View", id);
  };

  const handleEdit = (id) => {
    console.log("Edit", id);
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
    <TableCell sx={{ color: "#999999", fontSize: "14px", whiteSpace: "nowrap",
        fontWeight: "500",
        textTransform: "capitalize", }} {...props} />
  );

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
                    fontWeight: '600',
                    fontSize: "1rem",
                    whiteSpace: "nowrap",
                    textTransform: "capitalize",
                    color: "black",
                  }}
                >
                  Notice List
                </Typography>
                <Button
                    onClick={onNotice}
                    sx={{
                        padding: "8px 16px",
                        fontSize: "14px",
                        backgroundColor: "#405189",
                        color: "white",
                        "&:hover": {
                        backgroundColor: "#334a6c",
                        },
                        display: 'flex',
                        alignItems: 'center',
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
                    {data.map((row) => (
                      <TableRow key={row.id}>
                        <DataCell>{row.id}</DataCell>
                        <DataCell>{row.title}</DataCell>
                        <DataCell>{row.message}</DataCell>
                        <DataCell>{row.date}</DataCell>
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
                            onClick={() => handleDelete(row.id)}
                            aria-label="delete"
                            sx={{ color: "red" }}
                          >
                            <Delete />
                          </IconButton>
                          <IconButton
                            onClick={() => handleStatusToggle(row.id)}
                            aria-label={
                              row.status === "active" ? "suspend" : "activate"
                            }
                            sx={{
                              color:
                                row.status === "active" ? "orange" : "green",
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
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default NoticeList;
