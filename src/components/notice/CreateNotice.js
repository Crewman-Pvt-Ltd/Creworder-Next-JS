import React, { useState } from "react";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
import {Typography, Button, Grid, Card, CardContent, Divider,} from "@mui/material";

const handleFileChange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById("preview").src = e.target.result;
  };
  if (file) {
    reader.readAsDataURL(file);
  }
};

  const CreateNotice = ({ onNoticeList }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [branches, setBranches] = useState([{ id: 1 }]);

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
            <Grid item xs={12}>
              <CustomLabel htmlFor="title" required>
                Title
              </CustomLabel>
              <CustomTextField
                id="title"
                name="title"
                placeholder="title"
                type="text"
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
          }}>
          <Grid item xs={12} sm={12}>
                  <CustomLabel htmlFor="description" required>
                    Description:
                  </CustomLabel>
                  <CustomTextField
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Full Description"
                    required
                    fullWidth
                    multiline
                    rows={4}  // This makes it a textarea
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
                onClick={onNoticeList}
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
