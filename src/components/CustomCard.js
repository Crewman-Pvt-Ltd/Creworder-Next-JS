
import React from 'react';
import { Card } from '@mui/material';
import { styled } from '@mui/system';


const StyledCard = styled(Card)(({ theme }) => ({

  borderRadius: theme.shape.borderRadius,

  backgroundColor: '#fff',

  borderRadius: '20px',
  
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
 '&:hover': {
   
  },
}));

const CustomCard = ({ children }) => {
  return <StyledCard>{children}</StyledCard>;
};

export default CustomCard;
