import React, { useState, useEffect } from "react";
import {
  Grid,
  MenuItem,
  Select,
  Typography,
  Box,
  TextField,
  Paper,
  Button,
} from "@mui/material";
import CustomCard from "../CustomCard";
import CustomLabel from "../CustomLabel";
import { styled } from "@mui/system";
import TotalOrderIcon from "@mui/icons-material/Assignment";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";
import TotalLeadIcon from "@mui/icons-material/People";
import AcceptIcon from "@mui/icons-material/CheckCircle";
import ArrowCircleUpTwoToneIcon from "@mui/icons-material/ArrowCircleUpTwoTone";
import RejectedIcon from "@mui/icons-material/Cancel";
import NoResponseIcon from "@mui/icons-material/QuestionAnswer";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useGetAllBranches from "@/api-manage/react-query/useGetAllBranches";
import ArrowCircleDownTwoToneIcon from "@mui/icons-material/ArrowCircleDownTwoTone";

const AddressVerification = () => {
  const { data } = useGetAllBranches();
  const [startDate, setStartDate] = useState(dayjs(null));
  const [endDate, setEndDate] = useState(dayjs(null));
  const [team, setTeam] = useState(1);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [showTiles, setShowTiles] = useState(false); 

  useEffect(() => {
    if (data?.results?.length) {
      setSelectedBranch(data.results[0].name);
    }
  }, [data]);

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const handleTeamChange = (event) => {
    setTeam(event.target.value);
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const handleGetDataClick = () => {
    if (selectedBranch && team && startDate?.isValid() && endDate?.isValid()) {
      setShowTiles(true);
    } else {
      alert("Please fill in all fields.");
      setShowTiles(false);
    }
  };

  const Counter = ({ target }) => {
    const [count, setCount] = useState(0);
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / target));

    useEffect(() => {
      const timer = setInterval(() => {
        setCount((prev) => {
          if (prev < target) {
            return Math.min(prev + 1, target);
          } else {
            clearInterval(timer);
            return prev;
          }
        });
      }, stepTime);

      return () => clearInterval(timer);
    }, [target, stepTime]);

    return <span style={{ marginLeft: "20px" }}>{count}</span>;
  };

  const Tile = styled(Paper)(() => ({
    padding: "16px",
    textAlign: "center",
    color: "#000",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "100px",
    fontWeight: "bold",
  }));

  const tilesData = [
    {
      title: "Running Order",
      count: 300,
      bgcolor: "#1f8224",
      icon: <TotalOrderIcon />,
      trend: "up",
    },
    {
      title: "Accepted",
      count: 130,
      bgcolor: "#502894",
      icon: <ModeStandbyIcon />,
      trend: "down",
    },
    {
      title: "Rejected",
      count: 180,
      bgcolor: "#3682a3",
      icon: <TotalLeadIcon />,
      trend: "up",
    },
    {
      title: "Delivered",
      count: 205,
      bgcolor: "#2b8079",
      icon: <AcceptIcon />,
      trend: "up",
    },
    {
      title: "Pending",
      count: 102,
      bgcolor: "#9c1209",
      icon: <RejectedIcon />,
      trend: "down",
    },
    {
      title: "No Response",
      count: 500,
      bgcolor: "#a89d38",
      icon: <NoResponseIcon />,
      trend: "up",
    },
  ];

  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={12}>
        <CustomCard>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                Address Verification
              </Typography>
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
                User
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
                <MenuItem value={1}>User 1</MenuItem>
                <MenuItem value={2}>User 2</MenuItem>
                <MenuItem value={3}>User 3</MenuItem>
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
                        "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                          {
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
                        "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                          {
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
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              display="flex"
              justifyContent="flex-end"
            >
              <Button
                onClick={handleGetDataClick}
                sx={{
                  backgroundColor: "#405987",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#405987",
                  },
                }}
              >
                Get Data
              </Button>
            </Grid>
          </Grid>
        </CustomCard>
      </Grid>
      {showTiles &&
        tilesData.map((tile, index) => (
          <Grid item xs={2} sm={2} md={2} key={index}>
            <Tile
              elevation={0}
              style={{ boxShadow: "none" }}
              bgcolor={tile.bgcolor}
            >
              <Typography
                variant="body1"
                style={{
                  textAlign: "left",
                  marginBottom: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {tile.title}
                {tile.trend === "up" ? (
                  <ArrowCircleUpTwoToneIcon
                    style={{ color: "green", fontSize: "20px" }}
                  />
                ) : (
                  <ArrowCircleDownTwoToneIcon
                    style={{ color: "red", fontSize: "20px" }}
                  />
                )}
              </Typography>
              <Typography
                variant="h6"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {tile.count}
              </Typography>
            </Tile>
          </Grid>
        ))}
    </Grid>
  );
};

export default AddressVerification;
