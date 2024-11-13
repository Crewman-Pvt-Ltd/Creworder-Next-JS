import React, { useState, useEffect } from "react";
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
import ReceiptIcon from "@mui/icons-material/Receipt";
import IPAccess from "./IPAccess";
import LeadSettings from "./LeadSettings";

import RolesList from "./RolesList";
import BankDetails from "./BankDetails";
import PixelSettings from "./PixelSettings";
import QCSettings from "./QCSettings";
import SuperadminShipmentChannels from "../shipmentchannels/SuperadminShipmentChannels";
import { baseApiUrl } from "@/api-manage/ApiRoutes";
import { getToken } from "@/utils/getToken";
import axios from "axios";

const poppins = Poppins({
  weight: "300",
  subsets: ["latin"],
});

const iconDict = {
  SettingsIcon: <SettingsIcon />,
  NotificationsIcon: <NotificationsIcon />,
  PaymentIcon: <PaymentIcon />,
  AccountBalanceIcon: <AccountBalanceIcon />,
  LockIcon: <LockIcon />,
  ColorLensIcon: <ColorLensIcon />,
  BackupIcon: <BackupIcon />,
  LocalShippingIcon: <LocalShippingIcon />,
  PeopleAltIcon: <PeopleAltIcon />,
  ShippingIcon: <ShippingIcon />,
  PhoneIcon: <PhoneIcon />,
  EmailIcon: <EmailIcon />,
  AssignmentIcon: <AssignmentIcon />,
  QuestionAnswerIcon: <QuestionAnswerIcon />,
  ManageAccountsIcon: <ManageAccountsIcon />,
  PrivacyTipIcon: <PrivacyTipIcon />,
  PlaceIcon: <PlaceIcon />,
  ListIcon: <ListIcon />,
  ChecklistIcon: <ChecklistIcon />,
  AssuredWorkloadIcon: <AssuredWorkloadIcon />,
  ReceiptIcon: <ReceiptIcon />,
};

const componentDict = {
  AppSettings: <AppSettings />,
  NotificationSettings: <NotificationSettings />,
  PaymentCredentials: <PaymentCredentials />,
  FinanceSettings: <FinanceSettings />,
  SocialLoginSettings: <SocialLoginSettings />,
  ThemeSettings: <ThemeSettings />,
  DatabaseBackupSettings: <DatabaseBackupSettings />,
  MaintainanceMode: <MaintainanceMode />,
  PixelSettings: <PixelSettings />,
  AdminSettings: <AdminSettings />,
  Branch: <Branch />,
  CourierServiceList: <CourierServiceList />,
  TelephonicChannelsList: <TelephonicChannelsList />,
  ShipmentChannelsList: <ShipmentChannelsList />,
  SuperadminShipmentChannels: <SuperadminShipmentChannels />,
  OrderStatus: <OrderStatus />,
  QCSettings: <QCSettings />,
  LeadSettings: <LeadSettings />,
  RolesList: <RolesList />,
  BankDetails: <BankDetails />,
  RolesAndPermissions: <RolesAndPermissions />,
  EInvoiceSettings: <EInvoiceSettings />,
  PickupPoint: <PickupPoint />,
  EmailSettings: <EmailSettings />,
  IPAccess: <IPAccess />,
};

const SettingsSidebarListItems = ({ type }) => {
  const defaultState = type === "superadmin" ? "App Settings" : "Admin Settings";
  const [selectedItem, setSelectedItem] = useState(defaultState);
  const [settingMenu, setSettingMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item.name);
  };

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get(`${baseApiUrl}setting_menu/`, {
          headers: { Authorization: `Token ${getToken()}` },
        });
        setSettingMenu(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuData();
  }, []);

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
            height: "100%",
            backgroundColor: "white",
            boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
            padding: 1,
          }}
        >
          <List>
            {settingMenu.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleItemClick(item)}
                sx={{
                  borderRadius: 1,
                  mb: 1,
                  transition: "all 0.3s ease",
                  backgroundColor:
                    selectedItem === item.name ? "#d7defabf" : "transparent",
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
                    {iconDict[item.icon]}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
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
      <Grid item xs={9.5} sx={{ height: "94vh", overflowY: "scroll", backgroundColor: "#f5f7fa", }}>
        <Box p={2}>
          {settingMenu.map((item) =>
            (type === item.for_user || item.for_user === "both") && selectedItem === item.name
              ? componentDict[item.component_name]
              : null
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default SettingsSidebarListItems;
