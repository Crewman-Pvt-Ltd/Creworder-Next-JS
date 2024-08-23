import React, { useState } from "react";
import CustomTextField from "@/components/CustomTextField";
import CustomLabel from "../customLabel";
import CustomCard from "../CustomCard";
import {
  Typography,
  Button,
  Grid,
  Select,
  TextField,
  CardContent,
  MenuItem,
  Divider,
} from "@mui/material";
import { useRouter } from "next/router";

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

const SupportTicketCreate = () => {
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/superadmin/supportticket");
  };
  const [companyname, setcompanyname] = useState("");

  const handlecompanyname = (event) => {
    setcompanyname(event.target.value);
  };
  const [agent, setagent] = useState("");

  const handleagent = (event) => {
    setagent(event.target.value);
  };

  const [priority, setpriority] = useState("");

  const handlepriority = (event) => {
    setpriority(event.target.value);
  };

  const [type, settype] = useState("");

  const handletype = (event) => {
    settype(event.target.value);
  };
  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
              Add Ticket Details
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
               <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="Company Name" required>
                  Company Name
                </CustomLabel>
                <Select
                  labelId="Company Name"
                  id="companyname"
                  name="companyname"
                  value={companyname}
                  onChange={handlecompanyname}
                  displayEmpty
                  sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Company
                  </MenuItem>
                  <MenuItem value={1}>Company 1</MenuItem>
                  <MenuItem value={2}>Company 2</MenuItem>
                  <MenuItem value={3}>Company 2</MenuItem>
                  <MenuItem value={4}>Company 4</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={8}>
                <CustomLabel htmlFor="ticketsubject" required>
                  Ticket Subject
                </CustomLabel>
                <CustomTextField
                  id="ticketsubject"
                  name="ticketsubject"
                  type="text"
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
              <Grid item xs={12} sm={8}>
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
              <Grid item xs={6}sm={2} md={4}>
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
                <CustomLabel htmlFor="Agent" required>
                  Agent
                </CustomLabel>
                <Select
                  labelId="Agent"
                  id="agent"
                  name="agent"
                  value={agent}
                  onChange={handleagent}
                  displayEmpty
                  sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Agent
                  </MenuItem>
                  <MenuItem value={1}>Agent 1</MenuItem>
                  <MenuItem value={2}>Agent 2</MenuItem>
                  <MenuItem value={3}>Agent 3</MenuItem>
                  
                </Select>
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="Priority" required>
                  Priority
                </CustomLabel>
                <Select
                  labelId="Priority"
                  id="priority"
                  name="priority"
                  value={priority}
                  onChange={handlepriority}
                  displayEmpty
                  sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Priority
                  </MenuItem>
                  <MenuItem value={1}>Low</MenuItem>
                  <MenuItem value={2}>Medium</MenuItem>
                  <MenuItem value={3}>High</MenuItem>
                  <MenuItem value={4}>Urgent</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomLabel htmlFor="Type" required>
                  Type
                </CustomLabel>
                <Select
                  labelId="Type"
                  id="type"
                  name="type"
                  value={type}
                  onChange={handletype}
                  displayEmpty
                  sx={{ fontFamily: "Poppins, sans-serif", height: "40px" }}
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Type
                  </MenuItem>
                  <MenuItem value={1}>Question</MenuItem>
                  <MenuItem value={2}>Problem</MenuItem>
                  <MenuItem value={3}>General Query</MenuItem>
                  
                </Select>
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

export default SupportTicketCreate;
