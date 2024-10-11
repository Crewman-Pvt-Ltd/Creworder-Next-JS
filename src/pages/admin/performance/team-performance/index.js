import React from "react";
import { Grid } from "@mui/material";
import Layout from "@/components/Layout";
import TeamPerformance from "@/components/performance/TeamPerformance";
const index = () => {
  return (
    <Layout>
      <Grid>
        <TeamPerformance />
      </Grid>
    </Layout>
  );
};

export default index;
