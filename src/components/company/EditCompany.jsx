import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
import CustomCard from "../CustomCard";
import {
  Typography,
  Button,
  Grid,
  CardContent,
  Divider,
} from "@mui/material";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";

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

const EditCompany = () => {
  const router = useRouter();
  const { id } = router.query;
  const [company, setCompany] = useState({
    name: "",
    company_email: "",
    company_phone: "",
    company_website: "",
    company_address: "",
    package_name: "",
    payment_mode: "",
    amount: "",
    paymentDate: "",
    nextPaymentDate: "",
    first_name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const handleUpdate = () => {
  //   router.push("/superadmin/company");
  // };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found.");
      }

      console.log("Updating company with data:", company);

      const response = await MainApi.put(`/api/companies/${id}/`, company, {
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
            setCompany(response.data);
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

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
              Update Company Details
            </Typography>
            <Divider sx={{ my: 2 }} />

            <form onSubmit={handleFormSubmit}>
              <Grid
                container
                spacing={2}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="name" required>
                    Company Name
                  </CustomLabel>
                  <CustomTextField
                    id="name"
                    name="name"
                    placeholder="e.g. creworder"
                    type="text"
                    required
                    fullWidth
                    value={company.name}
                    onChange={(e) =>
                      setCompany({ ...company, name: e.target.value })
                    }
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
                    required
                    fullWidth
                    value={company.company_email}
                    onChange={(e) =>
                      setCompany({ ...company, company_email: e.target.value })
                    }
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
                    required
                    fullWidth
                    value={company.company_phone}
                    onChange={(e) =>
                      setCompany({ ...company, company_phone: e.target.value })
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={6}>
                  <CustomLabel htmlFor="company_website" required>
                    Website
                  </CustomLabel>
                  <CustomTextField
                    id="company_website"
                    name="company_website"
                    placeholder="e.g. creworder"
                    type="text"
                    required
                    fullWidth
                    value={company.company_website}
                    onChange={(e) =>
                      setCompany({
                        ...company,
                        company_website: e.target.value,
                      })
                    }
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
                    placeholder="e.g. 123 Main St"
                    required
                    fullWidth
                    value={company.company_address}
                    onChange={(e) =>
                      setCompany({
                        ...company,
                        company_address: e.target.value,
                      })
                    }
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
                    style={{ marginTop: "8px", display: "block", width: "100%" }}
                  />
                  <Grid
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 2,
                    }}
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
              <Grid
                container
                spacing={2}
                sx={{
                  marginTop: 3,
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="package_name" required>
                    Package Name
                  </CustomLabel>
                  <CustomTextField
                    id="package_name"
                    name="package_name"
                    placeholder="e.g. Standard"
                    type="text"
                    required
                    fullWidth
                    value={company.package_name}
                    onChange={(e) =>
                      setCompany({ ...company, package_name: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="payment_mode" required>
                    Payment Mode
                  </CustomLabel>
                  <CustomTextField
                    id="payment_mode"
                    name="payment_mode"
                    type="text"
                    placeholder="e.g. Monthly"
                    required
                    fullWidth
                    value={company.payment_mode}
                    onChange={(e) =>
                      setCompany({ ...company, payment_mode: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="amount" required>
                    Amount
                  </CustomLabel>
                  <CustomTextField
                    id="amount"
                    name="amount"
                    type="number"
                    placeholder="e.g. 123456"
                    required
                    fullWidth
                    value={company.amount}
                    onChange={(e) =>
                      setCompany({ ...company, amount: e.target.value })
                    }
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ marginTop: 1 }}>
                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="paymentDate" required>
                    Payment Date
                  </CustomLabel>
                  <CustomTextField
                    id="paymentDate"
                    name="paymentDate"
                    placeholder="Select Date"
                    type="date"
                    required
                    fullWidth
                    value={company.paymentDate}
                    onChange={(e) =>
                      setCompany({
                        ...company,
                        paymentDate: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="nextPaymentDate" required>
                    Next Payment Date
                  </CustomLabel>
                  <CustomTextField
                    id="nextPaymentDate"
                    name="nextPaymentDate"
                    placeholder="Select Date"
                    type="date"
                    required
                    fullWidth
                    value={company.nextPaymentDate}
                    onChange={(e) =>
                      setCompany({
                        ...company,
                        nextPaymentDate: e.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography
                sx={{ fontSize: "15px", fontWeight: "bold", marginTop: 3 }}
              >
               Contact Person Details
              </Typography>
              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="first_name" required>
                  First Name
                  </CustomLabel>
                  <CustomTextField
                    id="first_name"
                    name="first_name"
                    placeholder="e.g. John"
                    type="text"
                    required
                    fullWidth
                    value={company.first_name}
                    onChange={(e) =>
                      setCompany({
                        ...company,
                        first_name: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="email" required>
                  Email
                  </CustomLabel>
                  <CustomTextField
                    id="email"
                    name="email"
                    placeholder="e.g. test@creworder.com"
                    type="email"
                    required
                    fullWidth
                    value={company.email}
                    onChange={(e) =>
                      setCompany({
                        ...company,
                        email: e.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>

              <Grid
                container
                sx={{ display: "flex", justifyContent: "right", mt: 3 }}
              >
                <Button
                // onClick={handlesubmit}
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#23395d",
                    textTransform: "none",
                    fontSize: "13px",
                    fontWeight: "600",
                    padding: "8px 26px",
                    borderRadius: "8px",
                    color: "#FFFFFF",
                    ":hover": {
                      bgcolor: "#23395d",
                    },
                  }}
                >
                  Update
                </Button>
              </Grid>
            </form>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default EditCompany;
