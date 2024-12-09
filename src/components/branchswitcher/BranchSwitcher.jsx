import React, { useState } from "react";
import { Menu, MenuItem, Grid, Box, Typography } from "@mui/material";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"; // Static icon for all branches
import useGetAllBranches from "@/api-manage/react-query/useGetAllBranches";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const BranchSwitcher = () => {
  const { data, refetch, isLoading, isError } = useGetAllBranches();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickIcon = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AutoAwesomeMosaicIcon
        onClick={handleClickIcon}
        sx={{
          marginLeft: 1,
          backgroundColor: "#f9f8fe",
          color: "#405189",
          borderRadius: "50%",
          width: 40,
          height: 40,
          padding: "8px",
          transition: "background-color 0.3s, color 0.3s",
          "&:hover": {
            backgroundColor: "#405189",
            color: "#ffffff",
          },
          cursor: "pointer", // Add cursor pointer to indicate clickable
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          style: { height: "300px", width: "400px" },
        }}
      >
        <Grid container spacing={2} padding={1}>
          {data?.results.map((branch, index) => (
            <Grid item xs={4} key={index}>
              <MenuItem onClick={handleCloseMenu}>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: 1,
                    padding: 2,
                    height: "auto",
                    width: "120px",
                    textAlign: "center",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    "&:hover": { backgroundColor: "#f0f0f0" },
                  }}
                >
                  {/* Static Icon for Each Branch */}
                  <AccountBalanceIcon
                    sx={{ fontSize: 40, color: "#405189", marginBottom: 1 }}
                  />
                  <Typography className={poppins.className} variant="body2">{branch.name}</Typography>
                </Box>
              </MenuItem>
            </Grid>
          ))}
        </Grid>
      </Menu>
    </>
  );
};

export default BranchSwitcher;
