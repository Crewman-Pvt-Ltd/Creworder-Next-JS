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
import Branch from "./Branch";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DatabaseBackupSettings from "./DatabaseBackupSettings";
import LocalShippingIcon from "@mui/icons-material/Map";
import PhoneIcon from "@mui/icons-material/Phone";
import ShippingIcon from "@mui/icons-material/LocalShipping";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PaymentIcon from "@mui/icons-material/Payment";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import LockIcon from "@mui/icons-material/Lock";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import BackupIcon from "@mui/icons-material/Backup";
import SearchIcon from "@mui/icons-material/Search";
import RolesAndPermissions from "./RolesAndPermissions";
import CourierServiceList from "../courierservice/CourierServiceList";
import TelephonicChannelsList from "../telephonicchannels/TelephonicChannelsList";
import ShipmentChannelsList from "../shipmentchannels/ShipmentChannelsList";
import AdminSettings from "./AdminSettings";
import MaintainanceMode from "./MaintainanceMode";
import EmailSettings from "./EmailSettings";
import EInvoiceSettings from "./EInvoiceSettings";
import PickupPoint from "./PickupPoint";
import OrderStatus from "./OrderStatus";
import PlaceIcon from "@mui/icons-material/Place";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ListIcon from "@mui/icons-material/List";
import EmailIcon from "@mui/icons-material/Email";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
const poppins = Poppins({
  weight: "300",
  subsets: ["latin"],
});
import ReceiptIcon from "@mui/icons-material/Receipt";
import IPAccess from "./IPAccess";
import LeadSettings from "./LeadSettings";

import RolesList from "./RolesList";
import BankDetails from "./BankDetails";
import PixelSettings from "./PixelSettings";
import QCSettings from "./QCSettings";
import SuperadminShipmentChannels from "../shipmentchannels/SuperadminShipmentChannels";
const superAdminMenuItems = [
  { text: "App Settings", icon: <SettingsIcon /> },
  { text: "Notification Settings", icon: <NotificationsIcon /> },
  { text: "Payment Credentials", icon: <PaymentIcon /> },
  { text: "Finance Settings", icon: <AccountBalanceIcon /> },
  { text: "Social Login Settings", icon: <LockIcon /> },
  { text: "Theme Settings", icon: <ColorLensIcon /> },
  { text: "Database Backup Settings", icon: <BackupIcon /> },
  { text: "Maintenance Mode", icon: <LocalShippingIcon /> },
  { text: "Pixel Settings", icon: <LocalShippingIcon /> },
  { text: "Shipment Channels", icon: <LocalShippingIcon /> },
  ,
];

const adminMenuItems = [
  { text: "Admin Settings", icon: <SettingsIcon /> },
  { text: "Branch", icon: <PeopleAltIcon /> },

  { text: "Courier Service", icon: <ShippingIcon /> },
  { text: "Telephonic Channels", icon: <PhoneIcon /> },
  { text: "Shipment Channels", icon: <LocalShippingIcon /> },
  { text: "Email Settings", icon: <EmailIcon /> },
  { text: "Order Status", icon: <AssignmentIcon /> },
  { text: "QC Setting", icon: <QuestionAnswerIcon /> },
  { text: "Lead Setting", icon: <ManageAccountsIcon /> },

  { text: "IP Access", icon: <PrivacyTipIcon /> },
  { text: "Pickup Point", icon: <PlaceIcon /> },
  { text: "Roles List", icon: <ListIcon /> },
];
const commonMenuItems = [
  { text: "Permission Setting", icon: <ChecklistIcon /> },
  { text: "Bank Details", icon: <AssuredWorkloadIcon /> },

  { text: "E-Invoice Settings", icon: <ReceiptIcon /> },
];
const SettingsSidebarListItems = ({ type }) => {
  const defaultState = type == "superadmin" ? "App Settings" : "Admin Settings";
  const [selectedItem, setSelectedItem] = useState(defaultState);

  const handleItemClick = (item) => {
    setSelectedItem(item.text);
  };
  const userType = "superadmin";
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
            {type == "superadmin" &&
              superAdminMenuItems.map((item, index) => (
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
            {type == "admin" &&
              adminMenuItems.map((item, index) => (
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
            {commonMenuItems.map((item, index) => (
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
          {type == "superadmin" && selectedItem === "App Settings" && (
            <AppSettings />
          )}
          {type == "superadmin" && selectedItem === "Notification Settings" && (
            <NotificationSettings />
          )}
          {type == "superadmin" && selectedItem === "Payment Credentials" && (
            <PaymentCredentials />
          )}
          {type == "superadmin" && selectedItem === "Finance Settings" && (
            <FinanceSettings />
          )}
          {type == "superadmin" && selectedItem === "Social Login Settings" && (
            <SocialLoginSettings />
          )}
          {type == "superadmin" && selectedItem === "Theme Settings" && (
            <ThemeSettings />
          )}
          {type == "superadmin" &&
            selectedItem === "Database Backup Settings" && (
              <DatabaseBackupSettings />
            )}
          {type == "superadmin" && selectedItem === "Maintainance Mode" && (
            <MaintainanceMode />
          )}
          {type == "superadmin" && selectedItem === "Pixel Settings" && (
            <PixelSettings />
          )}
          {type == "admin" && selectedItem === "Admin Settings" && (
            <AdminSettings />
          )}
          {type == "admin" && selectedItem === "Branch" && <Branch />}

          {type == "admin" && selectedItem === "Courier Service" && (
            <CourierServiceList />
          )}
          {type == "admin" && selectedItem === "Telephonic Channels" && (
            <TelephonicChannelsList />
          )}
          {type == "admin" && selectedItem === "Shipment Channels" && (
            <ShipmentChannelsList />
          )}
            {type == "superadmin" && selectedItem === "Shipment Channels" && (
            <SuperadminShipmentChannels />
          )}
          {type == "admin" && selectedItem === "Order Status" && (
            <OrderStatus />
          )}
          {type == "admin" && selectedItem === "QC Setting" && <QCSettings />}
          {type == "admin" && selectedItem === "Lead Setting" && (
            <LeadSettings />
          )}
          {type == "admin" && selectedItem === "Roles List" && <RolesList />}
          {selectedItem === "Bank Details" && <BankDetails />}
          {selectedItem === "Permission Setting" && <RolesAndPermissions />}

          {selectedItem === "E-Invoice Settings" && <EInvoiceSettings />}

          {type == "admin" && selectedItem === "Pickup Point" && (
            <PickupPoint />
          )}
          {type == "admin" && selectedItem === "Email Settings" && (
            <EmailSettings />
          )}
          {type == "admin" && selectedItem === "IP Access" && <IPAccess />}
        </Box>
      </Grid>
    </Grid>
  );
};

export default SettingsSidebarListItems;
