import React, { useState } from 'react';
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
import MainApi from '@/api-manage/MainApi';
import { useRouter } from 'next/router'; 
import { getToken } from '@/utils/getToken';
import { usePermissions } from "@/contexts/PermissionsContext";

const AddDesignation = ({ onDesignationList }) => {

  const { permissionsData } = usePermissions();

  const [formData, setFormData] = useState({
    name: "",
    branch: permissionsData?.user?.profile?.branch,
    parent: ""
  });
  const router = useRouter(); 
  const token = getToken(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("Updated Form Data", formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await MainApi.post("/api/designations/", formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.status === 201) {
        onDesignationList();
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
     
    }
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
                    value={formData.name}
                    onChange={handleChange}
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
