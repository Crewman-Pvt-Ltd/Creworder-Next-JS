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
} from "@mui/material";
import CustomCard from "../CustomCard";
import CustomLabel from "../CustomLabel";
import CustomTextField from "../CustomTextField";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { baseApiUrl } from "@/api-manage/ApiRoutes";
import { getToken } from "@/utils/getToken";
import MainApi from "@/api-manage/MainApi";
import axios from "axios";
const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

const EditOrder = () => {
  const router = useRouter();
  const { id } = router.query;
  const token = getToken();
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_parent_name: "",
    customer_phone: "",
    customer_email: "",
    customer_postal: "",
    customer_city: "",
    customer_state: "",
    customer_country: "",
    customer_address: "",
    order_remark: "",
  });

  useEffect(() => {
    if (id) {
      const fetchOrderData = async () => {
        try {
          const token = getToken();
          if (!token) {
            throw new Error("No authentication token found.");
          }
          const response = await MainApi.get(`/api/orders/${id}`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          if (response.status === 200) {
            const orderData = response.data?.Data?.[0];
            console.log(orderData);
            setFormData({
              customer_name: orderData?.customer_name || "",
              customer_parent_name: orderData?.customer_parent_name || "",
              customer_phone: orderData?.customer_phone || "",
              customer_email: orderData?.customer_email || "",
              customer_postal: orderData?.customer_postal || "",
              customer_city: orderData?.customer_city || "",
              customer_state: orderData?.customer_state || "",
              customer_country: orderData?.customer_country || "",
              customer_address: orderData?.customer_address || "",
              order_remark: orderData?.order_remark || "",
            });
            setCourseDuration(orderData?.course_duration || "");
            setLocality(orderData?.locality || "");
            setProducts(
              orderData?.products || [
                { productName: "", quantity: 1, price: 0, total: 0 },
              ]
            );
          } else {
            console.log("Error: Could not fetch order data.");
          }
        } catch (error) {
          console.error("Error fetching order data:", error.message);
        }
      };

      fetchOrderData();
    }
  }, [id]);

  const orderlist = () => {
    router.push("/admin/orders");
  };

  const [courseDuration, setCourseDuration] = useState("");
  const [locality, setLocality] = useState("");
  const [products, setProducts] = useState([
    { productName: "", quantity: 1, price: 0, total: 0 },
  ]);
  const [discount, setDiscount] = useState(0);
  const [grossAmount, setGrossAmount] = useState(0);
  const [payableAmount, setPayableAmount] = useState(0);
  const [codAmount, setCodAmount] = useState(0);
  const [paymentType, setPaymentType] = useState("");
  const [partialPayment, setPartialPayment] = useState(0);
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
              Edit Orders
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography sx={{ fontFamily: poppins.style.fontFamily }}>
                  Personal Details :
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="customer_name" required>
                  Customer Name
                </CustomLabel>
                <CustomTextField
                  id="customer_name"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="customer_parent_name" required>
                  Customer Father Name
                </CustomLabel>
                <CustomTextField
                  id="customer_parent_name"
                  name="customer_parent_name"
                  value={formData.father_name}
                  onChange={handleInputChange}
                  placeholder="Father's Name"
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="customer_phone" required>
                  Customer Phone
                </CustomLabel>
                <CustomTextField
                  id="customer_phone"
                  name="customer_phone"
                  value={formData.customer_phone}
                  onChange={handleInputChange}
                  placeholder="+91-987XXXXXXXX"
                  type="text"
                  fullWidth
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="customer_email" required>
                  Customer Email
                </CustomLabel>
                <CustomTextField
                  id="customer_email"
                  name="customer_email"
                  value={formData.customer_email}
                  onChange={handleInputChange}
                  placeholder="Email-ID"
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

              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="customer_postal" required>
                  Postal Code
                </CustomLabel>
                <CustomTextField
                  id="customer_postal"
                  name="customer_postal"
                  placeholder="Postalcode"
                  value={formData.customer_postal}
                  onChange={handleInputChange}
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
                </Select>
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="customer_city" required>
                  City
                </CustomLabel>
                <CustomTextField
                  id="customer_city"
                  name="customer_city"
                  value={formData.customer_city}
                  onChange={handleInputChange}
                  placeholder="City"
                  type="text"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  style={{ backgroundColor: "#eeeeee" }}
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="customer_state" required>
                  State
                </CustomLabel>
                <CustomTextField
                  id="customer_state"
                  name="customer_state"
                  value={formData.customer_state}
                  onChange={handleInputChange}
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
                  value={formData.customer_country}
                  onChange={handleInputChange}
                  placeholder="Country"
                  type="text"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  style={{ backgroundColor: "#eeeeee" }}
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomLabel htmlFor="customer_address" required>
                  Address
                </CustomLabel>
                <CustomTextField
                  id="customer_address"
                  name="customer_address"
                  value={formData.customer_address}
                  onChange={handleInputChange}
                  placeholder="Full Address"
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
                <CustomLabel htmlFor="order_remark" required>
                  Order Remark:
                </CustomLabel>
                <CustomTextField
                  id="order_remark"
                  name="order_remark"
                  value={formData.order_remark}
                  onChange={handleInputChange}
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
                Update
              </Button>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default EditOrder;
