import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  Divider,
  Avatar,
} from "@mui/material";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventIcon from '@mui/icons-material/Event';
import gummsi from "../../images/product-521132.webp";
import gummsi2 from "../../images/61fnbgodePL.jpg";

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [rating, setRating] = useState(4.5); // Example rating value

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const images = [gummsi, gummsi2, gummsi]; // Replace with actual image sources

  // Auto-carousel for images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prevActiveImage) => (prevActiveImage + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Grid container spacing={2} p={3}>
      {/* Left Section: Product Image and Thumbnails */}
      <Grid item xs={12} md={4}>
        <Card sx={{ mb: 2, p: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <ArrowBackIosNewIcon
              onClick={() =>
                setActiveImage((activeImage - 1 + images.length) % images.length)
              }
              sx={{ cursor: "pointer" }}
            />
            <Image src={images[activeImage]} alt="product" layout="responsive" />
            <ArrowForwardIosIcon
              onClick={() => setActiveImage((activeImage + 1) % images.length)}
              sx={{ cursor: "pointer" }}
            />
          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            {/* Thumbnail Images */}
            {images.map((img, index) => (
              <Avatar
                key={index}
                src={img.src}
                alt="thumbnail"
                variant="square"
                sx={{
                  width: 50,
                  height: 50,
                  mx: 0.5,
                  border:
                    index === activeImage ? "2px solid #000" : "1px solid #ccc",
                  cursor: "pointer",
                }}
                onClick={() => setActiveImage(index)}
              />
            ))}
          </Box>
        </Card>
      </Grid>

      {/* Right Section: Product Details */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            {/* Product Header */}
            <Typography variant="h5" fontWeight="bold">
              Gummsi Gummies
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Regulate Sleep Cycle | Promotes Relaxation
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
              <Rating value={rating} precision={0.1} readOnly />
              <Typography variant="body2" ml={1}>
                (5.50k Customer Review)
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />

            {/* Pricing and Stock Information with Icons */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center">
                      <ShoppingCartIcon sx={{ mr: 1 }} />
                      <Typography variant="h6" fontWeight="bold">
                      SKU:
                      </Typography>
                    </Box>
                    <Typography variant="body1">SFC-WL</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center">
                      <PriceCheckIcon sx={{ mr: 1 }} />
                      <Typography variant="h6" fontWeight="bold">
                        Price:
                      </Typography>
                    </Box>
                    <Typography variant="body1">₹120.40</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center">
                      <Inventory2Icon sx={{ mr: 1 }} />
                      <Typography variant="h6" fontWeight="bold">
                      Quantity:
                      </Typography>
                    </Box>
                    <Typography variant="body1">500</Typography>
                  </CardContent>
                </Card>
              </Grid>
             
              <Grid item xs={12} sm={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center">
                      <AttachMoneyIcon sx={{ mr: 1 }} />
                      <Typography variant="h6" fontWeight="bold">
                      GST:
                      </Typography>
                    </Box>
                    <Typography variant="body1">0%</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center">
                      <CheckCircleIcon sx={{ mr: 1 }} />
                      <Typography variant="h6" fontWeight="bold">
                      In Stock:
                      </Typography>
                    </Box>
                    <Typography variant="body1">Available</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center">
                      <EventIcon sx={{ mr: 1 }} />
                      <Typography variant="h6" fontWeight="bold">
                        Created Date:
                      </Typography>
                    </Box>
                    <Typography variant="body1">03 Aaugust 2024</Typography>
                  </CardContent>
                </Card>
              </Grid>
              
            </Grid>

            {/* Size and Color Options */}
            <Box mt={2}>
              <Typography variant="h6" fontWeight="bold">
                Sizes:
              </Typography>
              <Box display="flex" mt={1}>
                {["S", "M", "L", "XL"].map((size) => (
                  <Button
                    key={size}
                    variant="outlined"
                    sx={{ mr: 1, textTransform: "none" }}
                  >
                    {size}
                  </Button>
                ))}
              </Box>
            </Box>

            <Box mt={2}>
              <Typography variant="h6" fontWeight="bold">
                Colors:
              </Typography>
              <Box display="flex" mt={1}>
                {["#000", "#f00", "#0f0", "#00f", "#ff0", "#f0f", "#0ff"].map(
                  (color) => (
                    <Box
                      key={color}
                      sx={{
                        width: 24,
                        height: 24,
                        backgroundColor: color,
                        borderRadius: "50%",
                        border: "1px solid #ccc",
                        mr: 1,
                        cursor: "pointer",
                      }}
                    ></Box>
                  )
                )}
              </Box>
            </Box>

            {/* Product Description */}
            <Box mt={3}>
              <Typography variant="h6" fontWeight="bold">
                Description:
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{fontsize: '20px'}}>
                Tommy Hilfiger men striped pink sweatshirt. Crafted with cotton.
                Material composition is 100% organic cotton. This is one of the
                world's leading designer lifestyle brands and is internationally
                recognized for celebrating the essence of classic American cool
                style, featuring preppy with a twist designs.
              </Typography>
            </Box>

            {/* Specification and Reviews Tabs */}
            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mt: 3 }}>
            <b><Tab label="Specification" /></b>
            <b><Tab label="Details" /></b>
            </Tabs>
            <Divider sx={{ my: 2 }} />

            {/* Specification Content */}
            {activeTab === 0 && (
               <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2">
                <CheckCircleIcon fontSize="small" color="success" style={{ verticalAlign: 'middle', marginRight: 4 }} />
                <b>Category:</b> T-Shirt
              </Typography>
              <Typography variant="body2">
                <CheckCircleIcon fontSize="small" color="success" style={{ verticalAlign: 'middle', marginRight: 4 }} />
                <b>Brand:</b> Tommy Hilfiger
              </Typography>
              <Typography variant="body2">
                <CheckCircleIcon fontSize="small" color="success" style={{ verticalAlign: 'middle', marginRight: 4 }} />
                <b>Color:</b> Blue
              </Typography>
              <Typography variant="body2">
                <CheckCircleIcon fontSize="small" color="success" style={{ verticalAlign: 'middle', marginRight: 4 }} />
                <b>Material:</b> Cotton
              </Typography>
              <Typography variant="body2">
                <CheckCircleIcon fontSize="small" color="success" style={{ verticalAlign: 'middle', marginRight: 4 }} />
                <b>Weight:</b> 140 Gram
              </Typography>
            </Grid>
          </Grid>
        </Box>
            )}
            {activeTab === 1 && (
              <Box>
                <Typography variant="body2">
                  {/* Add more detailed product information here */}
                  This is the details section.
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
