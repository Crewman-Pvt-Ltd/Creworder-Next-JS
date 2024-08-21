import React, { useState, useEffect } from "react";
import {Grid, Typography, Divider, CardContent, Button, IconButton, Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle, 
  DialogContent, DialogActions } from "@mui/material";
import CustomCard from "../CustomCard";
import CustomLabel from "../CustomLabel";
import CustomTextField from "../CustomTextField";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";

// Importing the Poppins font with weight 300
const poppins = Poppins({
  weight: "500",
  subsets: ['latin']
});

const CreateProduct = () => {
  const router = useRouter();
  
  const orderlist = () => {
    router.push("/admin/product");
  };

  const [gst, setgst] = useState('');

  const [paymentMode, setPaymentMode] = React.useState("");
  // Handle change for courseDuration
  const handlegst = (event) => {
    setgst(event.target.value);
  };
 

  const [productAvailability, setproductAvailability] = useState('');
  // Handle change for courseDuration
  const handleproductAvailability = (event) => {
    setproductAvailability(event.target.value);
  };

  const [category, setcategory] = useState('');
  // Handle change for courseDuration
  const handlecategory = (event) => {
    setcategory(event.target.value);
  };

  const [ProductName, setProductName] = useState('');
  // Handle change for courseDuration
  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };
  const [products, setProducts] = useState([{ productName: '', quantity: 1, price: 0, total: 0 }]);
  const [discount, setDiscount] = useState(null);
  const [grossAmount, setGrossAmount] = useState(0);
  const [payableAmount, setPayableAmount] = useState(0);
  const [codAmount, setCodAmount] = useState(0);
  const [paymentType, setPaymentType] = useState('');

  useEffect(() => {
    // Calculate the gross amount based on the products
    const totalGross = products.reduce((acc, product) => acc + product.total, 0);
    setGrossAmount(totalGross);

    // Calculate payable amount after discount
    const totalPayable = totalGross - discount;
    setPayableAmount(totalPayable);
    setCodAmount(totalPayable); // Assuming COD amount is the same as payable amount
  }, [products, discount]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...products];
    updatedProducts[index][name] = value;
    setProducts(updatedProducts);
  };

  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography
              sx={{ 
                fontSize: "16px", 
                fontWeight: "600", 
                fontFamily: poppins.style.fontFamily 
              }}
            >
              Add Product
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography sx={{ fontFamily: poppins.style.fontFamily }}>
                Create Product Form :
                </Typography>
              </Grid>

              {/* Personal Details Fields */}
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="product_name" required>
                Product Name
                </CustomLabel>
                <CustomTextField
                  id="product_name"
                  name="product_name"
                  placeholder="e.g. PRO34XP"
                  type="text"
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="sku" required>
                  SKU
                </CustomLabel>
                <CustomTextField
                  id="sku"
                  name="sku"
                  placeholder="e.g. SKU98765E22"
                  type="text"
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomLabel htmlFor="quantity" required>
                Quantity
                </CustomLabel>
                <CustomTextField
                  id="quantity"
                  name="quantity"
                  placeholder="e.g. quantity"
                  type="text"
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomLabel htmlFor="price" required>
                Price
                </CustomLabel>
                <CustomTextField
                  id="price"
                  name="price"
                  placeholder="e.g. price"
                  type="text"
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <CustomLabel htmlFor="hsn_code" required>
                Product HSN Code
                </CustomLabel>
                <CustomTextField
                  id="hsn_code"
                  name="hsn_code"
                  placeholder="e.g. HSN Code"
                  type="text"
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
              <CustomLabel htmlFor="course-order" required>
              GST (in %)
              </CustomLabel>
              <Select
                labelId="gst"
                id="gst"
                name="gst"
                value={gst}
                onChange={handlegst}
                displayEmpty 
                sx={{ fontFamily: 'Poppins, sans-serif', height: '40px' }} 
                fullWidth>
                <MenuItem value="" disabled>
                  Select GST
                </MenuItem>
                <MenuItem value={1}>0%</MenuItem>
                <MenuItem value={2}>5%</MenuItem>
                <MenuItem value={3}>18%</MenuItem>
                <MenuItem value={4}>28%</MenuItem>
              </Select>
          </Grid>
          <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="postalcode" required>
                  Images
                </CustomLabel>
                <CustomTextField
                id="images"
                name="images"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files[0])} // Handle image upload
                required
                fullWidth
              />
              </Grid>
              <Grid item xs={12} sm={4}>
              <CustomLabel htmlFor="course-order" required>
              Category
              </CustomLabel>
              <Select
                labelId="category"
                id="category"
                name="category"
                value={category}
                onChange={handlecategory}
                displayEmpty // This makes the empty string display as the placeholder
                sx={{ fontFamily: 'Poppins, sans-serif', height: '40px' }} // Set minHeight
                fullWidth>
                <MenuItem value="" disabled>
                  Select Category
                </MenuItem>
                <MenuItem value={1}>Weight Gain</MenuItem>
                <MenuItem value={2}>Weight Loss</MenuItem>
                <MenuItem value={2}> Women's Wellness</MenuItem>
                <MenuItem value={2}>Man Wellness</MenuItem>
                <MenuItem value={2}>Diabetes Cure</MenuItem>               
              </Select>
             </Grid>
             <Grid item xs={12} sm={4}>
              <CustomLabel htmlFor="course-order" required>
              Availability
              </CustomLabel>
              <Select
                labelId="productAvailability"
                id="productAvailability"
                name="productAvailability"
                value={productAvailability}
                onChange={handleproductAvailability}
                displayEmpty 
                sx={{ fontFamily: 'Poppins, sans-serif', height: '40px' }}
                fullWidth>
                <MenuItem value="" disabled>
                Availability
                </MenuItem>
                <MenuItem value={1}>In Stock</MenuItem>
                <MenuItem value={2}>Out Off Stock</MenuItem>                
              </Select>
             </Grid>
             
              <Grid item xs={12}>
                <CustomLabel htmlFor="description" required>
                Description
                </CustomLabel>
                <CustomTextField
                  id="description"
                  name="description"
                  placeholder="e.g. Description"
                  type="text"
                  fullWidth
                  multiline
                  rows={4} 
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>
      </Grid>
            <Grid
              item
              sx={{
                marginTop: 5,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={orderlist}
                sx={{
                  padding: "8px 16px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  backgroundColor: "#405189",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#334a6c",
                  },
                  fontFamily: poppins.style.fontFamily
                }}
              >
                Create Product
              </Button>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>

    </Grid>
  );
};

export default CreateProduct;
