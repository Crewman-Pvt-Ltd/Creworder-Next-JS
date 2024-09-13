import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
import { Typography, Button, Grid, Card, CardContent, Divider } from "@mui/material";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";

const EditBranch = () => {
  const router = useRouter();
  const { id } = router.query; // Get the branch ID from the query params
  const [branch, setBranch] = useState({ name: "", address: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch branch data on component mount if the ID is available
  useEffect(() => {
    if (id) {
      const fetchBranch = async () => {
        try {
          setLoading(true);
          const token = getToken();
          if (!token) {
            throw new Error("No authentication token found.");
          }

          const response = await MainApi.get(`/api/branches/${id}`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });

          if (response.status === 200) {
            setBranch(response.data); // Update branch state with fetched data
          } else {
            console.error("Failed to fetch the Branch");
            setError("Failed to fetch the Branch");
          }
        } catch (error) {
          console.error("An error occurred while fetching the Branch:", error);
          setError("An error occurred while fetching the Branch");
        } finally {
          setLoading(false);
        }
      };

      fetchBranch();
    }
  }, [id]);

  // Handle form submission for updating the branch
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await MainApi.put(`/api/branches/${id}/`, branch, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log("Branch updated successfully");
        router.push("/admin/settings");
      } else {
        console.error("Failed to update the Branch");
        setError("Failed to update the Branch");
      }
    } catch (error) {
      console.error("An error occurred while updating the branch:", error);
      setError("An error occurred while updating the branch");
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
                Edit Branch
              </Typography>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <form onSubmit={handleFormSubmit}>
              <Grid item sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, marginTop: 2 }}>
                <Grid item xs={12}>
                  <CustomLabel htmlFor="name" required>
                    Branch Name
                  </CustomLabel>
                  <CustomTextField
                    id="name"
                    name="name"
                    placeholder="Branch Name"
                    type="text"
                    required
                    fullWidth
                    value={branch.name}
                    onChange={(e) => setBranch({ ...branch, name: e.target.value })} // Update the name field
                  />
                </Grid>
              </Grid>

              <Grid item sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, marginTop: 2 }}>
                <Grid item xs={12}>
                  <CustomLabel htmlFor="address" required>
                    Branch Address
                  </CustomLabel>
                  <CKEditor
                    editor={ClassicEditor}
                    data={branch.address}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setBranch((prevBranch) => ({ ...prevBranch, address: data })); // Update the address field
                    }}
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

export default EditBranch;
