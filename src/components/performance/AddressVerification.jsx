import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  MenuItem,
  Select,
  Typography,
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

import dayjs from "dayjs";
import useGetAllBranches from "@/api-manage/react-query/useGetAllBranches";
import ArrowCircleDownTwoToneIcon from "@mui/icons-material/ArrowCircleDownTwoTone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const AddressVerification = () => {
  const dateRef = useRef(null);
  const { data } = useGetAllBranches();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [team, setTeam] = useState(1);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [showTiles, setShowTiles] = useState(false);

  useEffect(() => {
    // Initialize Flatpickr
    const today = new Date();
    const flatpickrInstance = Flatpickr(dateRef.current, {
      mode: "range",
      dateFormat: "d M, Y",
      defaultDate: [today, today],
      onChange: (selectedDates) => {
        if (selectedDates.length === 2) {
          setStartDate(dayjs(selectedDates[0]));
          setEndDate(dayjs(selectedDates[1]));
        }
      },
    });

    return () => {
      flatpickrInstance.destroy();
    };
  }, []);

  useEffect(() => {
    if (data?.results?.length) {
      setSelectedBranch(data.results[0].name);
    }
  }, [data]);

  const handleTeamChange = (event) => {
    setTeam(event.target.value);
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const handleGetDataClick = () => {
    if (selectedBranch && team && startDate && endDate) {
      setShowTiles(true);
    } else {
      alert("Please fill in all fields.");
      setShowTiles(false);
    }
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
              <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
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
            <Grid item xs={12} sm={6} md={3} mt={2}>
              <div
                style={{
                  padding: "8px",
                  borderRadius: "4px",
                  position: "relative",
                  backgroundColor: "#fff",
                  border: "2px solid gray",
                  marginTop: 5,
                }}
              >
                <input
                  ref={dateRef}
                  type="text"
                  placeholder="Select date range"
                  style={{
                    padding: "5px",
                    borderRadius: "4px",
                    color: "#333",
                    width: "100%",
                    height: "20px",
                    fontSize: "15px",
                  }}
                />
                <CalendarMonthIcon
                  style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "35px",
                    color: "white",
                    right: "1px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    backgroundColor: "#405189",
                    padding: "4px",
                  }}
                  onClick={() => dateRef.current.focus()}
                />
              </div>
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
            <Tile elevation={0} bgcolor={tile.bgcolor}>
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
