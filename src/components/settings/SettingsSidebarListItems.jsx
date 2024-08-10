import React, { useState } from "react";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Grid,
  Box,
} from "@mui/material";
import { Poppins } from "next/font/google";
import AppSettings from "./AppSettings";
import NotificationSettings from "./NotificationSettings";
import PaymentCredentials from "./PaymentCredentials";
import FinanceSettings from "./FinanceSettings";
import SocialLoginSettings from "./SocialLoginSettings";
import ThemeSettings from "./ThemeSettings";
import DatabaseBackupSettings from "./DatabaseBackupSettings";

import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LockIcon from "@mui/icons-material/Lock";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import BackupIcon from "@mui/icons-material/Backup";
import SearchIcon from "@mui/icons-material/Search";

const poppins = Poppins({
  weight: "300",
  subsets: ["latin"],
});

const menuItems = [
  { text: "App Settings", icon: <SettingsIcon /> },
  { text: "Notification Settings", icon: <NotificationsIcon /> },
  { text: "Payment Credentials", icon: <PaymentIcon /> },
  { text: "Finance Settings", icon: <AccountBalanceIcon /> },
  { text: "Social Login Settings", icon: <LockIcon /> },
  { text: "Theme Settings", icon: <ColorLensIcon /> },
  { text: "Database Backup Settings", icon: <BackupIcon /> },
  
];

const SettingsSidebarListItems = () => {
  const [selectedItem, setSelectedItem] = useState("App Settings");

  const handleItemClick = (item) => {
    setSelectedItem(item.text);
  };

  return (
    <Grid container spacing={1}>
      <Grid
        item
        xs={3}
        sm={3}
        md={2.5}
        sx={{ borderRight: "1px solid rgba(0, 0, 0, 0.12)", height: "85vh" }}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            backgroundColor: "white",
            position: "sticky",
            top: 0,
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Search"
            InputProps={{
              startAdornment: <SearchIcon />,
              sx: {
                backgroundColor: "white",
                height: "35px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.12)",
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
              },
            }}
          />
        </Box>
        <Box
          sx={{
            overflowY: "scroll",
            height: "80vh",
            backgroundColor: "white",
            boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
            padding: 1,
          }}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleItemClick(item)}
                sx={{
                  borderRadius: 1,
                  mb: 1,
                  transition: "all 0.3s ease",
                  backgroundColor:
                    selectedItem === item.text ? "#d7defabf" : "transparent",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    transform: "translateX(5px)",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <ListItemIcon
                    sx={{
                      minWidth: "auto",
                      color: "#405189",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      color: "#405189",
                      fontWeight: 500,
                      letterSpacing: "0.5px",
                      transition: "color 0.3s ease",
                    }}
                  />
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
      <Grid
        item
        xs={9.5}
        sx={{
          height: "90vh",
          overflowY: "scroll",
          backgroundColor: "#f5f7fa",
        }}
      >
        <Box p={2}>
          {selectedItem === "App Settings" && <AppSettings />}
          {selectedItem === "Notification Settings" && <NotificationSettings />}
          {selectedItem === "Payment Credentials" && <PaymentCredentials />}
          {selectedItem === "Finance Settings" && <FinanceSettings />}
          {selectedItem === "Social Login Settings" && <SocialLoginSettings />}
          {selectedItem === "Theme Settings" && <ThemeSettings />}
          {selectedItem === "Database Backup Settings" && <DatabaseBackupSettings />}
        </Box>
      </Grid>
    </Grid>
  );
};

export default SettingsSidebarListItems;
