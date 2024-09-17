import React from "react";
import { CardContent, Grid, Button, MenuItem, Divider, TableHead, Table, TableBody, TableContainer, TableRow, IconButton, Typography, TableCell } from "@mui/material";
import CustomCard from "../CustomCard";
import CustomLabel from "../CustomLabel";
import CustomTextField from "../CustomTextField";
import { Poppins } from "next/font/google";
import { Edit, Delete } from "@mui/icons-material";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const AddBankDetails = ({ onAdd, onEdit }) => {
  const bankList = [
    { id: 1, bankName: "ICICI", accountNumber: "987654321234", beneficiaryName: "ABC" },
    { id: 2, bankName: "SBI", accountNumber: "987654321234", beneficiaryName: "XYZ" },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <CustomCard>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  className={poppins.className}
                  sx={{ fontSize: "18px", fontWeight: "600" }}
                >
                  Add Bank Details
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="account_number" required>
                  Beneficiary Account Number
                </CustomLabel>
                <CustomTextField
                  id="account_number"
                  name="account_number"
                  type="text"
                  placeholder="Enter Beneficiary Account No"
                  required
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="reenter_account_no" required>
                  Re-enter Beneficiary Account Number
                </CustomLabel>
                <CustomTextField
                  id="reenter_account_no"
                  name="reenter_account_no"
                  type="text"
                  placeholder="Re-enter"
                  required
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="account_type" required>
                  Beneficiary Account Type
                </CustomLabel>
                <CustomTextField
                  select
                  id="account_type"
                  name="account_type"
                  placeholder="Select account type"
                  required
                  fullWidth
                >
                  <MenuItem value="savings">Savings Account</MenuItem>
                  <MenuItem value="current">Current Account</MenuItem>
                  <MenuItem value="salary">Salary Account</MenuItem>
                </CustomTextField>
              </Grid>

              <Grid item xs={12} sm={4}>
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

              <Grid item xs={12} sm={4}>
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

              <Grid item xs={12} sm={4}>
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

              <Grid item xs={12} sm={4}>
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

              <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  sx={{
                    backgroundColor: "#405189",
                    color: "white",
                  }}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>

      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Grid container display="flex" justifyContent="space-between" alignItems="center">
              <Typography sx={{ fontWeight: "600", fontSize: "20px", textTransform: "capitalize", color: "black" }} className={poppins.className}>
                Bank Detail List
              </Typography>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={poppins.className}>ID</TableCell>
                    <TableCell className={poppins.className}>Bank Name</TableCell>
                    <TableCell className={poppins.className}>Bank Account Number</TableCell>
                    <TableCell className={poppins.className}>Beneficiary Name</TableCell>
                    <TableCell className={poppins.className}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bankList.map((bank) => (
                    <TableRow key={bank.id}>
                      <TableCell className={poppins.className}>{bank.id}</TableCell>
                      <TableCell className={poppins.className}>{bank.bankName}</TableCell>
                      <TableCell className={poppins.className}>{bank.accountNumber}</TableCell>
                      <TableCell className={poppins.className}>{bank.beneficiaryName}</TableCell>
                      <TableCell>
                        <IconButton aria-label="edit" sx={{ color: "green" }} onClick={() => onEdit(bank)}>
                          <Edit />
                        </IconButton>
                        <IconButton aria-label="delete" sx={{ color: "red" }}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default AddBankDetails;
