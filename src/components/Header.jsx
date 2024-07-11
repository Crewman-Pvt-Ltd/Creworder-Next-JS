import React from "react";
import { Grid, Box, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { logout } from "@/utils/auth";
import { useRouter } from 'next/router';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {

    handleMenuClose();
  };

  const handleLogoutClick = async () => {
    await logout();
    router.push('/login');
    handleMenuClose();
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        position: "sticky",
        top: 0,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: "100",
      }}
    >

      <Grid container spacing={2} columns={16}>
        <Grid item xs={2.8} sx={{ backgroundColor: "#405189", minHeight: "80px" }}>

        </Grid>
        <Grid item xs={13}>
          <Grid container alignItems="center" justifyContent="flex-end">
            <Grid item>
              <IconButton color="black">
                <SearchIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color="black">
                <AddIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color="black" onClick={handleMenuOpen}>
                <AccountCircleIcon />
              </IconButton>
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;