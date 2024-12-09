import React from "react";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
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
    description: "The perfect way to get started and get used to our tools.",
    features: [
      { text: "3 Projects", available: true },
      { text: "299 Customers", available: true },
      { text: "Scalable Bandwidth", available: true },
      { text: "5 FTP Login", available: true },
      { text: "24/7 Support", available: false },
      { text: "Unlimited Storage", available: false },
      { text: "Domain", available: false },
    ],
    buttonText: "Your Current Plan",
    buttonColor: "#f7876f",
  },
  {
    title: "Professional",
    price: "$29",
    description: "Excellent for scalling teams to build culture. Special plan for professional business.",
    features: [
      { text: "8 Projects", available: true },
      { text: "449 Customers", available: true },
      { text: "Scalable Bandwidth", available: true },
      { text: "7 FTP Login", available: true },
      { text: "24/7 Support", available: true },
      { text: "Unlimited Storage", available: false },
      { text: "Domain", available: false },
    ],
    buttonText: "Change Plan",
    buttonColor: "#299cdb",
  },
  {
    title: "Enterprise",
    price: "$39",
    ribbonText: "Popular",
    description: "This plan is for those who have a team alredy and running a large business.",
    features: [
      { text: "15 Projects", available: true },
      { text: "Unlimited Customers", available: true },
      { text: "Scalable Bandwidth", available: true },
      { text: "12 FTP Login", available: true },
      { text: "24/7 Support", available: true },
      { text: "35GB Storage", available: true },
      { text: "Domain", available: false },
    ],
    buttonText: "Change Plan",
    buttonColor: "#299cdb",
  },
  {
    title: "Unlimited",
    price: "$49",
    description: "For most businesses that want to optimize web queries.",
    features: [
      { text: "Unlimited Projects", available: true },
      { text: "Unlimited Customers", available: true },
      { text: "Scalable Bandwidth", available: true },
      { text: "Unlimited FTP Login", available: true },
      { text: "24/7 Support", available: true },
      { text: "Unlimited Storage", available: true },
      { text: "Domain", available: true },
    ],
    buttonText: "Change Plan",
    buttonColor: "#299cdb",
  },
];

const PlanPriceCard = () => {
  return (
    <Grid container spacing={3} p={3} justifyContent="center">
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
            <Card
              sx={{
                margin: "10px",
                backgroundColor: "#f3f6f9",
                borderRadius: "0px",
              }}
            >
              <CardContent>
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
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
                <Box>
                  {plan.features.map((feature, i) => (
                    <Typography
                      key={i}
                      variant="body1"
                      sx={{
                        color: feature.available ? "#000000" : "#000000", // Set both to black
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
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PlanPriceCard;
