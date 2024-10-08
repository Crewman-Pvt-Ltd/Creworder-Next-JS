import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Divider,
  CardContent,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CustomCard from "../CustomCard";
import CustomLabel from "../CustomLabel";
import CustomTextField from "../CustomTextField";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CloseIcon from "@mui/icons-material/Close";

// Importing the Poppins font with weight 300
const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

const RepeatOrder = () => {
  const router = useRouter();

  const orderlist = () => {
    router.push("/admin/orders");
  };

  const [AgentId, setAgentId] = useState("");
  const handleAgentId = (event) => {
    setAgentId(event.target.value);
  };

  const [courseDuration, setCourseDuration] = useState("");

  const [paymentMode, setPaymentMode] = React.useState("");
  // Handle change for courseDuration
  const handleCourseDurationChange = (event) => {
    setCourseDuration(event.target.value);
  };
  const handlePaymentMode = (event) => {
    setPaymentMode(event.target.value);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(true);

  useEffect(() => {
    setIsDialogOpen(true); // Show dialog when the component loads
  }, []);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const [locality, setLocality] = useState("");
  // Handle change for courseDuration
  const handlelocality = (event) => {
    setLocality(event.target.value);
  };

  const [ProductName, setProductName] = useState("");
  // Handle change for courseDuration
  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };
  const [products, setProducts] = useState([
    { productName: "", quantity: 1, price: 0, total: 0 },
  ]);
  const [discount, setDiscount] = useState(null);
  const [grossAmount, setGrossAmount] = useState(0);
  const [payableAmount, setPayableAmount] = useState(0);
  const [codAmount, setCodAmount] = useState(0);
  const [paymentType, setPaymentType] = useState("");

  useEffect(() => {
    // Calculate the gross amount based on the products
    const totalGross = products.reduce(
      (acc, product) => acc + product.total,
      0
    );
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

    if (name === "productName") {
      // Update price based on selected product
      updatedProducts[index].price = prices[value] || 0;
    }

    if (name === "quantity" || name === "productName") {
      // Update total based on quantity and price
      updatedProducts[index].total =
        updatedProducts[index].price * updatedProducts[index].quantity || 0;
    }

    setProducts(updatedProducts);
  };

  const handleDiscountChange = (e) => {
    setDiscount(Number(e.target.value) || 0);
  };

  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
  };

  const addProductField = () => {
    setProducts([
      ...products,
      { productName: "", quantity: 0, price: 0, total: 0 },
    ]);
  };

  const removeProductField = (index) => {
    if (products.length > 1) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  const isRowFilled = (product) => {
    return product.productName && product.quantity && product.price;
  };

  const getSelectedProducts = () => {
    return products.map((product) => product.productName);
  };

  const prices = {
    "Weight Loss": 3000,
    "Kidney Detox": 4000,
    "Liver Detox": 5000,
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
                fontFamily: poppins.style.fontFamily,
              }}
            >
              Repeat Order
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              {/* Personal Details Fields */}
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="name" required>
                  Agent ID
                </CustomLabel>
                <Select
                  labelId="Agent Id"
                  id="AgentId"
                  name="AgentId"
                  value={AgentId}
                  onChange={handleAgentId}
                  displayEmpty // This makes the empty string display as the placeholder
                  sx={{ fontFamily: "Poppins, sans-serif", height: "50px" }} // Set minHeight
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Agent
                  </MenuItem>
                  <MenuItem value={1}>Shivam</MenuItem>
                  <MenuItem value={2}>Truevital</MenuItem>
                  <MenuItem value={3}>Crewmans</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="name" required>
                  Customer Name
                </CustomLabel>
                <CustomTextField
                  id="name"
                  name="name"
                  placeholder="e.g. name"
                  type="text"
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="fathername" required>
                  Customer Father Name
                </CustomLabel>
                <CustomTextField
                  id="fathername"
                  name="fathername"
                  placeholder="e.g. father name"
                  type="text"
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="phone" required>
                  Customer Phone
                </CustomLabel>
                <CustomTextField
                  id="phone"
                  name="phone"
                  placeholder="e.g. phone"
                  type="text"
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="email" required>
                  Customer Email
                </CustomLabel>
                <CustomTextField
                  id="email"
                  name="email"
                  placeholder="e.g. email"
                  type="text"
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="course-order" required>
                  Course Order
                </CustomLabel>
                <Select
                  labelId="course-order-label"
                  id="course-order"
                  name="courseOrder"
                  value={courseDuration}
                  onChange={handleCourseDurationChange}
                  displayEmpty // This makes the empty string display as the placeholder
                  sx={{ fontFamily: "Poppins, sans-serif", height: "50px" }} // Set minHeight
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Course
                  </MenuItem>
                  <MenuItem value={1}>2 months</MenuItem>
                  <MenuItem value={2}>3 months</MenuItem>
                  <MenuItem value={3}>4 month</MenuItem>
                  <MenuItem value={4}>5 month</MenuItem>
                  <MenuItem value={5}>6 month</MenuItem>
                  <MenuItem value={6}>12 month</MenuItem>
                  {/* Add more options as needed */}
                </Select>
              </Grid>

              <Grid item xs={12}>
                <Typography sx={{ fontFamily: poppins.style.fontFamily }}>
                  Full Address :
                </Typography>
              </Grid>

              {/* Address Details Fields */}
              <Grid item xs={12}>
                <CustomLabel htmlFor="address" required>
                  Address
                </CustomLabel>
                <CustomTextField
                  id="address"
                  name="address"
                  placeholder="e.g. address"
                  type="text"
                  fullWidth
                  multiline
                  rows={1} // Adjust the number of rows to fit your design
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="postalcode" required>
                  Postal Code
                </CustomLabel>
                <CustomTextField
                  id="postalcode"
                  name="postalcode"
                  placeholder="e.g. postalcode"
                  type="text"
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="course-order" required>
                  Select Locality
                </CustomLabel>
                <Select
                  labelId="locality"
                  id="locality"
                  name="locality"
                  value={locality}
                  onChange={handlelocality}
                  displayEmpty // This makes the empty string display as the placeholder
                  sx={{ fontFamily: "Poppins, sans-serif", height: "50px" }} // Set minHeight
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Locality
                  </MenuItem>
                  <MenuItem value={1}>Noida-63</MenuItem>
                  <MenuItem value={2}>Noida Electronic City</MenuItem>
                  {/* Add more options as needed */}
                </Select>
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="city" required>
                  City
                </CustomLabel>
                <CustomTextField
                  id="city"
                  name="city"
                  placeholder="e.g. city"
                  type="text"
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="state" required>
                  State
                </CustomLabel>
                <CustomTextField
                  id="state"
                  name="state"
                  placeholder="e.g. state"
                  type="text"
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="country" required>
                  Country
                </CustomLabel>
                <CustomTextField
                  id="country"
                  name="country"
                  placeholder="e.g. country"
                  type="text"
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Typography sx={{ fontFamily: poppins.style.fontFamily }}>
                  Product Details :
                </Typography>
              </Grid>

              {products.map((product, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={12} sm={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Grid container spacing={1} sm={12} alignItems="center">
                          <Grid item xs={6} sm={4}>
                            <CustomLabel htmlFor={`product-${index}`} required>
                              Select Product
                            </CustomLabel>
                            <Select
                              className="dropdown"
                              id={`product-${index}`}
                              name="productName"
                              value={product.productName}
                              onChange={(e) => handleInputChange(index, e)}
                              displayEmpty
                              sx={{
                                fontFamily: "Poppins, sans-serif",
                                height: "50px",
                              }}
                              fullWidth
                            >
                              <MenuItem value="" disabled>
                                Select Product
                              </MenuItem>
                              <MenuItem
                                value="Weight Loss"
                                disabled={getSelectedProducts().includes(
                                  "Weight Loss"
                                )}
                              >
                                Weight Loss
                              </MenuItem>
                              <MenuItem
                                value="Kidney Detox"
                                disabled={getSelectedProducts().includes(
                                  "Kidney Detox"
                                )}
                              >
                                Kidney Detox
                              </MenuItem>
                              <MenuItem
                                value="Liver Detox"
                                disabled={getSelectedProducts().includes(
                                  "Liver Detox"
                                )}
                              >
                                Liver Detox
                              </MenuItem>
                            </Select>
                          </Grid>
                          <Grid item xs={12} sm={2}>
                            <CustomLabel htmlFor={`quantity-${index}`} required>
                              Quantity
                            </CustomLabel>
                            <CustomTextField
                              id={`quantity-${index}`}
                              name="quantity"
                              value={product.quantity}
                              onChange={(e) => handleInputChange(index, e)}
                              placeholder="e.g. quantity"
                              type="number"
                              fullWidth
                              sx={{ fontFamily: "Poppins, sans-serif" }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={2}>
                            <CustomLabel htmlFor={`price-${index}`} required>
                              Price
                            </CustomLabel>
                            <CustomTextField
                              id={`price-${index}`}
                              name="price"
                              value={product.price}
                              onChange={(e) => handleInputChange(index, e)}
                              placeholder="e.g. price"
                              type="number"
                              fullWidth
                              sx={{ fontFamily: "Poppins, sans-serif" }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={2}>
                            <CustomLabel htmlFor={`total-${index}`} required>
                              Total
                            </CustomLabel>
                            <CustomTextField
                              id={`total-${index}`}
                              name="total"
                              value={product.total}
                              onChange={(e) => handleInputChange(index, e)}
                              placeholder="e.g. total"
                              type="number"
                              fullWidth
                              sx={{ fontFamily: "Poppins, sans-serif" }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={2}>
                            <IconButton
                              onClick={() => removeProductField(index)}
                              color="error"
                              sx={{ mt: 1 }}
                            >
                              <RemoveCircleIcon />
                            </IconButton>
                            <IconButton
                              onClick={addProductField}
                              color="primary"
                              sx={{ mt: 1 }}
                              disabled={!isRowFilled(product)}
                            >
                              <AddCircleIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </React.Fragment>
              ))}

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Typography sx={{ fontFamily: poppins.style.fontFamily }}>
                  Payment Information :
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} mt={5}>
                <CustomLabel htmlFor="orderRemark" required>
                  Order Remark:
                </CustomLabel>
                <CustomTextField
                  id="orderRemark"
                  name="orderRemark"
                  placeholder="e.g. order remark"
                  type="text"
                  fullWidth
                  multiline
                  rows={4}
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={6}>
                        <Typography
                          variant="caption"
                          sx={{ fontFamily: "Poppins, sans-serif", ml: "80px" }}
                        >
                          Gross Amount (₹)
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextField
                          value={grossAmount}
                          type="text"
                          fullWidth
                          sx={{ fontFamily: "Poppins, sans-serif" }}
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={6}>
                        <Typography
                          variant="caption"
                          sx={{ fontFamily: "Poppins, sans-serif", ml: "80px" }}
                        >
                          Discount (-₹)
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextField
                          value={discount}
                          onChange={handleDiscountChange}
                          placeholder="e.g. discount amount"
                          type="text"
                          fullWidth
                          sx={{ fontFamily: "Poppins, sans-serif" }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={6}>
                        <Typography
                          variant="caption"
                          sx={{ fontFamily: "Poppins, sans-serif", ml: "70px" }}
                        >
                          Payable Amount (₹)
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextField
                          value={payableAmount}
                          type="text"
                          fullWidth
                          sx={{ fontFamily: "Poppins, sans-serif" }}
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={6}>
                        <Typography
                          variant="caption"
                          sx={{ fontFamily: "Poppins, sans-serif", ml: "70px" }}
                        >
                          Payment Type
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Select
                          labelId="payment-type"
                          id="payment-type"
                          name="paymentType"
                          value={paymentType}
                          onChange={handlePaymentTypeChange}
                          displayEmpty
                          sx={{
                            fontFamily: "Poppins, sans-serif",
                            height: "50px",
                          }}
                          fullWidth
                        >
                          <MenuItem value="" disabled>
                            Select Payment
                          </MenuItem>
                          <MenuItem value="COD">COD Payment</MenuItem>
                          <MenuItem value="Partial">Partial Payment</MenuItem>
                          <MenuItem value="Prepaid">Prepaid Payment</MenuItem>
                          {/* Add more options as needed */}
                        </Select>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={6}>
                        <Typography
                          variant="caption"
                          sx={{ fontFamily: "Poppins, sans-serif", ml: "70px" }}
                        >
                          COD Payable (₹)
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextField
                          value={codAmount}
                          type="text"
                          fullWidth
                          sx={{ fontFamily: "Poppins, sans-serif" }}
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
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
                  fontFamily: poppins.style.fontFamily,
                }}
              >
                Create Order
              </Button>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>

      <Dialog
        open={isDialogOpen}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseDialog();
          }
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Verify Postal Code
          <IconButton
            aria-label="close"
            onClick={() => window.history.back()}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {/* Four Input Fields */}
            <Grid item xs={6}>
              <CustomTextField
                id="postal_code"
                name="postal_code"
                placeholder="Postal Code"
                type="text"
                fullWidth
                sx={{ fontFamily: poppins.style.fontFamily }}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                id="call_id"
                name="call_id"
                placeholder="Customer Call Id"
                type="text"
                fullWidth
                sx={{ fontFamily: poppins.style.fontFamily }}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                id="phone"
                name="phone"
                placeholder="Customer Phone Number"
                type="text"
                fullWidth
                sx={{ fontFamily: poppins.style.fontFamily }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Select
                  labelId="payment-mode"
                  id="payment-mode"
                  name="paymentMode"
                  value={paymentMode}
                  onChange={handlePaymentMode}
                  displayEmpty
                  sx={{ fontFamily: "Poppins, sans-serif", height: "50px" }}
                  fullWidth
                >
                  <MenuItem value="">Payment Status</MenuItem>
                  <MenuItem value="true">COD</MenuItem>
                  <MenuItem value="false">PREPAID</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            sx={{
              fontFamily: poppins.style.fontFamily,
              color: "white",
              backgroundColor: "#405189",
              "&:hover": {
                backgroundColor: "#334a6c",
              },
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default RepeatOrder;
