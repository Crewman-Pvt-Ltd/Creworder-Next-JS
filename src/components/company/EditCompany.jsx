import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../CustomLabel";
import CustomCard from "../CustomCard";
import {
  Typography,
  Button,
  Select,
  Grid,
  CardContent,
  Divider,
  MenuItem,
} from "@mui/material";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";
import useGetAllPackages from "@/api-manage/react-query/useGetAllPackages";

const EditCompany = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data,
    isLoading: packageLoading,
    error: packageError,
  } = useGetAllPackages();

  const [packages, setPackages] = useState({});
  const [packageAmount, setAmount] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    company_email: "",
    company_phone: "",
    company_website: "",
    company_address: "",
    package_name: "",
    package: "",
    payment_mode: "",
    amount: "",
    paymentDate: "",
    nextPaymentDate: "",
    username: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handlePackageChange = (e) => {
    const { value } = e.target;
    const selectedPackage = data?.results.find(pkg => pkg.id === value);
    if (selectedPackage) {
      setPackages(selectedPackage);
      setFormData(prevFormData => ({
        ...prevFormData,
        package_name: selectedPackage.name,
        package: selectedPackage.id,
      }));
      setAmount(selectedPackage.monthly_price); // Default to monthly price
    }
  };

  const handlePaymentMode = (e) => {
    const { value } = e.target;
    let frequency;
    switch (value) {
      case "month":
        frequency = "monthly_price";
        break;
      case "quarter":
        frequency = "quarterly_price";
        break;
      case "half":
        frequency = "annual_price";
        break;
      default:
        frequency = "monthly_price";
    }
    const amt = packages[frequency];
    setAmount(amt);
    setFormData(prevFormData => ({
      ...prevFormData,
      payment_mode: value,
      amount: amt,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "payment_mode") {
      handlePaymentMode(e);
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
      }));
    }

    setFormErrors(prevErrors => ({
      ...prevErrors,
      [name]: !value ? "This field is required" : "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await MainApi.put(`/api/companies/${id}/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("Company updated successfully");
        router.push("/superadmin/company");
      } else {
        console.error("Failed to update the company");
        setError("Failed to update the company");
      }
    } catch (error) {
      console.error("An error occurred while updating the company:", error);
      setError("An error occurred while updating the company");
    }
  };
  const addKeyToFormData = (pdata) => {
    console.log(pdata); 
    
    let amountp
    const selectedPackage1 = data?.find((pkg) => pkg.id === pdata.package);
    console.log(selectedPackage1)
    if(pdata.payment_mode=='month'){
       amountp=selectedPackage1.monthly_price
    }
    if(pdata.payment_mode=='quarter'){
       amountp=selectedPackage1.quarterly_price
    }
    if(pdata.payment_mode=='annual'){
       amountp=selectedPackage1.annual_price
    }
    console.log(selectedPackage1);
    
    setFormData((prevData) => ({
      ...prevData,
      amount: amountp,
    }));
  };
    
  useEffect(() => {
    if (id) {
      const fetchCompany = async () => {
        try {
          setLoading(true);
          const token = getToken();
          if (!token) {
            throw new Error("No authentication token found.");
          }
          const response = await MainApi.get(`/api/companies/${id}`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });

          if (response.status === 200) {
            setFormData(response.data);
            addKeyToFormData(response.data);
          } else {
            console.error("Failed to fetch the company");
            setError("Failed to fetch the company");
          }
        } catch (error) {
          console.error("An error occurred while fetching the company:", error);
          setError("An error occurred while fetching the company");
        } finally {
          setLoading(false);
        }
      };

      fetchCompany();
    }
  }, [id]);
  // console.log(formData)
  // console.log(data)
  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
              Edit Company
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

            <Grid container spacing={2}>

            <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="package" required>
                    Package Name
                  </CustomLabel>
                  <Select fullWidth
                  name="package"
                   sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                   onChange={handlePackageChange}
                   value={formData.package}
                  >
                    <MenuItem value="" disabled>
                      Select Package
                    </MenuItem>
                    {packageLoading ? (
                      <MenuItem disabled>Loading...</MenuItem>
                    ) : packageError ? (
                      <MenuItem disabled>Error fetching packages</MenuItem>
                    ) : (
                      data.map((packageItem) => (
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
                  placeholder="Amount"
                  fullWidth
                  value={formData.amount}
                  readOnly
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="nextPaymentDate" required>
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

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={4}>
                <CustomLabel htmlFor="username" required>
                 Username
                </CustomLabel>
                <CustomTextField
                  id="username"
                  name="username"
                  placeholder="e.g. John"
                  type="text"
                  fullWidth
                  value={formData.username}
                  onChange={handleInputChange}
                  error={!!formErrors.username}
                  helperText={formErrors.username}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <CustomLabel htmlFor="email" required>
                  Email
                </CustomLabel>
                <CustomTextField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g. john@doe.com"
                  fullWidth
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <CustomLabel htmlFor="contact" required>
                Contact No.
                </CustomLabel>
                <CustomTextField
                  id="contact"
                  name="contact"
                  type="contact"
                  placeholder=""
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
  );
};

export default EditCompany;
