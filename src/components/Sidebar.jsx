import React, { useState } from 'react';
import Navitem from './Navitem';
import { Collapse, List, ListItem, ListItemText, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import DashboardIcon from '@mui/icons-material/home';
import ReceiptIcon from '@mui/icons-material/ShoppingCart';
import GroupIcon from '@mui/icons-material/Group';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PackageIcon from '@mui/icons-material/LocalOffer';
import CompanyIcon from '@mui/icons-material/Business';
import BusinessIcon from '@mui/icons-material/Store';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import Image from 'next/image';
import creworderLogo from '../images/creworderlogo.png';
import creworderIcon from '../images/crewordericon.png';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LocalShippingIcon from '@mui/icons-material/Map';
import PhoneIcon from '@mui/icons-material/Phone';
import ShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CategoryIcon from '@mui/icons-material/Widgets';
import StoreIcon from '@mui/icons-material/Store';
import EmailIcon from '@mui/icons-material/Email';
import Receipt from '@mui/icons-material/Receipt';
import IconButton from "@mui/material/IconButton";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
      <Navitem name={isOpen ? name : ""} icon={icon} active={active}>
        {children}
      </Navitem>
      {!isOpen && hovered && (
        <Box
          sx={{
            position: "fixed",
            left: "70px",
            top: hoveredItemPosition.top + "px",
            backgroundColor: "#fff",
            color: "#405189",
            padding: "8px 7px",
            borderRadius: "4px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
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
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobile) {
    return null;
  }

  const handleItemClick = (path) => {
    if (path) {
      router.push(path);
    }
  };

  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const handleOrderClick = () => {
    setIsOrderOpen(!isOrderOpen);
  };
  const [isNDROpen, setIsNDROpen] = useState(false);
  const handleNDRClick = () => {
    setIsNDROpen(!isNDROpen);
  };

  const [isCallOpen, setIsCallOpen] = useState(false);
  const handleCallClick = () => {
    setIsCallOpen(!isCallOpen);
  };

  const [isLeadsOpen, setIsLeadsOpen] = useState(false);
  const handleLeadsClick = () => {
    setIsLeadsOpen(!isLeadsOpen);
  };

  const currentPath = router.pathname;

  return (
    <Box
      sx={{
        width: isOpen ? 250 : 70,
        backgroundColor: "#405189",
        padding: 2,
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        color: "white",
        transition: "width 0.2s ease",
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#c9c9c9",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#405189",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
              display: "flex",
              justifyContent: "center",
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
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          marginTop: "13px",
          color: "#abb9e8",
        }}
      >
        <HoverableNavItem
          isOpen={isOpen}
          name="Dashboard"
          icon={<DashboardIcon />}
          active={currentPath === "/dashboard"}
          onClick={() => handleItemClick("/dashboard")}
        />

        {type == "admin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name="User"
            icon={<PersonIcon />}
            active={currentPath === "/user"}
            onClick={() => handleItemClick("/user")}
          />
        )}

        {type == "admin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name="Branch"
            icon={<AccountTreeIcon />}
            active={currentPath === "/admin/branch"}
            onClick={() => handleItemClick("/admin/branch")}
          />
        )}

        {type == "superadmin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name="Package"
            icon={<PackageIcon />}
            active={currentPath === "/superadmin/package"}
            onClick={() => handleItemClick("/superadmin/package")}
          />
        )}

        {type == "superadmin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name="Company"
            icon={<CompanyIcon />}
            active={currentPath === "/superadmin/company"}
            onClick={() => handleItemClick("/superadmin/company")}
          />
        )}

        {type == "superadmin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name="Employee"
            icon={<SupervisedUserCircleIcon />}
            active={currentPath === "/superadmin/employees"}
            onClick={() => handleItemClick("/superadmin/employees")}
          />
        )}

        {type == "superadmin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name="Support Ticket"
            icon={<SupportAgentIcon />}
            active={currentPath === "/superadmin/supportticket"}
            onClick={() => handleItemClick("/superadmin/supportticket")}
          ></HoverableNavItem>
        )}

        <HoverableNavItem
          isOpen={isOpen}
          name="Notice"
          icon={<NotificationsIcon />}
          active={currentPath === "/notice-board"}
          onClick={() => handleItemClick("/notice-board")}
        ></HoverableNavItem>

        <HoverableNavItem
          isOpen={isOpen}
          name="Chat"
          icon={<ChatIcon />}
          active={currentPath === "/chat"}
          onClick={() => handleItemClick("/chat")}
        ></HoverableNavItem>
         {type == "admin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name="Settings"
            icon={<SettingsIcon />}
            active={currentPath === "/admin/settings"}
            onClick={() => handleItemClick("/admin/settings")}
          ></HoverableNavItem>
        )}
        {type == "superadmin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name="Settings"
            icon={<SettingsIcon />}
            active={currentPath === "/superadmin/settings"}
            onClick={() => handleItemClick("/superadmin/settings")}
          ></HoverableNavItem>
        )}

        {type == "superadmin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name="Landing Page Settings"
            icon={<SettingsIcon />}
            active={currentPath === "/superadmin/landingpage"}
            onClick={() => handleItemClick("/superadmin/landingpage")}
          ></HoverableNavItem>
        )}

        {type == "superadmin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name="StickyNote"
            icon={<SettingsIcon />}
            active={currentPath === "/superadmin/stickynote"}
            onClick={() => handleItemClick("/superadmin/stickynote")}
          ></HoverableNavItem>
        )}

        <HoverableNavItem
          isOpen={isOpen}
          name="Notepad"
          icon={<MenuBookIcon />}
          active={currentPath === "/notepad"}
          onClick={() => handleItemClick("/notepad")}
        ></HoverableNavItem>

        <HoverableNavItem
          isOpen={isOpen}
          name="Follow Up"
          icon={<EventNoteIcon />}
          active={currentPath === "/followup"}
          onClick={() => handleItemClick("/followup")}
        ></HoverableNavItem>

       
              {type == "admin" && (<HoverableNavItem
          isOpen={isOpen}
          name="Invoice Management"
          icon={<Receipt />}
          active={currentPath === '/admin/invoce-management'}
          onClick={() => handleItemClick('/admin/invoce-management')}
        ></HoverableNavItem>)}


       {type === "admin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name={
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <span>Call Details</span>
                <IconButton
                  size="small"
                  onClick={handleCallClick}
                  sx={{
                    color: "white",
                    marginLeft: "100px",
                  }}
                >
                  {isCallOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
            }
            icon={<PhoneIcon />}
            active={currentPath.startsWith("/order")}
            onClick={handleCallClick}
          >
            <Collapse in={isCallOpen}>
              <List component="div" disablePadding>
                <ListItem   
                 button
                 onClick={() => handleItemClick('/admin/call-recording')}
                 sx={{ pl: 4 }} 
                >
                  <ListItemText primary="Call Recording" />
                </ListItem>
               
              </List>
            </Collapse>
          </HoverableNavItem>
        )}




       {type === "admin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name={
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <span>Leads</span>
                <IconButton
                  size="small"
                  onClick={handleLeadsClick}
                  sx={{
                    color: "white",
                    marginLeft: "115px",
                  }}
                >
                  {isLeadsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
            }
            icon={<GroupIcon />}
            active={currentPath.startsWith("/order")}
            onClick={handleLeadsClick}
          >
            <Collapse in={isLeadsOpen}>
              <List component="div" disablePadding>
                <ListItem  
                 button
                 onClick={() => handleItemClick('/admin/leads/add-leads')}               
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary="Add Leads" />
                </ListItem>
                <ListItem 
                  button
                  onClick={() => handleItemClick('/admin/leads')}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary="All Leads" />
                </ListItem>
              </List>
            </Collapse>
          </HoverableNavItem>
        )}
        {type === "admin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name={
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <span>NDR</span>
                <IconButton
                  size="small"
                  onClick={handleNDRClick}
                  sx={{
                    color: "white",
                    marginLeft: "115px",
                  }}
                >
                  {isNDROpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
            }
            icon={<LocationOnIcon />}
            active={currentPath.startsWith("/order")}
            onClick={handleNDRClick}
          >
            <Collapse in={isNDROpen}>
              <List component="div" disablePadding>
                <ListItem                 
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary="EDD" />
                </ListItem>
                <ListItem                 
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary="OFD" />
                </ListItem>

              </List>
            </Collapse>
          </HoverableNavItem>
        )}

        {type == "admin" && (
          <Typography
            className="sidebar-section-label"
            style={{ color: "#fff" }}
          >
            Product
          </Typography>
        )}

        {type == "admin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name="Category"
            icon={<CategoryIcon />}
            active={currentPath === "/admin/category"}
            onClick={() => handleItemClick("/admin/category")}
          ></HoverableNavItem>
        )}

        {type == "admin" && (<HoverableNavItem
          isOpen={isOpen}
          name="Product"
          icon={<StoreIcon />}
          active={currentPath === '/admin/product'}
          onClick={() => handleItemClick('/admin/product')}
        />)}

        {type == "admin" && (<HoverableNavItem
          isOpen={isOpen}
          name={
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <span>Order</span>
              <IconButton
                size="small"
                onClick={handleOrderClick}
                sx={{
                  color: "white",
                  marginLeft: "110px",
                }}
              >
                {isOrderOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>
          }
          icon={<LocalMallIcon />}
          active={currentPath.startsWith('/order')}
          onClick={handleOrderClick}
        >
          <Collapse in={isOrderOpen}>
            <List component="div" disablePadding>
              <ListItem
                button
                onClick={() => handleItemClick('/admin/orders')}
                sx={{ pl: 4 }}
              >
                <ListItemText primary="All Orders" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleItemClick('/admin/orders/repeatorder')}
                sx={{ pl: 4 }}
              >
                <ListItemText primary="Repeat Order" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleItemClick('/admin/orders/pincodeorder')}
                sx={{ pl: 4 }}
              >
                <ListItemText primary="Pincode Order" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleItemClick('/admin/orders/course')}
                sx={{ pl: 4 }}
              >
                <ListItemText primary="Course Order" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleItemClick('/admin/orders/schedule-order')}
                sx={{ pl: 4 }}
              >
                <ListItemText primary="Schedule Order" />
              </ListItem>

            </List>
          </Collapse>
        </HoverableNavItem>)}

        {type == "superadmin" && (<HoverableNavItem
          isOpen={isOpen}
          name="Form Enquiry"
          icon={<EmailIcon />}
          active={currentPath === '/superadmin/form-enquiry'}
          onClick={() => handleItemClick('/superadmin/form-enquiry')}
        ></HoverableNavItem>)}

  
      </Box>
    </Box>
  );
};

export default Sidebar;
