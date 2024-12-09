import React, { useState } from 'react';
import { Tabs, Tab, Grid, Typography, Box } from '@mui/material';
import { Poppins } from "next/font/google";
import ForgotPassword from './ForgotPassword';
import Signup from './Signup';
import Query from './Query';
import TicketRaised from './TicketRaised';
import AccountSuspension from './AccountSuspension';
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const AdminMailTemplatesTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            className={poppins.className}
            label="Signup"
            sx={{ textTransform: 'none' }}  
          />
          <Tab
            className={poppins.className}
            label="Query"
            sx={{ textTransform: 'none' }}
          />
          <Tab
            className={poppins.className}
            label="Forgot Password"
            sx={{ textTransform: 'none' }}
          />
          <Tab
            className={poppins.className}
            label="Ticket Raised"
            sx={{ textTransform: 'none' }}
          />
          <Tab
            className={poppins.className}
            label="Account Suspension"
            sx={{ textTransform: 'none' }}
          />
        </Tabs>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Box p={2}>
          {activeTab === 0 && <Signup /> }
          {activeTab === 1 && <Query /> }
          {activeTab === 2 && <ForgotPassword />}
          {activeTab === 3 && <TicketRaised /> }
          {activeTab === 4 && <AccountSuspension /> }
        </Box>
      </Grid>
    </Grid>
  );
};

export default AdminMailTemplatesTabs;
