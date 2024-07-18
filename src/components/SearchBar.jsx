import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

const SearchBar = ({ onSearch }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <TextField
        variant="outlined"
        placeholder="Search..."
        size="small"
        onChange={(e) => onSearch(e.target.value)}
        sx={{
          backgroundColor: '#f3f3f9', // Light background color
          borderRadius: 1, // Slight rounding of corners
          width: '300px', // Full width
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'transparent', // Remove border color
            },
            '&:hover fieldset': {
              borderColor: 'transparent', // Remove border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent', // Remove border color on focus
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
