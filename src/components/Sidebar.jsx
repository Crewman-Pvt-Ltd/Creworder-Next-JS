import React, { useState } from 'react';
import Navitem from './Navitem';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PackageIcon from '@mui/icons-material/LocalOffer';
import CompanyIcon from '@mui/icons-material/Business';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import Image from 'next/image';
import creworderLogo from '../images/creworderlogo.png';
import creworderIcon from '../images/crewordericon.png';
import SettingsIcon from '@mui/icons-material/Settings';

const HoverableNavItem = ({ isOpen, name, icon, children, onClick, active }) => {
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
      <Navitem name={isOpen ? name : ''} icon={icon} active={active}>
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
            padding: '8px 7px',
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

const Sidebar = ({ isOpen, type }) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    return null;
  }

  const handleItemClick = (path) => {
    if (path) {
      router.push(path);
    }
  };

  const currentPath = router.pathname;

  return (
    <Box
      sx={{
        width: isOpen ? 250 : 70,
        backgroundColor: '#405189',
        padding: 2,
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        color: 'white',
        transition: 'width 0.2s ease',
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
          marginTop: "13px",
          color: "#abb9e8",
        }}
      >
        <HoverableNavItem
          isOpen={isOpen}
          name="Dashboard"
          icon={<DashboardIcon />}
          active={currentPath === '/dashboard'}
          onClick={() => handleItemClick('/dashboard')}
        />
        {type == "admin" && (<HoverableNavItem
          isOpen={isOpen}
          name="User"
          icon={<DashboardIcon />}
          active={currentPath === '/user'}
          onClick={() => handleItemClick('/user')}
        />)}
         {type == "admin" && (<HoverableNavItem
          isOpen={isOpen}
          name="Order"
          icon={<DashboardIcon />}
          active={currentPath === '/admin/orders'}
          onClick={() => handleItemClick('/admin/orders')}
        />)}
           {type == "admin" && (<HoverableNavItem
          isOpen={isOpen}
          name="Branch"
          icon={<DashboardIcon />}
          active={currentPath === '/admin/branch'}
          onClick={() => handleItemClick('/admin/branch')}
        />)}

        {type == "superadmin" && (<HoverableNavItem
          isOpen={isOpen}
          name="Package"
          icon={<PackageIcon />}
          active={currentPath === '/superadmin/package'}
          onClick={() => handleItemClick('/superadmin/package')}
        />)}

        {type == "superadmin" && (<HoverableNavItem
          isOpen={isOpen}
          name="Company"
          icon={<CompanyIcon />}
          active={currentPath === '/superadmin/company'}
          onClick={() => handleItemClick('/superadmin/company')}
        />)}

        {type == "superadmin" && <HoverableNavItem
          isOpen={isOpen}
          name="Employee"
          icon={<SupervisedUserCircleIcon />}
          active={currentPath === '/superadmin/employees'}
          onClick={() => handleItemClick('/superadmin/employees')}
        />}
        {type == "superadmin" && (<HoverableNavItem
          isOpen={isOpen}
          name="Support Ticket"
          icon={<SupportAgentIcon />}
          active={currentPath === '/superadmin/supportticket'}
          onClick={() => handleItemClick('/superadmin/supportticket')}
        ></HoverableNavItem>)}
        <HoverableNavItem
          isOpen={isOpen}
          name="Notice"
          icon={<NotificationsIcon />}
          active={currentPath === '/superadmin/notice-board'}
          onClick={() => handleItemClick('/superadmin/notice-board')}
        >
        </HoverableNavItem>

        <HoverableNavItem
          isOpen={isOpen}
          name="Chat"
          icon={<ChatIcon />}
          active={currentPath === '/chat'}
          onClick={() => handleItemClick('/chat')}
        >

        </HoverableNavItem>
        {type == "superadmin" && (<HoverableNavItem
          isOpen={isOpen}
          name="Settings"
          icon={<SettingsIcon />}
          active={currentPath === '/superadmin/settings'}
          onClick={() => handleItemClick('/superadmin/settings')}
          ></HoverableNavItem>)}
           {type == "superadmin" && (<HoverableNavItem
          isOpen={isOpen}
          name="Landing Page Settings"
          icon={<SettingsIcon />}
          active={currentPath === '/superadmin/landingpage'}
          onClick={() => handleItemClick('/superadmin/landingpage')}
          ></HoverableNavItem>)}

      </Box>
    </Box>
  );
};

export default Sidebar;
