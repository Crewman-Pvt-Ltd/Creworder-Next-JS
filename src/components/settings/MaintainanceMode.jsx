import React, { useState, useRef } from "react";
import CustomCard from "../CustomCard";
import { Poppins } from "next/font/google";
import UploadFileIcon from "@mui/icons-material/CloudUpload";
import {
  Typography,
  Divider,
  Grid,
  Button,
  CardContent,
  Switch,
  FormControlLabel,
  Box,
  Tooltip,
  IconButton,
  Input,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const MaintainanceMode = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSave = () => {
    // Add your save logic here
    console.log("Maintenance mode:", isChecked);
    console.log("Selected file:", file);
  };

  return (
    <CustomCard>
      <CardContent>
        <Typography className={poppins.className} variant="h6">
          Maintenance Mode
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} container>
            <FormControlLabel
              control={
                <Switch
                  checked={isChecked}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label={<Typography className={poppins.className}>Maintenance Mode</Typography>}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box
              border={1}
              borderColor="grey.300"
              borderRadius="4px"
              p={2}
              textAlign="center"
            >
              <Typography className={poppins.className} variant="body1">
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
                onClick={handleFileClick}
              >
                <UploadFileIcon fontSize="large" />
                <Typography className={poppins.className} variant="body2">Choose a file</Typography>
              </Box>
              <Input
                type="file"
                inputProps={{ accept: "image/*" }}
                onChange={handleFileChange}
                inputRef={fileInputRef}
                sx={{ display: 'none' }}
              />
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
          >
            <Button
              onClick={handleSave}
              sx={{
                backgroundColor: "#405189",
                color: "white",
                "&:hover": {
                  backgroundColor: "#405189",
                },
              }}
              className={poppins.className}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </CustomCard>
  );
};

export default MaintainanceMode;
