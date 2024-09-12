import React, { useState } from 'react';
import { Box, Button, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const agents = ["Agent 1", "Agent 2", "Agent 3"];
const categories = ["Category 1", "Category 2", "Category 3"];
const statuses = ["Emable", "Disable"];

const DealAgent = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [leadSourceName, setLeadSourceName] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleNameChange = (event) => {
    setLeadSourceName(event.target.value);
  };

  const handleAgentChange = (event) => {
    setSelectedAgent(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Lead Source Name:", leadSourceName);
    console.log("Selected Agent:", selectedAgent);
    console.log("Selected Category:", selectedCategory);
    setOpenDialog(false);
    setLeadSourceName("");
    setSelectedAgent("");
    setSelectedCategory("");
  };

  return (
    <Box>
      <Box mb={2}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#405189" }}
          startIcon={<Add />}
          onClick={handleDialogOpen}
        >
          Add New Lead Source
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Sample Lead Source</TableCell>
              <TableCell>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value=""
                    label="Category"
                    sx={{ height: "40px" }}
                  >
                    {categories.map((category, index) => (
                      <MenuItem key={index} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value=""
                    label="Status"
                    sx={{ height: "40px" }}
                  >
                    {statuses.map((status, index) => (
                      <MenuItem key={index} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
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
      <Dialog 
        open={openDialog} 
        onClose={handleDialogClose}
        PaperProps={{
          sx: {
            width: '600px', 
            maxWidth: '90vw',
          },
        }}
      >
        <DialogTitle>Add New Lead Source</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="row" gap={2}>
            <FormControl variant="outlined" sx={{ flexGrow: 1 }}>
              <InputLabel>Choose Agents</InputLabel>
              <Select
                value={selectedAgent}
                label="Choose Agents"
                onChange={handleAgentChange}
              >
                {agents.map((agent, index) => (
                  <MenuItem key={index} value={agent}>
                    {agent}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ flexGrow: 1 }}>
              <InputLabel>Deal Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Deal Category"
                onChange={handleCategoryChange}
              >
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
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
    </Box>
  );
};

export default DealAgent;
