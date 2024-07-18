import React, { useState } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
import { useRouter } from "next/router";
import CustomCard from "../CustomCard";
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";


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

const CreateCompanyLayout = ({ onCompanyList }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [branches, setBranches] = useState([
    { id: 1, branchname: "", branchid: "" },
  ]);

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

  const handleInputChange = (index, field, value) => {
    const newBranches = branches.map((branch, i) =>
      i === index ? { ...branch, [field]: value } : branch
    );
    setBranches(newBranches);
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

            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="companyname" required>
                  Company Name
                </CustomLabel>
                <CustomTextField
                  id="companyname"
                  name="companyname"
                  placeholder="e.g. creworder"
                  type="text"
                  required
                  fullWidth
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
                  placeholder="e.g. test@creworder.com"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="phone" required>
                  Phone Number
                </CustomLabel>
                <CustomTextField
                  id="phone"
                  name="phone"
                  type="number"
                  placeholder="1234567890"
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
           
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="website" required>
                  Website
                </CustomLabel>
                <CustomTextField
                  id="website"
                  name="website"
                  placeholder="e.g. creworder"
                  type="text"
                  required
                  fullWidth
                />
                <CustomLabel htmlFor="address" required sx={{ marginTop: 2 }}>
                  Address
                </CustomLabel>
                <CustomTextField
                  id="address"
                  name="address"
                  type="text"
                  placeholder="e.g. test@creworder.com"
                  required
                  fullWidth
                />
              </Grid>

             
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="companyLogo" required>
                  Upload Company Logo
                </CustomLabel>
                <input
                  type="file"
                  id="companyLogo"
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
                <CustomLabel htmlFor="packagename" required>
                  Package Name
                </CustomLabel>
                <CustomTextField
                  id="packagename"
                  name="packagename"
                  placeholder="e.g. creworder"
                  type="text"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="occurrence" required>
                  Occurrence
                </CustomLabel>
                <CustomTextField
                  id="occurrence"
                  name="occurrence"
                  type="text"
                  placeholder="e.g. monthly"
                  required
                  fullWidth
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
                  type="date"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="nextPaymentDate" required>
                  Next Payment Date
                </CustomLabel>
                <CustomTextField
                  id="nextPaymentDate"
                  name="nextPaymentDate"
                  type="date"
                  required
                  fullWidth
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Typography
              sx={{ fontSize: "15px", fontWeight: "bold", marginTop: 3 }}
            >
              Account Details (First Company Admin)
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
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="adminName" required>
                  Name
                </CustomLabel>
                <CustomTextField
                  id="adminName"
                  name="adminName"
                  placeholder="e.g. John Doe"
                  type="text"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="adminEmail" required>
                  Email (Login details will be emailed to this email)
                </CustomLabel>
                <CustomTextField
                  id="adminEmail"
                  name="adminEmail"
                  type="email"
                  placeholder="e.g. test@creworder.com"
                  required
                  fullWidth
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
                onClick={onCompanyList}
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

export default CreateCompanyLayout;
