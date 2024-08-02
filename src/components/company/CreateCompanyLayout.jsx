import React, { useState, useEffect } from "react";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
import CustomCard from "../CustomCard";
import { Typography, Button, Grid, CardContent, Divider, FormControlLabel ,Checkbox,handleCheckboxChange} from "@mui/material";
import { useRouter } from "next/router";
import { getToken } from "@/utils/getToken";
import MainApi from "@/api-manage/MainApi";
const CreateCompanyLayout = () => {
  const [branches, setBranches] = useState([{ id: 1, branchname: "", branchid: "" }]);
  const [showDetails, setShowDetails] = useState(false); // State to toggle branch details
  const token = getToken();
  const [formData, setFormData] = useState({
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

  const [formErrors, setFormErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prevData) => ({
      ...prevData,
      paymentDate: today,
    }));
  }, []);

  const handleInputChange = (e, index = null, field = null) => {
    const { name, value } = e.target;

    if (index !== null && field !== null) {
      // Update branches
      const updatedBranches = branches.map((branch, i) =>
        i === index ? { ...branch, [field]: value } : branch
      );
      setBranches(updatedBranches);
    } else {
      // Update form data
      setFormData({
        ...formData,
        [name]: value,
      });
      setFormErrors({
        ...formErrors,
        [name]: !value ? "This field is required" : "",
      });
    }
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

  const handleAddBranch = () => {
    const lastBranch = branches[branches.length - 1];
    if (lastBranch.branchname && lastBranch.branchid) {
      setBranches([
        ...branches,
        { id: branches.length + 1, branchname: "", branchid: "" },
      ]);
    } else {
      alert("Please fill in the details for the current branch before adding a new one.");
    }
  };

  const handleCheckboxChange = () => {
    setShowDetails(!showDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const errors = Object.keys(formData).reduce((acc, key) => {
      if (!formData[key]) acc[key] = "This field is required";
      return acc;
    }, {});

    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

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
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };



  return (
    <form onSubmit={handleSubmit}>
      <Grid container sx={{ padding: 3 }}>
        <Grid item xs={12}>
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
                  <CustomLabel htmlFor="package_name" required>
                    Package Name
                  </CustomLabel>
                  <CustomTextField
                    id="package_name"
                    name="package_name"
                    type="text"
                    placeholder="e.g. Premium"
                    fullWidth
                    value={formData.package_name}
                    onChange={handleInputChange}
                    error={!!formErrors.package_name}
                    helperText={formErrors.package_name}
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
                    placeholder="e.g. month/year"
                    fullWidth
                    value={formData.payment_mode}
                    onChange={handleInputChange}
                    error={!!formErrors.payment_mode}
                    helperText={formErrors.payment_mode}
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
                    fullWidth
                    value={formData.amount}
                    onChange={handleInputChange}
                    error={!!formErrors.amount}
                    helperText={formErrors.amount}
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
                    InputProps={{ readOnly: true }} // Makes the field non-editable
                    inputProps={{ readOnly: true }} // Makes the field non-clickable
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
                <Grid item xs={12} sm={6}>
                  <CustomLabel htmlFor="first_name" required>
                    First Name
                  </CustomLabel>
                  <CustomTextField
                    id="first_name"
                    name="first_name"
                    type="text"
                    placeholder="e.g. John"
                    fullWidth
                    value={formData.first_name}
                    onChange={handleInputChange}
                    error={!!formErrors.first_name}
                    helperText={formErrors.first_name}
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
                    fullWidth
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
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
                <Grid container spacing={2} sx={{ mt: 2 }} key={branch.id}>
                  <Grid item xs={12} sm={6}>
                    <CustomLabel htmlFor={`branchname_${branch.id}`} required>
                      Branch Name
                    </CustomLabel>
                    <CustomTextField
                      id={`branchname_${branch.id}`}
                      name={`branchname_${branch.id}`}
                      type="text"
                      placeholder="e.g. Main Branch"
                      fullWidth
                      value={branch.branchname}
                      onChange={(e) => handleInputChange(e, index, "branchname")}
                      error={!!formErrors[`branchname_${branch.id}`]}
                      helperText={formErrors[`branchname_${branch.id}`]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomLabel htmlFor={`branchid_${branch.id}`} required>
                      Branch ID
                    </CustomLabel>
                    <CustomTextField
                      id={`branchid_${branch.id}`}
                      name={`branchid_${branch.id}`}
                      type="text"
                      placeholder="e.g. BR001"
                      fullWidth
                      value={branch.branchid}
                      onChange={(e) => handleInputChange(e, index, "branchid")}
                      error={!!formErrors[`branchid_${branch.id}`]}
                      helperText={formErrors[`branchid_${branch.id}`]}
                    />
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
