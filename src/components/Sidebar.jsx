import React from 'react';
import Navitem from './Navitem';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PackageIcon from '@mui/icons-material/LocalOffer';
import CompanyIcon from '@mui/icons-material/Business';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SettingsIcon from '@mui/icons-material/Settings';
import TicketIcon from '@mui/icons-material/ConfirmationNumber';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
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

const Sidebar = ({ isOpen }) => {
  const router = useRouter();
  const theme = useTheme();  // Get the theme object
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));  // Check if screen size is mobile or smaller

  const handleItemClick = (path) => {
    if (path) {
      router.push(path);
    }
  };

  return (
    <Box
      sx={{
        width: isOpen ? 253 : 60,
        backgroundColor: '#405189',
        padding: 2,
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        height: '100vh',
        display: 'flex',
        borderRadius :'20px',
        margin:'10px 10px',
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
              marginTop: 1,  // Added margin-top to separate the icon from the logo
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
        <Navitem
          name={isOpen ? 'Dashboard' : ''}
          icon={<DashboardIcon />}
          onClick={() => handleItemClick('/dashboard')}
        />
        <Navitem
          name={isOpen ? 'Package' : ''}
          icon={<PackageIcon />}
          onClick={() => handleItemClick('/superadmin/package')}
        />
        <Navitem
          name={isOpen ? 'Company' : ''}
          icon={<CompanyIcon />}
          onClick={() => handleItemClick('/superadmin/company')}
        />
        <Navitem
          name={isOpen ? 'Super Admin' : ''}
          icon={<SupervisedUserCircleIcon />}
        >
          {workItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                padding: 1,
                marginLeft: 2,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                "&:hover": {
                  backgroundColor: '#e0e0e0',
                },
              }}
            >
              {item.icon}
              <Typography sx={{ marginLeft: 1 }}>{item.name}</Typography>
            </Box>
          ))}
        </Navitem>
        <Navitem
          name={isOpen ? 'Support Ticket' : ''}
          icon={<SupportAgentIcon />}
        >
          {financeItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                padding: 1,
                marginLeft: 2,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                "&:hover": {
                  backgroundColor: '#e0e0e0',
                },
              }}
            >
              {item.icon}
              <Typography sx={{ marginLeft: 1 }}>{item.name}</Typography>
            </Box>
          ))}
        </Navitem>
        <Navitem
          name={isOpen ? 'Dashboard' : ''}
          icon={<DashboardIcon />}
          onClick={() => handleItemClick('/dashboard')}
        />
        <Navitem
          name={isOpen ? 'Package' : ''}
          icon={<PackageIcon />}
          onClick={() => handleItemClick('/superadmin/package')}
        />
        <Navitem
          name={isOpen ? 'Company' : ''}
          icon={<CompanyIcon />}
          onClick={() => handleItemClick('/superadmin/company')}
        />
        <Navitem
          name={isOpen ? 'Super Admin' : ''}
          icon={<SupervisedUserCircleIcon />}
        >
          {workItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                padding: 1,
                marginLeft: 2,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                "&:hover": {
                  backgroundColor: '#e0e0e0',
                },
              }}
            >
              {item.icon}
              <Typography sx={{ marginLeft: 1 }}>{item.name}</Typography>
            </Box>
          ))}
        </Navitem>
        <Navitem
          name={isOpen ? 'Support Ticket' : ''}
          icon={<SupportAgentIcon />}
        >
          {financeItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                padding: 1,
                marginLeft: 2,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                "&:hover": {
                  backgroundColor: '#e0e0e0',
                },
              }}
            >
              {item.icon}
              <Typography sx={{ marginLeft: 1 }}>{item.name}</Typography>
            </Box>
          ))}
        </Navitem>
        <Navitem
          name={isOpen ? 'Dashboard' : ''}
          icon={<DashboardIcon />}
          onClick={() => handleItemClick('/dashboard')}
        />
        <Navitem
          name={isOpen ? 'Package' : ''}
          icon={<PackageIcon />}
          onClick={() => handleItemClick('/superadmin/package')}
        />
        <Navitem
          name={isOpen ? 'Company' : ''}
          icon={<CompanyIcon />}
          onClick={() => handleItemClick('/superadmin/company')}
        />
        <Navitem
          name={isOpen ? 'Super Admin' : ''}
          icon={<SupervisedUserCircleIcon />}
        >
          {workItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                padding: 1,
                marginLeft: 2,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                "&:hover": {
                  backgroundColor: '#e0e0e0',
                },
              }}
            >
              {item.icon}
              <Typography sx={{ marginLeft: 1 }}>{item.name}</Typography>
            </Box>
          ))}
        </Navitem>
        <Navitem
          name={isOpen ? 'Support Ticket' : ''}
          icon={<SupportAgentIcon />}
        >
          {financeItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                padding: 1,
                marginLeft: 2,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                "&:hover": {
                  backgroundColor: '#e0e0e0',
                },
              }}
            >
              {item.icon}
              <Typography sx={{ marginLeft: 1 }}>{item.name}</Typography>
            </Box>
          ))}
        </Navitem>
        <Navitem
          name={isOpen ? 'Dashboard' : ''}
          icon={<DashboardIcon />}
          onClick={() => handleItemClick('/dashboard')}
        />
        <Navitem
          name={isOpen ? 'Package' : ''}
          icon={<PackageIcon />}
          onClick={() => handleItemClick('/superadmin/package')}
        />
        <Navitem
          name={isOpen ? 'Company' : ''}
          icon={<CompanyIcon />}
          onClick={() => handleItemClick('/superadmin/company')}
        />
        <Navitem
          name={isOpen ? 'Super Admin' : ''}
          icon={<SupervisedUserCircleIcon />}
        >
          {workItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                padding: 1,
                marginLeft: 2,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                "&:hover": {
                  backgroundColor: '#e0e0e0',
                },
              }}
            >
              {item.icon}
              <Typography sx={{ marginLeft: 1 }}>{item.name}</Typography>
            </Box>
          ))}
        </Navitem>
        <Navitem
          name={isOpen ? 'Support Ticket' : ''}
          icon={<SupportAgentIcon />}
        >
          {financeItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                padding: 1,
                marginLeft: 2,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                "&:hover": {
                  backgroundColor: '#e0e0e0',
                },
              }}
            >
              {item.icon}
              <Typography sx={{ marginLeft: 1 }}>{item.name}</Typography>
            </Box>
          ))}
        </Navitem>
      </Box>
    </Box>
  );
};

export default Sidebar;
