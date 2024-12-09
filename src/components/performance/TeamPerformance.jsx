import React, { useState, useEffect } from "react";
import {
  Grid,
  MenuItem,
  Select,
  Typography,
  Box,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  TableFooter,
  TablePagination,
  TextField,
} from "@mui/material";
import CustomCard from "../CustomCard";
import CustomLabel from "../CustomLabel";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useGetAllBranches from "@/api-manage/react-query/useGetAllBranches";

const TeamPerformance = () => {
  const { data } = useGetAllBranches();
  const [startDate, setStartDate] = useState(dayjs(null));
  const [endDate, setEndDate] = useState(dayjs(null));
  const [team, setTeam] = useState(1);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    if (data?.results?.length) {
      // Set default selected branch to the first branch in the data
      setSelectedBranch(data.results[0].name);
    }
  }, [data]);

  useEffect(() => {
    setFilteredRows(teamData[team]);
    setPage(0);
  }, [team]);

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const handleTeamChange = (event) => {
    setTeam(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const teamData = {
    1: [
      {
        id: 1,
        name: "Alice",
        targets: "20",
        running_orders: "3",
        acpt_count: "2",
        acpt_sum: "7",
        acpt_pct: "10%",
        crt_acpt_asv: "23",
        total_orders: "12",
      },
    ],
    2: [
      {
        id: 3,
        name: "Charlie",
        targets: "10",
        running_orders: "4",
        acpt_count: "3",
        acpt_sum: "8",
        acpt_pct: "10%",
        crt_acpt_asv: "23",
        total_orders: "20",
      },
      {
        id: 4,
        name: "David",
        targets: "13",
        running_orders: "5",
        acpt_count: "4",
        acpt_sum: "9",
        acpt_pct: "10%",
        crt_acpt_asv: "23",
        total_orders: "15",
      },
    ],
    3: [
      {
        id: 5,
        name: "Eva",
        targets: "21",
        running_orders: "6",
        acpt_count: "5",
        acpt_sum: "10",
        acpt_pct: "10%",
        crt_acpt_asv: "23",
        total_orders: "22",
      },
      {
        id: 6,
        name: "Frank",
        targets: "17",
        running_orders: "7",
        acpt_count: "6",
        acpt_sum: "11",
        acpt_pct: "10%",
        crt_acpt_asv: "23",
        total_orders: "8",
      },
    ],
  };

  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={12}>
        <CustomCard>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12}>
              <Typography sx={{
                fontWeight:"bold",
                fontSize:"18px",
              }}>Team Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <CustomLabel htmlFor="select_branch" required>
                Branch
              </CustomLabel>
              <Select
                labelId="select_branch"
                id="select_branch"
                value={selectedBranch}
                onChange={handleBranchChange}
                displayEmpty
                sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                fullWidth
              >
                {data?.results?.map((branch) => (
                  <MenuItem key={branch.id} value={branch.name}>
                    {branch.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={3}>
              <CustomLabel htmlFor="select_team" required>
                Select Team Leader
              </CustomLabel>
              <Select
                labelId="select_team"
                id="select_team"
                value={team}
                onChange={handleTeamChange}
                displayEmpty
                sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                fullWidth
              >
                <MenuItem value={1}>TL 1</MenuItem>
                <MenuItem value={2}>TL 2</MenuItem>
                <MenuItem value={3}>TL 3</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CustomLabel htmlFor="start_date" required>
                  Start Date
                </CustomLabel>
                <DatePicker
                  value={startDate}
                  onChange={handleStartDateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#212121",
                          height: "45px",
                        },
                        "& .MuiFormLabel-root.Mui-error": {
                          color: "#212121",
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CustomLabel htmlFor="end_date" required>
                  End Date
                </CustomLabel>
                <DatePicker
                  value={endDate}
                  onChange={handleEndDateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#212121",
                          height: "45px",
                        },
                        "& .MuiFormLabel-root.Mui-error": {
                          color: "#212121",
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
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
            }}
          >
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                      Sr. No.
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                      Agent
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                      Targets
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                      Running Orders
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                      Accepted Count
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                      Accepted Sum
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                      Accepted Percentage
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                      Current Accepted ASV
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                      Total Orders
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell sx={{ whiteSpace: "nowrap" }}>
                          {page * rowsPerPage + index + 1}.
                        </TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap" }}>
                          {row.name}
                        </TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap" }}>
                          {row.targets}
                        </TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap" }}>
                          {row.running_orders}
                        </TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap" }}>
                          {row.acpt_count}
                        </TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap" }}>
                          {row.acpt_sum}
                        </TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap" }}>
                          {row.acpt_pct}
                        </TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap" }}>
                          {row.crt_acpt_asv}
                        </TableCell>
                        <TableCell sx={{ whiteSpace: "nowrap" }}>
                          {row.total_orders}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[7, 14, 21]}
                  colSpan={3}
                  count={filteredRows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Box>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default TeamPerformance;
