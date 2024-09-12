import React, { useState } from "react";
import { Button, Menu, MenuItem, Grid, Box } from "@mui/material";

import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import useGetAllBranches from "@/api-manage/react-query/useGetAllBranches";


const BranchSwitcher = () => {
  const { data, refetch, isLoading, isError } = useGetAllBranches();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AutoAwesomeMosaicIcon
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
            <Grid item xs={6} key={index}>
              <MenuItem onClick={handleCloseMenu}>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: 1,
                    padding: 2,
                    height: "50px",
                    width: "150px",
                    textAlign: "center",
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f0f0f0" },
                  }}
                >
                  {branch.name}
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
