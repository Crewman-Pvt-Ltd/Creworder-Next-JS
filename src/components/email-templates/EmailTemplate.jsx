import React, { useState } from "react";
import { Grid, Typography, MenuItem, Select, FormControl } from "@mui/material";
import AdminMailTemplatesTabs from "./AdminMailTemplatesTabs";
import OrderMailTemplatesTabs from "./OrderMailTemplatesTabs";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const EmailTemplate = () => {
  const [dropdownValue, setDropdownValue] = useState(1);

  const handleChange = (event) => {
    setDropdownValue(event.target.value);
  };

  return (
    <Grid container spacing={2} sx={{ backgroundColor: "white", padding: 3 }}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} md={6} display="flex" gap={1}>
            <img
              src="https://www.yehlo.app/public/assets/admin/img/email-setting.png"
              alt="Email Setting"
              style={{ width: "25px", height: "25px" }}
            />
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Email Templates
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                id="email-template-select"
                value={dropdownValue}
                onChange={handleChange}
                sx={{ height: "35px" }}
              >
                <MenuItem value={1}>Admin Templates</MenuItem>
                <MenuItem value={2}>Order Templates</MenuItem>
                <MenuItem value={3}>Wallet Templates</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container sx={{ mt: 4 }}>
          <Grid item xs={12}>
            {dropdownValue === 1 && <AdminMailTemplatesTabs />}
            {dropdownValue === 2 && <OrderMailTemplatesTabs />}
            {/* Add additional conditional rendering for Wallet Templates if needed */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EmailTemplate;
