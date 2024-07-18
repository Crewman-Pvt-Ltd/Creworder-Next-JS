import React from 'react';
import { Grid, Typography } from '@mui/material';

const ProfileHeader = () => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
        <img
          src="https://www.themesbrand.com/velzon/html/master/assets/images/users/avatar-1.jpg"
          alt="Profile"
          style={{
            marginRight: '8px',
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            border: '5px solid white',
          }}
        />
        <Grid container direction="column" spacing={0.5}>
          <Grid item>
            <Typography fontSize="14px" color="black">
              Full Name
            </Typography>
          </Grid>
          <Grid item>
            <Typography fontSize="12px" color="#9e9b9b">
              Owner & Founder
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileHeader;
