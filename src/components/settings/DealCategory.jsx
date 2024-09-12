import React, { useState } from 'react';
import { Box, Button, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const initialCategories = ["Sample Lead Source"]; // Sample initial data

const DealCategory = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [leadSourceName, setLeadSourceName] = useState("");
  const [editingIndex, setEditingIndex] = useState(null); // Index of the item being edited

  const handleDialogOpen = (index) => {
    if (index !== undefined) {
      // Open dialog with data of the item being edited
      setEditingIndex(index);
      setLeadSourceName(initialCategories[index]); // Populate the form with existing data
    } else {
      // Open dialog for creating a new item
      setEditingIndex(null);
      setLeadSourceName("");
    }
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleNameChange = (event) => {
    setLeadSourceName(event.target.value);
  };

  const handleSubmit = () => {
    if (editingIndex !== null) {
      // Handle updating an existing item
      console.log("Updating Lead Source Name:", leadSourceName);
    } else {
      // Handle creating a new item
      console.log("Adding New Lead Source Name:", leadSourceName);
    }
    setOpenDialog(false);
    setLeadSourceName("");
    setEditingIndex(null); // Reset editing index
  };

  return (
    <Box>
      <Box mb={2}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#405189" }}
          startIcon={<Add />}
          onClick={() => handleDialogOpen()} // Open dialog for creating new item
        >
          Add New Deal Category
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {initialCategories.map((category, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{category}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => handleDialogOpen(index)} // Open dialog for editing
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
            ))}
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
        <DialogTitle>
          {editingIndex !== null ? 'Edit Deal Category' : 'Add New Deal Category'}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column">
            <TextField
              autoFocus
              margin="dense"
              label="Deal Category Name"
              type="text"
              fullWidth
              variant="outlined"
              value={leadSourceName}
              onChange={handleNameChange}
            />
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
            {editingIndex !== null ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DealCategory;
