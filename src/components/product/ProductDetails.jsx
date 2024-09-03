import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import LockIcon from "@mui/icons-material/Lock";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GiftIcon from "@mui/icons-material/CardGiftcard";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CustomCard from "../CustomCard";
import { Poppins } from "next/font/google";
import CreateIcon from '@mui/icons-material/Create';
import creworder from '../../images/product-521132.webp';
import Image from 'next/image';
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  return (
    <Grid container spacing={2} p={3}>     
      <Grid item xs={12} md={3} sm={3}>  
        <Card sx={{ mb: 2 }}>
          <CardContent>           
          <Image 
            src={creworder}
            alt="product"            
            />                 
             <Typography variant="h6" fontWeight="bold">Product Information</Typography>
             <Typography variant="body2" padding={1}><b>Product ID:</b> PR19YL67</Typography> 
             <Typography variant="body2" padding={1}><b>Product Name:</b> Gummsi Gummies</Typography> 
             <Typography variant="body2" padding={1}><b>Category Name:</b> </Typography>
             <Typography variant="body2" padding={1}><b> Status:</b> Active</Typography>
          </CardContent>
          <CardActions>
          <div>
             
              <Button
                className={poppins.className}
                color="error"
                startIcon={<CancelIcon />}
                sx={{
                  marginRight: 1,
                  fontSize: "11px",
                  backgroundColor: "#fde8e4",
                }}
              >
                Action
              </Button>
              <Button
                className={poppins.className}
                startIcon={<CreateIcon />}
                sx={{
                  
                  fontSize: "11px",
                  backgroundColor: "#dff0fa",
                }}
              >
               Edit
              </Button>
            </div>
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={9} md={9} sm={9}>
  <CustomCard>
    <CardContent>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab
          icon={<LocalMallIcon />}
          style={{ display: 'flex' }}
          className={poppins.className}
          label="Product Information"
        />
      </Tabs>
      <Divider sx={{ my: 2 }} />
      {activeTab === 0 && (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold">
                Product Details
              </Typography>
              <Grid container spacing={2}>
                {/* SKU Card */}
                <Grid item xs={12} sm={3}>
                  <Card sx={{ bgcolor: '#f3e5f5', p: 2, textAlign: 'center' }}>
                    <Typography variant="h6" fontWeight="bold">
                      SFC-WL
                    </Typography>
                    <Typography variant="subtitle2">SKU</Typography>
                  </Card>
                </Grid>
                {/* Price Card */}
                <Grid item xs={12} sm={3}>
                  <Card sx={{ bgcolor: '#e0f7fa', p: 2, textAlign: 'center' }}>
                    <Typography variant="h6" fontWeight="bold">
                      ₹ 4499
                    </Typography>
                    <Typography variant="subtitle2">Price</Typography>
                  </Card>
                </Grid>
                {/* Quantity Card */}
                <Grid item xs={12} sm={3}>
                  <Card sx={{ bgcolor: '#fce4ec', p: 2, textAlign: 'center' }}>
                    <Typography variant="h6" fontWeight="bold">
                      500
                    </Typography>
                    <Typography variant="subtitle2">Quantity</Typography>
                  </Card>
                </Grid>
                {/* GST Card */}
                <Grid item xs={12} sm={3}>
                  <Card sx={{ bgcolor: '#fce4ec', p: 2, textAlign: 'center' }}>
                    <Typography variant="h6" fontWeight="bold">
                      0%
                    </Typography>
                    <Typography variant="subtitle2">GST</Typography>
                  </Card>
                </Grid>
                {/* Available Card */}
                <Grid item xs={12} sm={4}>
                  <Card sx={{ bgcolor: '#e0f7fa', p: 2, textAlign: 'center' }}>
                    <Typography variant="h6" fontWeight="bold">
                      In Stock
                    </Typography>
                    <Typography variant="subtitle2">Available</Typography>
                  </Card>
                </Grid>
                {/* Created At Card */}
                <Grid item xs={12} sm={4}>
                  <Card sx={{ bgcolor: '#fce4ec', p: 2, textAlign: 'center' }}>
                    <Typography variant="h6" fontWeight="bold">
                      2023-06-10
                    </Typography>
                    <Typography variant="subtitle2">Created At</Typography>
                  </Card>
                </Grid>
                {/* Updated At Card */}
                <Grid item xs={12} sm={4}>
                  <Card sx={{ bgcolor: '#e1bee7', p: 2, textAlign: 'center' }}>
                    <Typography variant="h6" fontWeight="bold">
                      2024-06-19
                    </Typography>
                    <Typography variant="subtitle2">Updated At</Typography>
                  </Card>
                </Grid>
              </Grid>
              {/* Descriptions Section */}
              <Box mt={3}>
                <Typography variant="h6" fontWeight="bold">
                  Descriptions
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography
                  variant="body1"
                  sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 4, // Limits the text to 4 lines
                    lineHeight: '1.5em', // Adjust line height as needed
                    maxHeight: '6em' // 4 lines * 1.5em line height
                  }}
                >
                  Slim Fit Combo. This combo includes a variety of slim fit options designed to provide a comfortable and stylish look for any occasion. Featuring high-quality materials and a modern cut, each piece in this combo is crafted to enhance your silhouette while providing ease of movement. Ideal for both casual and formal settings, this slim fit combo is perfect for those who appreciate versatile and chic fashion choices. 
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </CardContent>
  </CustomCard>
</Grid>

    </Grid>
  );
};

export default ProductDetails;
