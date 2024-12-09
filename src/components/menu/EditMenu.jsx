import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../CustomLabel";
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
    icon: "", 
    url: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    icon: "", 
    url: "",
  });

  useEffect(() => {
    if (id) {
      const fetchMenu = async () => {
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
            const data = response.data;
            setInitialData({
              name: data.name || "",
              icon: data.icon || "",
              url: data.url || "",
            });
            setFormData({
              name: data.name || "",
              icon: data.icon || "",
              url: data.url || "",
            });
          } else {
            setError("Failed to fetch the menu");
          }
        } catch (error) {
          console.error("An error occurred while fetching the menu:", error);
          setError("An error occurred while fetching the menu");
        } finally {
          setLoading(false);
        }
      };

      fetchMenu();
    }
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found.");
      }
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
              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="name" required>
                    Menu Name
                  </CustomLabel>
                  <CustomTextField
                    id="name"
                    name="name"
                    placeholder="Menu Name"
                    type="text"
                    required
                    fullWidth
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="icon" required>
                    Icon
                  </CustomLabel>
                  <CustomTextField
                    id="icon"
                    name="icon"
                    placeholder="Icon"
                    type="text"
                    required
                    fullWidth
                    minRows={2}
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomLabel htmlFor="url" required>
                    URL
                  </CustomLabel>
                  <CustomTextField
                    id="url"
                    name="url"
                    placeholder="URL"
                    type="text"
                    required
                    fullWidth
                    minRows={2}
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
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
