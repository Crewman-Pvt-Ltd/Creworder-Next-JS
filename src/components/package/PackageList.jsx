import React from "react";
import { useRouter } from "next/router";
import CustomCard from "../CustomCard";
import {
  Grid,
  CardContent,
  Divider,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {

  Edit,
 
} from "@mui/icons-material";
import useGetAllPackages from "@/api-manage/react-query/useGetAllPackages";


const PackageList = () => {


  const { data } = useGetAllPackages();



  const router = useRouter();

  const handleEdit = () => {
    router.push("/superadmin/package/editpackage");
  };

  const handleCreatePackage = () => {
    router.push("/superadmin/package/createpackage");
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
                    Package List
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    onClick={handleCreatePackage}
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
                    Add Package
                  </Button>
                </Grid>
              </Grid>
            </CustomCard>
          </Grid>
        </Grid>
  
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
                        onClick={() => handleEdit(row)}
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
