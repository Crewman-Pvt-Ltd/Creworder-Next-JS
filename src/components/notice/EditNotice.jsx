import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../CustomLabel";
import { Typography, Button, Grid, Card, CardContent, Divider } from "@mui/material";
import MainApi from "@/api-manage/MainApi";
import { getToken } from "@/utils/getToken";
import dynamic from 'next/dynamic';
// Dynamically import CKEditor without server-side rendering
const CKEditor = dynamic(
  () => import('@ckeditor/ckeditor5-react').then((mod) => mod.CKEditor),
  { ssr: false }
);

// Dynamically import ClassicEditor
const ClassicEditor = dynamic(
  () => import('@ckeditor/ckeditor5-build-classic'),
  { ssr: false }
);

const EditNotice = () => {
  const router = useRouter();
  const { id } = router.query;
  const [notice, setNotice] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchNotice = async () => {
        try {
          setLoading(true);
          const token = getToken();
          if (!token) {
            throw new Error("No authentication token found.");
          }

          const response = await MainApi.get(`/api/notices/${id}`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });

          if (response.status === 200) {
            setNotice(response.data);
          } else {
            console.error("Failed to fetch the notice");
            setError("Failed to fetch the notice");
          }
        } catch (error) {
          console.error("An error occurred while fetching the notice:", error);
          setError("An error occurred while fetching the notice");
        } finally {
          setLoading(false);
        }
      };

      fetchNotice();
    }
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found.");
      }
      console.log("Updating notice with data:", notice);
      const response = await MainApi.put(`/api/notices/${id}/`, notice, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log("Notice updated successfully");
        router.push("/notice-board");
      } else {
        console.error("Failed to update the notice");
        setError("Failed to update the notice");
      }
    } catch (error) {
      console.error("An error occurred while updating the notice:", error);
      setError("An error occurred while updating the notice");
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
                Edit Notice
              </Typography>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <form onSubmit={handleFormSubmit}>
              <Grid item sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, marginTop: 2 }}>
                <Grid item xs={12}>
                  <CustomLabel htmlFor="title" required>
                    Title
                  </CustomLabel>
                  <CustomTextField
                    id="title"
                    name="title"
                    placeholder="Title"
                    type="text"
                    required
                    fullWidth
                    value={notice.title}
                    onChange={(e) => setNotice({ ...notice, title: e.target.value })}
                  />
                </Grid>
              </Grid>

              <Grid item sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, marginTop: 2 }}>
                <Grid item xs={12}>
                  <CustomLabel htmlFor="description" required>
                    Description
                  </CustomLabel>
                  <CKEditor
                    editor={ClassicEditor}
                    data={notice.description}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setNotice((prevNotice) => ({ ...prevNotice, description: data }));
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

export default EditNotice;