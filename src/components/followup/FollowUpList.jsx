import React, { useState } from "react";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
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
import DeleteIcon from "@mui/icons-material/Delete";

const initialData = [
  {
    id: 1,
    name: "Rahul Kumar",
    phone: "+91 85952-46884",
    call_id: "0011",
    remark: "This setup",
    reminder_date: "2023-07-14",
    status: "pending",
    created: "2023-07-14",
    
  },
 
];

const FollowUpList = () => {
  const [data, setData] = useState(initialData);
const router = useRouter();

  const handleCreateFollowUp = () => {
    router.push("/followup/createfollowup");
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
                    Follow Up List
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    onClick={handleCreateFollowUp}
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
                    Add Follow Up
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
                        <HeaderCell>Customer Name</HeaderCell>
                        <HeaderCell>Customer Phone</HeaderCell>
                        <HeaderCell>Call ID</HeaderCell>
                        <HeaderCell>Remark</HeaderCell>
                        <HeaderCell>Reminder Date</HeaderCell>
                        <HeaderCell >Status</HeaderCell>
                        <HeaderCell>Created</HeaderCell>
                        <HeaderCell>Action</HeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((row, index) => (
                        <TableRow key={row.id}>
                          <DataCell>{index + 1}.</DataCell>
                          <DataCell>{row.name}</DataCell>
                          <DataCell>{row.phone}</DataCell>
                          <DataCell>{row.call_id}</DataCell>
                          <DataCell>{row.remark}</DataCell>
                          <DataCell>{row.reminder_date}</DataCell>
                          <DataCell>
                            <Button
                              variant="contained"
                              style={{ backgroundColor: "#213a8b", color: "#fff" }}
                              // Add your handler function here
                            >
                              {row.status}
                            </Button>
                          </DataCell>
                          <DataCell>{row.created}</DataCell>
                          <TableCell>
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

export default FollowUpList;
