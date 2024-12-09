import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  CardContent,
  MenuItem,
  Select,
  FormControl,
  Divider,
} from "@mui/material";
import CustomCard from "./CustomCard";

const TopSellers = () => {
  const [filter, setFilter] = useState("Report");

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const products = [
    {
      image:
        "https://www.themesbrand.com/velzon/html/master/assets/images/companies/img-2.png",
      name: "iTest Factory",
      date: "Oliver Tyler",
      price: "$29.00",
      orders: 62,
      stock: 510,
      amount: "$1,798",
    },
    {
      image:
        "https://www.themesbrand.com/velzon/html/master/assets/images/companies/img-3.png",
      name: "Digitech Galaxy",
      date: "John Roberts",
      price: "$99.00",
      orders: 34,
      stock: 120,
      amount: "$3,366",
    },
    {
      image:
        "https://www.themesbrand.com/velzon/html/master/assets/images/companies/img-1.png",
      name: "Zoetic Fashion",
      date: "Harley Fuller",
      price: "$99.00",
      orders: 80,
      stock: 749,
      amount: "$1,120",
    },
    {
      image:
        "https://www.themesbrand.com/velzon/html/master/assets/images/companies/img-8.png",
      name: "Meta4Systems",
      date: "James Bowen",
      price: "$99.00",
      orders: 34,
      stock: 120,
      amount: "$3,366",
    },
    {
        image:
          "https://www.themesbrand.com/velzon/html/master/assets/images/companies/img-5.png",
        name: "Nesta Technologies",
        date: "Zoe Dennis",
        price: "$99.00",
        orders: 34,
        stock: 120,
        amount: "$3,366",
      },
    // Add more products as needed
  ];

  return (
    <CustomCard>
      <CardContent>
        <Box sx={{
      
        }}>

        
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#495057",
            }}
          >
            Top Selling
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
           
            <FormControl
              size="small"
              sx={{
                minWidth: 120,
                ".MuiInputBase-root": { border: "none" },
                ".MuiOutlinedInput-notchedOutline": { border: "none" },
              }}
            >
              <Select
                labelId="sort-by-label"
                id="sort-by"
                value={filter}
                onChange={handleChange}
                sx={{
                  ".MuiSelect-icon": { color: "black" },
                }}
              >
                <MenuItem value="Report" sx={{ display: "none" }}>
                  Report
                </MenuItem>
                <MenuItem value="Download Report">Download Report</MenuItem>
                <MenuItem value="Import">Import</MenuItem>
                <MenuItem value="Export">Export</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        {products.map((product, index) => (
          <React.Fragment key={index}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 , height:30}}>
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
        ))} </Box>
      </CardContent>
    </CustomCard>
  );
};

export default TopSellers;
