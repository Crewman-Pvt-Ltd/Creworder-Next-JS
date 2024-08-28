import React from "react";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Poppins } from "next/font/google"; // Importing the Poppins font

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const pricingPlans = [
  {
    title: "Starter",
    price: "$19",
    description: "For Startup.",
    features: [
      { text: "Upto 3 Projects", available: true },
      { text: "Upto 299 Customers", available: true },
      { text: "Scalable Bandwidth", available: true },
      { text: "5 FTP Login", available: true },
      { text: "24/7 Support", available: false },
      { text: "Unlimited Storage", available: false },
      { text: "Domain", available: false },
    ],
    buttonText: "Sign up free",
    buttonColor: "#0ab39c",
  },
  {
    title: "Professional",
    price: "$29",
    description: "Professional plans",
    features: [
      { text: "Upto 15 Projects", available: true },
      { text: "Unlimited Customers", available: true },
      { text: "Scalable Bandwidth", available: true },
      { text: "12 FTP Login", available: true },
      { text: "24/7 Support", available: true },
      { text: "Unlimited Storage", available: false },
      { text: "Domain", available: false },
    ],
    buttonText: "Get Started",
    buttonColor: "#0ab39c",
  },
  {
    title: "Enterprise",
    price: "$39",
    ribbonText: "Popular",
    description: "Enterprise Businesses",
    features: [
      { text: "Unlimited Projects", available: true },
      { text: "Unlimited Customers", available: true },
      { text: "Scalable Bandwidth", available: true },
      { text: "Unlimited FTP Login", available: true },
      { text: "Unlimited Storaget", available: true },
      { text: "35GB Storage", available: true },
      { text: "Domain", available: false },
    ],
    buttonText: "Get Started",
    buttonColor: "#0ab39c",
  },
];

const PlanTypeCard = () => {
  return (
    <Grid container spacing={3} p={2} justifyContent="center">
      
          <Grid item xs={12} sm={12} md={12}  justifyContent="center" textAlign="center">
            <Typography
              variant="h4"
              sx={{
                fontSize: "24px",
                color: "#495057",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Choose the plan that's right for you
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: "16px",
                color: "#868E96",
                marginBottom: "20px",
              }}
            >
              Simple pricing. No hidden fees. Advanced features for your <br />
              business.
            </Typography>
            
          </Grid>
       
      {pricingPlans.map((plan, index) => (
        <Grid item xs={12} sm={6} md={3} mt={4} key={index}>
          <Card
            sx={{
              borderRadius: "4px",
              position: "relative",
            }}
          >
            {plan.ribbonText && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  backgroundColor: "#F87272",
                  color: "#FFF",
                  padding: "4px 12px",
                  fontSize: "12px",
                  borderTopRightRadius: "8px",
                  borderBottomLeftRadius: "8px",
                }}
                className={poppins.className}
              >
                {plan.ribbonText}
              </Box>
            )}

            <CardContent
              sx={{
                margin: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#495057",
                  }}
                  className={poppins.className}
                >
                  {plan.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "400",
                    color: "#878A99",
                  }}
                  className={poppins.className}
                >
                  <p>{plan.description}</p>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "26px",
                    color: "#495057",
                    fontWeight: "500",
                  }}
                  className={poppins.className}
                >
                  {plan.price}
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "16px",
                      color: "#868E96",
                      fontWeight: "normal",
                    }}
                    className={poppins.className}
                  >
                    /Year
                  </Typography>
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box>
                {plan.features.map((feature, i) => (
                  <Typography
                    key={i}
                    variant="body1"
                    sx={{
                      color: feature.available ? "#949292" : "#949292", // Set both to black
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "15px",
                      fontSize: "13px",
                    }}
                    className={poppins.className} // Apply Poppins font
                  >
                    {feature.available ? (
                      <CheckCircleIcon
                        sx={{
                          marginRight: "8px",
                          width: "14px",
                          color: "#0ab39c",
                        }}
                      />
                    ) : (
                      <CancelIcon
                        sx={{
                          marginRight: "8px",
                          width: "14px",
                          color: "#f06548",
                        }}
                      />
                    )}
                    {feature.text}
                  </Typography>
                ))}
              </Box>

              <Button
                variant="contained"
                sx={{
                  marginTop: "16px",
                  backgroundColor: plan.buttonColor,
                  color: "#FFF",
                  textTransform: "none",
                  width: "100%",
                  padding: "10px",
                  "&:hover": {
                    backgroundColor: plan.buttonColor,
                  },
                }}
                className={poppins.className}
              >
                {plan.buttonText}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PlanTypeCard;
