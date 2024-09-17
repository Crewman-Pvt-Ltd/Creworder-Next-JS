import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Divider,

  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const RolesList = () => { 

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
        <Card>
          <CardContent>
            <Grid container display="flex" justifyContent="space-between" alignItems="center">
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "20px",
                  whiteSpace: "nowrap",
                  textTransform: "capitalize",
                  color: "black",
                }}
                className={poppins.className}
              >
                Roles
              </Typography>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <HeaderCell className={poppins.className}>ID</HeaderCell>
                    <HeaderCell className={poppins.className}>Roles</HeaderCell>
                    <HeaderCell className={poppins.className}>Remark</HeaderCell>
                 
                    <HeaderCell className={poppins.className}>Action</HeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                 
                    <TableRow>
                      <DataCell className={poppins.className}>1</DataCell>
                      <DataCell
                        className={poppins.className}
                       
                      >
                       wsdweded 
                      </DataCell>
                      <DataCell className={poppins.className}>asdasd</DataCell> {/* Assuming data field */}
                      

                      <TableCell>
                        <IconButton
                         
                          aria-label="edit"
                          sx={{ color: "green" }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                        
                          aria-label="delete"
                          sx={{ color: "red" }}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
               
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default RolesList;
