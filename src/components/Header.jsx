import React, { useState ,useEffect} from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  useMediaQuery,
  Tooltip,
  Popover,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import ChatIcon from "@mui/icons-material/Chat";
import Badge from "@mui/material/Badge";
import CloseIcon from "@mui/icons-material/Close";
import creworderIcon from "../images/crewordericon.png";
import ProfileHeader from "./ProfileHeader";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import SettingsIcon from "@mui/icons-material/Settings";
import { logout } from "@/utils/auth";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import RechargeWallet from "./recharge-wallet/RechargeWallet";
import BranchSwitcher from "./branchswitcher/BranchSwitcher";
import NotificationsIcon from "@mui/icons-material/Notifications";
const Header = ({ onMenuClick, type }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New comment on your post", link: "/comments" },
    { id: 2, message: "You have a new follower", link: "/followers" },
    { id: 3, message: "Your order has been shipped", link: "/orders" },
    { id: 4, message: "New message from John Doe", link: "/messages" },
    { id: 5, message: "Your profile was updated", link: "/profile" },
  ]);
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    router.push("/profile");
    handleMenuClose();
  };

  const handleLogoutClick = async () => {
    await logout();
    router.push("/login");
    handleMenuClose();
  };

  const handleItemClick = (path) => {
    if (path) {
      router.push(path);
    }
  };

  const handleNotificationsClick = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleRemoveNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const openNotifications = Boolean(notificationsAnchorEl);
  const notificationId = openNotifications ? "notification-popover" : undefined;



  // Connect to WebSocket and listen for incoming data
  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket('ws://localhost:3001');

      ws.onopen = () => {
        console.log('WebSocket connection shishs established');
        setSocket(ws);
      };
      ws.onmessage = (event) => {
        try {
          console.log("dddddddddddddddddddddddddddddddd",event)
          const incomingMessage = JSON.parse(event.data);
          setNotifications((prevNotifications) => {
            const notificationExists = prevNotifications.some(
              (notif) => notif.id === incomingMessage.id
            );
            if (!notificationExists) {
              return [...prevNotifications, incomingMessage];
            }
            return prevNotifications;
          });
          console.log("New Notification Received:", incomingMessage);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onclose = (event) => {
        console.log('WebSocket connection closed:', event.reason);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    };
    connectWebSocket();
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);


  return (
    <Box
      sx={{
        backgroundColor: "white",
        position: "sticky",
        top: 0,
        boxShadow: "0 1px 2px rgba(56, 65, 74, 0.15)",
        zIndex: "100",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          padding: 1,
        }}
      >
        <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
          {isMobile && (
            <Image
              src={creworderIcon}
              alt="Creworder Icon"
              width={30}
              height={30}
              sx={{ marginRight: 2 }}
            />
          )}
          <Tooltip title="Menu ">
            <IconButton
              color="black"
              onClick={onMenuClick}
              sx={{
                marginRight: 2,
                backgroundColor: "#f9f8fe",
                color: "#405189",
                "&:hover": {
                  backgroundColor: "#405189",
                  color: "#ffffff",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          {type == "admin" && (
            <a href="/admin/search" style={{ textDecoration: "none" }}>
              <Tooltip title="Search ">
                <SearchIcon
                  sx={{
                    backgroundColor: "#f9f8fe",
                    color: "#405189",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    padding: "8px",
                    transition: "background-color 0.3s, color 0.3s",
                    "&:hover": {
                      backgroundColor: "#405189",
                      color: "#ffffff",
                    },
                  }}
                />
              </Tooltip>
            </a>
          )}
          <a href="/notepad" style={{ textDecoration: "none" }}>
            <Tooltip title="Notebad ">
              <EditNoteSharpIcon
                sx={{
                  marginLeft: 1,
                  backgroundColor: "#f9f8fe",
                  color: "#405189",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  padding: "8px",
                  transition: "background-color 0.3s, color 0.3s",
                  "&:hover": {
                    backgroundColor: "#405189",
                    color: "#ffffff",
                  },
                }}
              />
            </Tooltip>
          </a>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Grid container spacing={2} sx={{ alignItems: "center" }}>
            <Grid item sm={6} md={6} sx={{ marginLeft: 10 }}>
              {type == "admin" && (
                <a style={{ textDecoration: "none" }}>
                  <Tooltip title="Wallet">
                    <RechargeWallet
                      sx={{
                        marginLeft: 3,
                        backgroundColor: "#f9f8fe",
                        color: "#405189",
                      }}
                    />
                  </Tooltip>
                </a>
              )}
              <a href="/chat" style={{ textDecoration: "none" }}>
                <Tooltip title="Chat">
                  <ChatIcon
                    sx={{
                      marginLeft: 1,
                      backgroundColor: "#f9f8fe",
                      color: "#405189",
                      borderRadius: "50%",
                      width: 40,
                      height: 40,
                      padding: "8px",
                      transition: "background-color 0.3s, color 0.3s",
                      "&:hover": {
                        backgroundColor: "#405189",
                        color: "#ffffff",
                      },
                    }}
                  />
                </Tooltip>
              </a>
              {type == "admin" && (
                <a href="/admin/settings" style={{ textDecoration: "none" }}>
                  <Tooltip title="Settings">
                    <SettingsIcon
                      sx={{
                        marginLeft: 1,
                        backgroundColor: "#f9f8fe",
                        color: "#405189",
                        borderRadius: "50%",
                        width: 40,
                        height: 40,
                        padding: "8px",
                        transition: "background-color 0.3s, color 0.3s",
                        "&:hover": {
                          backgroundColor: "#405189",
                          color: "#ffffff",
                        },
                      }}
                    />
                  </Tooltip>
                </a>
              )}
              {type == "superadmin" && (
                <a href="/superadmin/settings" style={{ textDecoration: "none" }}>
                  <Tooltip title="Settings">
                    <SettingsIcon
                      sx={{
                        marginLeft: 1,
                        backgroundColor: "#f9f8fe",
                        color: "#405189",
                        borderRadius: "50%",
                        width: 40,
                        height: 40,
                        padding: "8px",
                        transition: "background-color 0.3s, color 0.3s",
                        "&:hover": {
                          backgroundColor: "#405189",
                          color: "#ffffff",
                        },
                      }}
                    />
                  </Tooltip>
                </a>
              )}
              {type == "admin" && <BranchSwitcher />}
              <a href="#" style={{ textDecoration: "none" }} onClick={handleNotificationsClick}>
                <Badge color="secondary" badgeContent={notifications.length || 0} max={999}>
                  <NotificationsIcon
                    sx={{
                      marginLeft: 1,
                      backgroundColor: "#f9f8fe",
                      color: "#405189",
                      borderRadius: "50%",
                      width: 40,
                      height: 40,
                      padding: "8px",
                      transition: "background-color 0.3s, color 0.3s",
                      "&:hover": {
                        backgroundColor: "#405189",
                        color: "#ffffff",
                      },
                    }}
                  />
                </Badge>
              </a>
            </Grid>
            <Grid item sm={4} md={4}>
              <Grid
                container
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "black",
                  cursor: "pointer",
                  marginRight: "30px",
                }}
                onClick={handleMenuOpen}
              >
                <ProfileHeader />
              </Grid>
            </Grid>
          </Grid>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </Grid>
      </Grid>

      {/* Notification Dropdown (Popover) */}
      <Popover
        id={notificationId}
        open={openNotifications}
        anchorEl={notificationsAnchorEl}
        onClose={handleNotificationsClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <div style={{ padding: "10px", width: "300px" }}>
          {notifications.length === 0 ? (
            <Typography variant="body2" color="textSecondary">
              No notifications
            </Typography>
          ) : (
            <List>
              {notifications.map((notification) => (
                <ListItem
                  key={notification.id}
                  button
                  onClick={() => handleItemClick(notification.link)}
                >
                  <ListItemText primary={notification.message} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveNotification(notification.id);
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </div>
      </Popover>
    </Box>
  );
};

export default Header;

