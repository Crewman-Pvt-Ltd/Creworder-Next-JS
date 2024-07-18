import React, { useState } from "react";
import CustomCard from "../CustomCard";
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
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

const initialData = [
  {
    ticket: "TKT-20240605-9",
    ticketsubject: "Company A",
    requestername: "Test 1",
    requestedon: "15 Jun, 2024",
  },
  {
    ticket: "TKT-3456705-9",
    ticketsubject: "Company B",
    requestername: "Test 2",
    requestedon: "20 Jun, 2024",
  },
];

const SupportTicketList = ({ onCreateTicket }) => {
  const [data, setData] = useState(initialData);

  const handleEdit = (id) => {
    console.log("Edit", id);
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
    <>
      <CustomCard>
        <Grid container alignItems="center" sx={{ padding: "10px" }}>
          <Grid item>
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "1rem",
                whiteSpace: "nowrap",
                textTransform: "capitalize",
                color: "black",
                marginLeft: "30px",
              }}
            >
              Support Ticket
            </Typography>
          </Grid>
          <Box sx={{ flexGrow: 1 }} />
          <Grid item>
            <Button
            onClick={onCreateTicket}
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
                marginRight: "30px",
              }}
            >
              <AddIcon sx={{ fontSize: 15 }} />
              Create Ticket
            </Button>
          </Grid>
        </Grid>
      </CustomCard>
      <Grid container sx={{ marginTop: "20px" }}>
        <Grid item xs={12}>
          <CustomCard>
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <HeaderCell>ID</HeaderCell>
                      <HeaderCell>Ticket #</HeaderCell>
                      <HeaderCell>Ticket Subject</HeaderCell>
                      <HeaderCell>Requester Name</HeaderCell>
                      <HeaderCell>Requested On</HeaderCell>
                      <HeaderCell>Action</HeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row, index) => (
                      <TableRow key={row.id}>
                        <DataCell>{index + 1}</DataCell>
                        <DataCell>{row.ticket}</DataCell>
                        <DataCell>{row.ticketsubject}</DataCell>
                        <DataCell>{row.requestername}</DataCell>
                        <DataCell>{row.requestedon}</DataCell>
                        <TableCell>
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
    </>
  );
};

export default SupportTicketList;
