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
import { useRouter } from "next/router";
import Rating from "@mui/material/Rating";
import useGetAllProduct from "@/api-manage/react-query/useGetAllProduct";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventIcon from "@mui/icons-material/Event";

const ProductDetails = () => {
  const { data, refetch } = useGetAllProduct(); 
  const [activeTab, setActiveTab] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [rating, setRating] = useState(4.5);
  const router = useRouter();
  const { Id } = router.query;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    if (data && Id) {
      // Directly filter data by product ID
      setSelectedProduct(data.find((product) => product.id === parseInt(Id)));
    }
  }, [data, Id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductImages([selectedProduct.product_image]);
    }
  }, [selectedProduct]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prevActiveImage) => (prevActiveImage + 1) % productImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [productImages.length]);

  if (!selectedProduct) {
    return <Typography variant="h6">Product not found.</Typography>;
  }

  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={12} md={4}>
        <Card sx={{ mb: 2, p: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <ArrowBackIosNewIcon
              onClick={() =>
                setActiveImage((activeImage - 1 + productImages.length) % productImages.length)
              }
              sx={{ cursor: "pointer" }}
            />
            <Image
              src={productImages[activeImage]}
              alt="product"
              layout="responsive"
              width={600}
              height={600}
            />
            <ArrowForwardIosIcon
              onClick={() => setActiveImage((activeImage + 1) % productImages.length)}
              sx={{ cursor: "pointer" }}
            />
          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            {productImages.map((img, index) => (
              <Avatar
                key={index}
                src={img}
                alt="thumbnail"
                variant="square"
                sx={{
                  width: 50,
                  height: 50,
                  mx: 0.5,
                  border: index === activeImage ? "2px solid #000" : "1px solid #ccc",
                  cursor: "pointer",
                }}
                onClick={() => setActiveImage(index)}
              />
            ))}
          </Box>
        </Card>
      </Grid>

      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h5" fontWeight="bold">
              {selectedProduct.product_name}
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
              <Rating value={rating} precision={0.1} readOnly />
              <Typography variant="body2" ml={1}>
                (5.50k Customer Review)
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />

         {/* Product Information */}
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
                    <Typography variant="body1">{selectedProduct.product_sku}</Typography>
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
                    <Typography variant="body1">₹{selectedProduct.product_price}</Typography>
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
                    <Typography variant="body1">{selectedProduct.product_quantity}</Typography>
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
                    <Typography variant="body1">{selectedProduct.product_gst_percent}%</Typography>
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
                    <Typography variant="body1">
                      {selectedProduct.product_availability === 1 ? "Out of Stock" : "In Stock"}
                    </Typography>
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
                    <Typography variant="body1">
                      {new Date(selectedProduct.product_created).toISOString().split("T")[0]}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
              {/* Sizes */}
              <Box mt={2}>
              <Typography variant="h6" fontWeight="bold">
                Sizes:
              </Typography>
              <Box display="flex" mt={1}>
                {["S", "M", "L", "XL"].map((size) => (
                  <Button key={size} variant="outlined" sx={{ mr: 1, textTransform: "none" }}>
                    {size}
                  </Button>
                ))}
              </Box>
            </Box>

             {/* Description */}
             <Box mt={3}>
              <Typography variant="h6" fontWeight="bold">
                Description:
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ fontSize: "18px" }}
              >
                {selectedProduct.product_description}
              </Typography>
            </Box>
            {/* Tabs */}
            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mt: 3 }}>
              <Tab label="Specification" />
            </Tabs>
            <Divider sx={{ my: 2 }} />
            {activeTab === 0 && (
              <Box>
                <Typography variant="body2">
                  <CheckCircleIcon
                    fontSize="small"
                    color="success"
                    style={{ verticalAlign: "middle", marginRight: 4 }}
                  />
                  <b>Product Id:</b> {selectedProduct.product_id}
                </Typography>
                <Typography variant="body2">
                  <CheckCircleIcon
                    fontSize="small"
                    color="success"
                    style={{ verticalAlign: "middle", marginRight: 4 }}
                  />
                  <b>HSN Code:</b> {selectedProduct.product_hsn_number}
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
