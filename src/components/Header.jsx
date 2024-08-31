import React from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import creworderIcon from "../images/crewordericon.png";
import ProfileHeader from "./ProfileHeader";
import SearchBar from "./SearchBar";
import { logout } from "@/utils/auth";
import { useRouter } from "next/router";
import RechargeWallet from "./recharge-wallet/RechargeWallet";

const Header = ({ onMenuClick }) => {
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
          <SearchBar />
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
            <Grid item xs={4} sm={4} md={4}>
              <RechargeWallet /> Wallet Recharge
            </Grid>
            <Grid item xs={4} sm={4} md={4}>Branch Switcher</Grid>
            <Grid item xs={4} sm={4} md={4}>
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
