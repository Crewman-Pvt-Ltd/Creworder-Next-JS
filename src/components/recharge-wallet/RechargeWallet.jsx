import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const RechargeWallet = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{
          backgroundColor: "#f9f8fe",
          color: "#405189",
        }}
      >
        Recharge Wallet
      </Button>

      {open && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1300,
          }}
        >
          <Box
            sx={{
              backgroundColor: "#fff",
              padding: 2,
              borderRadius: 2,
              maxWidth: 500,
            
              boxShadow: 24,
              position: "relative",
            }}
          >
            <Grid container direction="column" spacing={2}>
              <Grid item >
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography className={poppins.className} fontWeight="600">
                    Recharge Your Wallet
                  </Typography>
                  <IconButton size="small" onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                </Grid>
                <Typography
                  className={poppins.className}
                  fontSize="12px"
                  color="textSecondary"
                >
                  Current Wallet Amount{" "}
                  <Typography
                    className={poppins.className}
                    fontSize="12px"
                    component="span"
                    color="success.main"
                  >
                    ₹0.00
                  </Typography>
                </Typography>
              </Grid>

              <Grid item sx={{
                backgroundColor:"#f2f8ff",
              }}>
                <Typography
                  className={poppins.className}
                  fontWeight="500"
                  fontSize="12px"
                >
                  Enter Amount in Multiples of 100 Below
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter Amount"
                  
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                  FormHelperTextProps={{
                    sx: { color: "red" },
                  }}
                  sx={{
                    "& .MuiInputBase-input": {
                      height: "25px", 
                      padding: "8px", 
                    },
                    "& .MuiFormHelperText-root": {
                      fontSize: "10px",
                    },
                  }}
                />
                <Typography variant="caption" color="textSecondary">
                Min value:₹500 & Max value: ₹50,00,000
                </Typography>
              </Grid>

              <Grid item>
                <Typography   className={poppins.className}
                  fontWeight="400"
                  fontSize="12px">Or Select From Below</Typography>
                <RadioGroup row aria-label="amount" name="amount-group">
                  {[500, 1000, 2500, 5000, 10000].map((value) => (
                    <FormControlLabel
                      key={value}
                      value={value}
                      control={<Radio />}
                      label={`₹${value}`}
                    />
                  ))}
                </RadioGroup>
              </Grid>

              <Grid item>
                <Typography   
                 className={poppins.className}
                  fontWeight="400"
                  fontSize="12px">
                Have a Coupon
                </Typography>
                <TextField
                 
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography>
                            Apply
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="text"
                  className={poppins.className}
                  
                  sx={{ fontSize:"12px", textAlign: "right", display: "block", mt: 1 }}
                >
                  View Available Coupons
                </Button>
              </Grid>

              <Grid item sx={{ backgroundColor:"#f6f6f6"}}>
                <Divider />
                <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
                  <Typography className={poppins.className} fontSize="13px" variant="body2">Recharge Amount</Typography>
                  <Typography variant="body2">₹0</Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography className={poppins.className} fontSize="13px"  variant="body2">Coupon Code Amount</Typography>
                  <Typography className={poppins.className} fontSize="13px"  variant="body2">₹0</Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography className={poppins.className} fontSize="13px"  variant="body2">
                    Total Amount to be credited
                  </Typography>
                  <Typography className={poppins.className} fontSize="13px"  variant="body2">₹0</Typography>
                </Grid>
                <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
                  <Typography className={poppins.className} fontSize="13px" variant="subtitle1">Payable Amount</Typography>
                  <Typography className={poppins.className} fonAtSize="13px" variant="subtitle1">₹0</Typography>
                </Grid>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  disabled 
                >
                  Continue to Payment
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
};

export default RechargeWallet;
