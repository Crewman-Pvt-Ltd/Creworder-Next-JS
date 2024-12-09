

import React, { useState } from 'react';
import CustomCard from '../CustomCard';
import { Poppins } from 'next/font/google';
import { Box, Tabs, CardContent, Tab, Divider } from '@mui/material';


import SourceIcon from '@mui/icons-material/Source'; 
import PipelineIcon from '@mui/icons-material/ShowChart'; 
import AgentIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category'; 

import LeadSource from './LeadSource'; 
import Pipeline from './Pipeline';
import DealAgent from './DealAgent';
import DealCategory from './DealCategory';
import RoundRobin from './RoundRobin';
import LeadStatus from './LeadStatus';

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const LeadSettings = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <CustomCard>
        <CardContent>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            textColor="primary"
            indicatorColor="primary"
            sx={{ 
              '& .MuiTab-root': {
                textTransform: 'none', 
                fontWeight: 'normal', 
              },
              '& .Mui-selected': {
                fontWeight: 'bold',
                color: '#405189', 
              },
              '& .MuiTab-iconWrapper': {
                color: '#405189', 
              },
              '& .MuiTab-textColorPrimary': {
                color: '#405189', 
              },
            }}
          >
            <Tab 
              className={poppins.className} 
              label="Lead Source" 
              icon={<SourceIcon />} 
              iconPosition="start" 
            />
            <Tab 
              className={poppins.className} 
              label="Pipeline" 
              icon={<PipelineIcon />} 
              iconPosition="start" 
            />
            <Tab 
              className={poppins.className} 
              label="Deal Agent" 
              icon={<AgentIcon />} 
              iconPosition="start" 
            />
            <Tab 
              className={poppins.className} 
              label="Deal Category" 
              icon={<CategoryIcon />} 
              iconPosition="start" 
            />
             <Tab 
              className={poppins.className} 
              label="Round Robin" 
              icon={<CategoryIcon />} 
              iconPosition="start" 
            />
              <Tab 
              className={poppins.className} 
              label="Lead Status" 
              icon={<CategoryIcon />} 
              iconPosition="start" 
            />
          </Tabs>
          <Divider sx={{ my: 2 }} />

          {activeTab === 0 && <LeadSource />} 

          {activeTab === 1 && <Pipeline />}

          {activeTab === 2 && <DealAgent />}

          {activeTab === 3 && <DealCategory />}

          {activeTab === 4 && <RoundRobin />}

          {activeTab === 5 && <LeadStatus />}
        </CardContent>
      </CustomCard>
    </Box>
  );
};

export default LeadSettings;
