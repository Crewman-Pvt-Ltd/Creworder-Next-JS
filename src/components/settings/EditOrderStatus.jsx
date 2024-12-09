import React from "react";
import { CardContent, Grid, Button, MenuItem, Typography } from "@mui/material";
import CustomCard from "../CustomCard";
import CustomLabel from "../CustomLabel";
import CustomTextField from "../CustomTextField";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const EditOrderStatus = ({ onAddOrderStatus }) => {
  const handleSave = () => {
   
    onAddOrderStatus();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <CustomCard>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <Typography
                  className={poppins.className}
                  sx={{ fontSize: "18px", fontWeight: "600" }}
                >
                  Edit Order Status
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <CustomLabel htmlFor="name" required>
                 Name
                </CustomLabel>
                <CustomTextField
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter Name"
                  required
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}md={6}>
                <CustomLabel htmlFor="remark" required>
                 Remark
                </CustomLabel>
                <CustomTextField
                  id="remark"
                  name="remark"
                  type="text"
                  placeholder="Enter remark"
                  required
                  fullWidth
                />
              </Grid>

           
              <Grid item xs={12} sm={12} md={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
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

export default EditOrderStatus;
