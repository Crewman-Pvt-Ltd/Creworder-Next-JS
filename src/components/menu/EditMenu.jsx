import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
import { Typography, Button, Grid, Card, CardContent, Divider } from "@mui/material";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";

const EditMenu = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialData, setInitialData] = useState({
    name: "",
    description: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (id) {
      const fetchModule = async () => {
        try {
          setLoading(true);
          const token = getToken();
          if (!token) {
            throw new Error("No authentication token found.");
          }

          const response = await MainApi.get(`/api/menu/${id}`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });

          if (response.status === 200) {
            // Populate initialData and formData with fetched data
            setInitialData({
              name: response.data.name || "",
              description: response.data.description || "",
            });
            setFormData({
              name: response.data.name || "",
              description: response.data.description || "",
            });
          } else {
            console.error("Failed to fetch the module");
            setError("Failed to fetch the module");
          }
        } catch (error) {
          console.error("An error occurred while fetching the module:", error);
          setError("An error occurred while fetching the module");
        } finally {
          setLoading(false);
        }
      };

      fetchModule();
    }
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found.");
      }

      // Create a payload with only the fields that have changed
      const updatedFields = {};
      for (const key in formData) {
        if (formData[key] !== initialData[key]) {
          updatedFields[key] = formData[key];
        }
      }

      const response = await MainApi.patch(`/api/menu/${id}/`, updatedFields, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("Menu updated successfully");
        router.push("/superadmin/menu");
      } else {
        console.error("Failed to update the menu");
        setError("Failed to update the menu");
      }
    } catch (error) {
      console.error("An error occurred while updating the menu:", error);
      setError("An error occurred while updating the menu");
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid item>
              <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                Edit Menu
              </Typography>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <form onSubmit={handleFormSubmit}>
              <Grid item sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, marginTop: 2 }}>
                <Grid item xs={4}>
                  <CustomLabel htmlFor="name" required>
                    Module Name
                  </CustomLabel>
                  <CustomTextField
                    id="name"
                    name="name"
                    placeholder="Module Name"
                    type="text"
                    required
                    fullWidth
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={8}>
                  <CustomLabel htmlFor="description" required>
                    Description
                  </CustomLabel>
                  <CustomTextField
                    id="description"
                    name="description"
                    placeholder="Module Description"
                    type="text"
                    required
                    fullWidth
                    multiline
                    row={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </Grid>
              </Grid>

              <Grid item sx={{ marginTop: 3, display: "flex", justifyContent: "flex-end" }}>
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
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default EditMenu;
