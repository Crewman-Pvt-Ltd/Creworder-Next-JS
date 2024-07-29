import React from "react";
import CustomCard from "./CustomCard";
import useGetAllCompanies from "@/api-manage/react-query/useGetAllCompanies";
import useGetAllPackages from "@/api-manage/react-query/useGetAllPackages";
import { Poppins } from "next/font/google";
import {
  Box,Table,TableHead,TableBody,TableRow,TableCell,Avatar,Typography,} from "@mui/material";

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

const configuration = {
  newlyRegistered: {
    title: "Newly Registered Companies",
    headers: ["#", "Company Name", "Packages", "Date"],
    mapRow: ({ id, name, packages, created_at }, index) => ({
      id,
      name,
      packages: packages || "N/A",
      date: created_at ? new Date(created_at).toLocaleDateString() : "N/A",
    }),
  },
  mostUsers: {
    title: "Companies with Most Users",
    headers: ["#", "Company Name", "Total Users", "Employees", "Clients"],
    mapRow: ({ id, name, total_users, employees, clients }, index) => ({
      id,
      name,
      totalUsers: total_users || "N/A",
      employees: employees || "N/A",
      clients: clients || "N/A",
    }),
  },
  recentExpired: {
    title: "Recent Licence Expired Companies",
    headers: ["#", "Name", "Packages", "Expiry Date"],
    mapRow: ({ id, name, packages, expiryDate }) => ({
      id,
      name,
      packages: packages || "N/A",
      expiryDate: expiryDate || "N/A",
    }),
  },
  recentPaid: {
    title: "Recent Paid Subscriptions",
    headers: ["#", "Name", "Packages", "Payment Date"],
    mapRow: ({ id, name, packages, paymentDate }) => ({
      id,
      name,
      packages: packages || "N/A",
      paymentDate: paymentDate || "N/A",
    }),
  },
  packageCompanyCount: {
    title: "Package Company Count",
    headers: ["#", "Name", "Total Companies"],
    mapRow: ({ id, name, total_companies }) => ({
      id,
      name: name || "N/A",
      totalCompanies: total_companies || "N/A",
    }),
  },
};

const CompanyDetailsdashboard = ({ type }) => {
  const { data, isLoading, isError } = type === "packageCompanyCount"
    ? useGetAllPackages()
    : useGetAllCompanies();

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading data</Typography>;

  const { title, headers, mapRow } = configuration[type] || {};
  if (!title) return null;

  const rows = data?.map(mapRow);

  return (
    <CustomCard>
      <Box>
        <Box display="flex" p={2} justifyContent="space-between" mb={2}>
          <Typography className={poppins.className} sx={{ fontSize: "16px", fontWeight: "500" }}>
            {title}
          </Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map(header => (
                <HeaderCell key={header}>{header}</HeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <DataCell>{index + 1}</DataCell>
                <DataCell>
                  <Box display="flex" alignItems="center">
                    <Avatar src={row.avatar} alt={row.name} sx={{ width: "30px", height: "30px" }} />
                    <Typography className={poppins.className} sx={{ fontSize: "12px", ml: 1 }}>
                      {row.name}
                    </Typography>
                  </Box>
                </DataCell>
                <DataCell>{row.packages || row.totalUsers || row.totalCompanies || "N/A"}</DataCell>
                {type === "newlyRegistered" && <DataCell>{row.date}</DataCell>}
                {type === "mostUsers" && <>
                  <DataCell>{row.employees || "N/A"}</DataCell>
                  <DataCell>{row.clients || "N/A"}</DataCell>
                </>}
                {type === "recentExpired" && <DataCell>{row.expiryDate || "N/A"}</DataCell>}
                {type === "recentPaid" && <DataCell>{row.paymentDate || "N/A"}</DataCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </CustomCard>
  );
};

export default CompanyDetailsdashboard;
