import React, { useState } from 'react';
import { Box, Card, Typography, CardContent, MenuItem, Select, FormControl, Divider } from '@mui/material';
import CustomCard from './CustomCard';

const BestSellingProducts = () => {
  const [filter, setFilter] = useState('Today');

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const products = [
    {
      image: 'https://www.themesbrand.com/velzon/html/master/assets/images/products/img-1.png',
      name: 'Branded T-Shirts',
      date: '24 Apr 2021',
      price: '$29.00',
      orders: 62,
      stock: 510,
      amount: '$1,798'
    },
    {
      image: 'https://www.themesbrand.com/velzon/html/master/assets/images/products/img-2.png',
      name: 'Bentwood Chair',
      date: '18 May 2021',
      price: '$99.00',
      orders: 34,
      stock: 120,
      amount: '$3,366'
    },
    {
        image: 'https://www.themesbrand.com/velzon/html/master/assets/images/products/img-3.png',
        name: 'Borosil Paper Cup',
        date: '01 Mar 2021',
        price: '$99.00',
        orders: 80,
        stock: 749,
        amount: '$1,120'
      },
      {
        image: 'https://www.themesbrand.com/velzon/html/master/assets/images/products/img-5.png',
        name: 'Stillbird Helmet',
        date: '18 May 2021',
        price: '$99.00',
        orders: 34,
        stock: 120,
        amount: '$3,366'
      },
      {
        image: 'https://www.themesbrand.com/velzon/html/master/assets/images/products/img-2.png',
        name: 'One Seater Sofa',
        date: '18 May 2021',
        price: '$99.00',
        orders: 34,
        stock: 120,
        amount: '$3,366'
      },
    // Add more products as needed
  ];

  return (
    <CustomCard>
      <CardContent>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Typography sx={{
            fontSize: '16px', fontWeight: 600, color: "#495057"
          }}>
            Best Selling Products
          </Typography>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
          }}>
            <Typography sx={{ fontSize: '13px', fontWeight: 'bold', color: "black" }}>
              SORT BY:
            </Typography>
            <FormControl size="small" sx={{ 
              minWidth: 120,
              '.MuiInputBase-root': { border: 'none' },
              '.MuiOutlinedInput-notchedOutline': { border: 'none' },
            }}>
              <Select
                labelId="sort-by-label"
                id="sort-by"
                value={filter}
                onChange={handleChange}
                sx={{ 
                  '.MuiSelect-icon': { color: 'black' },
                }}
              >
                <MenuItem value="Today">Today</MenuItem>
                <MenuItem value="Yesterday">Yesterday</MenuItem>
                <MenuItem value="Last 7 Days">Last 7 Days</MenuItem>
                <MenuItem value="Last 30 Days">Last 30 Days</MenuItem>
                <MenuItem value="This Month">This Month</MenuItem>
                <MenuItem value="Last Month">Last Month</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        {products.map((product, index) => (
          <React.Fragment key={index}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' , width: "200px" }}>
                <Box component="img" src={product.image} alt={product.name} sx={{ width: 50, height: 50, mr: 2 }} />
                <Box>
                  <Typography sx={{
                   fontSize: '13px', fontWeight: 600, color: "#495057"
                  }}>{product.name}</Typography>
                  <Typography sx={{
                    fontSize: '13px',  color: "#888888"
                  }}>{product.date}</Typography>
                </Box>
              </Box>
              <Box>
                <Typography sx={{
                   fontSize: '14px', color: "#282828"
                  }}>{product.price}</Typography>
                <Typography sx={{
                    fontSize: '13px',  color: "#888888"
                  }}>Price</Typography>
              </Box>
              <Box>
                <Typography sx={{
                   fontSize: '14px', color: "#282828"
                  }}>{product.orders}</Typography>
                <Typography sx={{
                    fontSize: '13px',  color: "#888888"
                  }}>Orders</Typography>
              </Box>
              <Box>
                <Typography sx={{
                   fontSize: '14px', color: "#282828"
                  }}>{product.stock}</Typography>
                <Typography sx={{
                    fontSize: '13px',  color: "#888888"
                  }}>Stock</Typography>
              </Box>
              <Box>
                <Typography sx={{
                   fontSize: '14px', color: "#282828"
                  }}>{product.amount}</Typography>
                <Typography sx={{
                    fontSize: '13px',  color: "#888888"
                  }}>Amount</Typography>
              </Box>
            </Box>
            {index < products.length - 1 && <Divider sx={{ my: 2 }} />}
          </React.Fragment>
        ))}
      </CardContent>
    </CustomCard>
  );
}

export default BestSellingProducts;
