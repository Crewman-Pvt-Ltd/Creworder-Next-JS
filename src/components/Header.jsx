import React from "react";
import { Grid, Box, IconButton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = () => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        position: "sticky",
        top: 0,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
   
      <Grid container spacing={2} columns={16}>
  <Grid item xs={2.8} sx={{backgroundColor : "#405189", minHeight: "80px"}}>
  
  </Grid>
  <Grid item xs={13}>
  <Grid container alignItems="center">
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
              <IconButton color="black">
                <AccountCircleIcon />
              </IconButton>
            </Grid>
          </Grid>
  </Grid>
</Grid>
    </Box>
  );
};

export default Header;