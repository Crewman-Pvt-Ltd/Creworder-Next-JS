import React from "react";
import CustomCard from "../CustomCard";
import useGetAllSupportTickets from "@/api-manage/react-query/useGetAllSupportTickets";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility"; 
import { useRouter } from "next/router";

const SupportTicketList = () => {
  const router = useRouter();
  const { data, refetch } = useGetAllSupportTickets();

  const handleEdit = (row) => {
    router.push(`/superadmin/supportticket/editticket/${row.id}`);
  };

  const handleView = (row) => {
    router.push(`/superadmin/supportticket/viewticket/${row.id}`);
  };

  const handleCreateTicket = () => {
    router.push("/superadmin/supportticket/createticket");
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
                    Ticket List
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    onClick={handleCreateTicket}
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
                    Add Ticket
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
                    <HeaderCell>Ticket #</HeaderCell>
                    <HeaderCell>Ticket Subject</HeaderCell>
                    <HeaderCell>Description</HeaderCell>
                    <HeaderCell>Type</HeaderCell>
                    <HeaderCell>Priority</HeaderCell>
                    <HeaderCell>Agent</HeaderCell>
                    <HeaderCell>Action</HeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.results.map((row, index) => (
                    <TableRow key={row.id}>
                      <DataCell>{row.id}</DataCell>
                      <DataCell>{row.ticketNumber || "N/A"}</DataCell> 
                      <DataCell>{row.subject}</DataCell>
                      <DataCell>{row.description}</DataCell>
                      <DataCell>{row.type}</DataCell>
                      <DataCell>{row.priority}</DataCell>
                      <DataCell>{row.agent?.username || "N/A"}</DataCell> {/* Adjust as needed */}
                      <TableCell>
                        <IconButton
                          onClick={() => handleView(row)}
                          aria-label="view"
                          sx={{ color: "#708090" }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleEdit(row)}
                          aria-label="edit"
                          sx={{ color: "green" }}
                        >
                          <EditIcon />
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

export default SupportTicketList;
