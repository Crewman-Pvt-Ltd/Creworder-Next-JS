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
import shiprocket from '../../images/shiprocket-logo.png';
import shipway from '../../images/shipway-logo.png';
import Techky from '../../images/Techky-post-logo.png';
import Nimbus from '../../images/Nimbus-logo.png';

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
    email: "Admin@gmail.com",
    status: "Active",
    created_at: "2023-07-14",
    updated_at: "2023-07-14",
  },
];

const ShipmentChannelsList = () => {
  const [data, setData] = useState(initialData);
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    status: 'Active',
  });
  const [inputLabels, setInputLabels] = useState({
    emailLabel: "Email",
    passwordLabel: "Password",
  });

  const [errors, setErrors] = useState({});

  const handleOpenDialog = (labels) => {
    setInputLabels(labels);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setIsEditing(false);
    setFormData({
      email: '',
      password: '',
      status: 'Active',
    });
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (row) => {
    setFormData({
      email: row.email,
      password: '',
      status: row.status,
    });
    setEditId(row.id);
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (isEditing) {
      setData(prevData =>
        prevData.map(item =>
          item.id === editId
            ? { ...item, ...formData, updated_at: new Date().toISOString().split('T')[0] }
            : item
        )
      );
    } else {
      setData([
        ...data,
        {
          id: data.length + 1,
          email: formData.email,
          status: formData.status,
          created_at: new Date().toISOString().split('T')[0],
          updated_at: new Date().toISOString().split('T')[0],
        }
      ]);
    }

    handleCloseDialog();
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
                    Shipment Channels
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
                      src={shiprocket}
                      alt="shiprocket"
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
                      Shiprocket
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container justifyContent="flex-end" alignItems="center" sx={{ marginTop: 2 }}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenDialog({ emailLabel: "Shiprocket Email", passwordLabel: "Shiprocket Password" })}
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
                      src={shipway} 
                      alt="shipway"
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
                      ShipWay
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container justifyContent="flex-end" alignItems="center" sx={{ marginTop: 2 }}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenDialog({ emailLabel: "Shipway Email", passwordLabel: "Shipway Password" })}
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
                      src={Techky} 
                      alt="Techky" 
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
                      Techky-post
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container justifyContent="flex-end" alignItems="center" sx={{ marginTop: 2 }}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenDialog({ emailLabel: "Techky-post Email", passwordLabel: "Techky-post Password" })}
                      sx={{ textTransform: "capitalize" }}
                    >
                      Create Channels
                    </Button>
                  </Grid>
                </Grid>
              </CustomCard>
            </Grid>
              {/* Card 4 */}
              <Grid item xs={12} sm={4}>
              <CustomCard padding="20px">
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Image 
                      src={Nimbus} 
                      alt="Nimbus" 
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
                      Nimbus
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container justifyContent="flex-end" alignItems="center" sx={{ marginTop: 2 }}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenDialog({ emailLabel: "Nimbus Email", passwordLabel: "Nimbus Password" })}
                      sx={{ textTransform: "capitalize" }}
                    >
                      Create Channels
                    </Button>
                  </Grid>
                </Grid>
              </CustomCard>
            </Grid>
        </Grid>
        <Grid container sx={{ marginBottom: "10px" }}>
          <Grid item xs={12}>
            <CustomCard>
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <HeaderCell>Email</HeaderCell>
                        <HeaderCell>Status</HeaderCell>
                        <HeaderCell>Created At</HeaderCell>
                        <HeaderCell>Updated At</HeaderCell>
                        <HeaderCell>Action</HeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((row, index) => (
                        <TableRow key={index}>
                          <DataCell>{row.email}</DataCell>
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
                            <Box sx={{ display: "flex", gap: "8px" }}>
                              <IconButton color="primary" onClick={() => handleEdit(row)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton color="error">
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </DataCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </CustomCard>
          </Grid>
        </Grid>
      </Grid>

      {/* Dialog for Creating/Editing Channel */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{isEditing ? "Edit Channel" : "Create Channel"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} justifyContent="center">
            <Grid item md={6} xs={12}>
              <TextField
                margin="dense"
                label={inputLabels.emailLabel}
                type="email"
                fullWidth
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                margin="dense"
                label={inputLabels.passwordLabel}
                type="password"
                fullWidth
                value={formData.token}
                onChange={(e) => handleInputChange('password', e.target.value)}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                margin="dense"
                label="Access Token"
                type="token"
                fullWidth
                value={formData.token}
                onChange={(e) => handleInputChange('token', e.target.value)}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                select
                margin="dense"
                label="Status"
                fullWidth
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                sx={{ marginBottom: 2 }}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Suspended">Suspended</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary" style={{ backgroundColor: "#213a8b", color: "#fff" }}>
            {isEditing ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default ShipmentChannelsList;