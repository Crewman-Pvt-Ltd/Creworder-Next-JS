import React, { useState } from "react";
import {
  Grid,
  Typography,
  Divider,
  CardContent,
  Button,
  Select,
  MenuItem
} from "@mui/material";
import CustomCard from "../CustomCard";
import CustomLabel from "../CustomLabel";
import CustomTextField from "../CustomTextField";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";
import { getToken } from "@/utils/getToken";
import MainApi from "@/api-manage/MainApi";

// Importing the Poppins font with weight 500
const poppins = Poppins({
  weight: "500",
  subsets: ['latin']
});

const CreateProduct = () => {
  const router = useRouter();

  const orderlist = () => {
    router.push("/admin/product");
  };

  const [gst, setGst] = useState('');
  const [productAvailability, setProductAvailability] = useState('');
  const [category, setCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [hsnCode, setHsnCode] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [grossAmount, setGrossAmount] = useState(0);
  const [payableAmount, setPayableAmount] = useState(0);
  const [codAmount, setCodAmount] = useState(0);

  // Function to handle product creation
  const handleCreateProduct = async () => {
    const token = await getToken(); // Get token dynamically

    const formData = new FormData();
    formData.append('product_name', productName);
    formData.append('product_sku', sku);
    formData.append('product_quantity', quantity);
    formData.append('product_price', price);
    formData.append('product_hsn_number', hsnCode);
    formData.append('product_gst_percent', gst);
    formData.append('product_description', description);
    formData.append('product_availability', productAvailability);
    formData.append('product_status', "0"); // Assuming default status
    formData.append('category', category);
    formData.append('product_image', image);

    try {
      const response = await MainApi.post('/api/product/', formData, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        alert('Product created successfully!');
        orderlist(); // Redirect after successful creation
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('An error occurred while creating the product.');
    }
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleImageUpload = (file) => {
    setImage(file);
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

              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="product_name" required>
                  Product Name
                </CustomLabel>
                <CustomTextField
                  id="product_name"
                  name="product_name"
                  placeholder="e.g. PRO34XP"
                  type="text"
                  value={productName}
                  onChange={handleInputChange(setProductName)}
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
                  value={sku}
                  onChange={handleInputChange(setSku)}
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
                  value={quantity}
                  onChange={handleInputChange(setQuantity)}
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
                  value={price}
                  onChange={handleInputChange(setPrice)}
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
                  value={hsnCode}
                  onChange={handleInputChange(setHsnCode)}
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <CustomLabel htmlFor="gst" required>
                  GST (in %)
                </CustomLabel>
                <Select
                  labelId="gst"
                  id="gst"
                  name="gst"
                  value={gst}
                  onChange={handleInputChange(setGst)}
                  displayEmpty
                  sx={{ fontFamily: 'Poppins, sans-serif', height: '40px' }}
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select GST
                  </MenuItem>
                  <MenuItem value="0">0%</MenuItem>
                  <MenuItem value="5">5%</MenuItem>
                  <MenuItem value="18">18%</MenuItem>
                  <MenuItem value="28">28%</MenuItem>

                </Select>
              </Grid>

              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="images" required>
                  Images
                </CustomLabel>
                <CustomTextField
                  id="images"
                  name="images"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                  required
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="category" required>
                  Category
                </CustomLabel>
                <Select
                  labelId="category"
                  id="category"
                  name="category"
                  value={category}
                  onChange={handleInputChange(setCategory)}
                  displayEmpty
                  sx={{ fontFamily: 'Poppins, sans-serif', height: '40px' }}
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Category
                  </MenuItem>
                  <MenuItem value={1}>Weight Gain</MenuItem>
                  <MenuItem value={2}>Weight Loss</MenuItem>
                  <MenuItem value={3}>Women's Wellness</MenuItem>
                  <MenuItem value={4}>Man Wellness</MenuItem>
                  <MenuItem value={5}>Diabetes Cure</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="productAvailability" required>
                  Availability
                </CustomLabel>
                <Select
                  labelId="productAvailability"
                  id="productAvailability"
                  name="productAvailability"
                  value={productAvailability}
                  onChange={handleInputChange(setProductAvailability)}
                  displayEmpty
                  sx={{ fontFamily: 'Poppins, sans-serif', height: '40px' }}
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Availability
                  </MenuItem>
                  <MenuItem value={1}>Yes</MenuItem>
                  <MenuItem value={2}>No</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12}>
                <CustomLabel htmlFor="product_description" required>
                  Description
                </CustomLabel>
                <CustomTextField
                  id="product_description"
                  name="product_description"
                  placeholder="e.g. Product Description"
                  type="text"
                  value={description}
                  onChange={handleInputChange(setDescription)}
                  fullWidth
                  multiline
                  rows={4}
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>

              <Grid item xs={12} mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '12px',
                    fontWeight: '500',
                    textTransform: 'capitalize',
                    borderRadius: '6px'
                  }}
                  onClick={handleCreateProduct}
                >
                  Create Product
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default CreateProduct;
