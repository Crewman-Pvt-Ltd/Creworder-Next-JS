import React from "react";
import { Grid } from "@mui/material";
import Layout from "@/components/Layout";
import NDRPerformance from "@/components/performance/NDRPerformance";

const index = () => {
  return (
    <Layout>
      <Grid>
        <NDRPerformance />
      </Grid>
    </Layout>
  );
};

export default index;