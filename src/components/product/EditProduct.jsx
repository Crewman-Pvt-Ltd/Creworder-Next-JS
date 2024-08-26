import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Divider,
  CardContent,
  Button,
  Select,
  MenuItem,
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
  subsets: ["latin"],
});

const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState({
    product_name: "",
    product_sku: "",
    product_quantity: "",
    product_hsn_number: "",
    product_price: "",
    category: "",
    product_gst_percent: "",
    product_availability: "",
    product_status: "",
    product_description: "",
    product_image: null, // Initialize as null for file uploads
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setProduct((prevProduct) => ({
      ...prevProduct,
      product_image: file,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found.");
      }

      const formData = new FormData();
      for (const key in product) {
        formData.append(key, product[key]);
      }

      const response = await MainApi.put(`/api/products/${id}/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("Product updated successfully");
        router.push("/admin/product");
      } else {
        console.error("Failed to update the product");
        setError("Failed to update the product");
      }
    } catch (error) {
      console.error("An error occurred while updating the product:", error);
      setError("An error occurred while updating the product");
    }
  };

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const token = getToken();
          if (!token) {
            throw new Error("No authentication token found.");
          }

          const response = await MainApi.get(`/api/products/${id}`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });

          if (response.status === 200) {
            setProduct(response.data);
          } else {
            console.error("Failed to fetch the Product");
            setError("Failed to fetch the Product");
          }
        } catch (error) {
          console.error("An error occurred while fetching the Product:", error);
          setError("An error occurred while fetching the Product");
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "600",
                fontFamily: poppins.style.fontFamily,
              }}
            >
              Edit Product
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography sx={{ fontFamily: poppins.style.fontFamily }}>
                  Edit Product Form:
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
                  value={product.product_name}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="sku" required>
                  SKU
                </CustomLabel>
                <CustomTextField
                  id="product_sku"
                  name="product_sku"
                  placeholder="e.g. SKU98765E22"
                  type="text"
                  value={product.product_sku}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <CustomLabel htmlFor="quantity" required>
                  Quantity
                </CustomLabel>
                <CustomTextField
                  id="product_quantity"
                  name="product_quantity"
                  placeholder="e.g. quantity"
                  type="number"
                  value={product.product_quantity}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <CustomLabel htmlFor="price" required>
                  Price
                </CustomLabel>
                <CustomTextField
                  id="product_price"
                  name="product_price"
                  placeholder="e.g. price"
                  type="number"
                  value={product.product_price}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <CustomLabel htmlFor="hsn_code" required>
                  Product HSN Code
                </CustomLabel>
                <CustomTextField
                  id="product_hsn_number"
                  name="product_hsn_number"
                  placeholder="e.g. HSN Code"
                  type="text"
                  value={product.product_hsn_number}
                  onChange={handleInputChange}
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
                  id="product_gst_percent"
                  name="product_gst_percent"
                  value={product.product_gst_percent}
                  onChange={handleInputChange}
                  displayEmpty
                  sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
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
                <CustomLabel htmlFor="category" required>
                  Category
                </CustomLabel>
                <Select
                  labelId="category"
                  id="category"
                  name="category"
                  value={product.category}
                  onChange={handleInputChange}
                  displayEmpty
                  sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Category
                  </MenuItem>
                  <MenuItem value="1">Weight Gain</MenuItem>
                  <MenuItem value="2">Weight Loss</MenuItem>
                  <MenuItem value="3">Women's Wellness</MenuItem>
                  <MenuItem value="4">Man Wellness</MenuItem>
                  <MenuItem value="5">Diabetes Cure</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="product_availability" required>
                  Availability
                </CustomLabel>
                <Select
                  labelId="product_availability"
                  id="product_availability"
                  name="product_availability"
                  value={product.product_availability}
                  onChange={handleInputChange}
                  displayEmpty
                  sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Availability
                  </MenuItem>
                  {/* Ensure values here match the backend */}
                  <MenuItem value="1">In Stock</MenuItem>
                  <MenuItem value="0">Out Of Stock</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="product_status" required>
                  Status
                </CustomLabel>
                <Select
                  labelId="product_status"
                  id="product_status"
                  name="product_status"
                  value={product.product_status}
                  onChange={handleInputChange}
                  displayEmpty
                  sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Status
                  </MenuItem>
                  {/* Ensure values here match the backend */}
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="1">Inactive</MenuItem>
                </Select>
              </Grid>            

              <Grid item xs={4}>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                  Upload Product Image:
                </Typography>
                <img src={product.product_image}
                height={150}
                width={150}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Grid>
              <Grid item xs={8}>
                <CustomLabel htmlFor="product_description" required>
                  Product Description
                </CustomLabel>
                <CustomTextField
                  id="product_description"
                  name="product_description"
                  placeholder="e.g. product description"
                  type="text"
                  value={product.product_description}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={6}
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>

              <Grid item xs={12} sx={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleFormSubmit}
                  sx={{ marginTop: 2 }}
                >
                  Update Product
                </Button>
              </Grid>

              {error && (
                <Grid item xs={12}>
                  <Typography color="error">{error}</Typography>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default EditProduct;
