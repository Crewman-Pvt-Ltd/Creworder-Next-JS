import React, { useState, useEffect } from "react";
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
import { useRouter } from "next/router";
import DashboardIcon from "@mui/icons-material/Home";
import { Download as DownloadIcon } from "@mui/icons-material";
import ReceiptIcon from "@mui/icons-material/ShoppingCart";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PackageIcon from "@mui/icons-material/LocalOffer";
import CompanyIcon from "@mui/icons-material/Business";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Image from "next/image";
import AppsIcon from "@mui/icons-material/Apps";
import creworderLogo from "../images/creworderlogo.png";
import creworderIcon from "../images/crewordericon.png";
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
import { fetchSideBarData } from "@/utils/sideBarData";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CommitIcon from "@mui/icons-material/Commit";

const HoverableNavItem = ({
  isOpen,
  name,
  icon,
  children,
  onClick,
  active,
  dropdownIcon,
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
      <ListItem
        button
        selected={active}
        sx={{ justifyContent: "space-between" }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {icon}
          <ListItemText primary={isOpen ? name : ""} />
        </Box>
        {dropdownIcon}
      </ListItem>
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
      {children}
    </Box>
  );
};

const Sidebar = ({ isOpen, type }) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [sideBarDataList, setsideBarDataList] = useState({});
  const [openMenu, setOpenMenu] = useState({});
  const [isTechOpen, setTechOpen] = useState(false);

  const handleTechClick = () => {
    setTechOpen((prev) => !prev);
  };

  const fetchData = async () => {
    try {
      const data = await fetchSideBarData();
      setsideBarDataList(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching sidebar data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleItemClick = (path) => {
    if (path) {
      router.push(path);
    }
  };

  const [isHROpen, setIsHROpen] = useState(false);
  const handleHRClick = () => {
    setIsHROpen(!isHROpen);
  };

  const handleMenuClick = (menu) => {
    setOpenMenu((prevOpenMenu) => ({
      ...prevOpenMenu,
      [menu]: !prevOpenMenu[menu],
    }));
  };

  const iconMap = {
    Receipt: <ReceiptIcon />,
    NotificationsIcon: <NotificationsIcon />,
    LocalMallIcon: <LocalMallIcon />,
    Receipt: <Receipt />,
    PhoneIcon: <PhoneIcon />,
    DownloadIcon: <DownloadIcon />,
    CategoryIcon: <CategoryIcon />,
    GroupIcon: <GroupIcon />,
    SupervisedUserCircleIcon: <SupervisedUserCircleIcon />,
    StoreIcon: <StoreIcon />,
    LocationOnIcon: <LocationOnIcon />,
    EventNoteIcon: <EventNoteIcon />,
    CommitIcon: <CommitIcon />,
    DashboardIcon: <DashboardIcon />,
  };

  const currentPath = router.pathname;

  if (isMobile) {
    return null;
  }

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
          style={{ cursor: "pointer" }}
          alt="Creworder Logo"
          width={isOpen ? 150 : 40}
          height={isOpen ? 50 : 20}
          onClick={() => handleItemClick("/dashboard")}
        />
        {!isOpen && !isMobile && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}>
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
          height: "900px",
          marginTop: "13px",
          color: "#abb9e8",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        }}
      >
        {type === "admin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name="Home"
            icon={<DashboardIcon />}
            active={currentPath === "/admin/get-started"}
            onClick={() => handleItemClick("/admin/get-started")}
          />
        )}

        {type === "superadmin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name="Dashboard"
            icon={<DashboardIcon />}
            active={currentPath === "/dashboard"}
            onClick={() => handleItemClick("/dashboard")}
          />
        )}

        {Object.entries(sideBarDataList).map(([menu, items]) => {
          if (Array.isArray(items)) {
            return (
              <Box key={menu}>
                <HoverableNavItem
                  isOpen={isOpen}
                  name={menu}
                  icon={iconMap[sideBarDataList[`${menu}_icon`]] || null}
                  dropdownIcon={
                    <IconButton
                      size="small"
                      onClick={() => handleMenuClick(menu)}
                      sx={{ color: "white" }}
                    >
                      {openMenu[menu] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  }
                >
                  <Collapse in={openMenu[menu]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {items.map((item, index) =>
                        Object.entries(item).map(([key, value]) => (
                          <ListItem
                            button
                            key={`${index}-${key}`}
                            onClick={() => handleItemClick(value)}
                            sx={{ pl: 4 }}
                          >
                            <ListItemText primary={key} />
                          </ListItem>
                        ))
                      )}
                    </List>
                  </Collapse>
                </HoverableNavItem>
              </Box>
            );
          } else if (!menu.includes("_icon")) {
            return (
              <HoverableNavItem
                key={menu}
                isOpen={isOpen}
                name={menu}
                icon={iconMap[items.icon]}
                active={currentPath === items[`${menu}`]}
                onClick={() => handleItemClick(items[`${menu}`])}
              />
            );
          }
          return null;
        })}

        {/* Tech Menu */}
        {type === "superadmin" && (
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
                <span>Menu</span>
                <IconButton
                  size="small"
                  onClick={handleTechClick}
                  sx={{
                    color: "white",
                    marginLeft: "70px",
                  }}
                >
                  {isTechOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </span>
            }
            icon={<AppsIcon />}
            active={currentPath.startsWith("/tech")}
            onClick={handleTechClick}
          >
            <Collapse in={isTechOpen}>
              <List component="div" disablePadding>
                <ListItem
                  button
                  onClick={() => handleItemClick("/superadmin/menu")}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary="Main Menu" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleItemClick("/superadmin/submenu")}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary="Sub Menu" />
                </ListItem>
              </List>
            </Collapse>
          </HoverableNavItem>
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
            name="Notice"
            icon={<NotificationsIcon />}
            active={currentPath === "/notice-board"}
            onClick={() => handleItemClick("/notice-board")}
          ></HoverableNavItem>
        )}

        {type == "superadmin" && (
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
            name="Email Templates"
            icon={<MailOutlineIcon />}
            active={currentPath === "/superadmin/email-templates"}
            onClick={() => handleItemClick("/superadmin/email-templates")}
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

        {type == "superadmin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name="Form Enquiry"
            icon={<EmailIcon />}
            active={currentPath === "/superadmin/form-enquiry"}
            onClick={() => handleItemClick("/superadmin/form-enquiry")}
          ></HoverableNavItem>
        )}

        {type == "superadmin" && (
          <HoverableNavItem
            isOpen={isOpen}
            name="Banner"
            icon={<NotificationsIcon />}
            active={currentPath === "/superadmin/banner"}
            onClick={() => handleItemClick("/superadmin/banner")}
          ></HoverableNavItem>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
