import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Divider,
  CardContent,
  Checkbox,
  FormHelperText,
  FormGroup,
  Button,
  FormControlLabel,
 
  ListItemText,
  IconButton,
  Select,
  MenuItem,
  List,
  ListItem,
  FormControl,
  
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


const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

const CreateOrder = () => {
  const router = useRouter();

  const orderlist = () => {
    router.push("/admin/orders");
  };

  
  const [courseDuration, setCourseDuration] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [locality, setLocality] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);
  const [selectedPincodes, setSelectedPincodes] = useState([]);
  const [products, setProducts] = useState([
    { productName: "", quantity: 1, price: 0, total: 0 },
  ]);
  const [discount, setDiscount] = useState(0);
  const [grossAmount, setGrossAmount] = useState(0);
  const [payableAmount, setPayableAmount] = useState(0);
  const [codAmount, setCodAmount] = useState(0);
  const [paymentType, setPaymentType] = useState("");
  const [partialPayment, setPartialPayment] = useState(0);
  const [postalCode, setPostalCode] = useState("");
  const [postalCodeError, setPostalCodeError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  const [paymentModeError, setPaymentModeError] = useState(false);

  const handlePincodeSelection = (pincode) => {
    if (selectedPincodes.includes(pincode)) {
      
      setSelectedPincodes(selectedPincodes.filter((item) => item !== pincode));
    } else {

      setSelectedPincodes([...selectedPincodes, pincode]);
    }
  };

  const handleSubmit = () => {
    let valid = true;

    
    if (!postalCode) {
      setPostalCodeError(true);
      valid = false;
    } else {
      setPostalCodeError(false);
    }

    
    if (!phone) {
      setPhoneError(true);
      valid = false;
    } else {
      setPhoneError(false);
    }

   
    if (!paymentMode) {
      setPaymentModeError(true);
      valid = false;
    } else {
      setPaymentModeError(false);
    }

    
    if (valid) {
      console.log("Form submitted successfully!");
      setIsDialogOpen(false); 
      setIsSecondDialogOpen(true); 
    }
  };

  const handleCloseSecondDialog = () => {
    setIsSecondDialogOpen(false);
  };
  const pincodeData = [
    { pincode: "123433", edd: "2 Day" },
    { pincode: "423256", edd: "3 Day" },
    { pincode: "782329", edd: "4 Day" },
  ];

  const prices = {
    "Weight Loss": 3000,
    "Kidney Detox": 4000,
    "Liver Detox": 5000,
  };

  useEffect(() => {
    setIsDialogOpen(true);
  }, []);

  useEffect(() => {
    const totalGross = products.reduce(
      (acc, product) => acc + product.total,
      0
    );
    setGrossAmount(totalGross);

    let totalPayable = totalGross - discount;
    if (totalPayable < 0) totalPayable = 0; // Prevent negative payable amount
    setPayableAmount(totalPayable);

    if (paymentType === "Partial") {
      const codAmount = totalPayable - partialPayment;
      setCodAmount(codAmount > 0 ? codAmount : 0); // Handle negative COD amount
    } else {
      setCodAmount(totalPayable); // Full payable amount for non-partial payments
    }
  }, [products, discount, partialPayment, paymentType]);

  const handleCourseDurationChange = (event) => {
    setCourseDuration(event.target.value);
  };

  const handlePaymentMode = (event) => {
    setPaymentMode(event.target.value);
  };

  const handlelocality = (event) => {
    setLocality(event.target.value);
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...products];
    updatedProducts[index][name] = value;

    if (name === "productName") {
      updatedProducts[index].price = prices[value] || 0;
    }

    if (name === "quantity" || name === "productName") {
      updatedProducts[index].total =
        updatedProducts[index].price * updatedProducts[index].quantity || 0;
    }

    setProducts(updatedProducts);
  };

  const handleDiscountChange = (e) => {
    const discountValue = Number(e.target.value) || 0;
    setDiscount(discountValue > grossAmount ? grossAmount : discountValue); // Prevent discount from exceeding gross amount
  };

  const handlePartialPaymentChange = (e) => {
    const partialAmount = Number(e.target.value) || 0;
    setPartialPayment(
      partialAmount > payableAmount ? payableAmount : partialAmount
    ); 
  };

  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);

    if (e.target.value !== "Partial") {
      setPartialPayment(0);
      setCodAmount(payableAmount);
    }
  };

  const addProductField = () => {
    setProducts([
      ...products,
      { productName: "", quantity: 1, price: 0, total: 0 },
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

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
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
              Add Orders
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography sx={{ fontFamily: poppins.style.fontFamily }}>
                  Personal Details :
                </Typography>
              </Grid>

              {/* Personal Details Fields */}
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="Full Name" required>
                  Customer Name
                </CustomLabel>
                <CustomTextField
                  id="name"
                  name="name"
                  placeholder="Full Name"
                  type="text"
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="fathername" required>
                  Customer Father Name
                </CustomLabel>
                <CustomTextField
                  id="fathername"
                  name="fathername"
                  placeholder="Father's Name"
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
                  placeholder="+91-987XXXXXXXX"
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
                  placeholder="Email-ID"
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
                  <MenuItem value={1}>1 month</MenuItem>
                  <MenuItem value={2}>2 months</MenuItem>
                  <MenuItem value={3}>3 months</MenuItem>
                  <MenuItem value={6}>6 months</MenuItem>
                  <MenuItem value={9}>9 months</MenuItem>
                  <MenuItem value={12}>12 months</MenuItem>
                  {/* Add more options as needed */}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Typography sx={{ fontFamily: poppins.style.fontFamily }}>
                  Address Details :
                </Typography>
              </Grid>

              {/* Address Details Fields */}

              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="postalcode" required>
                  Postal Code
                </CustomLabel>
                <CustomTextField
                  id="postalcode"
                  name="postalcode"
                  placeholder="Postalcode"
                  type="text"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  style={{ backgroundColor: "#eeeeee" }}
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
                  placeholder="City"
                  type="text"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  style={{ backgroundColor: "#eeeeee" }}
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
                  placeholder="State"
                  type="text"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  style={{ backgroundColor: "#eeeeee" }}
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
                  placeholder="Country"
                  type="text"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  style={{ backgroundColor: "#eeeeee" }}
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomLabel htmlFor="address" required>
                  Address
                </CustomLabel>
                <CustomTextField
                  id="address"
                  name="address"
                  placeholder="Full Address"
                  type="text"
                  fullWidth
                  multiline
                  rows={1} // Adjust the number of rows to fit your design
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
                              placeholder="quantity"
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
                              placeholder="price"
                              type="number"
                              fullWidth
                              inputProps={{ readOnly: true }}
                              style={{ backgroundColor: "#eeeeee" }}
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
                              placeholder="total"
                              type="number"
                              fullWidth
                              inputProps={{ readOnly: true }}
                              style={{ backgroundColor: "#eeeeee" }}
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
                  placeholder="Order Remark"
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
                          inputProps={{ readOnly: true }}
                          style={{ backgroundColor: "#eeeeee" }}
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
                          placeholder="discount amount"
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
                          inputProps={{ readOnly: true }}
                          style={{ backgroundColor: "#eeeeee" }}
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
                          value={paymentType}
                          onChange={handlePaymentTypeChange}
                          displayEmpty
                          fullWidth
                          style={{ height: "50px" }}
                        >
                          <MenuItem value="" disabled>
                            Select Payment Mode
                          </MenuItem>
                          <MenuItem value="COD">COD</MenuItem>
                          <MenuItem value="Prepaid">Prepaid</MenuItem>
                          <MenuItem value="Partial">Partial</MenuItem>
                        </Select>
                      </Grid>

                      <Grid item xs={12}>
                        <Grid container spacing={2} alignItems="center">
                          {paymentType === "Partial" && (
                            <>
                              <Grid item xs={6}>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    fontFamily: "Poppins, sans-serif",
                                    ml: "70px",
                                  }}
                                >
                                  Partial Payment
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <CustomTextField
                                  placeholder="Partial Payment"
                                  onChange={handlePartialPaymentChange}
                                  fullWidth
                                />
                              </Grid>
                            </>
                          )}
                        </Grid>
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
                          COD Payable: (₹)
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextField
                          value={codAmount}
                          type="text"
                          fullWidth
                          sx={{ fontFamily: "Poppins, sans-serif" }}
                          inputProps={{ readOnly: true }}
                          style={{ backgroundColor: "#eeeeee" }}
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

      <>
        <Dialog
          open={isDialogOpen}
          onClose={(event, reason) => {
            if (reason !== "backdropClick") {
              setIsDialogOpen(false);
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
              <Grid item xs={6}>
                <CustomTextField
                  id="postal_code"
                  name="postal_code"
                  placeholder="Postal Code"
                  type="text"
                  required
                  fullWidth
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  sx={{ fontFamily: poppins.style.fontFamily }}
                  error={postalCodeError}
                  helperText={postalCodeError ? "Postal Code is required" : ""}
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
                  required
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  sx={{ fontFamily: poppins.style.fontFamily }}
                  error={phoneError}
                  helperText={phoneError ? "Phone Number is required" : ""}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth error={paymentModeError}>
                  <Select
                    labelId="payment-mode"
                    id="payment-mode"
                    name="paymentMode"
                    value={paymentMode}
                    onChange={handlePaymentMode}
                    displayEmpty
                    required
                    sx={{ fontFamily: "Poppins, sans-serif", height: "50px" }}
                    fullWidth
                  >
                    <MenuItem value="">Payment Status</MenuItem>
                    <MenuItem value="true">COD</MenuItem>
                    <MenuItem value="true">PARTIAL</MenuItem>
                    <MenuItem value="false">PREPAID</MenuItem>
                  </Select>
                  {paymentModeError && (
                    <FormHelperText>Payment Status is required</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={handleSubmit}
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

        <Dialog
          open={isSecondDialogOpen}
          onClose={handleCloseSecondDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle sx={{ m: 0, p: 2 }}>
            Pickup Pincode and EDD
            <IconButton
              aria-label="close"
              onClick={handleCloseSecondDialog}
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
              <Grid item xs={6}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Pickup Pincode
                </Typography>
                <FormGroup>
                  {pincodeData.map((item) => (
                    <FormControlLabel
                      key={item.pincode}
                      control={
                        <Checkbox
                          checked={selectedPincodes.includes(item.pincode)}
                          onChange={() => handlePincodeSelection(item.pincode)}
                        />
                      }
                      label={item.pincode}
                    />
                  ))}
                </FormGroup>
              </Grid>

              <Grid item xs={6}>
                <Typography>EDD</Typography>
                <List>
                  {pincodeData.map((item) => (
                    <ListItem key={item.pincode}>
                      <ListItemText primary={item.edd} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseSecondDialog}
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
      </>
    </Grid>
  );
};

export default CreateOrder;
