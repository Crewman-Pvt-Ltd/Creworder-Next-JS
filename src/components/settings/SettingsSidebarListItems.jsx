import React, { useState } from "react";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  Grid,
  Box,
} from "@mui/material";
import { Poppins } from "next/font/google";
import AppSettings from "./AppSettings";

const poppins = Poppins({
  weight: "300",
  subsets: ["latin"],
});

const SettingsSidebarListItems = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const menuItems = [
    "App Settings",
    "Profile Settings",
    "Notifications Settings",
    "Payment Credentials",
    "Finance Settings",
    "Custom Fields",
    "Social Login Settings",
    "Theme Settings",
    "Database Backup Settings",
    "Finance Settings",
    "Custom Fields",
    "Social Login Settings",
    "Theme Settings",
    "Database Backup Settings",
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid rgba(0, 0, 0, 0.12)",
            width: "270px",
          }}
        >
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              backgroundColor: "white",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Search"
              InputProps={{
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
              height: "85vh",
              overflowY: "scroll",
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
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <ListItemText
                    primary={item}
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      color: "gray",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} sm={9} md={9}>
        <Grid container>
          <Grid item p={2}>
            {selectedItem === "App Settings" && <AppSettings />}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SettingsSidebarListItems;
