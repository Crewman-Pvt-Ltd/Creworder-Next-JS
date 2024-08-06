import React from "react";
import CustomCard from "./CustomCard";
import { Grid, Typography, Button, Box } from "@mui/material";
import { Poppins } from "next/font/google";
import { Share } from "@mui/icons-material"; // Example icon

const poppins = Poppins({
  weight: "300",
  subsets: ["latin"],
});

const ReferalInvite = () => {
  return (
    <CustomCard>
      <Grid container spacing={2} sx={{ backgroundColor: "#fcece8", p: 2 }}>
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Box
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Share />
              </Box>
            </Grid>
            <Grid item xs>
              <Typography
                variant="h6"
                sx={{
                  mb: 1,
                  fontSize: "16px",
                  fontWeight: "bold",
                  fontFamily: poppins.style.fontFamily,
                }}
              >
                Invite your friends to Velzon
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "#9e9e9d",
                  fontWeight:"bold",
                  fontFamily: poppins.style.fontFamily,
                }}
              >
                The release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus
                PageMaker including versions of Lorem Ipsum.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{
            display:"flex",
            justifyContent:"right",
        }}>
          <Button
            sx={{
              backgroundColor: "#f77e28",
              color: "white",
            }}
          >
            Invite Friends
          </Button>
        </Grid>
      </Grid>
    </CustomCard>
  );
};

export default ReferalInvite;
