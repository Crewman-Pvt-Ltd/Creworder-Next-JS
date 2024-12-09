import React from "react";
import { Grid } from "@mui/material";
import Layout from "@/components/Layout";
import AgentPerformance from "@/components/performance/AgentPerformance";
const index = () => {
  return (
    <Layout type="admin">
      <Grid>
        <AgentPerformance />
      </Grid>
    </Layout>
  );
};

export default index;
