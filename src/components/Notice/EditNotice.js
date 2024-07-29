import React, { useState } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Typography, Button, Grid, Card, CardContent, Divider, Checkbox, FormControlLabel,} from "@mui/material";

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

  const EditNotice = ({ onNoticeList }) => {
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
          <Grid item xs={12}>
            <CustomLabel htmlFor="description" required>
              Description
            </CustomLabel>
            <CKEditor
              editor={ClassicEditor}
              data=""
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });
              }}
              onBlur={(event, editor) => {
                console.log('Blur.', editor);
              }}
              onFocus={(event, editor) => {
                console.log('Focus.', editor);
              }}
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

export default EditNotice;
