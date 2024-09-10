import React, { useState } from "react";
import CustomCard from "../CustomCard";
import { Poppins } from "next/font/google";
import {
  Grid,
  Button,
  CardContent,
  Typography,
  Box,
  Tabs,
  Popover,
  Tab,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { SketchPicker } from "react-color"; // Import the color picker

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const LeadSettings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [pipelineName, setPipelineName] = useState("");
  const [pipelineColor, setPipelineColor] = useState("#16813D"); // Updated default color
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleNameChange = (event) => {
    setPipelineName(event.target.value);
  };

  const handleColorChange = (color) => {
    setPipelineColor(color.hex); // Update the pipeline color
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Pipeline Name:", pipelineName);
    console.log("Pipeline Color:", pipelineColor);
    setOpenDialog(false);
    // Reset form data
    setPipelineName("");
    setPipelineColor("#16813D"); // Reset to default color
  };

  return (
    <Box>
      {activeTab === 0 && (
        <Box mb={2}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#405189" }}
            startIcon={<Add />}
          >
            Add New Lead Source
          </Button>
        </Box>
      )}
      {activeTab === 1 && (
        <Box>
          <Box mb={2}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#405189" }}
              startIcon={<Add />}
              onClick={handleDialogOpen}
            >
              Add New Pipeline
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#405189", marginLeft: 1 }}
              startIcon={<Add />}
            >
              Add New Deal Stage
            </Button>
          </Box>
        </Box>
      )}
      <CustomCard>
        <CardContent>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab className={poppins.className} label="Lead Source" />
            <Tab className={poppins.className} label="Pipeline" />
          </Tabs>
          <Divider sx={{ my: 2 }} />

          {activeTab === 0 && (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>1</TableCell>
                          <TableCell>Sample Name</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              sx={{ mr: 1 }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    sx={{
                      backgroundColor: "#405189",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#334a6c",
                      },
                    }}
                    className={poppins.className}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}

          {activeTab === 1 && <Box></Box>}

          <Dialog open={openDialog} onClose={handleDialogClose}>
            <DialogTitle>Add New Pipeline</DialogTitle>
            <DialogContent>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    placeholder="e.g. In Progress"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={pipelineName}
                    onChange={handleNameChange}
                  />
                  <Box ml={2} display="flex" alignItems="center">
                    <TextField
                      label="Label Color"
                      value={pipelineColor}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{ width: 120 }}
                    />
                    <Button
                      onClick={handleClick}
                      sx={{
                        backgroundColor: pipelineColor,
                        width: 40,
                        height: 40,
                        borderRadius: 1,
                        border: "1px solid #ccc",
                        "&:hover": {
                          backgroundColor: pipelineColor, 
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <SketchPicker
                  color={pipelineColor}
                  onChangeComplete={handleColorChange}
                  disableAlpha
                  styles={{
                    default: {
                      picker: {
                        backgroundColor: "#fff",
                      },
                    },
                  }}
                />
              </Popover>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} sx={{ color: "#F14A16" }}>
                Close
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{ backgroundColor: "#F14A16" }}
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
          
        </CardContent>
      </CustomCard>
    </Box>
  );
};

export default LeadSettings;
