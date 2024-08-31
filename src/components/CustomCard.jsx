
import React from 'react';
import { Card } from '@mui/material';
import { styled } from '@mui/system';


const StyledCard = styled(Card)(({ theme, mb_padding, margin }) => ({

  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#fff',
  padding: mb_padding,
  margin: margin,
  borderRadius: '4px',
  boxShadow: "0 1px 2px rgba(56, 65, 74, 0.15)",
 '&:hover': {
   
  },
}));

const CustomCard = ({ children, padding, margin }) => {
  return <StyledCard mb_padding={padding} margin={margin}>{children}</StyledCard>;
};

export default CustomCard;
