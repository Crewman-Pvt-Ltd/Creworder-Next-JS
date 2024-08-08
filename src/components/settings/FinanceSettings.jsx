import React, { useState } from "react";
import CustomCard from "../CustomCard";
import {
  Typography,
  Divider,
  Grid,
  Button,
  CardContent,
  Tooltip,
  IconButton,
  Box,
  MenuItem,
  FormControl,
  Select,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import UploadFileIcon from "@mui/icons-material/CloudUpload";
import CustomLabel from "../CustomLabel";
import CustomTextField from "../CustomTextField";

const sampleImages = [
  "https://demo-saas.worksuite.biz/img/invoice-template/1.png",
  "https://demo-saas.worksuite.biz/img/invoice-template/2.png",
  "https://demo-saas.worksuite.biz/img/invoice-template/3.png",
  "https://demo-saas.worksuite.biz/img/invoice-template/4.png",
  "https://demo-saas.worksuite.biz/img/invoice-template/5.png",
];

const FinanceSettings = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [language, setLanguage] = useState("English");
  const [showSignature, setShowSignature] = useState(false);

  const handleTemplateSelect = (index) => {
    setSelectedTemplate(index);
  };

  return (
    <CustomCard>
      <CardContent>
        <Typography variant="h5">Finance Settings</Typography>
        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box
              border={1}
              borderColor="grey.300"
              borderRadius="4px"
              p={2}
              textAlign="center"
            >
              <Typography variant="body1">
                Invoice Logo
                <Tooltip title="Upload your invoice logo here">
                  <IconButton>
                    <HelpOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="150px"
                border="1px dashed grey"
                borderRadius="4px"
                mt={2}
                sx={{ cursor: 'pointer' }}
              >
                <UploadFileIcon fontSize="large" />
                <Typography variant="body2">Choose a file</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              border={1}
              borderColor="grey.300"
              borderRadius="4px"
              p={2}
              textAlign="center"
            >
              <Typography variant="body1">
                Authorised Signatory Signature
                <Tooltip title="Upload the authorised signatory's signature here">
                  <IconButton>
                    <HelpOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="150px"
                border="1px dashed grey"
                borderRadius="4px"
                mt={2}
                sx={{ cursor: 'pointer' }}
              >
                <UploadFileIcon fontSize="large" />
                <Typography variant="body2">Choose a file</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Typography variant="body1" gutterBottom>
                Language
              </Typography>
              <Select
                labelId="language_label"
                id="language"
                name="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
                <MenuItem value="French">French</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} mt={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showSignature}
                  onChange={(e) => setShowSignature(e.target.checked)}
                  name="showSignature"
                />
              }
              label={
                <Box display="flex" alignItems="center">
                  <Typography>Show Authorised Signatory</Typography>
                  <Tooltip title="Toggle to display the authorised signatory's signature">
                    <IconButton>
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              }
            />
          </Grid>
        </Grid>

        <Grid item xs={12} mt={4}>
          <Typography variant="h6" gutterBottom>
            Template
          </Typography>
          <Grid container spacing={1}>
            {sampleImages.map((image, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  border={1}
                  borderColor={selectedTemplate === index ? "blue" : "grey.300"}
                  borderRadius="4px"
                  p={1}
                  textAlign="center"
                  onClick={() => handleTemplateSelect(index)}
                  sx={{
                    cursor: "pointer",
                    border: selectedTemplate === index
                      ? "2px solid blue"
                      : "1px solid grey.300",
                  }}
                >
                  <img
                    src={image}
                    alt={`Template ${index + 1}`}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={4}>
          <Grid item xs={12} sm={4}>
            <CustomLabel htmlFor="billingname" required>
              Billing Name
            </CustomLabel>
            <CustomTextField
              id="billingname"
              name="billingname"
              placeholder="e.g. creworder"
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomLabel htmlFor="taxname" required>
             Tax Name
            </CustomLabel>
            <CustomTextField
              id="taxname"
              name="taxname"
              placeholder="e.g. creworder@example.com"
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomLabel htmlFor="taxid" required>
            Tax ID
            </CustomLabel>
            <CustomTextField
              id="taxid"
              name="taxid"
              placeholder="e.g. replyto@example.com"
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomLabel htmlFor="billingaddress" required>
         Billing Address
            </CustomLabel>
            <CustomTextField
              id="billingaddress"
              name="billingaddress"
              placeholder="e.g. replyto@example.com"
              type="text"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <CustomLabel htmlFor="tandc" required>
       Terms and Conditions
            </CustomLabel>
            <CustomTextField
              id="tandc"
              name="tandc"
              placeholder="e.g. replyto@example.com"
              type="text"
              fullWidth
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
            sx={{
              backgroundColor: "#405189",
              color: "white",
              "&:hover": {
                backgroundColor: "#405189",
              },
            }}
          >
            Save
          </Button>
        </Box>
      </CardContent>
    </CustomCard>
  );
};

export default FinanceSettings;
