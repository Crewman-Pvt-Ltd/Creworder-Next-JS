import React, { useState } from "react";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../CustomLabel";
import { Typography, Button, Grid, Divider, CardContent } from "@mui/material";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { usePermissions } from "@/contexts/PermissionsContext";

const CreateBranch= ({role, onBranchList }) => {
  const router = useRouter();
  const { permissionsData } = usePermissions();
  console.log("Permission Data", permissionsData);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    user: 1,
    company: permissionsData?.user?.profile?.company,
  });
  const [errors, setErrors] = useState({});
  const token = getToken();
  const validateForm = () => {
    let formErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        formErrors[key] = "This field is required";
      }
    });
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    if (value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
    }
  };
  
  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const token = getToken();
        if (!token) {
          throw new Error("No authentication token found.");
        }

        const form = new FormData();
        Object.keys(formData).forEach((key) => {
          form.append(key, formData[key]);
        });

        const response = await MainApi.post("/api/branches/", form, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 201) {
          router.push("/admin/settings").then(() => {
              window.location.reload();
          });
      }
      } catch (error) {
        console.error(
          "Error submitting form:",
          error.response?.data || error.message
        );
      }
    }
  };


  return (
    <Grid container>
      <Grid item xs={12}>
        <CustomCard>
        <CardContent>
            <Grid item>
              <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                Add Branch
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
              <Grid item xs={12}>
                <CustomLabel htmlFor="name" required>
                  Branch Name
                </CustomLabel>
                <CustomTextField
                  id="name"
                  name="name"
                  placeholder="Branch Name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                  fullWidth
                />
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
                <CustomLabel htmlFor="address" required>
                  Branch Address
                </CustomLabel>
                <CustomTextField
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Address"
                  error={!!errors.address}
                  helperText={errors.address}
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
        </CustomCard>
      </Grid>
      
    </Grid>
  );
};

export default CreateBranch
