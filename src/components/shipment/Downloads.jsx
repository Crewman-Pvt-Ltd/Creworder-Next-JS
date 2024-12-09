import React, { useState } from "react";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import CustomCard from "../CustomCard";

const Downloads = () => {
  const rows = [
    {
      id: 1,
      file_name: "MANIFEST987",
      downloaded_by: "Agent 1",
      date: "2024-08-27",
      time: "11.11 pm",
    },
  ];

  const [selectedRows, setSelectedRows] = useState([]);

  const isRowSelected = (id) => selectedRows.includes(id);

  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={12}>
        <CustomCard>
          <div
            style={{
              display: "grid",
              gridTemplateRows: "auto 1fr auto",
              maxHeight: "400px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "20px",
                whiteSpace: "nowrap",
                textTransform: "capitalize",
                color: "black",
                margin: "20px",
              }}
            >
              Downloads
            </Typography>

            {/* Table */}
            <TableContainer
              component={Paper}
              sx={{ overflowY: "auto", maxHeight: "340px" }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell className="tablehead">Sr.</TableCell>
                    <TableCell className="tablehead">File Name</TableCell>
                    <TableCell className="tablehead">Downloaded By</TableCell>
                    <TableCell className="tablehead"> Date</TableCell>
                    <TableCell className="tablehead">Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.id}
                      selected={isRowSelected(row.id)}
                      sx={{
                        "&.Mui-selected": { backgroundColor: "#e0e0e0" },
                      }}
                    >
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.file_name}</TableCell>
                      <TableCell>{row.downloaded_by}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default Downloads;
