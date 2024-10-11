import React from "react";
import { Grid } from "@mui/material";
import Layout from "@/components/Layout";
import BranchPerformance from "@/components/performance/BranchPerformance";


const index = () => {
  return (
    <Layout>
      <Grid>
        <BranchPerformance />
      </Grid>
    </Layout>
  );
};

export default index;
