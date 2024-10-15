import React from "react";
import CustomCard from "../CustomCard";
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
import DeleteIcon from "@mui/icons-material/Delete";
import useGetAllEmployees from "@/api-manage/react-query/useGetAllEmployees";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const IPAccessList = ({ onAddAdmin, onEditAdmin }) => {
  const { data, refetch } = useGetAllEmployees();

  const handleEdit = (row) => {
    onEditAdmin(row);
  };

  const handleDelete = (id) => {
    console.log("Delete", id);
  };

  return (
    <Grid container>
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
                      fontWeight: "500",
                      fontSize: "16px",
                      whiteSpace: "nowrap",
                      textTransform: "capitalize",
                      color: "black",
                      marginLeft: "30px",
                    }}
                    className={poppins.className}
                  >
                    IPAccess List
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    onClick={onAddAdmin}
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
                    className={poppins.className}
                  >
                    <AddIcon
                      sx={{ fontSize: 15 }}
                      className={poppins.className}
                    />
                    Add IP
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
                    <TableCell className={poppins.className}>ID</TableCell>
                    <TableCell className={poppins.className}>Name</TableCell>
                    <TableCell className={poppins.className}>
                      IP Number
                    </TableCell>
                    <TableCell className={poppins.className}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow >
                    <TableCell className={poppins.className}>1.</TableCell>
                    <TableCell className={poppins.className}>
                      Crewmans Solutions
                    </TableCell>
                    <TableCell className={poppins.className}>
                      198.07.126.0.1
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleEdit(row)}
                        aria-label="edit"
                        sx={{ color: "green" }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(row.id)}
                        aria-label="delete"
                        sx={{ color: "red" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default IPAccessList;
