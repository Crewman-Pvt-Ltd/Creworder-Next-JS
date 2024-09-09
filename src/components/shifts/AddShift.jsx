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

const AddShift = ({ onShiftList }) => {
  const { permissionsData } = usePermissions();
  const [formData, setFormData] = useState({
    name: "",
    branch: permissionsData?.user?.profile?.branch,
    start_time: "",
    end_time: ""
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
      const response = await MainApi.post("/api/shifts/", formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.status === 201) {
        onShiftList();
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
              Add Department
            </Typography>
            <Divider sx={{ my: 2 }} />
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={4} md={4}>
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

                <Grid item xs={12} sm={4} md={4}>
                  <CustomLabel htmlFor="start_time" required>
                    Start Time
                  </CustomLabel>
                  <CustomTextField
                    id="start_time"
                    name="start_time"
                    type="time"
                    fullWidth
                    value={formData.start_time}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true, 
                    }}
                    inputProps={{
                      step: 300, 
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={3} md={4}>
                  <CustomLabel htmlFor="end_time" required>
                    End Time
                  </CustomLabel>
                  <CustomTextField
                    id="end_time"
                    name="end_time"
                    type="time" 
                    fullWidth
                    value={formData.end_time}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true, 
                    }}
                    inputProps={{
                      step: 300, 
                    }}
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

export default AddShift;
