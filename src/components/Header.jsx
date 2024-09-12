import React from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import ChatIcon from "@mui/icons-material/Chat";
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
  const [anchorEl, setAnchorEl] = React.useState(null);
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
          <IconButton
            color="black"
            onClick={onMenuClick}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <SearchIcon />
          <a href="/notepad" style={{ textDecoration: "none" }}>
            <Tooltip title="Notebad ">
              <EditNoteSharpIcon sx={{ marginLeft: 3 }} />
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
                  {" "}
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
                  {" "}
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
                  {" "}
                  <Tooltip title="Settings">
                    {" "}
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
                <a
                  href="/superadmin/settings"
                  style={{ textDecoration: "none" }}
                >
                  {" "}
                  <Tooltip title="Settings">
                    {" "}
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
              <a href="" style={{ textDecoration: "none" }}>
                <Tooltip title="Notification">
                  {" "}
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
                </Tooltip>
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
    </Box>
  );
};

export default Header;
