import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Link,
  Box,
  Divider,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Poppins } from "next/font/google";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const NewOrder = () => {
  const [formValues, setFormValues] = useState({
    mainTitle: "Order Delivered",
    icon: null,
    bodyMessage:
      " Hi [Name] Hope your bag of joy brought a smile to your face! Tell us about  your experience below.   Stay Stylish! Myntra",
    experienceTitle: "Help us improve. Rate your experience",
    experienceBody:
      "Based on your Recent Delivery Experience,how likely are you recommend Myntra to your friends an family?",
    orderTitle: "Your Order Details",
    orderNumber: "Order No.123456789",
    productImage: null,
    productName: "dress",
    quantity: "Quantity",
    price: "Price",
    discount: "Discount",
    total: "Total",
    sold: "Sold by:",
    quantityNo: "2",
    priceNo: "1400",
    discountNo: "100",
    totalNo: "1300",
    soldBy: "Vision",
    deliveryTitle: "Delivery Address",
    deliveryAddress: "2nd Floor, XYZ Street,Someplace, City, State - 123456",
    billingTitle: "Billing Details",
    package: "Package value:",
    packagePrice: "₹900",
    shipping: "Shipping Charge:",
    shippingValue: "Free",
    billingTotal: "Total",
    billingTotalValue: "₹900",
    paymentMode: "Mode Of Payment",
    PaymentModeType: "online",
    pageLinks: {
      privacyPolicy: true,
      refundPolicy: true,
      cancelationPolicy: true,
      contactUs: false,
    },
    socialMedia: {
      facebook: true,
      instagram: true,
      twitter: true,
      linkedin: true,
      pinterest: false,
    },
    copyRight: "© 2024 Creworder. All rights reserved.",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleQuantityChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleDiscountChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleTotalChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleQuantityNoChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handlePriceNoChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleDiscountNoChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleTotalNoChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleSoldChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleSoldbyChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleDeliveryTitle = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleDeliveryAddress = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleBillingTitle = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handlePackage = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handlePackagePrice = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleShipping = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleShippingValue = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleBillingTotal = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleBillingTotalValue = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handlePaymentMode = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handlePaymentModeType = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleExperienceBodyChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleOrderNoChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormValues((prevValues) => ({
          ...prevValues,
          icon: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleproductImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormValues((prevValues) => ({
          ...prevValues,
          productImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleQuillChange = (content) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      bodyMessage: content,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const { pageLinks, socialMedia } = formValues;

    if (name in pageLinks) {
      setFormValues((prevValues) => ({
        ...prevValues,
        pageLinks: { ...pageLinks, [name]: checked },
      }));
    } else if (name in socialMedia) {
      setFormValues((prevValues) => ({
        ...prevValues,
        socialMedia: { ...socialMedia, [name]: checked },
      }));
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6} md={5}>
        <Box
          sx={{
            padding: 5,
            borderRadius: 2,
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} display="flex" justifyContent="center">
              <img
                src={formValues.icon || "/mnt/data/ss1.png"}
                alt="Delivery Illustration"
                style={{ width: "100px", height: "auto" }}
              />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
              <Typography
                className={poppins.className}
                sx={{ fontWeight: 600 }}
              >
                {formValues.mainTitle}
              </Typography>
              <Grid container justifyContent="center" spacing={1} mt={1}>
                {[
                  "Order Confirmed",
                  "Order Shipped",
                  "Out for Delivery",
                  "Order Delivered",
                ].map((status, index) => (
                  <Grid item key={index}>
                    <CheckCircleOutlineIcon
                      sx={{ color: "green", fontSize: "12px" }}
                    />
                    <Typography
                      className={poppins.className}
                      sx={{ fontSize: "10px" }}
                    >
                      {status}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography
                sx={{ fontSize: "14px" }}
                dangerouslySetInnerHTML={{ __html: formValues.bodyMessage }}
              ></Typography>
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography
                className={poppins.className}
                sx={{ fontWeight: 600 }}
              >
                {formValues.experienceTitle}
              </Typography>
              <Typography sx={{ fontSize: "14px", mt: 1 }}>
                {formValues.experienceBody}
              </Typography>
              <Grid
                container
                justifyContent="center"
                spacing={2}
                sx={{ mt: 2 }}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <Grid item key={value}>
                    <Button
                      variant="outlined"
                      sx={{ borderRadius: "50%", minWidth: "40px" }}
                    >
                      {value}
                    </Button>
                  </Grid>
                ))}
              </Grid>
              <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                <Typography
                  className={poppins.className}
                  sx={{ fontSize: "10px" }}
                >
                  Not at all likely
                </Typography>
                <Typography
                  className={poppins.className}
                  sx={{ fontSize: "10px" }}
                >
                  Highly likely
                </Typography>
              </Grid>
              <Divider sx={{ mt: 2 }} />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography
                className={poppins.className}
                sx={{ fontWeight: 600 }}
              >
                {formValues.orderTitle}
              </Typography>
              <Typography
                className={poppins.className}
                sx={{ fontSize: "12px" }}
              >
                {formValues.orderNumber}
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={3}>
                  <img
                    src={formValues.productImage || "/mnt/data/ss1.png"}
                    alt="Product"
                    style={{ width: "100px", height: "auto" }}
                  />
                </Grid>
                <Grid item xs={9} textAlign="right">
                  <Typography sx={{ fontSize: "14px" }}>
                    {formValues.productName}
                    <br />
                    {formValues.quantity} {formValues.quantityNo}
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    {formValues.price} {formValues.priceNo}
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    {formValues.discount} {formValues.discountNo}
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    {formValues.total} {formValues.totalNo}
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    {formValues.sold} {formValues.soldBy}
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ mt: 2 }} />

              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                  <Typography
                    className={poppins.className}
                    sx={{ fontWeight: 600 }}
                  >
                    {formValues.deliveryTitle}
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    {formValues.deliveryAddress}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    className={poppins.className}
                    sx={{ fontWeight: 600 }}
                  >
                    {formValues.billingTitle}
                  </Typography>
                  <Grid container justifyContent="space-between">
                    <Typography sx={{ fontSize: "14px" }}>
                      {formValues.package}
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }}>
                      {formValues.packagePrice}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Typography sx={{ fontSize: "14px" }}>
                      {formValues.shipping}
                    </Typography>
                    <Typography sx={{ fontSize: "14px", color: "green" }}>
                      {formValues.shippingValue}
                    </Typography>
                  </Grid>
                  <Divider sx={{ mt: 1 }} />
                  <Grid container justifyContent="space-between">
                    <Typography sx={{ fontWeight: 600 }}>
                      {formValues.billingTotal}:
                    </Typography>
                    <Typography sx={{ fontSize: "14px", color: "green" }}>
                      {formValues.billingTotalValue}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="space-between">
                    <Typography sx={{ fontSize: "14px" }}>
                      {formValues.paymentMode}
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }}>
                      {formValues.PaymentModeType}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <Grid item>
                  <Link href="#" underline="hover" sx={{ fontSize: "14px" }}>
                    Click here to download the invoice
                  </Link>
                </Grid>
                <Grid item>
                  <Typography
                    className={poppins.className}
                    sx={{ fontSize: "12px" }}
                  >
                    Invoice link will expire by Sat, 04 Apr 2020
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ mt: 2 }} />

              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                  <Typography
                    className={poppins.className}
                    sx={{ fontWeight: 600 }}
                  >
                    What Happens Next?
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ fontSize: "14px" }}>
                    We hope your bag of joy brings a smile to your face. If you
                    want to reach us, please{" "}
                    <Link
                      href="#"
                      underline="hover"
                      sx={{ fontFamily: poppins }}
                    >
                      Contact Us
                    </Link>
                    .
                  </Typography>
                </Grid>
              </Grid>

              <Grid container justifyContent="center" sx={{ mt: 3 }}>
                <img
                  src="https://www.shutterstock.com/image-vector/ad-banner-natural-beauty-products-260nw-1780339220.jpg"
                  alt="Insider Banner"
                  style={{ width: "100%", maxWidth: "600px", height: "auto" }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        md={7}
        component="form"
        sx={{ padding: 3, borderRadius: 2 }}
      >
        <Grid
          container
          sx={{
            mt: 2,
            backgroundColor: "#f8f9fc",
            borderRadius: "10px",
            padding: "18px",
          }}
        >
        
              <Grid item xs={6} sm={6} md={6}>
                <Typography
                  className={poppins.className}
                  sx={{ color: "#4f4f4f", fontWeight: "500", padding: 1 }}
                >
                  Icon
                </Typography>
                <input
                  type="file"
                  accept="*"
                  onChange={handleFileChange}
                  style={{ marginTop: "16px", width: "100%" }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <Typography
                  className={poppins.className}
                  sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
                >
                  Main Title(Default)
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="mainTitle"
                  value={formValues.mainTitle}
                  onChange={handleChange}
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Typography
                  sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
                >
                  Mail Body Message (Default)
                </Typography>
                <ReactQuill
                  value={formValues.bodyMessage}
                  onChange={handleQuillChange}
                  placeholder="Enter your mail body content..."
                  style={{ marginBottom: "20px", backgroundColor: "white" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Typography
                  className={poppins.className}
                  sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
                >
                  Experience Title
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="experienceTitle"
                  value={formValues.experienceTitle}
                  onChange={handleExperienceChange}
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>
           

            <Typography
              className={poppins.className}
              sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
            >
              Experience Body
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              name="experienceBody"
              value={formValues.experienceBody}
              onChange={handleExperienceBodyChange}
              sx={{ backgroundColor: "white" }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              mt: 2,
              backgroundColor: "#f8f9fc",
              borderRadius: "10px",
              padding: "18px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={6}>
                <Typography
                  className={poppins.className}
                  sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
                >
                  Order Title
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="orderTitle"
                  value={formValues.orderTitle}
                  onChange={handleOrderChange}
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <Typography
                  className={poppins.className}
                  sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
                >
                  Order No.
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="orderNumber"
                  value={formValues.orderNumber}
                  onChange={handleOrderNoChange}
                  sx={{ backgroundColor: "white" }}
                />{" "}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={6}>
                <Typography
                  className={poppins.className}
                  sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
                >
                  Product Image
                </Typography>
                <input
                  type="file"
                  accept="*"
                  onChange={handleproductImageChange}
                  style={{ marginTop: "16px", width: "100%" }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <Typography
                  className={poppins.className}
                  sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
                >
                  Product Name
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="productName"
                  value={formValues.productName}
                  onChange={handleProductChange}
                  sx={{ backgroundColor: "white" }}
                />{" "}
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={3} sm={3} md={3}>
                <Typography
                  className={poppins.className}
                  sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
                >
                  Quantity
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="quantity"
                  value={formValues.quantity}
                  onChange={handleQuantityChange}
                  sx={{ backgroundColor: "white" }}
                />
                <Typography
                  className={poppins.className}
                  sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
                >
                  Quantity No
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="quantityNo"
                  value={formValues.quantityNo}
                  onChange={handleQuantityNoChange}
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>
              <Grid item xs={3} sm={3} md={3}>
                <Typography
                  className={poppins.className}
                  sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
                >
                  Price
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="price"
                  value={formValues.price}
                  onChange={handlePriceChange}
                  sx={{ backgroundColor: "white" }}
                />
                <Typography
                  className={poppins.className}
                  sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
                >
                  Price No
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="priceNo"
                  value={formValues.priceNo}
                  onChange={handlePriceNoChange}
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>
              <Grid item xs={3} sm={3} md={3}>
                <Typography
                  className={poppins.className}
                  sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
                >
                  Discount
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="discount"
                  value={formValues.discount}
                  onChange={handleDiscountChange}
                  sx={{ backgroundColor: "white" }}
                />
                <Typography
                  className={poppins.className}
                  sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
                >
                  Discount No
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="discountNo"
                  value={formValues.discountNo}
                  onChange={handleDiscountNoChange}
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>
              <Grid item xs={3} sm={3} md={3}>
                <Typography
                  className={poppins.className}
                  sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
                >
                  Total
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="total"
                  value={formValues.total}
                  onChange={handleTotalChange}
                  sx={{ backgroundColor: "white" }}
                />
                <Typography
                  className={poppins.className}
                  sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
                >
                  Total No
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="totalNo"
                  value={formValues.totalNo}
                  onChange={handleTotalNoChange}
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                sx={{
                  display: "flex",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={6} md={6}>
                    <Typography
                      className={poppins.className}
                      sx={{
                        color: "#4f4f4f",
                        fontWeight: "400",
                        fontSize: "15px",
                      }}
                    >
                      Sold By
                    </Typography>
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      name="sold"
                      value={formValues.sold}
                      onChange={handleSoldChange}
                      sx={{ backgroundColor: "white" }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <Typography
                      className={poppins.className}
                      sx={{
                        color: "#4f4f4f",
                        fontWeight: "400",
                        fontSize: "15px",
                      }}
                    >
                      sold by name
                    </Typography>
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      name="soldBy"
                      value={formValues.soldBy}
                      onChange={handleSoldbyChange}
                      sx={{ backgroundColor: "white" }}
                    />
                  </Grid>{" "}
                </Grid>
              </Grid>
            </Grid>

            <Typography
              sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
            >
              Mail Body Message (Default)
            </Typography>
            <ReactQuill
              value={formValues.bodyMessage}
              onChange={handleQuillChange}
              placeholder="Enter your mail body content..."
              style={{ marginBottom: "20px", backgroundColor: "white" }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              mt: 2,
              backgroundColor: "#f8f9fc",
              borderRadius: "10px",
              padding: "18px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} md={6}>
                <Typography
                  className={poppins.className}
                  sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
                >
                  Delivery Address Title
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="deliveryTitle"
                  value={formValues.deliveryTitle}
                  onChange={handleDeliveryTitle}
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <Typography
                  className={poppins.className}
                  sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
                >
                  Delivery Address
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="deliveryAddress"
                  value={formValues.deliveryAddress}
                  onChange={handleDeliveryAddress}
                  sx={{ backgroundColor: "white" }}
                />{" "}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <Typography
                  className={poppins.className}
                  sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
                >
                  Billing Title
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="billingTitle"
                  value={formValues.billingTitle}
                  onChange={handleBillingTitle}
                  sx={{ backgroundColor: "white" }}
                />{" "}
              </Grid>
              <Grid item xs={3} sm={3} md={3}>
                <Typography
                  className={poppins.className}
                  sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
                >
                  Package
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="package"
                  value={formValues.package}
                  onChange={handlePackage}
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>

              <Grid item xs={3} sm={3} md={3}>
                <Typography
                  className={poppins.className}
                  sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
                >
                  Package price
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="packagePrice"
                  value={formValues.packagePrice}
                  onChange={handlePackagePrice}
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>

              <Grid item xs={3} sm={3} md={3}>
                <Typography
                  className={poppins.className}
                  sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
                >
                  Total
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="billingTotal"
                  value={formValues.billingTotal}
                  onChange={handleBillingTotal}
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>

              <Grid item xs={3} sm={3} md={3}>
                <Typography
                  className={poppins.className}
                  sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
                >
                  Total Value
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="billingTotalValue"
                  value={formValues.billingTotalValue}
                  onChange={handleBillingTotalValue}
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>

              <Grid item xs={3} sm={3} md={3}>
                <Typography
                  className={poppins.className}
                  sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
                >
                  Shipping
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="shipping"
                  value={formValues.shipping}
                  onChange={handleShipping}
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>
              <Grid item xs={3} sm={3} md={3}>
                <Typography
                  className={poppins.className}
                  sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
                >
                  Shipping Charge
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="shippingValue"
                  value={formValues.shippingValue}
                  onChange={handleShippingValue}
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>
              <Grid item xs={3} sm={3} md={3}>
                <Typography
                  className={poppins.className}
                  sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
                >
                  Mode Of Payment
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="paymentMode"
                  value={formValues.paymentMode}
                  onChange={handlePaymentMode}
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>
              <Grid item xs={3} sm={3} md={3}>
                <Typography
                  className={poppins.className}
                  sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
                >
                  Mode Name
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="PaymentModeType"
                  value={formValues.PaymentModeType}
                  onChange={handlePaymentModeType}
                  sx={{ backgroundColor: "white" }}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* 
          <Grid
            item
            xs={12}
            sx={{
              mt: 2,
              backgroundColor: "#f8f9fc",
              borderRadius: "10px",
              padding: "18px",
            }}
          >
            <Typography
              className={poppins.className}
              sx={{ color: "#4f4f4f", fontWeight: "500", padding: 1 }}
            >
              Footer Content
            </Typography>
            <Typography
              className={poppins.className}
              sx={{ color: "#4f4f4f", fontWeight: "400", fontSize: "15px" }}
            >
              Section Text (Default)
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              name="footerText"
              value={formValues.footerText}
              onChange={handleChange}
              sx={{ backgroundColor: "white" }}
            />
            <Typography
              className={poppins.className}
              sx={{ fontSize: "13px", marginTop: 2 }}
            >
              Page Links
            </Typography>
            {[
              "privacyPolicy",
              "refundPolicy",
              "cancelationPolicy",
              "contactUs",
            ].map((policy) => (
              <FormControlLabel
                key={policy}
                control={
                  <Checkbox
                    checked={formValues.pageLinks[policy]}
                    onChange={handleCheckboxChange}
                    name={policy}
                    sx={{ transform: "scale(0.8)" }}
                  />
                }
                label={
                  <Typography
                    className={poppins.className}
                    sx={{ fontSize: "13px" }}
                  >
                    {policy.charAt(0).toUpperCase() +
                      policy.slice(1).replace(/([A-Z])/g, " $1")}
                  </Typography>
                }
              />
            ))}

            <Typography
              className={poppins.className}
              sx={{ fontSize: "13px", marginTop: 2 }}
            >
              Social Media Links
            </Typography>
            {["facebook", "instagram", "twitter", "linkedin", "pinterest"].map(
              (platform) => (
                <FormControlLabel
                  key={platform}
                  control={
                    <Checkbox
                      checked={formValues.socialMedia[platform]}
                      onChange={handleCheckboxChange}
                      name={platform}
                      sx={{ transform: "scale(0.8)" }}
                    />
                  }
                  label={
                    <Typography
                      className={poppins.className}
                      sx={{ fontSize: "13px" }}
                    >
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </Typography>
                  }
                />
              )
            )}

            <Typography
              className={poppins.className}
              sx={{ fontSize: "13px", marginTop: 2 }}
            >
              Copyright Content (Default)
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              name="copyRight"
              value={formValues.copyRight}
              onChange={handleChange}
              sx={{ backgroundColor: "white" }}
            />
          </Grid> */}

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    
  );
};

export default NewOrder;
