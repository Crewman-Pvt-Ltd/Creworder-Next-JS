import React, { useState } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
import { useRouter } from "next/router";
import CustomCard from "../CustomCard";
import {
  Typography,
  Button,
  Grid,

  TextField,
  CardContent,
  Divider,

} from "@mui/material";

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

const SupportTicketCreate = ({ onTicketList }) => {
 




  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
              Ticket Details
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="companyname" required>
                  Company Name
                </CustomLabel>
                <CustomTextField
                  id="companyname"
                  name="companyname"
                  placeholder="e.g. creworder"
                  type="text"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="ticketsubject" required>
                  Ticket Subject
                </CustomLabel>
                <CustomTextField
                  id="ticketsubject"
                  name="ticketsubject"
                  type="ticketsubject"
                  placeholder="e.g. test@creworder.com"
                  required
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                marginTop: "10px",
              }}
            >
              <Grid item xs={12} sm={6}>
                <CustomLabel htmlFor="description" required>
                  Description
                </CustomLabel>
                <TextField
                  id="description"
                  name="description"
                  placeholder="e.g. creworder"
                  type="text"
                  required
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" htmlFor="adminProfile">
                  Upload Attachment
                </Typography>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="adminProfile"
                    name="profileImage"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png"
                  />
                </div>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                marginTop: "10px",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="agent" required>
                  Agent
                </CustomLabel>
                <CustomTextField
                  id="agent"
                  name="agent"
                  placeholder="e.g. creworder"
                  type="text"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="priority" required>
                  Priority
                </CustomLabel>
                <CustomTextField
                  id="priority"
                  name="priority"
                  type="priority"
                  placeholder="e.g. test@creworder.com"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="type" required>
                  Type
                </CustomLabel>
                <CustomTextField
                  id="type"
                  name="type"
                  type="type"
                  placeholder="e.g. test@creworder.com"
                  required
                  fullWidth
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
                onClick={onTicketList}
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

export default SupportTicketCreate;
