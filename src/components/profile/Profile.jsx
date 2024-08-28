import React, { useState } from "react";
import {
  Grid,
  Card,
  Typography,
  Box,
  Button,
  Divider,
  CardContent,
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
  const { fetchPermissions, permissionsData } = usePermissions();
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
          height: "300px",
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
        <Grid container justifyContent="center" sx={{ marginTop: "40px" }}>
          <Card sx={{ width: "800px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 16px",
              }}
            >
              <Tabs
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
                    bgcolor: activeTab === 0 ? "#f0f2f5" : "transparent",

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
                    bgcolor: activeTab === 1 ? "#f0f2f5" : "transparent",

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
                    bgcolor: activeTab === 2 ? "#f0f2f5" : "transparent",

                    borderTopLeftRadius: "4px",
                    borderTopRightRadius: "4px",
                  }}
                />
              </Tabs>
          
            </Box>

            <Divider />
            <CardContent>
              {activeTab === 0 && (
                <Box>
                    <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      onClick={handleEdit}
                      sx={{
                        fontSize: "14px",
                        backgroundColor: "#405189",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#334a6c",
                        },
                      }}
                    >
                      Edit profile
                    </Button>
                  </Box>
                
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "10px",
                      padding: "6px",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "gray",
                      }}
                    >
                      User Id
                    </Typography>
                    <Typography>
                      {permissionsData?.user?.profile?.employee_id}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "10px",
                      padding: "6px",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "gray",
                      }}
                    >
                      Gender
                    </Typography>
                    <Typography>
                      {permissionsData?.user?.profile?.gender === "m"
                        ? "Male"
                        : permissionsData?.user?.profile?.gender === "f"
                        ? "Female"
                        : permissionsData?.user?.profile?.gender === "f"
                        ? "Transgender"
                        : "Unknown"}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "10px",
                      padding: "6px",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "gray",
                      }}
                    >
                      User Role
                    </Typography>
                    <Typography>{permissionsData?.role}</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "10px",
                      padding: "6px",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "gray",
                      }}
                    >
                      User Email
                    </Typography>
                    <Typography>{permissionsData?.user?.email}</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "10px",
                      padding: "6px",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "gray",
                      }}
                    >
                      Created
                    </Typography>
                    <Typography suppressHydrationWarning>
                      {formatDate(permissionsData?.user?.date_joined)}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "10px",
                      padding: "6px",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "gray",
                      }}
                    >
                      Last Login
                    </Typography>
                    <Typography suppressHydrationWarning>
                      {formatDate(permissionsData?.user?.last_login)}
                    </Typography>
                  </Grid>
                </Box>
              )}
              {activeTab === 1 && (
                <Box>{/* Add your performance-related content here */}</Box>
              )}
              {activeTab === 2 && (
                <Box>{/* Add your QC score-related content here */}</Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Profile;
