import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Box } from '@mui/material';
import MainApi from '@/api-manage/MainApi';
import { useRouter } from "next/router";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    contact_no: '',
    company: {
      name: '',
      company_email: '',
      company_phone: '',
      company_address: '',
      company_website: '',
    }
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nameParts = name.split('.');

    if (nameParts.length > 1) {
      setFormData((prevData) => ({
        ...prevData,
        [nameParts[0]]: {
          ...prevData[nameParts[0]],
          [nameParts[1]]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      user: {
        username: formData.username,
        email: formData.email,
        password: formData.password,
       contact_no: formData.contact_no,
        company: formData.company,

      },
    };

    try {
      const response = await MainApi.post("/api/self-signup/", payload);

      if (response.status === 201) {
        router.push("/dashboard");
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("An error occurred during signup", error);
    }
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
            fontFamily: "'Playfair Display', Poppins",
            fontWeight: 'bold',
            color: '#333',
            letterSpacing: '0.5px',
            marginBottom: 3,
          }}
        >
          Signup
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
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
              label="Contact No"
              name="contact_no"
              type="text"
              value={formData.contact_no}
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
              name="email"
              type="email"
              value={formData.email}
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
              name="company.name"
              value={formData.company.name}
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
              label="Company Email"
              name="company.company_email"
              type="email"
              value={formData.company.company_email}
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
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Company Address"
              name="company.company_address"
              value={formData.company.company_address}
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
              label="Company Phone"
              name="company.company_phone"
              value={formData.company.company_phone}
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
              name="company.company_website"
              value={formData.company.company_website}
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
              label="Password"
              name="password"
              type="password"
              value={formData.password}
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
