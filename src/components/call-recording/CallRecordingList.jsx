import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  MenuItem,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  Box,
  IconButton,
  TableFooter,
  TablePagination,
  FormControl,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import CallIcon from "@mui/icons-material/Call";
import CustomLabel from "../CustomLabel";
import CustomTextField from "../CustomTextField";
import CustomCard from "../CustomCard";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";
import { DateRangePicker } from "@nextui-org/date-picker";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});
const CallRecordingList = () => {
  const router = useRouter();

  const rows = [
    {
      id: 1,
      call_id: "CALL98765",
      phone: "9876543210",
      type: "Inbound",
      duration: "10:00",
      status: "Pending",
      payment_mode: "COD",
      created_date: "2024-08-01",    
      action: "Edit",
    },
  ];

  return (
    <Grid container spacing={2} p={3}>
      
      <Grid item xs={12}>
        <CustomCard padding="13px">
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
               Call Recording
              </Typography>
            </Grid><br></br>
          <Grid
            container
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
          >
          
            <Grid item xs={12} sm={4}>
              <CustomLabel htmlFor="phone" >
                Customer Phone No.
              </CustomLabel>
              <CustomTextField
                id="phone"
                name="phone"
                placeholder="e.g. 9876543221"
                type="text"
                fullWidth
                sx={{ fontFamily: poppins.style.fontFamily }}
              />
            </Grid>

            <Grid item xs={12} sm={5} style={{ backgroundColor: "#fff" }}>
              <CustomLabel htmlFor="dateRange">
                Date Range
              </CustomLabel>
              <DateRangePicker 
                visibleMonths={1} 
                style={{
            
                  backgroundColor: '#fff',
                }}
                popoverProps={{
                  style: {
                    backgroundColor: '#fff', 
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                sx={{
                  marginTop: "24px",
                  padding: "8px 16px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  backgroundColor: "#405189",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#334a6c",
                  },
                  fontFamily: poppins.style.fontFamily,
                }}
              >
                Search Data
              </Button>
              
            </Grid>           
          </Grid>
        </CustomCard>
      </Grid>

      <Grid item xs={12}>
        <CustomCard>
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "auto 1fr auto",
              maxHeight: "400px",
            }}
          >
            <TableContainer
              component={Paper}
              sx={{ overflowY: "auto", maxHeight: "340px" }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>Sr.</TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Call ID
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Phone Number
                    </TableCell>                   
                    <TableCell sx={{ whiteSpace: "nowrap" }}>Type</TableCell>
                   
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Duration
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Created Date
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      Play/ Download
                    </TableCell>                   
                    <TableCell sx={{ whiteSpace: "nowrap" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.id}.
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.call_id}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.phone}
                      </TableCell>                     
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.type}
                      </TableCell>   
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.duration}
                      </TableCell>                     
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        {row.created_date}
                      </TableCell>
                      
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <IconButton aria-label="call" sx={{ color: "green" }}>
                          <PlayArrowIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <IconButton aria-label="edit" sx={{ color: "#007BFF" }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          sx={{ color: "#FF0000" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50]}
                  colSpan={12}
                  count={rows.length}
                  rowsPerPage={10}
                  page={0}
                  onPageChange={() => {}}
                  onRowsPerPageChange={() => {}}
                />
              </TableRow>
            </TableFooter>
          </Box>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default CallRecordingList;
