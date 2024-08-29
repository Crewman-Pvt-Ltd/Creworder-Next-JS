import React, { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ScoreIcon from "@mui/icons-material/Score";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { usePermissions } from "@/contexts/PermissionsContext";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  const { permissionsData } = usePermissions();
  const [activeTab, setActiveTab] = useState(0);

  const handleEdit = () => {
    router.push("/profile/edit");
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  return (
    <Grid
      container
      sx={{
        backgroundColor: "#f3f3f9",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          background: "linear-gradient(to right, #c33764d9, #1d2671d6)",
          padding: "16px",
          height: "150px",
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid
            item
            sx={{
              display: "flex",
            }}
          >
            <img
              src="https://www.themesbrand.com/velzon/html/master/assets/images/users/avatar-1.jpg"
              alt="Profile"
              style={{
                marginRight: "8px",
                width: "110px",
                height: "110px",
                borderRadius: "50%",
                border: "5px solid white",
                objectFit: "cover",
              }}
            />
            <Grid
              item
              sx={{
                padding: "10px 25px",
              }}
            >
              <Typography fontSize="22px" color="white">
                {permissionsData?.user?.username}
              </Typography>
              <Typography variant="body2" color="#d1d1d1">
                Owner & Founder
              </Typography>
              <Typography
                marginTop={2}
                variant="body2"
                color="#d1d1d1"
                display="flex"
                alignItems="center"
              >
                <MailOutlineIcon sx={{ marginRight: 1 }} />
                {permissionsData?.user?.email}
              </Typography>
            </Grid>
          </Grid>
          <Grid item sx={{ display: "flex", gap: 2, textAlign: "center" }}>
            <div>
              <Typography variant="body1" fontSize="23px" color="white">
                ₹240
              </Typography>
              <Typography variant="body2" color="#bfbdbd">
                Total Earnings
              </Typography>
            </div>
            <div>
              <Typography variant="body1" fontSize="23px" color="white">
                12
              </Typography>
              <Typography variant="body2" color="#bfbdbd">
                Total Orders
              </Typography>
            </div>
            <div>
              <Typography variant="body1" fontSize="23px" color="white">
                22
              </Typography>
              <Typography variant="body2" color="#bfbdbd">
                Total Delivered
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Tabs sx={{
            height:"10px",
            alignItems:"center",
          }}
            value={activeTab}
            onChange={handleTabChange}
            TabIndicatorProps={{
              sx: {
                backgroundColor: "#00b894",
                height: "4px",
                top: 0,
              },
            }}
          >
            <Tab
              icon={
                <PersonIcon
                  sx={{ color: activeTab === 0 ? "#00b894" : "inherit" }}
                />
              }
              iconPosition="start"
              label="Profile"
              sx={{
                textTransform: "none",
                bgcolor: activeTab === 0 ? "#fff" : "transparent",
                borderTopLeftRadius: "4px",
                borderTopRightRadius: "4px",
              }}
            />
            <Tab
              icon={
                <AssessmentIcon
                  sx={{ color: activeTab === 1 ? "#00b894" : "inherit" }}
                />
              }
              iconPosition="start"
              label="Performance"
              sx={{
                textTransform: "none",
                bgcolor: activeTab === 1 ? "#fff" : "transparent",
                borderTopLeftRadius: "4px",
                borderTopRightRadius: "4px",
              }}
            />
            <Tab
              icon={
                <ScoreIcon
                  sx={{ color: activeTab === 2 ? "#00b894" : "inherit" }}
                />
              }
              iconPosition="start"
              label="QC Score"
              sx={{
                textTransform: "none",
                bgcolor: activeTab === 2 ? "#fff" : "transparent",
                borderTopLeftRadius: "4px",
                borderTopRightRadius: "4px",
              }}
            />
          </Tabs>
          <Divider />
        </Grid>

        <Divider />

        <Grid item xs={12} sm={6} md={6}>
          {activeTab === 0 && (
            <Box  sx={{
              marginLeft:"10px",
            }}>
              <Box
                sx={{
                 
                //  marginRight:"10px",
                }}
              >
                <Button
                  onClick={handleEdit}
                  sx={{
                    fontSize: "14px",
                    backgroundColor: "#388d38",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#334a6c",
                    },
                  }}
                >
                  Edit profile
                </Button>
              </Box>

              {[
                {
                  label: "User Id",
                  value: permissionsData?.user?.profile?.employee_id,
                },
                {
                  label: "Gender",
                  value:
                    permissionsData?.user?.profile?.gender === "m"
                      ? "Male"
                      : permissionsData?.user?.profile?.gender === "f"
                      ? "Female"
                      : permissionsData?.user?.profile?.gender === "t"
                      ? "Transgender"
                      : "Unknown",
                },
                { label: "User Role", value: permissionsData?.role },
                { label: "User Email", value: permissionsData?.user?.email },
                {
                  label: "Created",
                  value: formatDate(permissionsData?.user?.date_joined),
                },
                {
                  label: "Last Login",
                  value: formatDate(permissionsData?.user?.last_login),
                },
              ].map((item, index) => (
                <Grid
                  key={index}
                  container
                  sx={{
                    display: "flex",
                    marginTop: "10px",
                    padding: "6px",
                 
                  }}
                >
                  <Grid item xs={6} sm={6} md={6}>
                    <Typography
                      sx={{
                        color: "gray",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <Typography>{item.value}</Typography>
                  </Grid>
                </Grid>
              ))}
            </Box>
          )}
          {activeTab === 1 && (
            <Box>{/* Performance-related content here */}</Box>
          )}
          {activeTab === 2 && <Box>{/* QC Score-related content here */}</Box>}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Profile;
