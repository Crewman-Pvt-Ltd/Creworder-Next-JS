import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Box } from '@mui/material';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    gmail: '',
    companyName: '',
    companyAddress: '',
    companyContactDetail: '',
    companyWebsite: '',
    state: '',
    pincode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{

        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '90%',
          maxWidth: 800,
          bgcolor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          p: 4,
          borderRadius: 3,
          boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          textAlign="center"
          sx={{
            fontFamily: "'Playfair Display', poppins",
            fontWeight: 'bold',
            color: '#333',
            letterSpacing: '0.5px',
            marginBottom: 3,
          }}
        >
          Signup
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                sx: {
                  color: '#555',
                  fontWeight: 'bold',
                },
              }}
              InputProps={{
                sx: {
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                sx: {
                  color: '#555',
                  fontWeight: 'bold',
                },
              }}
              InputProps={{
                sx: {
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email Address"
              name="gmail"
              type="email"
              value={formData.gmail}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                sx: {
                  color: '#555',
                  fontWeight: 'bold',
                },
              }}
              InputProps={{
                sx: {
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                sx: {
                  color: '#555',
                  fontWeight: 'bold',
                },
              }}
              InputProps={{
                sx: {
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Address"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                sx: {
                  color: '#555',
                  fontWeight: 'bold',
                },
              }}
              InputProps={{
                sx: {
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Company Contact"
              name="companyContactDetail"
              value={formData.companyContactDetail}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                sx: {
                  color: '#555',
                  fontWeight: 'bold',
                },
              }}
              InputProps={{
                sx: {
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Company Website"
              name="companyWebsite"
              value={formData.companyWebsite}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                sx: {
                  color: '#555',
                  fontWeight: 'bold',
                },
              }}
              InputProps={{
                sx: {
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                },
              }}
            />
          </Grid>
         
          <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                px: 5,
                py: 1.5,
                backgroundColor: '#405189',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: 2,
                boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  backgroundColor: '#405189',
                  transform: 'scale(1.05)',
                },
              }}
            >
              Sign Up Now
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignupForm;
