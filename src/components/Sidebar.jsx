import React, { useState } from "react";
import Navitem from "./Navitem";
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";
import { useRouter } from "next/router";
import DashboardIcon from "@mui/icons-material/Home";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import Image from "next/image";
import creworderLogo from "../images/creworderlogo.png";
import creworderIcon from "../images/crewordericon.png";
import AppsIcon from "@mui/icons-material/Apps";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PackageIcon from "@mui/icons-material/LocalOffer";
import CompanyIcon from "@mui/icons-material/Business";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PhoneIcon from "@mui/icons-material/Phone";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import CategoryIcon from "@mui/icons-material/Widgets";
import StoreIcon from "@mui/icons-material/Store";
import EmailIcon from "@mui/icons-material/Email";
import Receipt from "@mui/icons-material/Receipt";
import IconButton from "@mui/material/IconButton";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const HoverableNavItem = ({
  isOpen,
  name,
  icon,
  children,
  onClick,
  active,
}) => {
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
            backgroundColor: "#405189",
            color: "#fff",
            padding: "8px 7px",
            borderRadius: "0px 4px 4px 0px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
            zIndex: 100,
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

  const [isHROpen, setIsHROpen] = useState(false);
  const handleHRClick = () => {
    setIsHROpen(!isHROpen);
  };

  const [isExportOpen, setIsExportOpen] = useState(false);
  const handleExportClick = () => {
    setIsExportOpen(!isExportOpen);
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
        {isOpen ? (
          <Image
            src={creworderLogo}
            style={{ cursor: "pointer" }}
            alt="Creworder Logo"
            width={150}
            height={50}
            onClick={() => handleItemClick("/dashboard")}
          />
        ) : (
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
              style={{ cursor: "pointer" }}
              onClick={() => handleItemClick("/dashboard")}
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
        {type === "admin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name="Get Started"
            icon={<RocketLaunchIcon />}
            active={currentPath === "/admin/get-started"}
            onClick={() => handleItemClick("/admin/get-started")}
          />
        )}
        <HoverableNavItem
          isOpen={isOpen}
          name="Dashboard"
          icon={<DashboardIcon />}
          active={currentPath === "/dashboard"}
          onClick={() => handleItemClick("/dashboard")}
        />
       
        {type == "superadmin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name="Menu"
            icon={<AppsIcon />}
            active={currentPath === "/superadmin/menu"}
            onClick={() => handleItemClick("/superadmin/menu")}
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
          name={
            <span
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <span>HR</span>
              <IconButton
                size="small"
                onClick={handleHRClick}
                sx={{
                  color: "white",
                  marginLeft: "70px",
                }}
              >
                {isHROpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </span>
          }
          icon={<LocalMallIcon />}
          active={currentPath.startsWith("/hr/hr-employees")}
          onClick={handleHRClick}
        >
          <Collapse in={isHROpen}>
            <List component="div" disablePadding>
              <ListItem
                button
                onClick={() => handleItemClick("/hr/employees")}
                sx={{ pl: 4 }}
              >
                <ListItemText primary="Employees" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleItemClick("/hr/leaves")}
                sx={{ pl: 4 }}
              >
                <ListItemText primary="Leaves" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleItemClick("/hr/shift")}
                sx={{ pl: 4 }}
              >
                <ListItemText primary="Shift" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleItemClick("/hr/shift-roster")}
                sx={{ pl: 4 }}
              >
                <ListItemText primary="Shift Roster" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleItemClick("/hr/attendance")}
                sx={{ pl: 4 }}
              >
                <ListItemText primary="Attendance" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleItemClick("/hr/holiday")}
                sx={{ pl: 4 }}
              >
                <ListItemText primary="Holiday" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleItemClick("/hr/designation")}
                sx={{ pl: 4 }}
              >
                <ListItemText primary="Designation" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleItemClick("/hr/department")}
                sx={{ pl: 4 }}
              >
                <ListItemText primary="Department" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleItemClick("/hr/appreciation")}
                sx={{ pl: 4 }}
              >
                <ListItemText primary="Appreciation" />
              </ListItem>
            </List>
          </Collapse>
        </HoverableNavItem>
     
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
          name="Follow Up"
          icon={<EventNoteIcon />}
          active={currentPath === "/followup"}
          onClick={() => handleItemClick("/followup")}
        ></HoverableNavItem>
        {type == "admin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name="Invoice Management"
            icon={<Receipt />}
            active={currentPath === "/admin/invoce-management"}
            onClick={() => handleItemClick("/admin/invoce-management")}
          ></HoverableNavItem>
        )}
        {type === "admin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name={
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span>Call Analysis</span>
                <IconButton
                  size="small"
                  onClick={handleCallClick}
                  sx={{
                    color: "white",
                    marginLeft: "70px",
                  }}
                >
                  {isCallOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </span>
            }
            icon={<PhoneIcon />}
            active={currentPath.startsWith("/admin/call-recording")}
            onClick={handleCallClick}
          >
            <Collapse in={isCallOpen}>
              <List component="div" disablePadding>
                <ListItem
                  button
                  onClick={() => handleItemClick("/admin/call-recording")}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary="Call Recording" />
                </ListItem>
              </List>
              <List component="div" disablePadding>
                <ListItem
                  button
                  // onClick={() => handleItemClick('/admin/call-recording')}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary="QC Recording" />
                </ListItem>
              </List>
            </Collapse>
          </HoverableNavItem>
        )}
        {type === "admin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name={
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span>Export</span>
                <IconButton
                  size="small"
                  onClick={handleExportClick}
                  sx={{
                    color: "white",
                    marginLeft: "70px",
                  }}
                >
                  {isExportOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </span>
            }
            icon={<DownloadIcon />}
            active={currentPath.startsWith("/admin/export/order")}
            onClick={handleExportClick}
          >
            <Collapse in={isExportOpen}>
              <List component="div" disablePadding>
                <ListItem
                  button
                  onClick={() => handleItemClick("/admin/export/order")}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary="Export Order" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleItemClick("/admin/export/follow-up")}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary="Export Follow Up" />
                </ListItem>
              </List>
            </Collapse>
          </HoverableNavItem>
        )}
        {type === "admin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name={
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span>Leads</span>
                <IconButton
                  size="small"
                  onClick={handleLeadsClick}
                  sx={{
                    color: "white",
                    marginLeft: "70px",
                  }}
                >
                  {isLeadsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </span>
            }
            icon={<GroupIcon />}
            active={currentPath.startsWith("/leads")}
            onClick={handleLeadsClick}
          >
            <Collapse in={isLeadsOpen}>
              <List component="div" disablePadding>
                <ListItem
                  button
                  onClick={() => handleItemClick("/admin/leads/add-leads")}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary="Add Leads" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleItemClick("/admin/leads")}
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
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span>Shipment</span>
                <IconButton
                  size="small"
                  onClick={handleNDRClick}
                  sx={{
                    color: "white",
                    marginLeft: "70px",
                  }}
                >
                  {isNDROpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </span>
            }
            icon={<LocationOnIcon />}
            active={currentPath.startsWith("/order")}
            onClick={handleNDRClick}
          >
            <Collapse in={isNDROpen}>
              <List component="div" disablePadding>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText primary="NDR" />
                </ListItem>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText primary="EDD" />
                </ListItem>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText primary="OFD Counter" />
                </ListItem>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText primary="RTO" />
                </ListItem>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText primary="Manifesto" />
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
        {type == "admin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name="Product"
            icon={<StoreIcon />}
            active={currentPath === "/admin/product"}
            onClick={() => handleItemClick("/admin/product")}
          />
        )}
        {type == "admin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name={
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span>Order</span>
                <IconButton
                  size="small"
                  onClick={handleOrderClick}
                  sx={{
                    color: "white",
                    marginLeft: "70px",
                  }}
                >
                  {isOrderOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </span>
            }
            icon={<LocalMallIcon />}
            active={currentPath.startsWith("/order")}
            onClick={handleOrderClick}
          >
            <Collapse in={isOrderOpen}>
              <List component="div" disablePadding>
                <ListItem
                  button
                  onClick={() => handleItemClick("/admin/orders")}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary="All Orders" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleItemClick("/admin/orders/repeatorder")}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary="Repeat Order" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleItemClick("/admin/orders/pincodeorder")}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary="Pincode Order" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleItemClick("/admin/orders/course")}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary="Course Order" />
                </ListItem>
                <ListItem
                  button
                  onClick={() =>
                    handleItemClick("/admin/orders/schedule-order")
                  }
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary="Schedule Order" />
                </ListItem>
              </List>
            </Collapse>
          </HoverableNavItem>
        )}
        {type == "superadmin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name="Form Enquiry"
            icon={<EmailIcon />}
            active={currentPath === "/superadmin/form-enquiry"}
            onClick={() => handleItemClick("/superadmin/form-enquiry")}
          ></HoverableNavItem>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
