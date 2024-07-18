import React, { useState } from 'react';
import Navitem from './Navitem';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PackageIcon from '@mui/icons-material/LocalOffer';
import CompanyIcon from '@mui/icons-material/Business';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Image from 'next/image';
import creworderLogo from '../images/creworderlogo.png';
import creworderIcon from '../images/crewordericon.png';

const workItems = [
  { name: 'Contracts', icon: <SupervisedUserCircleIcon /> },
  { name: 'Projects', icon: <SupervisedUserCircleIcon /> }
];
const financeItems = [
  { name: 'Proposal', icon: <SupportAgentIcon /> },
  { name: 'Invoices', icon: <SupportAgentIcon /> }
];

const HoverableNavItem = ({ isOpen, name, icon, children, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const [hoveredItemPosition, setHoveredItemPosition] = useState({ top: 0 });

  const handleMouseEnter = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHovered(true);
    setHoveredItemPosition({ top: rect.top });
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <Navitem name={isOpen ? name : ''} icon={icon}>
        {children}
      </Navitem>
      {!isOpen && hovered && (
        <Box
          sx={{
            position: 'fixed',
            left: '70px',
            top: hoveredItemPosition.top + 'px',
            backgroundColor: '#fff',
            color: '#405189',
            padding: '8px 16px',
            borderRadius: '4px',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
            zIndex: 1,
          }}
        >
          <Typography variant="body2">{name}</Typography>
        </Box>
      )}
    </Box>
  );
};

const Sidebar = ({ isOpen }) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleItemClick = (path) => {
    if (path) {
      router.push(path);
    }
  };
  const logoStyle = {
    margin: '10px',
    width: '200px',
    height: 'auto',
    cursor: 'pointer',
  };

  return (
    <Box
      sx={{
        width: isOpen ? 220 : 70,
        backgroundColor: '#405189',
        padding: 2,
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        // height: '100vh',
        display: 'flex',
        borderRadius :'20px',
        margin:'10px 10px',
        marginBottom:"20px",
        flexDirection: 'column',
        overflowY: 'auto',
        color: 'white',
        transition: 'width 0.3s ease',
        "&::-webkit-scrollbar": {
          width: '6px',
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: '#c9c9c9',
          borderRadius: '10px',
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: '#405189',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 2,
        }}
      >
        <Image
          src={creworderLogo}
          alt="Creworder Logo"
          width={isOpen ? 150 : 40}
          height={isOpen ? 50 : 20}
        />
        {!isOpen && !isMobile && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 1, 
            }}
          >
            <Image
              src={creworderIcon}
              alt="Creworder Icon"
              width={30}
              height={30}
            />
          </Box>
        )}
      </Box>
      
      <Box
        sx={{
          overflowY: 'auto',  
          scrollbarWidth: 'none',  
          '&::-webkit-scrollbar': {
            display: 'none',  
          },
        }}
      >
        <HoverableNavItem
          isOpen={isOpen}
          name="Dashboard"
          icon={<DashboardIcon />}
          onClick={() => handleItemClick('/dashboard')}
        />
        <HoverableNavItem
          isOpen={isOpen}
          name="Package"
          icon={<PackageIcon />}
          onClick={() => handleItemClick('/superadmin/package')}
        />
        <HoverableNavItem
          isOpen={isOpen}
          name="Company"
          icon={<CompanyIcon />}
          onClick={() => handleItemClick('/superadmin/company')}
        />
        <HoverableNavItem
          isOpen={isOpen}
          name="Super Admin"
          icon={<SupervisedUserCircleIcon />}
          onClick={() => handleItemClick('/superadmin/employees')}
        />
        
        <HoverableNavItem
          isOpen={isOpen}
          name="Support Ticket"
          icon={<SupportAgentIcon />}
          onClick={() => handleItemClick('/superadmin/supportticket')}
        >
         
        </HoverableNavItem>
        
        {/* Additional HoverableNavItems... */}
      </Box>
    </Box>
  );
};

export default Sidebar;
