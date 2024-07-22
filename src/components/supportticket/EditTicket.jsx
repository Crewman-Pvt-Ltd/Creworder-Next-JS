import React from "react";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
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

const EditTicket = ({ ticketData }) => {
  const router = useRouter();

  const handleUpdate = () => {
    router.push("/superadmin/supportticket");
  };


  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
             Update Ticket Details
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
                  value={ticketData?.companyname || ''}
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
                  value={ticketData?.ticketsubject || ''}
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
                  placeholder="Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={ticketData?.description || ''}
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
                  value={ticketData?.agent || ''}
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
                  value={ticketData?.description || ''}
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
                  value={ticketData?.type || ''}
                />
              </Grid>
            </Grid>

            <Grid container justifyContent="flex-end" spacing={2} sx={{ marginTop: "20px" }}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    handleUpdate();
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>

            
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default EditTicket;
