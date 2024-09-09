import React, { useState } from 'react';
import { Button, Menu, MenuItem, Grid, Box } from '@mui/material';
import useGetAllBranches from '@/api-manage/react-query/useGetAllBranches';
const branches = ['Branch 1', 'Branch 2', 'Branch 3', 'Branch 4', 'Branch 5', 'Branch 6'];

const BranchSwitcher = () => {
    const { data, refetch, isLoading, isError } = useGetAllBranches();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpenMenu}>
        Branch
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          style: { height: "300px", width: '400px' },
        }}
      >
        <Grid container spacing={2} padding={1}>
          {data?.results.map((branch, index) => (
            <Grid item xs={6} key={index}>
              <MenuItem onClick={handleCloseMenu}>
                <Box
                  sx={{
                    border: '1px solid #ddd',
                    borderRadius: 1,
                    padding: 2,
                    height:"50px",
                    width:"150px",
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: '#f0f0f0' },
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
