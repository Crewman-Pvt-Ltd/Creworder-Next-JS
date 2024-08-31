import React from "react";
import { Typography, Grid, Button, Box } from "@mui/material";
import Image from "next/image";
import { Poppins } from "next/font/google";
import CustomCard from "../CustomCard";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const Checklist = () => {
  return (
    <CustomCard margin={20}>
      <Grid container spacing={1} >
        <Grid item xs={12} sm={12} md={12} m={2}>
          <Typography variant="h6" className={poppins.className}>
            Get started in a few easy steps:
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} m={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={4}>
              <Box
                sx={{
                  backgroundColor: "#f0f8ff",
                  padding: 3,
                  textAlign: "center",
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Image
                  src="https://app.shiprocket.in/seller/assets/images/checked.svg"
                  width={100}
                  height={100}
                  alt="Check Icon"
                />
                <Typography
                  variant="h6"
                  className={poppins.className}
                  sx={{ mt: 2, color: "#333" }}
                >
                  First Order Added
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 2, textTransform: "none" }}
                >
                  View Order
                </Button>
                <Typography
                  variant="body2"
                  className={poppins.className}
                  sx={{
                    color: "#7b7b7b",
                    alignSelf: "flex-end",
                    fontWeight: "600",
                    color: "#405189",
                  }}
                >
                  Try Demo ?
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  backgroundColor: "#f0f8ff",
                  padding: 3,
                  textAlign: "center",
                  borderRadius: 2,
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    backgroundColor: "#ffc107",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    color: "#fff",
                  }}
                >
                  Pending
                </Box>
                <Image
                  src="https://app.shiprocket.in/seller/assets/images/recharge.svg"
                  width={70}
                  height={100}
                  alt="Wallet Icon"
                />
                <Typography
                  variant="h6"
                  className={poppins.className}
                  sx={{ mt: 2, color: "#333" }}
                >
                  Recharge Your Wallet
                </Typography>
                <Typography
                  variant="body2"
                  className={poppins.className}
                  sx={{ mt: 1, color: "#7b7b7b" }}
                >
                  Start your shipping journey with a recharge as low as Rs. 500
                  to your wallet
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    textTransform: "none",
                    backgroundColor: "#405189",
                  }}
                >
                  Recharge
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  backgroundColor: "#f0f8ff",
                  padding: 3,
                  textAlign: "center",
                  borderRadius: 2,
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    backgroundColor: "#ffc107",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    color: "#fff",
                  }}
                >
                  Pending
                </Box>
                <Image
                  src="https://app.shiprocket.in/seller/assets/images/shiporder.svg"
                  width={70}
                  height={100}
                  alt="Shipping Icon"
                />
                <Typography
                  variant="h6"
                  className={poppins.className}
                  sx={{ mt: 2, color: "#333" }}
                >
                  Ship Your First Order
                </Typography>
                <Typography
                  variant="body2"
                  className={poppins.className}
                  sx={{ mt: 1, color: "#7b7b7b" }}
                >
                  Select a courier of your choice and schedule a pickup when
                  ready.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    textTransform: "none",
                    backgroundColor: "#405189",
                  }}
                >
                  Ship Now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>

       
        <Grid item xs={12} sm={12} md={12} m={2}>
          <Box
            sx={{
              backgroundColor: "#fff5f5",
              padding: 1,
              textAlign: "left",
              borderRadius: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#ff0000",
                fontWeight: "600",
              }}
            >
              <ErrorOutlineIcon sx={{ marginRight: "8px", fontSize: 16 }} />{" "}
          
              <Typography> Please note:</Typography>
              <Typography
                className={poppins.className}
                variant="body2"
                component="span"
                sx={{ color: "#333", fontWeight: "400", marginLeft: "4px" }}
              >
                KYC verification is mandatory for shipping your orders. Complete
                your KYC now.
              </Typography>
            </Typography>
            <Button
              variant="text"
              sx={{
                color: "#405189",
                textTransform: "none",
                fontWeight: "600",
                fontSize: "16px",
              }}
              className={poppins.className}
              endIcon={<span style={{ marginLeft: "8px" }}>➔</span>}
            >
              Proceed To Verify KYC
            </Button>
          </Box>
        </Grid>
        
      </Grid>
    </CustomCard>
  );
};

export default Checklist;
