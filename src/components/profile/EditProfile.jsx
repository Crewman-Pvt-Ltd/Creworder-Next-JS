import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Typography,
  Box,
  Button,
  Divider,
  CardContent,
  TextField,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { usePermissions } from '@/contexts/PermissionsContext';

const EditProfile = () => {
  const { fetchPermissions, permissionsData } = usePermissions();
  
  // State variables for form fields
  const [userId, setUserId] = useState('');
  const [gender, setGender] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [lastLogin, setLastLogin] = useState('');

  // Update state variables when permissionsData changes
  useEffect(() => {
    if (permissionsData) {
      setUserId(permissionsData.user?.profile?.employee_id || '');
      setGender(
        permissionsData.user?.profile?.gender === 'm'
          ? 'Male'
          : permissionsData.user?.profile?.gender === 'f'
            ? 'Female'
            : permissionsData.user?.profile?.gender === 't'
              ? 'Transgender'
              : 'Unknown'
      );
      setUserRole(permissionsData.role || '');
      setUserEmail(permissionsData.user?.email || '');
      setCreatedDate(permissionsData.user?.date_joined || '');
      setLastLogin(permissionsData.user?.last_login || '');
    }
  }, [permissionsData]);

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
          <Card
            sx={{
              width: "900px",
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
                <Typography fontSize="16px"><b>EDIT USER INFORMATION</b></Typography>
              </Box>{" "}
              <Divider sx={{ my: 2 }} />

              <Grid
                container
                spacing={2}
                sx={{
                  marginTop: "10px",
                  padding: "6px",
                }}
              >
                <Grid item xs={6}>
                  <Typography sx={{ color: "gray" }}>User Id</Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: "gray" }}>Gender</Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: "gray" }}>User Role</Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: "gray" }}>User Email</Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: "gray" }}>Created</Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={createdDate}
                    onChange={(e) => setCreatedDate(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: "gray" }}>Last Login</Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={lastLogin}
                    onChange={(e) => setLastLogin(e.target.value)}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <br></br>
              <Button
                sx={{
                  fontSize: "14px",
                  backgroundColor: "#405189",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#334a6c",
                  },
                }}
              >
                Submit
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditProfile;
