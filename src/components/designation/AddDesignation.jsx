import React from 'react';
import CustomCard from '../CustomCard';
import {
  CardContent,
  Grid,
  Typography,
  Divider,
  Button,
} from '@mui/material';
import CustomTextField from '../CustomTextField';
import CustomLabel from '../CustomLabel';   

const AddDesignation = ({ onDesignationList }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic for form submission if needed
    onDesignationList(); // Notify parent component to switch view
  };

  return (
    <Grid container spacing={2} sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
              Add Designation
            </Typography>
            <Divider sx={{ my: 2 }} />
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <CustomLabel htmlFor="name" required>
                    Name
                  </CustomLabel>
                  <CustomTextField
                    id="name"
                    name="name"
                    placeholder="Name"
                    type="text"
                    required
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <CustomLabel htmlFor="parentdesignation" required>
                    Parent Designation
                  </CustomLabel>
                  <CustomTextField
                    id="parentdesignation"
                    name="parentdesignation"
                    type="text"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} sx={{ marginTop: 2, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="submit"
                  sx={{
                    padding: "8px 16px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    backgroundColor: "#405189",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#334a6c",
                    },
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </form>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default AddDesignation;
