import React from "react";
import CustomCard from "./CustomCard";
import { Grid, Typography, Button } from "@mui/material";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
const poppins = Poppins({
  weight: "300",
  subsets: ["latin"],
});


const UpgradeAccount = () => {

  const router = useRouter();
  const plansandpricing = () => {
    router.push("/admin/plans-pricing")
  }


  return (
    <CustomCard>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: "#fef4e4",
            p: 2,
          }}
        >
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography
                sx={{
                  fontSize: "13px",
                  fontFamily: poppins.style.fontFamily,
                  color: "#d29c65",
                  fontWeight:'bold',
                }}
              >
                Your free trial expires in <b>17</b> days.
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  fontFamily: poppins.style.fontFamily,
                  color: "#d29c65",
                }}
              >
                Upgrade.
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} p={2}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "500",
                  fontFamily: poppins.style.fontFamily,
                }}
              >
                Upgrade your plan from a<b> Free trial,</b>
                <br />
                to ‘Premium Plan’
              </Typography>
            </Grid>
            <Grid item>
              <Button
              onClick={plansandpricing}
                sx={{
                  backgroundColor: "#0ab39c",
                  fontSize: "13px",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Upgrade Account!
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CustomCard>
  );
};

export default UpgradeAccount;
