import React, { useState } from "react";
import {
  Grid,
  Typography,
  Divider,
  CardContent,
  Button,
  Select,
  MenuItem,
  Card,
  TextField,
} from "@mui/material";
import { SketchPicker } from "react-color";
import CustomCard from "../CustomCard";
import CustomLabel from "../CustomLabel";
import CustomTextField from "../CustomTextField";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";
import { getToken } from "@/utils/getToken";
import MainApi from "@/api-manage/MainApi";
import useGetAllCategories from "@/api-manage/react-query/useGetAllCategories";
import dynamic from "next/dynamic";
import ColorPicker from "../ColorPicker"; // Import ColorPicker
import { Box, InputBase } from "@mui/material";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

const CreateProduct = () => {
  const router = useRouter();
  const [gst, setGst] = useState("");
  const [productAvailability, setProductAvailability] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [productName, setProductName] = useState("");
  const [sku, setSku] = useState("");
  const [status, setStatus] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const { data, refetch } = useGetAllCategories();
  const [color, setColor] = useState("#FF5733"); // Default color

  const handleCreateProduct = async () => {
    const token = await getToken();
    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("product_sku", sku);
    formData.append("product_quantity", quantity);
    formData.append("product_price", price);
    formData.append("product_hsn_number", hsnCode);
    formData.append("product_gst_percent", gst);
    formData.append("product_description", description);
    formData.append("product_availability", productAvailability);
    formData.append("product_status", "0");
    formData.append("category", category);
    formData.append("product_image", image);

    try {
      const response = await MainApi.post("/api/product/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert("Product created successfully!");
        router.push("/admin/product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("An error occurred while creating the product.");
    }
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleImageUpload = (file) => {
    setImage(file);
  };

  const handleColorSelect = (color) => {
    setColor(color);
  };

  return (
    <Grid container spacing={2} p={3}>
      {/* Text Editor Section */}
      <Grid item xs={12} md={8}>
        <CustomCard>
          <CardContent>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "600",
                fontFamily: poppins.style.fontFamily,
              }}
            >
              Create Product
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomLabel htmlFor="product_name" required>
                  Product Title
                </CustomLabel>
                <CustomTextField
                  id="product_name"
                  name="product_name"
                  placeholder="Enter product title"
                  type="text"
                  value={productName}
                  onChange={handleInputChange(setProductName)}
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>

              <Grid item xs={12}>
                <CustomLabel htmlFor="product_description" required>
                  Product Description
                </CustomLabel>
                <ReactQuill
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Enter product description"
                  style={{ height: "200px", marginBottom: "20px" }}
                />
              </Grid>

              <Grid item xs={12} sm={6} sx={{ marginTop: "16px" }}>
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

              <Grid item xs={12} sm={3} sx={{ marginTop: "16px" }}>
                <CustomLabel htmlFor="quantity" required>
                  Quantity
                </CustomLabel>
                <CustomTextField
                  id="quantity"
                  name="quantity"
                  placeholder="e.g. 100"
                  type="text"
                  value={quantity}
                  onChange={handleInputChange(setQuantity)}
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>
              <Grid item xs={12} sm={3} sx={{ marginTop: "16px" }}>
                <CustomLabel htmlFor="weight" required>
                  Weight
                </CustomLabel>
                <CustomTextField
                  id="weight"
                  name="weight"
                  placeholder="e.g. 0.6kg"
                  type="text"
                  value={weight}
                  onChange={handleInputChange(setWeight)}
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="price" required>
                  Price
                </CustomLabel>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "4px",
                    fontFamily: poppins.style.fontFamily,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#F1F3F4",
                      padding: "8px 12px",
                      borderRight: "1px solid #ccc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "grey",
                        fontFamily: poppins.style.fontFamily,
                      }}
                    >
                      $
                    </Typography>
                  </Box>
                  <InputBase
                    id="price"
                    name="price"
                    placeholder="Enter price"
                    type="text"
                    value={price}
                    onChange={handleInputChange(setPrice)}
                    sx={{
                      paddingLeft: "12px",
                      flexGrow: 1,
                      fontFamily: poppins.style.fontFamily,
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="hsn_code" required>
                  Product HSN Code
                </CustomLabel>
                <CustomTextField
                  id="hsn_code"
                  name="hsn_code"
                  placeholder="e.g. 1234"
                  type="text"
                  value={hsnCode}
                  onChange={handleInputChange(setHsnCode)}
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} textAlign="right">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateProduct}
                  sx={{ mt: 2, fontFamily: "Poppins, sans-serif" }}
                >
                  Create Product
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>
      {/* Sidebar Section */}

      <Grid item xs={12} md={4}>
        <Card sx={{ padding: 2 }}>
          <Typography
            variant="h6"
            sx={{ fontFamily: poppins.style.fontFamily, marginBottom: 2 }}
          >
            Category
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Grid item xs={12} sm={12} sx={{ marginTop: "10px" }}>
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
              sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
              fullWidth
            >
              <MenuItem value="" disabled>
                Select Category
              </MenuItem>
              {data?.Data?.map((row, index) => (
                <MenuItem key={row.id} value={row.id}>
                  {row.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Card>

        <Card sx={{ padding: 2, marginTop: 2 }}>
          <Typography
            variant="h6"
            sx={{ fontFamily: poppins.style.fontFamily, marginBottom: 2 }}
          >
            Dimensions
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <CustomLabel htmlFor="size" required>
                Size
              </CustomLabel>
              <CustomTextField
                id="size"
                placeholder="Size"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <CustomLabel htmlFor="width" required>
                Width
              </CustomLabel>
              <CustomTextField
                id="width"
                placeholder="Width"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <CustomLabel htmlFor="height" required>
                Height
              </CustomLabel>
              <CustomTextField
                id="height"
                placeholder="Height"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          {/* Sidebar content can go here, like filters or additional navigation */}
        </Card>

        <Card sx={{ padding: 2, marginTop: 2 }}>
          <Typography
            variant="h6"
            sx={{ fontFamily: poppins.style.fontFamily, marginBottom: 2 }}
          >
            Status
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Grid item xs={12}>
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

          <Grid item xs={12} sm={12} sx={{ marginTop: "10px" }}>
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
              sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
              fullWidth
            >
              <MenuItem value="" disabled>
                Select Availability
              </MenuItem>
              <MenuItem value={1}>Available</MenuItem>
              <MenuItem value={0}>Unavailable</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} sm={12} sx={{ marginTop: "10px" }}>
            <CustomLabel htmlFor="status" required>
              Status
            </CustomLabel>
            <Select
              labelId="status"
              id="status"
              name="status"
              value={status}
              onChange={handleInputChange(setStatus)}
              displayEmpty
              sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
              fullWidth
            >
              <MenuItem value="" disabled>
                Select Status
              </MenuItem>
              <MenuItem value={1}>Active</MenuItem>
              <MenuItem value={0}>Inactive</MenuItem>
            </Select>
          </Grid>
          {/* Sidebar content can go here, like filters or additional navigation */}
        </Card>
      </Grid>
    </Grid>
  );
};

export default CreateProduct;
