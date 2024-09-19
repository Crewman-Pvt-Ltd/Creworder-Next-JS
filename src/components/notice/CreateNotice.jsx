import React, { useState } from "react";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
import { useRouter } from "next/router";
import { getToken } from "@/utils/getToken";
import MainApi from "@/api-manage/MainApi";
import useGetNoticeUsers from "@/api-manage/react-query/useGetNoticeUsers";
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { usePermissions } from "@/contexts/PermissionsContext";

const CreateNotice = () => {
  const router = useRouter();
  const token = getToken();
  const { permissionsData } = usePermissions();
  const [formData, setFormData] = useState({
    created_by: permissionsData.user.id,
    title: "",
    description: "",
    users: [],
    
  });
  const [errors, setErrors] = useState({});
  
  const {
    data: usersData,
    isLoading: usersLoading,
    error: usersError,
  } = useGetNoticeUsers();

  const validateForm = () => {
    let formErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] || (Array.isArray(formData[key]) && formData[key].length === 0)) {
        formErrors[key] = "This field is required";
      }
    });
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

 
  const handleCheckboxChange = (event) => {
    const userId = event.target.value;
    setFormData((prevState) => ({
      ...prevState,
      users: prevState.users.includes(userId)
        ? prevState.users.filter((id) => id !== userId)
        : [...prevState.users, userId],
    }));
    console.log("Form State", formData);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    const response = await MainApi.post("/api/notices/", formData, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (response.status === 201) {
      router.push("/notice-board");
    } else {
      throw new Error("Unexpected response from server");
    }
   
  };

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid item>
              <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                Add Notice
              </Typography>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                marginTop: 2,
              }}
            >
              <Grid item xs={6}>
                <CustomLabel htmlFor="title" required>
                  Title
                </CustomLabel>
                <CustomTextField
                  id="title"
                  name="title"
                  placeholder="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  error={!!errors.title}
                  helperText={errors.title}
                  required
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="users" required>
                  Users
                </CustomLabel>
                <Grid
                  container
                  spacing={2}
                  sx={{ width: "900px"}}
                   >
                  {usersData?.results.map((row, index) => (
                  <Grid item xs={12} sm={6} md={2} key={index}>
                    <FormControlLabel control={<Checkbox />} label={row?.username} onChange={handleCheckboxChange} value={row?.id}/>
                  </Grid>
                ))}
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                marginTop: 2,
              }}
            >
              <Grid item xs={12} sm={12}>
                <CustomLabel htmlFor="description" required>
                  Description
                </CustomLabel>
                <CustomTextField
                  id="description"
                  name="description"
                  type="text"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Full Description"
                  error={!!errors.description}
                  helperText={errors.description}
                  required
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>

            <Grid
              item
              sx={{
                marginTop: 3,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
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
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CreateNotice;
