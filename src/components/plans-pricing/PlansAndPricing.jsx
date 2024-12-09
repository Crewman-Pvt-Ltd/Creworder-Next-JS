import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import CustomCard from "../CustomCard";
import { Poppins } from "next/font/google";
import PlanPriceCard from "./PlanPriceCard";
import PlanTypeCard from "./PlanTypeCard";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const PlansAndPricing = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <CustomCard>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: "15px",
                  color: "#495057",
                  fontWeight: "700",
                }}
                className={poppins.className}
              >
                PRICING
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                textAlign: "right",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: "15px",
                  color: "#495057",
                  fontWeight: "400",
                }}
                className={poppins.className}
              >
                Pages &nbsp;&gt;&nbsp; Pricing
              </Typography>
            </Grid>
          </Grid>
        </CustomCard>
      </Grid>
      <Grid item xs={12} sm={12} md={12} mt="50px">
        <Grid container spacing={2} justifyContent="center" textAlign="center">
          <Grid item xs={12} sm={12} md={12}>
            <Typography
              variant="h4"
              sx={{
                fontSize: "24px",
                color: "#495057",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Plans & Pricing
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
            <Grid container spacing={1} justifyContent="center">
              <Grid item>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#405189",
                    color: "#FFF",
                    textTransform: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    fontSize: "14px",
                    "&:hover": {
                      backgroundColor: "#3749C5",
                    },
                  }}
                >
                  Monthly
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="text"
                  sx={{
                    color: "#495057",
                    textTransform: "none",
                    padding: "8px 16px",
                    fontWeight: "bold",
                    fontSize: "14px",
                    position: "relative",
                  }}
                >
                  Annually
                  <span
                    style={{
                      backgroundColor: "#22C55E",
                      color: "#FFF",
                      fontSize: "12px",
                      fontWeight: "bold",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      marginLeft: "8px",
                    }}
                  >
                    25% Off
                  </span>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <PlanPriceCard />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <PlanTypeCard />
      </Grid>
    </Grid>
  );
};

export default PlansAndPricing;
