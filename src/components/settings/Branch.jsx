import React from "react";

import { Grid } from "@mui/material";

import BranchList from "../branch/BranchList";

const Branch = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <BranchList />
      </Grid>
    </Grid>
  );
};

export default Branch;
