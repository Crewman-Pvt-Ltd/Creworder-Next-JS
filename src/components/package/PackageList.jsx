import React from "react";
import { useRouter } from "next/router";
import CustomCard from "../CustomCard";
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
import AddIcon from "@mui/icons-material/Add";
import {
  Visibility,
  Edit,
  Delete,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";
import useGetAllPackages from "@/api-manage/react-query/useGetAllPackages";


const PackageList = ({ onCreatePackage }) => {


  const { data } = useGetAllPackages();


  const handleView = (id) => {
    console.log("View", id);
  };

  const handleEdit = (id) => {
    console.log("Edit", id);
  };

 

  const HeaderCell = (props) => (
    <TableCell
      sx={{
        fontSize: "0.8rem",
        whiteSpace: "nowrap",
        fontWeight: "500",
        textTransform: "capitalize",
        color: "gray",
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
      <Button
        onClick={onCreatePackage}
        sx={{
          padding: "8px 16px",
          fontSize: "14px",
          backgroundColor: "#405189",
          color: "white",
          "&:hover": {
            backgroundColor: "#334a6c",
          },
          marginLeft: '20px',
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <AddIcon sx={{ fontSize: 15 }} />
        Add Package
      </Button>
  
      <CustomCard sx={{ marginTop: 3 }}>
        <CardContent>
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "1rem",
              whiteSpace: "nowrap",
              textTransform: "capitalize",
              color: "black",
            }}
          >
            Package List
          </Typography>
          <Divider sx={{ my: 2 }} />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <HeaderCell>ID</HeaderCell>
                  <HeaderCell>Name</HeaderCell>
                  <HeaderCell>Monthly Price</HeaderCell>
                  <HeaderCell>Annual Price</HeaderCell>
                  <HeaderCell>Max Employees</HeaderCell>
                  <HeaderCell>Module in Package</HeaderCell>
                  <HeaderCell>Action</HeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row, index) => (
                  <TableRow key={row.id}>
                    <DataCell>{index+1}</DataCell>
                    <DataCell>{row.name}</DataCell>
                    <DataCell>{row.monthly_price}</DataCell>
                    <DataCell>{row.annual_price}</DataCell>
                    <DataCell>{row.max_employees}</DataCell>
                    <DataCell>
                      {row?.modules?.map((module, index) => (
                        <div key={index}>{module}</div>
                      ))}
                    </DataCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleEdit(row.id)}
                        aria-label="edit"
                        sx={{ color: "green" }}
                      >
                        <Edit />
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

export default PackageList;
