import React from "react";
import CustomCard from "./CustomCard";
import useGetAllPackages from "@/api-manage/react-query/useGetAllPackages";
import { Poppins } from "next/font/google";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Typography,
} from "@mui/material";


const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const HeaderCell = (props) => (
  <TableCell
    className={poppins.className}
    sx={{
      fontSize: "12px",
      whiteSpace: "nowrap",
      textTransform: "capitalize",
      color: "gray",
      backgroundColor: "#f3f6f9",
    }}
    {...props}
  />
);

const DataCell = (props) => (
  <TableCell
    className={poppins.className}
    sx={{
      fontSize: "13px",
      whiteSpace: "nowrap",
      color: "black",
      textTransform: "capitalize",
    }}
    {...props}
  />
);

const PackageCompanyCount = () => {
  const { data } = useGetAllPackages();

  return (
    <CustomCard>
      <Box>
        <Box display="flex" p={2} justifyContent="space-between" mb={2}>
          <Typography
            className={poppins.className}
            sx={{ fontSize: "16px", fontWeight: "500", color: "black" }}
          >
            Package Company Count
          </Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <HeaderCell>#</HeaderCell>
              <HeaderCell>Name</HeaderCell>
              <HeaderCell>Total Companies</HeaderCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.results.map((packagedata, index) => (
              <TableRow key={packagedata.id}>
                <DataCell>{index + 1}</DataCell>
                <DataCell>{packagedata.name || 'N/A'}</DataCell>
                <DataCell>{packagedata.total_companies || 'N/A'}</DataCell>
             
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </CustomCard>
  );
};

export default PackageCompanyCount;
