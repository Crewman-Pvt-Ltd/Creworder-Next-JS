import React from "react";
import {
  Grid,
  Card,
  Typography,
  Box,
  Button,
  Divider,
  CardContent,
} from "@mui/material";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { usePermissions } from '@/contexts/PermissionsContext';
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  // Example data to be passed as a prop
const handleedit = () => {
  router.push("/profile/edit");
};
  const { fetchPermissions, permissionsData } = usePermissions();

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
                src="https://www.themesbrand.com/velzon/html/master/assets/images/users/avatar-1.jpg" // External image URL
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
          <Grid container justifyContent="" sx={{ marginTop: "40px" }}>
            <Card
              sx={{
                //   height: "400px",
                width: "800px",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography fontSize="16px">USER INFORMATION</Typography>
                 <Button onClick={ handleedit }
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
                </Box>{" "}
                <Divider sx={{ my: 2 }} />

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
                  <Typography>{permissionsData?.user?.profile?.employee_id}</Typography>
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
                    {permissionsData?.user?.profile?.gender === 'm'
                      ? 'Male'
                      : permissionsData?.user?.profile?.gender === 'f'
                        ? 'Female'
                        : permissionsData?.user?.profile?.gender === 'f'
                          ? 'Transgender'
                          : 'Unknown'
                    }</Typography>
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
                  <Typography suppressHydrationWarning>{Date(permissionsData?.user?.date_joined)}</Typography>
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
                  <Typography suppressHydrationWarning>{Date(permissionsData?.user?.last_login)}</Typography>
                </Grid>

              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    
  );
};

export default Profile;