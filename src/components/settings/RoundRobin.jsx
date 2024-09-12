import React, { useState } from "react";
import { Grid, FormControlLabel, Switch, Typography, Box } from "@mui/material";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const RoundRobin = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <Grid container spacing={2}>
      {/* Switch and Title */}
      <Grid item xs={12} container alignItems="center">
        <FormControlLabel
          control={
            <Switch
              checked={isChecked}
              onChange={handleChange}
              color="primary"
            />
          }
        />
        <Typography className={poppins.className} sx={{ }}>
          Round Robin
        </Typography>
      </Grid>

      {/* Information Box */}

      <Grid item xs={12}>
        <Box
          sx={{
            backgroundColor: "#FFF3CD",
            border: "1px solid #FFEEBA",
            padding: 2,
            borderRadius: 1,
            marginTop: 2,
          }}
        >
          <Typography
            className={poppins.className}
            variant="subtitle1"
            sx={{ fontWeight:"600", color:"#836201", marginBottom: 1 }}
          >
            Information:
          </Typography>
          <Typography
            className={poppins.className}
            variant="body2"
            sx={{fontWeight:"600", color:"#836201", marginBottom: 1 }}
          >
            Round-Robin Method
          </Typography>
          <Typography
            className={poppins.className}
            variant="body2"
            sx={{fontWeight:"400", marginBottom: 1, color:"#836201" }}
          >
            • <b>Equal Distribution:</b> Tasks are evenly distributed among team
            members.
          </Typography>
          <Typography
            className={poppins.className}
            variant="body2"
            sx={{ fontWeight:"400",marginBottom: 1, color:"#836201" }}
          >
            • <b>Sequential Assignment:</b> Each task is assigned to the next
            team member in order.
          </Typography>
          <Typography
            className={poppins.className}
            variant="body2"
            sx={{ fontWeight:"400",color:"#836201", marginBottom: 1 }}
          >
            • <b>Fair Rotation:</b> Ensures balanced workloads and prevents
            overload.
          </Typography>
          <Typography
            className={poppins.className}
            variant="body2"
            sx={{ color:"#836201", marginTop: 1 }}
          >
            Example: Lead goes to Agent A, then B, then C, and repeat.
          </Typography>
          <Typography
            className={poppins.className}
            variant="body2"
            sx={{fontWeight:"400", color:"#836201", marginTop: 1 }}
          >
            Example: In a customer support system, incoming leads are assigned
            in a round-robin fashion. The first lead goes to Agent A, the second
            to Agent B, the third to Agent C, and the fourth back to Agent A,
            continuing in this pattern. Using the round-robin method ensures
            fair and efficient task distribution, promotes balanced workloads,
            and streamlines resource management.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RoundRobin;
