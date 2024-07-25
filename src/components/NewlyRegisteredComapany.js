import React from "react";
import CustomCard from "./CustomCard";
import useGetAllCompanies from "@/api-manage/react-query/useGetAllCompanies";
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

const NewlyRegisteredCompany = () => {
  const { data } = useGetAllCompanies();

  return (
    <CustomCard>
      <Box>
        <Box display="flex" p={2} justifyContent="space-between" mb={2}>
          <Typography
            className={poppins.className}
            sx={{ fontSize: "16px", fontWeight: "500", color: "black" }}
          >
            Newly Registered Companies
          </Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <HeaderCell>#</HeaderCell>
              <HeaderCell>Company Name</HeaderCell>
              <HeaderCell>Packages</HeaderCell>
              <HeaderCell>Date</HeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((companydata, index) => (
              <TableRow key={companydata.id}>
                <DataCell>{index + 1}</DataCell>
                <DataCell>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      src={companydata.avatar}
                      alt={companydata.name}
                      sx={{ width: "30px", height: "30px" }}
                    />
                    <Typography
                      className={poppins.className}
                      sx={{ fontSize: "12px", marginLeft: "6px" }}
                    >
                      {companydata.name}
                    </Typography>
                  </Box>
                </DataCell>
                <DataCell>{companydata.payment_mode || 'N/A'}</DataCell>
                <DataCell>{companydata.created_at || 'N/A'}</DataCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </CustomCard>
  );
};

export default NewlyRegisteredCompany;
