import React, { useState } from "react";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
import { useRouter } from "next/router";
import CustomCard from "../CustomCard";
import { getToken } from "@/utils/getToken";
import MainApi from "@/api-manage/MainApi";
import { Typography, Button, Grid, CardContent, Divider, FormControlLabel, Checkbox } from "@mui/material";

const CreateCompanyLayout = () => {
  const router = useRouter();
  const currentDate = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    name: "",
    company_email: "",
    company_phone: "",
    company_website: "",
    company_address: "",
    company_image: null, 
    package_name: "",
    payment_mode: "",
    amount: "",
    paymentDate: currentDate,
    nextPaymentDate: "",
    first_name: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "paymentDate") {
        formErrors[key] = "This field is required";
      }
    });
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  const [showDetails, setShowDetails] = useState(false);
  const [branches, setBranches] = useState([
    { id: 1, branchname: "", branchid: "" },
  ]);
  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const token = getToken();
        if (!token) {
          throw new Error("No authentication token found.");
        }

        const form = new FormData();
        Object.keys(formData).forEach((key) => {
          form.append(key, formData[key]);
        });

        const response = await MainApi.post("/api/companies/", form, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data", 
          },
        });

        if (response.status === 201) {
          router.push("/superadmin/company");
        }
      } catch (error) {
        console.error("Error submitting form:", error.response?.data || error.message);
      }
    }
  };

  const handleInputChange = (field, value, index) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    const newBranches = branches.map((branch, i) =>
      i === index ? { ...branch, [field]: value } : branch
    );
    setBranches(newBranches);
  };
  const handleCheckboxChange = (event) => {
    setShowDetails(event.target.checked);
  };

  const handleAddBranch = () => {
    const lastBranch = branches[branches.length - 1];
    if (lastBranch.branchname && lastBranch.branchid) {
      setBranches([
        ...branches,
        { id: branches.length + 1, branchname: "", branchid: "" },
      ]);
    } else {
      alert(
        "Please fill in the details for the current branch before adding a new one."
      );
    }
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        company_image: file,
      }));

      // Preview image
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById("preview").src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
              Add Company
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              {/* Company Details */}
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
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
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
                  value={formData.company_email}
                  onChange={(e) => handleInputChange("company_email", e.target.value)}
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
                  value={formData.company_phone}
                  onChange={(e) => handleInputChange("company_phone", e.target.value)}
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
                  required
                  fullWidth
                  value={formData.company_website}
                  onChange={(e) => handleInputChange("company_website", e.target.value)}
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
                  required
                  fullWidth
                  value={formData.company_address}
                  onChange={(e) => handleInputChange("company_address", e.target.value)}
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
                <Grid sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
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

            <Typography sx={{ fontSize: "15px", fontWeight: "bold", marginTop: 3 }}>
              Package Details
            </Typography>
            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="package_name" required>
                  Package Name
                </CustomLabel>
                <CustomTextField
                  id="package_name"
                  name="package_name"
                  type="text"
                  placeholder="e.g. Premium"
                  required
                  fullWidth
                  value={formData.package_name}
                  onChange={(e) => handleInputChange("package_name", e.target.value)}
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
                  placeholder="e.g. Credit Card"
                  required
                  fullWidth
                  value={formData.payment_mode}
                  onChange={(e) => handleInputChange("payment_mode", e.target.value)}
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
                  placeholder="e.g. 500"
                  required
                  fullWidth
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
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
                  onChange={(e) => handleInputChange("paymentDate", e.target.value)}
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
                  onChange={(e) => handleInputChange("nextPaymentDate", e.target.value)}
                />
              </Grid>
            </Grid>

            <Typography sx={{ fontSize: "15px", fontWeight: "bold", marginTop: 3 }}>
              Contact Details
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="first_name" required>
                  First Name
                </CustomLabel>
                <CustomTextField
                  id="first_name"
                  name="first_name"
                  type="text"
                  placeholder="e.g. John"
                  required
                  fullWidth
                  value={formData.first_name}
                  onChange={(e) => handleInputChange("first_name", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="email" required>
                  Email
                </CustomLabel>
                <CustomTextField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g. john@example.com"
                  required
                  fullWidth
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item sx={{ marginTop: 3 }}>
              <FormControlLabel
                control={<Checkbox onChange={handleCheckboxChange} />}
                label={
                  <Typography variant="body1" sx={{ fontFamily: "serif" }}>
                    Branches
                  </Typography>
                }
              />
            </Grid>

            {showDetails && (
              <>
                {branches.map((branch, index) => (
                  <Grid item key={branch.id} xs={12} sx={{ marginTop: 3 }}>
                    <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
                      Branch Details
                    </Typography>
                    <Grid container spacing={2} sx={{ marginTop: 3 }}>
                      <Grid item xs={12} sm={6}>
                        <CustomLabel
                          htmlFor={`branchname-${branch.id}`}
                          required
                        >
                          Branch Name
                        </CustomLabel>
                        <CustomTextField
                          id={`branchname-${branch.id}`}
                          name={`branchname-${branch.id}`}
                          placeholder="e.g. Branch A"
                          type="text"
                          required
                          fullWidth
                          value={branch.branchname}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "branchname",
                              e.target.value
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CustomLabel htmlFor={`branchid-${branch.id}`} required>
                          Branch ID
                        </CustomLabel>
                        <CustomTextField
                          id={`branchid-${branch.id}`}
                          name={`branchid-${branch.id}`}
                          type="text"
                          placeholder="e.g. BR001"
                          required
                          fullWidth
                          value={branch.branchid}
                          onChange={(e) =>
                            handleInputChange(index, "branchid", e.target.value)
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
                <Grid item xs={12} sx={{ marginTop: 3 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddBranch}
                    disabled={
                      !branches[branches.length - 1].branchname ||
                      !branches[branches.length - 1].branchid
                    }
                  >
                    Add Branch
                  </Button>
                </Grid>
              </>
            )}
            <Button
              sx={{ marginTop: 4 }}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default CreateCompanyLayout;
