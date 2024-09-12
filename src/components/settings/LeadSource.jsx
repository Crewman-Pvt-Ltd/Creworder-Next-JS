

import React, { useState } from 'react';
import { Box, Button, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const LeadSource = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [leadSourceName, setLeadSourceName] = useState("");

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleNameChange = (event) => {
    setLeadSourceName(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Lead Source Name:", leadSourceName);
    setOpenDialog(false);
    setLeadSourceName("");
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
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Sample Lead Source</TableCell>
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
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add New Lead Source</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column">
            <TextField
              autoFocus
              margin="dense"
              label="Lead Source"
              placeholder=""
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
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LeadSource;
