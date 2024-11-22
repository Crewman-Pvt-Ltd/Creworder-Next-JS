import React, { useState, useEffect } from "react";
import { CardContent, Grid, Button, MenuItem, Typography } from "@mui/material";
import CustomCard from "../CustomCard";
import CustomLabel from "../CustomLabel";
import CustomTextField from "../CustomTextField";
import { Poppins } from "next/font/google";
import axios from "axios";
import { baseApiUrl } from "@/api-manage/ApiRoutes";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const EditBankDetails = ({ id }) => {
  console.log(id);
  const [bankDetails, setBankDetails] = useState(null);
  const [accountNumer, setAccountNumer] = useState('');
  const handleSave = () => {
    onAddBank();
  };

  useEffect(() => {
    const fetchBankDetails = async () => {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${baseApiUrl}permissions/${name}/`,
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      try {
        const response = await axios.request(config);
        console.log("Bank Details:", JSON.stringify(response.data));
        setBankDetails(response.data); 
        setAccountNumer(response.data['account_number'])
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchBankDetails();

  }, []);

  return (

    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <CustomCard>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <Typography
                  className={poppins.className}
                  sx={{ fontSize: "18px", fontWeight: "600" }}>
                  Edit Bank Details
                </Typography>
              </Grid>

              {/* Bank Details Fields */}
              <Grid item xs={12} sm={4} md={4}>
                <CustomLabel htmlFor="account_number" required>
                  Beneficiary Account Number
                </CustomLabel>
                <CustomTextField
                  id="account_number"
                  name="account_number"
                  type="text"
                  value={accountNumer}
                  placeholder="Enter Beneficiary Account No"
                  required
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={4} md={4}>
                <CustomLabel htmlFor="reenter_account_no" required>
                  Re-enter Beneficiary Account Number
                </CustomLabel>
                <CustomTextField
                  id="reenter_account_no"
                  name="reenter_account_no"
                  type="text"
                  placeholder=" Re-enter"
                  required
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={4} md={4}>
                <CustomLabel htmlFor="account_type" required>
                  Beneficiary Account Type
                </CustomLabel>
                <CustomTextField
                  select
                  id="account_type"
                  name="account_type"
                  required
                  fullWidth
                >
                  <MenuItem value="savings">Savings Account</MenuItem>
                  <MenuItem value="current">Current Account</MenuItem>
                  <MenuItem value="salary">Salary Account</MenuItem>
                </CustomTextField>
              </Grid>

              {/* Additional Fields */}
              <Grid item xs={12} sm={4} md={4}>
                <CustomLabel htmlFor="benificiary_name" required>
                  Beneficiary Name
                </CustomLabel>
                <CustomTextField
                  id="benificiary_name"
                  name="benificiary_name"
                  type="text"
                  placeholder="Enter Beneficiary Name"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <CustomLabel htmlFor="ifsc_code" required>
                  IFSC Code
                </CustomLabel>
                <CustomTextField
                  id="ifsc_code"
                  name="ifsc_code"
                  type="text"
                  placeholder="Enter IFSC Code"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <CustomLabel htmlFor="bank_name" required>
                  Bank Name
                </CustomLabel>
                <CustomTextField
                  id="bank_name"
                  name="bank_name"
                  type="text"
                  placeholder="Enter Bank Name"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <CustomLabel htmlFor="branch_name" required>
                  Branch Name
                </CustomLabel>
                <CustomTextField
                  id="branch_name"
                  name="branch_name"
                  type="text"
                  placeholder="Enter Branch Name"
                  required
                  fullWidth
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  sx={{
                    backgroundColor: "#405189",
                    color: "white",
                  }}
                  onClick={handleSave}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default EditBankDetails;
