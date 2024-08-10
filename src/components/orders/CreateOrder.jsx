import React from "react";
import { Grid, Typography, Divider, CardContent, Button } from "@mui/material";
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

const CreateOrder = () => {
  const router = useRouter();
  const orderlist = () => {
    router.push("/admin/orders");
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
              Add Orders
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography sx={{ fontFamily: poppins.style.fontFamily }}>
                  Personal Details :
                </Typography>
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
                  placeholder="e.g. fathername"
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
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ fontFamily: poppins.style.fontFamily }}>
                  Address Details :
                </Typography>
              </Grid>
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
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
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
              <Grid item xs={12} sm={3}>
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
              <Grid item xs={12} sm={3}>
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
              <Grid item xs={12} sm={3}>
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
              <Grid item xs={12} sm={3}>
                <CustomLabel htmlFor="product" required>
                  Select Product
                </CustomLabel>
                <CustomTextField
                  id="product"
                  name="product"
                  placeholder="e.g. product"
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
                <CustomLabel htmlFor="total" required>
                  Total
                </CustomLabel>
                <CustomTextField
                  id="total"
                  name="total"
                  placeholder="e.g. total"
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
                  sx={{ fontFamily: poppins.style.fontFamily }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={6}>
                        <Typography variant="caption" sx={{ fontFamily: poppins.style.fontFamily }}>
                          Gross Amount (₹)
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextField placeholder="e.g. total" sx={{ fontFamily: poppins.style.fontFamily }} />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={6}>
                        <Typography variant="caption" sx={{ fontFamily: poppins.style.fontFamily }}>
                          Discount (-₹)
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextField placeholder="e.g. value" sx={{ fontFamily: poppins.style.fontFamily }} />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={6}>
                        <Typography variant="caption" sx={{ fontFamily: poppins.style.fontFamily }}>
                          Payable Amount (₹)
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextField placeholder="e.g. value" sx={{ fontFamily: poppins.style.fontFamily }} />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={6}>
                        <Typography variant="caption" sx={{ fontFamily: poppins.style.fontFamily }}>
                          Payment Type
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <CustomTextField placeholder="e.g. value" sx={{ fontFamily: poppins.style.fontFamily }} />
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
                  fontFamily: poppins.style.fontFamily
                }}
              >
                Submit
              </Button>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default CreateOrder;
