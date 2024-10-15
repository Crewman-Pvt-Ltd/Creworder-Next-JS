import React from "react";
import { Grid } from "@mui/material";
import Layout from "@/components/Layout";

import AddressVerification from "@/components/performance/AddressVerification";
const index = () => {
  return (
    <Layout type="admin">
      <Grid>
        <AddressVerification />
      </Grid>
    </Layout>
  );
};

export default index;
