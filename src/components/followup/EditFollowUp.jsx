import React, { useState, useEffect } from "react";
import CustomCard from "../CustomCard";
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import CustomTextField from "../CustomTextField";
import CustomLabel from "../CustomLabel";
import MainApi from "@/api-manage/MainApi";
import { useRouter } from "next/router";
import { getToken } from "@/utils/getToken";
import { usePermissions } from "@/contexts/PermissionsContext";

const EditFollowUp = () => {
  const { permissionsData } = usePermissions();
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    reminder_date: "",
    follow_status: "",
    snooze: "",
    call_id: "",
    description: "",
    user: 1,
    follow_addedBy: permissionsData?.user?.id || "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query; 
  const token = getToken();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log("Updated Form Data", formData);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await MainApi.put(`/api/follow-up/${id}/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.status === 200) {
        // console.log("data",response.data);
        router.push("/followup");
      } else {
        throw new Error("Error updating FollowUp");
      }
    } catch (error) {
      console.error("Error updating FollowUp:", error);
    }
  };

  // Fetch the follow-up data by ID
  useEffect(() => {
    if (id) {
      const fetchFollowUp = async () => {
        setLoading(true);
        try {
          const response = await MainApi.get(`/api/follow-up/${id}/`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          if (response.status === 200) {
            console.log("data",response.data);
            setFormData({
              customer_name: response.data.customer_name,
              customer_phone: response.data.customer_phone,
              reminder_date: response.data.reminder_date,
              follow_status: response.data.follow_status,
              snooze: response.data.snooze,
              call_id: response.data.call_id,
              description: response.data.description,
              user: response.data.user || 1,
              follow_addedBy: permissionsData?.user?.id,
            });
          } else {
            throw new Error("Unexpected response from server");
          }
        } catch (error) {
          console.error("Error fetching follow-up data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchFollowUp();
    }
  }, [id, token, permissionsData?.user?.id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid item>
              <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                Edit Follow Up
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
                <CustomLabel htmlFor="customer_name" required>
                  Customer Name :
                </CustomLabel>
                <CustomTextField
                  id="customer_name"
                  name="customer_name"
                  placeholder="Customer Name"
                  type="text"
                  value={formData.customer_name}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <CustomLabel htmlFor="customer_phone" required>
                  Customer Phone :
                </CustomLabel>
                <CustomTextField
                  id="customer_phone"
                  name="customer_phone"
                  placeholder="Customer Phone"
                  type="text"
                  value={formData.customer_phone}
                  onChange={handleChange}
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
              <Grid item xs={3}>
                <CustomLabel htmlFor="call_id" required>
                  Call Id :
                </CustomLabel>
                <CustomTextField
                  id="call_id"
                  name="call_id"
                  placeholder="Call Id"
                  type="text"
                  value={formData.call_id}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <CustomLabel htmlFor="reminder_date" required>
                  Reminder Date :
                </CustomLabel>
                <CustomTextField
                  id="reminder_date"
                  name="reminder_date"
                  placeholder="Reminder Date and Time"
                  type="datetime-local"
                  value={formData.reminder_date}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>

              <Grid item xs={3}>
                <CustomLabel htmlFor="follow_status" required>
                  Follow Status :
                </CustomLabel>
                <FormControl fullWidth required>
                  <Select
                    id="follow_status"
                    name="follow_status"
                    value={formData.follow_status}
                    onChange={handleChange}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="responded">Responded</MenuItem>
                    <MenuItem value="deleted">Deleted</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <CustomLabel htmlFor="snooze" required>
                  Snooze :
                </CustomLabel>
                <FormControl fullWidth required>
                  <Select
                    id="snooze"
                    name="snooze"
                    value={formData.snooze}
                    onChange={handleChange}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="snooze">Snooze</MenuItem>
                  </Select>
                </FormControl>
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
              <Grid item xs={12}>
                <CustomLabel htmlFor="description" required>
                  Description :
                </CustomLabel>
                <CustomTextField
                  id="description"
                  name="description"
                  placeholder="Description"
                  type="text"
                  value={formData.description}
                  onChange={handleChange}
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

export default EditFollowUp;
