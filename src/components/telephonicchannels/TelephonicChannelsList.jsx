import React, { useState } from "react";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import commingsoon from '../../images/comming-soon.webp';
import sansLogo from '../../images/sansLogo.webp';
import cloudconnect from '../../images/cloudconnect.svg';

import { 
  Grid,
  Typography,
  Button,
  Box,
  IconButton,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
} from "@mui/material";

const initialData = [
  {
    id: 1,
    name: "Admin",
    tanent_id: "1149",
    agent_id: "0001",
    status: "Active",
    created_at: "2023-07-14",
    updated_at: "2023-07-14",
  },
];

const TelephonicChannelsList = () => {
  const [data, setData] = useState(initialData);
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    token: '',
    tenant_id: '',
    status: 'Active', // Default value
    process_id: ''
  });
  const [errors, setErrors] = useState({});

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setIsEditing(false);
    setFormData({
      username: '',
      password: '',
      token: '',
      tenant_id: '',
      status: 'Active',
      process_id: ''
    });
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (row) => {
    setFormData({
      username: row.name,
      password: '', // Assuming password is not available in the row data
      token: row.token || '',
      tenant_id: row.tanent_id,
      status: row.status,
      process_id: row.process_id || ''
    });
    setEditId(row.id);
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (isEditing) {
      // Update existing item
      setData(prevData =>
        prevData.map(item =>
          item.id === editId
            ? { ...item, ...formData, updated_at: new Date().toISOString().split('T')[0] }
            : item
        )
      );
    } else {
      // Create new item
      setData([
        ...data,
        {
          id: data.length + 1,
          name: formData.username,
          tanent_id: formData.tenant_id,
          agent_id: "0001", // Assuming a static value for agent_id
          status: formData.status,
          created_at: new Date().toISOString().split('T')[0],
          updated_at: new Date().toISOString().split('T')[0],
        }
      ]);
    }

    handleCloseDialog(); // Close dialog after submission
  };

  const HeaderCell = (props) => (
    <TableCell
      sx={{
        fontSize: "1rem",
        whiteSpace: "nowrap",
        fontWeight: "500",
        textTransform: "capitalize",
        color: "black",
      }}
      {...props}
    />
  );

  const DataCell = (props) => (
    <TableCell
      sx={{
        color: "#999999",
        fontSize: "14px",
        whiteSpace: "nowrap",
        fontWeight: "500",
        textTransform: "capitalize",
      }}
      {...props}
    />
  );

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <Grid container sx={{ marginBottom: "10px" }}>
          <Grid item xs={12}>
            <CustomCard padding="13px">
              <Grid
                container
                justifyContent="space-between"
                alignItems="center">
                <Grid item>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                      whiteSpace: "nowrap",
                      textTransform: "capitalize",
                      color: "black",
                      marginLeft: "20px",
                    }}>
                    Cloud telephonic Channels
                  </Typography>
                </Grid>
              </Grid>
            </CustomCard>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: "10px" }}>
            {/* Card 1 */}
            <Grid item xs={12} sm={4}>
              <CustomCard padding="20px">
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item>
                  <Image 
                     src={cloudconnect}
                      alt="cloudconnect"
                      style={{ width: '100%', height: '60px', borderRadius: '4px' }} 
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        whiteSpace: "nowrap",
                        textTransform: "capitalize",
                        color: "black",
                      }}>
                      Cloud Connect
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        whiteSpace: "nowrap",
                        textTransform: "capitalize",
                        color: "#999999",
                      }}>
                      Lorem ipsum dolor sit amet.
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container justifyContent="flex-end" alignItems="center" sx={{ marginTop: 2 }}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleOpenDialog}
                      sx={{ textTransform: "capitalize" }}>
                      Create Channels
                    </Button>
                  </Grid>
                </Grid>
              </CustomCard>
            </Grid>
            {/* Card 2 */}
            <Grid item xs={12} sm={4}>
              <CustomCard padding="20px">
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Image 
                      src={sansLogo} 
                      alt="sansLogo"
                      style={{ width: '100%', height: '60px', borderRadius: '4px' }} 
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        whiteSpace: "nowrap",
                        textTransform: "capitalize",
                        color: "black",
                      }}
                    >
                      SANS Logo
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        whiteSpace: "nowrap",
                        textTransform: "capitalize",
                        color: "#999999",
                      }}
                    >
                      Lorem ipsum dolor sit amet.
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container justifyContent="flex-end" alignItems="center" sx={{ marginTop: 2 }}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleOpenDialog}
                      sx={{ textTransform: "capitalize" }}
                    >
                      Create Channels
                    </Button>
                  </Grid>
                </Grid>
              </CustomCard>
            </Grid>
            {/* Card 3 */}
            <Grid item xs={12} sm={4}>
              <CustomCard padding="20px">
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Image 
                      src={commingsoon} 
                      alt="commingsoon" 
                      style={{ width: '100%', height: '60px', borderRadius: '4px' }} 
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        whiteSpace: "nowrap",
                        textTransform: "capitalize",
                        color: "black",
                      }}
                    >
                      Coming Soon
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        whiteSpace: "nowrap",
                        textTransform: "capitalize",
                        color: "#999999",
                      }}
                    >
                      Lorem ipsum dolor sit amet.
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container justifyContent="flex-end" alignItems="center" sx={{ marginTop: 2 }}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleOpenDialog}
                      sx={{ textTransform: "capitalize" }}
                    >
                      Create Channels
                    </Button>
                  </Grid>
                </Grid>
              </CustomCard>
            </Grid>
        </Grid>
        <CustomCard>
          <CardContent>
            <TableContainer>
            <Table>
  <TableHead>
    <TableRow>
      <HeaderCell>ID</HeaderCell>
      <HeaderCell>Username</HeaderCell>
      <HeaderCell>Tenant ID</HeaderCell>
      <HeaderCell>Agent ID</HeaderCell>
      <HeaderCell>Status</HeaderCell>
      <HeaderCell>Created At</HeaderCell>
      <HeaderCell>Updated At</HeaderCell>
      <HeaderCell>Actions</HeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {data.map((row) => (
      <TableRow key={row.id}>
        <DataCell>{row.id}.</DataCell>
        <DataCell>{row.name}</DataCell>
        <DataCell>{row.tanent_id}</DataCell>
        <DataCell>{row.agent_id}</DataCell>
        <DataCell>
          <Button
            variant="contained"
            style={{
              backgroundColor: row.status === "Active" ? "green" : "red",
              color: "white",
            }}
          >
            {row.status}
          </Button>
        </DataCell>
        <DataCell>{row.created_at}</DataCell>
        <DataCell>{row.updated_at}</DataCell>
        <DataCell>
          <IconButton color="success" onClick={() => handleEdit(row)} >
            <EditIcon />
          </IconButton>
          <IconButton style={{ color: "red" }} onClick={() => handleDelete(row.id)}>
            <DeleteIcon />
          </IconButton>
        </DataCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

            </TableContainer>
          </CardContent>
        </CustomCard>
      </Grid>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? "Edit Channel" : "Create Channels"}</DialogTitle>
        <hr />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Token"
                value={formData.token}
                onChange={(e) => handleInputChange("token", e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Tenant ID"
                value={formData.tenant_id}
                onChange={(e) => handleInputChange("tenant_id", e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Status"
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                fullWidth
                select
                sx={{ marginBottom: 2 }}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Suspended">Suspended</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Process ID"
                value={formData.process_id}
                onChange={(e) => handleInputChange("process_id", e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" style={{ backgroundColor: "#213a8b", color: "#fff" }}>
            {isEditing ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default TelephonicChannelsList;
