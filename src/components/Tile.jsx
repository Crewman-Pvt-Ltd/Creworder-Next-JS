import React from "react";
import { Grid, Typography } from "@mui/material";

import CustomCard from "./CustomCard";

const Tile = () => {
  return (
    <CustomCard>
      <Grid container direction="column" spacing={2} sx={{
        margin: 1,
        height:"120px",
      }}>
        <Grid item  sx={{ color: "rgb(240 101 72)" }}>
          
          <Typography variant="body2" sx={{ }}>
         Total Companies
          </Typography>
        </Grid>

        <Grid item>
          <Typography
            variant="body2"
            sx={{
              textDecoration: "underline",
              color: "rgb(68 81 137)",
              cursor: "pointer",
              marginLeft: 3,
            }}
          >
          7
          </Typography>
          
        </Grid>
      </Grid>
    </CustomCard>
  );
};

export default Tile;
