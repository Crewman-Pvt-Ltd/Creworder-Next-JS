import React, { useState } from "react";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
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

const initialData = [
  {
    id: 1,
    name: "Weight Gain",
    status: "Active",
    description: "This is description.",
    created_at: "2023-07-14",
    updated_at: "2023-07-18",
  },
 
];

const CategoryList = () => {
  const [data, setData] = useState(initialData);
const router = useRouter();

  const handleEdit = () => {
    router.push("/admin/category/edit-category");
  };

  const handleCreateCategory = () => {
    router.push("/admin/category/create-category");
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
                    All Category
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    onClick={handleCreateCategory}
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
                    Add Category
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
                        <HeaderCell>Category Name</HeaderCell>
                        <HeaderCell>Status</HeaderCell>
                        <HeaderCell>Created At</HeaderCell>
                        <HeaderCell>Updated At</HeaderCell>
                        <HeaderCell>Action</HeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((row, index) => (
                        <TableRow key={row.id}>
                          <DataCell>{index + 1}.</DataCell>
                          <DataCell>{row.name}</DataCell>
                          <DataCell>{row.status}</DataCell>
                          <DataCell>{row.created_at}</DataCell> 
                          <DataCell>{row.updated_at}</DataCell>
                          <TableCell>
                          <IconButton>
                            <Box 
                             onClick={() => handleEdit(row)}
                              aria-label="edit"
                              sx={{ 
                                width: 30, 
                                height: 30, 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                border: '1px solid green', 
                                borderRadius: '4px' 
                              }}>
                              <EditIcon sx={{ color: 'green' }} />
                            </Box>
                          </IconButton>
                          <IconButton sx={{ color: "red" }}>
                          <BlockIcon />
                          </IconButton>
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

export default CategoryList;
