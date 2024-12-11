import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import useGetAllAssignRole from "@/api-manage/react-query/useGetAllAssignRole";
import { getToken } from "@/utils/getToken";
import axios from "axios";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

const AssignRoleList = () => {
  const router = useRouter();
  const [expandedRow, setExpandedRow] = useState(null);
  const [agentsData, setAgentsData] = useState({});
  const [isClient, setIsClient] = useState(false);
  const { data, refetch } = useGetAllAssignRole();
  const token = getToken();

  useEffect(() => {
    setIsClient(true);
  }, []);
  const createAssignRole = () => {
    router.push("/admin/manage/assign-role");
  };

  const handleExpandClick = async (rowId, teamleadId) => {
    const isRowExpanded = expandedRow === rowId ? null : rowId;
    setExpandedRow(isRowExpanded);

    if (isRowExpanded && !agentsData[teamleadId]) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/agents/by_teamlead/?teamlead_id=${teamleadId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );

        if (response.data.Success) {
          setAgentsData((prevData) => ({
            ...prevData,
            [teamleadId]: response.data.Data.Agents,
          }));
        }
      } catch (error) {
        console.error("Error fetching agents data:", error);
      }
    }
  };

  if (!isClient) {
    return null;
  }

  if (!token) {
    console.error("Authentication token is missing.");
    return null;
  }

  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={12}>
        <CustomCard>
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "auto 1fr auto",
              maxHeight: "400px",
            }}
          >
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
                      Assign Role List
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={createAssignRole}
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
                      Assign Role
                    </Button>
                  </Grid>
                </Grid>
              </CustomCard>
            </Grid>
            <TableContainer
              component={Paper}
              sx={{ overflowY: "auto", maxHeight: "340px" }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Sr.</b>
                    </TableCell>
                    <TableCell>
                      <b>Manager</b>
                    </TableCell>
                    <TableCell>
                      <b>TeamLead</b>
                    </TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.Data?.map((row, index) => (
                    <React.Fragment key={row.id}>
                      <TableRow>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.manager_name}</TableCell>
                        <TableCell
                          sx={{
                            cursor: "pointer",
                            color: "#405189",
                          }}
                          onClick={() =>
                            handleExpandClick(row.id, row.teamlead)
                          }
                        >
                          {row.teamlead} {row.first_name} {row.last_name}
                        </TableCell>
                       
                      </TableRow>
                      {/* Expanded row */}
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          sx={{ paddingBottom: 0, paddingTop: 0 }}
                        >
                          <Collapse
                            in={expandedRow === row.id}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box sx={{ margin: 1 }}>
                              <Typography variant="h6" gutterBottom>
                                Agents under {row.teamlead}
                              </Typography>
                              <List>
                                {agentsData[row.teamlead]?.map((agent, i) => (
                                  <ListItem key={i}>
                                    <ListItemText
                                      primary={`${agent.first_name} ${agent.last_name}`}
                                      secondary={`Email: ${agent.email}, Phone: ${agent.contact_no}`}
                                    />
                                  </ListItem>
                                ))}
                              </List>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default AssignRoleList;
