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
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CustomCard from "../CustomCard";
import CustomLabel from "../CustomLabel";
import CustomTextField from "../CustomTextField";
import { useRouter } from "next/router";
import { Headland_One, Poppins } from "next/font/google";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CloseIcon from "@mui/icons-material/Close";
import { baseApiUrl } from "@/api-manage/ApiRoutes";
import { getToken } from "@/utils/getToken";
import axios from "axios";
import swal from "sweetalert";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

const CreateOrder = () => {
  const token = getToken();
  const router = useRouter();
  const [customerName, setCustomerName] = useState("");
  const [customerFatherName, setCustomerFatherName] = useState("");
  const [phoneCustomer, setPhoneCustomer] = useState("");
  const [customerEmailId, setCustomerEmailId] = useState("");
  const [courseDuration, setCourseDuration] = useState("");

  const [postalCode, setPostalCode] = useState("");
  const [locality, setLocality] = useState("");
  const [cutomerCity, setCutomerCity] = useState("");
  const [cutomerState, setCutomerState] = useState("");
  const [cutomerCountry, setCutomerCountry] = useState("India");
  const [customerAddress, setCustomerAddress] = useState("");

  const [productList, setproductList] = useState([]);
  const [products, setProducts] = useState([
    { product: 0, productName: "", product_qty: 1, price: 0, total: 0 },
  ]);
  const [grossAmount, setGrossAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [payableAmount, setPayableAmount] = useState(0);
  const [paymentMode, setPaymentMode] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [codAmount, setCodAmount] = useState(0);
  const [partialPayment, setPartialPayment] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);
  const [selectedPincodes, setSelectedPincodes] = useState([]);
  const [pincodeData, setPincodeData] = useState([]);
  const [postalCodeError, setPostalCodeError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [customerCallId, setCustomerCallId] = useState(false);
  const [paymentModeError, setPaymentModeError] = useState(false);
  const [selectedPincode, setSelectedPincode] = useState(null);
  const [orderRemark, setOrderRemark] = useState(null);

  const handlePincodeSelection = (pincode) => {
    if (selectedPincode === pincode) {
      setSelectedPincode(null);
    } else {
      setSelectedPincode(pincode);
    }
  };

  const handleCloseSecondDialog = () => {
    setIsSecondDialogOpen(false);
  };

  const getProductsList = () => {
    let data = "";
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${baseApiUrl}products/`,
      headers: {
        Authorization: `Token ${token}`,
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        setproductList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getProductsList(true);
  }, []);

  useEffect(() => {
    setIsDialogOpen(true);
  }, []);

  useEffect(() => {
    const totalGross = products.reduce(
      (acc, product) => acc + product.total,
      0
    );
    setGrossAmount(totalGross);
    var totalPayable = totalGross - discount;
    if (totalPayable < 0) totalPayable = 0;
    setPayableAmount(totalPayable);
    if (paymentType === "Partial") {
      const codAmount = totalPayable - partialPayment;
      setCodAmount(codAmount > 0 ? codAmount : 0);
    } else {
      setCodAmount(totalPayable);
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
    const { id, name, Pname, Pprice, product_qty } = e;
    const updatedProducts = [...products];
    updatedProducts[index][name] = Pname;
    if (name === "productName") {
      updatedProducts[index].price = Pprice || 0;
      updatedProducts[index].product = id;
    }
    if (name === "product_qty") {
      updatedProducts[index][name] = Number(product_qty);
    }
    updatedProducts[index].total =
      updatedProducts[index].price * updatedProducts[index].product_qty || 0;
    setProducts(updatedProducts);
  };

  const handleDiscountChange = (e) => {
    const discountValue = Number(e.target.value) || 0;
    setDiscount(discountValue > grossAmount ? grossAmount : discountValue);
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
      { product: 0, productName: "", product_qty: 1, price: 0, total: 0 },
    ]);
  };

  const removeProductField = (index) => {
    if (products.length > 1) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  const isRowFilled = (product) => {
    return product.productName && product.product_qty && product.price;
  };

  const getSelectedProducts = () => {
    return products.map((product) => product.id);
  };

  const checkServiceAndOrderExistOrNot = () => {
    if (!phoneCustomer || !phoneCustomer.startsWith("+91")) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
    let valid = true;
    if (!postalCode) {
      setPostalCodeError(true);
      valid = false;
    } else {
      setPostalCodeError(false);
    }
    if (!paymentMode) {
      setPaymentModeError(true);
      valid = false;
    } else {
      setPaymentModeError(false);
    }
    if (valid) {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${baseApiUrl}check-serviceability/`,
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          pincode: postalCode,
          mobile: phoneCustomer,
          re_order:0
        },
      };

      axios
        .request(config)
        .then((response) => {
          if (response.status === 208) {
            swal({
              title: "Order Status!",
              text: "Re-Order",
              icon: "warning",
              button: "Ok!",
            });
          } else {
            setPincodeData(response.data.data);
            setCutomerCity(response.data.data[0].delivery_city);
            setCutomerState(response.data.data[0].delivery_state);
            setIsDialogOpen(false);
            setIsSecondDialogOpen(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const createOrder = () => {
    if (!customerName) {
    }
    const axios = require("axios");
    let data = JSON.stringify({
      network_ip: `192.168.1.1`,
      customer_name: `${customerName}`,
      customer_phone: `${phoneCustomer}`,
      customer_address: `${customerAddress}`,
      customer_postal: `${postalCode}`,
      customer_city: `${cutomerCity}`,
      customer_country: `${cutomerCountry}`,
      total_amount: payableAmount,
      gross_amount: grossAmount,
      discount: discount,
      prepaid_amount: partialPayment,
      order_remark: orderRemark,
      repeat_order: 0,
      is_booked: 1,
      customer_state: `${cutomerState}`,
      payment_type: 1,
      payment_status: 1,
      order_status: 1,
      order_created_by: 7,
      product_details: products,
      pick_up_point: selectedPincode,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseApiUrl}orders/`,
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        if (response.status === 201) {
          swal({
            title: "Order Status!",
            text: "Successfully Created !",
            icon: "success",
            button: "Ok",
          });
          router.push("/admin/orders");
        }
      })
      .catch((error) => {
        swal({
          title: "Order Status!",
          text: "Failed Create!",
          icon: "error",
          button: "Ok",
        });
      });
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

              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="Full Name" required>
                  Customer Name
                </CustomLabel>
                <CustomTextField
                  id="name"
                  name="name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
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
                  value={customerFatherName}
                  onChange={(e) => setCustomerFatherName(e.target.value)}
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
                  value={phoneCustomer}
                  onChange={(e) => setPhoneCustomer(e.target.value)}
                  placeholder="+91987XXXXXXXX"
                  type="text"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  style={{ backgroundColor: "#eeeeee" }}
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
                  value={customerEmailId}
                  onChange={(e) => setCustomerEmailId(e.target.value)}
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
                  displayEmpty
                  sx={{ fontFamily: "Poppins, sans-serif", height: "50px" }}
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
                  value={postalCode}
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
                  displayEmpty
                  sx={{ fontFamily: "Poppins, sans-serif", height: "50px" }}
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
                  value={cutomerCity}
                  onChange={(e) => setCutomerCity(e.target.value)}
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
                  value={cutomerState}
                  onChange={(e) => setCutomerState(e.target.value)}
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
                  value={cutomerCountry}
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
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  type="text"
                  fullWidth
                  multiline
                  rows={1}
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
                              onChange={(e) => {
                                const selectedValue = e.target.value;
                                const selectedname = e.target.name;
                                const selectedProduct = productList.find(
                                  (item) => item.product_name === selectedValue
                                );
                                handleInputChange(index, {
                                  id: selectedProduct.id,
                                  name: selectedname,
                                  Pname: selectedValue,
                                  Pprice: selectedProduct
                                    ? selectedProduct.product_price
                                    : 0,
                                });
                              }}
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
                              {productList.map((productItem, idx) => (
                                <MenuItem
                                  key={idx}
                                  value={productItem.product_name}
                                  disabled={getSelectedProducts().includes(
                                    productItem.product_name
                                  )}
                                >
                                  {productItem.product_name}
                                </MenuItem>
                              ))}
                            </Select>
                          </Grid>
                          <Grid item xs={12} sm={2}>
                            <CustomLabel
                              htmlFor={`product_qty-${index}`}
                              required
                            >
                              Quantity
                            </CustomLabel>
                            <CustomTextField
                              id={`product_qty-${index}`}
                              name="product_qty"
                              value={product.product_qty}
                              onChange={(e) => {
                                handleInputChange(index, {
                                  id: product.id,
                                  name: e.target.name,
                                  Pname: product.productName,
                                  Pprice: product.price,
                                  product_qty: e.target.value,
                                });
                              }}
                              placeholder="product_qty"
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
                  value={orderRemark}
                  onChange={(e) => setOrderRemark(e.target.value)}
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
                onClick={createOrder}
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
                  onChange={(e) => setCustomerCallId(e.target.value)}
                  type="text"
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>
              <Grid item xs={6}>
                <div
                  style={{
                    border: phoneError ? "1px solid red" : "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "10px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <PhoneInput
                    international
                    countryCallingCodeEditable={true}
                    defaultCountry="IN"
                    value={phoneCustomer}
                    onChange={(value) => setPhoneCustomer(value)}
                    inputStyle={{
                      width: "100%",

                      fontFamily: "Poppins, sans-serif",
                      padding: 0,
                    }}
                    buttonStyle={{
                      border: "none",
                      background: "transparent",
                    }}
                    placeholder="Enter phone number"
                  />
                </div>
                {phoneError && (
                  <FormHelperText error>
                    Phone Number must start with '+91'
                  </FormHelperText>
                )}
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
                  >
                    <MenuItem value="">Payment Status</MenuItem>
                    <MenuItem value="COD">COD</MenuItem>
                    <MenuItem value="Prepaid">Prepaid</MenuItem>
                    <MenuItem value="Partial">Partial</MenuItem>
                  </Select>
                  {paymentModeError && (
                    <FormHelperText error>
                      Payment Status is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={checkServiceAndOrderExistOrNot}
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
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Pickup Point</TableCell>
                    <TableCell>EDD</TableCell>
                    <TableCell>Address</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {pincodeData.map((item) => (
                    <TableRow key={item.pickup_id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedPincode === item.pickup_id}
                          onChange={() =>
                            handlePincodeSelection(item.pickup_id)
                          }
                        />
                        {item.pickup_point}
                      </TableCell>
                      <TableCell>{item.eddtime} in Days</TableCell>
                      <TableCell>
                        {item.pickup_city || "No address available"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
