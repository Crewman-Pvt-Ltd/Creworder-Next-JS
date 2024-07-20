
import React from 'react';
import { Card } from '@mui/material';
import { styled } from '@mui/system';


const StyledCard = styled(Card)(({ theme, mb_padding }) => ({

  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#fff',
  padding: mb_padding,
  borderRadius: '5px',
  boxShadow: "0 1px 2px rgba(56, 65, 74, 0.15)",
 '&:hover': {
   
  },
}));

const CustomCard = ({ children, padding }) => {
  return <StyledCard mb_padding={padding}>{children}</StyledCard>;
};

export default CustomCard;
