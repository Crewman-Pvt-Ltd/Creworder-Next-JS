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
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
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
                    }}className={poppins.className}
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
                    }}className={poppins.className}
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
                <TableHead >
                  <TableRow>
                    <HeaderCell className={poppins.className}>ID</HeaderCell>
                    <HeaderCell className={poppins.className}>Ticket #</HeaderCell>
                    <HeaderCell className={poppins.className}>Ticket Subject</HeaderCell>
                    <HeaderCell className={poppins.className}>Description</HeaderCell>
                    <HeaderCell className={poppins.className}>Type</HeaderCell>
                    <HeaderCell className={poppins.className}>Priority</HeaderCell>
                    <HeaderCell className={poppins.className}>Agent</HeaderCell>
                    <HeaderCell className={poppins.className}>Action</HeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.results.map((row, index) => (
                    <TableRow key={row.id}>
                      <DataCell className={poppins.className}>{row.id}</DataCell>
                      <DataCell className={poppins.className}>{row.ticket_id}</DataCell> 
                      <DataCell className={poppins.className}>{row.subject}</DataCell>
                      <DataCell className={poppins.className}>{row.description}</DataCell>
                      <DataCell className={poppins.className}>{row.type}</DataCell>
                      <DataCell className={poppins.className}>{row.priority}</DataCell>
                      <DataCell className={poppins.className}>{row.agent?.username || "N/A"}</DataCell> {/* Adjust as needed */}
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
