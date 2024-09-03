import React, { useState, useEffect } from "react";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
import CustomCard from "../CustomCard";
import {
  Typography,
  Button,
  Grid,
  CardContent,
  Divider,
  Select,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/router";
import { getToken } from "@/utils/getToken";
import MainApi from "@/api-manage/MainApi";
import useGetAllPackages from "@/api-manage/react-query/useGetAllPackages";
const CreateCompanyLayout = () => {
  const {
    data,
    isLoading: packageLoading,
    error: packageError,
  } = useGetAllPackages();

  const token = getToken();
  const [formData, setFormData] = useState({
    name: "",
    company_email: "",
    company_phone: "",
    company_website: "",
    company_address: "",
    package: "",
    payment_mode: "",
    amount: "",
    paymentDate: "",
    nextPaymentDate: "",
    username: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [packages, setPackages] = useState({});
  const [packageAmount, setAmount] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prevData) => ({
      ...prevData,
      paymentDate: today,
    }));
  }, []);


    const handlePackageChange = (e) => {
      const {value} = e.target;
      data?.results.forEach(element => {
        if(element.id == value){
          setPackages(element);
          setFormData({
            ...formData,
            package: element.id,
          });
        }
      });
    }

    const handlePaymentMode = (e) => {
      const {value} = e.target;
      let frequency;
      if (value == "month"){
        frequency = "monthly_price"
      }
      else if (value == "quarter"){
        frequency = "quarterly_price"
      }
      else if (value == "half"){
        frequency = "annual_price"
      }
      const amt = packages[frequency];
      setAmount(amt);
      setFormData({
        ...formData,
        payment_mode: value,
      });
    }


    const handleInputChange = (e) => {
      const { name, value } = e.target;
  
      // Check for payment mode selection to auto-fetch the corresponding amount
      if (name === "payment_mode") {
        const amount = packageAmount; 
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
          amount: amount
        }));
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
  
      setFormErrors({
        ...formErrors,
        [name]: !value ? "This field is required" : "",
      });
    };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById("preview").src = e.target.result;
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* const errors = Object.keys(formData).reduce((acc, key) => {
      if (!formData[key]) acc[key] = "This field is required";
      return acc;
    }, {});

    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    } */

    try {
      const response = await MainApi.post("/api/companies/", formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.status === 201) {
        router.push("/superadmin/company");
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container sx={{ padding: 3 }}>
        <Grid item xs={12} sm={12} md={12}>
          <CustomCard>
            <CardContent>
              <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                Add Company
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="name" required>
                    Company Name
                  </CustomLabel>
                  <CustomTextField
                    id="name"
                    name="name"
                    placeholder="e.g. creworder"
                    type="text"
                    fullWidth
                    value={formData.name}
                    onChange={handleInputChange}
                    error={!!formErrors.name}
                    helperText={formErrors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="company_email" required>
                    Email
                  </CustomLabel>
                  <CustomTextField
                    id="company_email"
                    name="company_email"
                    type="email"
                    placeholder="e.g. test@creworder.com"
                    fullWidth
                    value={formData.company_email}
                    onChange={handleInputChange}
                    error={!!formErrors.company_email}
                    helperText={formErrors.company_email}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="company_phone" required>
                    Phone Number
                  </CustomLabel>
                  <CustomTextField
                    id="company_phone"
                    name="company_phone"
                    type="tel"
                    placeholder="1234567890"
                    fullWidth
                    value={formData.company_phone}
                    onChange={handleInputChange}
                    error={!!formErrors.company_phone}
                    helperText={formErrors.company_phone}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <CustomLabel htmlFor="company_website" required>
                    Website
                  </CustomLabel>
                  <CustomTextField
                    id="company_website"
                    name="company_website"
                    placeholder="e.g. creworder.com"
                    type="text"
                    fullWidth
                    value={formData.company_website}
                    onChange={handleInputChange}
                    error={!!formErrors.company_website}
                    helperText={formErrors.company_website}
                  />
                  <CustomLabel
                    htmlFor="company_address"
                    required
                    sx={{ marginTop: 2 }}
                  >
                    Address
                  </CustomLabel>
                  <CustomTextField
                    id="company_address"
                    name="company_address"
                    type="text"
                    placeholder="e.g. 1234 Main St"
                    fullWidth
                    value={formData.company_address}
                    onChange={handleInputChange}
                    error={!!formErrors.company_address}
                    helperText={formErrors.company_address}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomLabel htmlFor="company_image" required>
                    Upload Company Logo
                  </CustomLabel>
                  <input
                    type="file"
                    id="company_image"
                    onChange={handleFileChange}
                    style={{
                      marginTop: "8px",
                      display: "block",
                      width: "100%",
                    }}
                  />
                  <Grid
                    sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                  >
                    <img
                      id="preview"
                      src="https://placehold.co/600x400/EEE/31343C"
                      alt="Preview"
                      width="35%"
                      style={{ objectFit: "contain" }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography
                sx={{ fontSize: "15px", fontWeight: "bold", marginTop: 3 }}
              >
                Package Details
              </Typography>
              <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="package" required>
                    Package Name
                  </CustomLabel>
                  <Select fullWidth
                  name="package"
                   sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                   onChange={handlePackageChange}
                  >
                    <MenuItem value="" disabled>
                      Select Package
                    </MenuItem>
                    {packageLoading ? (
                      <MenuItem disabled>Loading...</MenuItem>
                    ) : packageError ? (
                      <MenuItem disabled>Error fetching packages</MenuItem>
                    ) : (
                      data.results.map((packageItem) => (
                        <MenuItem key={packageItem.id} value={packageItem.id}>
                          {packageItem.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </Grid>

                
                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="payment_mode" required>
                    Payment Mode
                  </CustomLabel>
                  <Select
                    id="payment_mode"
                    name="payment_mode"
                    fullWidth
                    sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                    value={formData.payment_mode}
                    onChange={handlePaymentMode}
                  >
                    <MenuItem value="" disabled>
                      Select Payment Mode
                    </MenuItem>
                    <MenuItem value="month">Monthly</MenuItem>
                    <MenuItem value="quarter">Quarterly</MenuItem>
                    <MenuItem value="half">Annually</MenuItem>
                  </Select>
                </Grid>



                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="amount" required>
                    Amount
                  </CustomLabel>
                  <CustomTextField
                    id="amount"
                    name="amount"
                    type="number"
                    placeholder="e.g. 500"
                    fullWidth
                    readOnly
                    value={packageAmount}
                    onChange={handlePackageChange}
                    inputProps={{ readOnly: true }}
                    style={{backgroundColor: '#eeeeee'}}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <CustomLabel htmlFor="paymentDate" required>
                    Payment Date
                  </CustomLabel>
                  <CustomTextField
                    id="paymentDate"
                    name="paymentDate"
                    type="date"
                    fullWidth
                    value={formData.paymentDate}
                    onChange={handleInputChange}
                    error={!!formErrors.paymentDate}
                    helperText={formErrors.paymentDate}
                    inputProps={{ readOnly: true }}
                    style={{backgroundColor: '#eeeeee'}}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomLabel htmlFor="nextPaymentDate">
                    Next Payment Date
                  </CustomLabel>
                  <CustomTextField
                    id="nextPaymentDate"
                    name="nextPaymentDate"
                    type="date"
                    fullWidth
                    value={formData.nextPaymentDate}
                    onChange={handleInputChange}
                    error={!!formErrors.nextPaymentDate}
                    helperText={formErrors.nextPaymentDate}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography
                sx={{ fontSize: "15px", fontWeight: "bold", marginTop: 3 }}
              >
                Contact Person Details
              </Typography>
              <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="username" required>
                    User Name
                  </CustomLabel>
                  <CustomTextField
                    id="username"
                    name="username"
                    type="text"
                    placeholder="e.g. John"
                    fullWidth
                    value={formData.username}
                    onChange={handleInputChange}
                    error={!!formErrors.username}
                    helperText={formErrors.username}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="email" required>
                    Email
                  </CustomLabel>
                  <CustomTextField
                    id="email"
                    name="email"
                    type="email"
                    placeholder="e.g. john@example.com"
                    fullWidth
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="contact" required>
                    Contact No.
                  </CustomLabel>
                  <CustomTextField
                    id="contact"
                    name="contact"
                    type="contact"
                    placeholder="e.g. +91-9800 XXXXX2"
                    fullWidth
                    value={formData.contact}
                    onChange={handleInputChange}
                    error={!!formErrors.contact}
                    helperText={formErrors.contact}
                  />
                </Grid>
              </Grid>

              <Grid
                item
                sx={{
                  marginTop: 3,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  sx={{
                    padding: "8px 16px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    backgroundColor: "#405189",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#334a6c",
                    },
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Grid>
            </CardContent>
          </CustomCard>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateCompanyLayout;