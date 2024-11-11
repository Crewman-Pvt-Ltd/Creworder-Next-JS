import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { Grid, Typography, styled, Button } from "@mui/material";
import Tile from "../Tile";
import TopSellers from "../TopSellers";
import TeamOrderLead from "../TeamOrderLead";
import InvoicesChart from "../InvoicesChart";
import Charttwo from "../Charttwo";
import ReferalInvite from "../ReferalInvite";
import ChartThree from "../ChartThree";
import UpgradeAccount from "../UpgradeAccount";
import ScheduleOrderChart from "../ScheduleOrderChart";
import Checklist from "../Checklist";
import { DateRangePicker } from "@nextui-org/date-picker";
import Banner from "../banner/Banner";
import Flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
const AdminDashboard = () => {
  const dateRef = useRef(null);

  useEffect(() => {
    
    const today = new Date();

    
    const flatpickrInstance = Flatpickr(dateRef.current, {
      mode: "range",
      dateFormat: "d M, Y", 
      defaultDate: [today, today], 
    });

    return () => {
    
      flatpickrInstance.destroy();
    };
  }, []);


  const tilesTypes = ["Running Order", "Pending", "Repeat Order", "Rejected"];
  const tiles = [
    "Running",
    "intransit",
    "Accepted",
    "noresponse",
    "total",
    "future",
    "noresponse",
    "intransit",
    "delivered",
    "rto",
  ];
  const LightButton = styled(Button)({
    backgroundColor: "#cc0e0e",
    "&:hover": {
      backgroundColor: "#cc0e0e",
    },
  });

  const currentHour = new Date().getHours();
  let greeting;
  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  const typetiles = ["Running", "intransit", "Accepted", "noresponse"];

 

  return (
    <Grid
      container
      direction="column"
      spacing={3}
      sx={{
        padding: 2,
      }}
    >
      <Grid item xs={12} sm={12} md={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={8}>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "600",
                    margin: 0,
                    color: "#495057",
                  }}
                >
                  {greeting}, Admin!
                </Typography>
                <Typography
                  sx={{
                    fontSize: "13px",
                    color: "gray",
                    margin: 0,
                    paddingTop: 0,
                  }}
                >
                  Here's what's happening with your store today.
                </Typography>
              </Grid>

              <Grid item xs={12} sm={10} md={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={8}>
                    <div
                      style={{
                        padding: "8px",
                        borderRadius: "4px",
                        position: "relative",
                        backgroundColor: "#fff",
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
                          fontSize:"15px",
                          border: "none", 
                          outline: "none", 
                        }}
                        onFocus={(e) => {
                          e.target.style.border = "none"; 
                          e.target.style.outline = "none"; 
                        }}
                        onBlur={(e) => {
                          e.target.style.border = "none"; 
                          e.target.style.outline = "none"; 
                        }}
                      />

                      <CalendarMonthIcon
                        style={{
                          position: "absolute",
                          top: "50%",
                          transform: "translateY(-50%)",
                          fontSize: "35px",
                          color: "white",
                          // width:"35px",
                          // height:"35px",
                          right: "1px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          backgroundColor: "#405189",
                          padding: "4px",
                        }}
                      />
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <LightButton
                      variant="contained"
                      sx={{
                        padding: "10px",
                      }}
                    >
                      ClockIn
                    </LightButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Banner />
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
            <Grid container spacing={3}>
              <Grid item>
                <UpgradeAccount />
              </Grid>
              {tilesTypes.map((type, index) => (
                <Grid item xs={12} sm={6} md={6} key={index}>
                  <Tile height="130px" padding="10px 10px" type={type} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <InvoicesChart />
          </Grid>
          <Grid item xs={12} md={3} sm={12}>
            <Charttwo />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container spacing={1}>
          {tiles.map((type, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={index} mt={1}>
              <Tile height="120px" padding="20px 20px" type={type} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={5}>
            <Grid container spacing={1}>
              {typetiles.map((type, index) => (
                <Grid item xs={12} sm={6} md={6} key={index}>
                  <Tile height="130px" padding="20px 20px" type={type} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={3} sm={12}>
            <ScheduleOrderChart />
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <ReferalInvite />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={5}>
            <ChartThree />
          </Grid>
          <Grid item xs={12} md={7} sm={12}>
            <TopSellers />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TeamOrderLead />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;
