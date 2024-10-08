import React, { useEffect, useState } from "react";
import CustomCard from "../CustomCard";
import { useRouter } from "next/router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FormData from 'form-data';
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
  InputAdornment,
} from "@mui/material";

import { baseApiUrl, backendUrl } from "@/api-manage/ApiRoutes";
import { getToken } from "@/utils/getToken";
import axios from "axios";
import dayjs from "dayjs";

const initialData = [
  {
    id: 1,
    email: "Admin@gmail.com",
    status: "Active",
    created_at: "2023-07-14",
    updated_at: "2023-07-14",
  },
];

const SuperadminShipmentChannels = () => {
  const [data, setData] = useState(initialData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [shipMentList, setshipMentList] = useState([]);
  const token = getToken();
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(null);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [formData, setFormData] = useState({
   
    status: "Active",
    provider_name: "",
    logo: "",
    
  });

  const [inputLabels, setInputLabels] = useState({
    nameLabel: "Name",
    imageLabel: "Image",
    statusLabel: "Status",
    emailLabel: "Provider Email",
    tokenLabel: "Provider Token",
    usernameLabel: "Provider Username",
    passwordLabel: "Provider Password",
    providernameLabel: "Provider Name",
    providerPriorityLabel: "Provider Priority",
    sameProviderPriorityLabel: "Same Provider Priority",
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
      name: "",
      image: "",
      status: "Active",
      provider_name: "",
      credential_token: "",
      provider_priority: "",
      logo: "",
      credential_password: "",
      same_provider_priority: "",
    });
  };

  const handleImageUpload = (file) => {
    setImage(file);
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = (id) => {
    const channelToEdit = shipMentList.find(channel => channel.id === id);
    if (channelToEdit) {
      setIsEditing(true);
      setEditId(id);
      setFormData({
        name: channelToEdit.name,
        image: channelToEdit.image,
        status: channelToEdit.status,
        provider_name: channelToEdit.provider_name,
        credential_token: channelToEdit.credential_token,
        provider_priority: channelToEdit.provider_priority,
        logo: channelToEdit.logo,
        credential_password: channelToEdit.credential_password,
        same_provider_priority: channelToEdit.same_provider_priority,
      });
      setDialogOpen(true);
    }
  };

  const handleSubmit = async () => {
    let data = new FormData();
    data.append('name', formData.name);
    data.append('provider_name', formData.provider_name);
    data.append('same_provider_priority', formData.same_provider_priority);
    data.append('provider_priority', formData.provider_priority);
    data.append('status', formData.status);
    data.append('image', image);
    data.append('logo', formData.logo);
    data.append('credential_password', formData.credential_password);
    data.append('credential_token', formData.credential_token);
    data.append('provider_name', formData.provider_name);

    let config = {
      method: isEditing ? 'put' : 'post',
      maxBodyLength: Infinity,
      url: `${baseApiUrl}shipment-channel/${isEditing ? editId : ''}`,
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };

    try {
      await axios.request(config);
      await getShipmentlist();
      handleCloseDialog();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getShipmentlist = async () => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${baseApiUrl}shipment-channel/`,
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.request(config);
      setshipMentList(response.data.Data);
    } catch (error) {
      console.error("Error fetching shipment channels:", error);
    }
  };

  useEffect(() => {
    getShipmentlist();
  }, []);

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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this channel?");
    if (confirmDelete) {
      try {
        await axios.delete(`${baseApiUrl}shipment-channel/${id}`, {
          headers: { Authorization: `Token ${token}` },
        });
        getShipmentlist(); 
      } catch (error) {
        console.error("Error deleting channel:", error);
      }
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container sx={{ marginBottom: "10px" }}>
          <Grid item xs={12}>
            <CustomCard padding="13px">
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                      whiteSpace: "nowrap",
                      textTransform: "capitalize",
                      color: "black",
                      marginLeft: "20px",
                    }}
                  >
                    Shipment Channels
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleOpenDialog({
                        usernameLabel: "Provider Username",
                        passwordLabel: "Provider Password",
                        emailLabel: "Provider Email",
                        tokenLabel: "Provider Token",
                        providernameLabel: "Provider Name",
                        providerPriorityLabel: "Provider Priority",
                        sameProviderPriorityLabel: "Same Provider Priority",
                        statusLabel: "Status",
                        nameLabel: "Name",
                        imageLabel: "Image",
                      })
                    }
                    sx={{ textTransform: "capitalize" }}
                  >
                    Create Channels
                  </Button>
                </Grid>
              </Grid>
            </CustomCard>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ marginBottom: "10px" }}>
          {shipMentList.map((row, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <CustomCard padding="20px">
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Image
                      src={backendUrl + row.image}
                      alt={row.name}
                      width={100}
                      height={60}
                      style={{ width: "100%", height: "60px", borderRadius: "4px" }}
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
                      {row.name}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container justifyContent="flex-end" alignItems="center" sx={{ marginTop: 2 }}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(row.id)}
                      sx={{ textTransform: "capitalize" }}
                    >
                      Edit Channel
                    </Button>
                  </Grid>
                </Grid>
              </CustomCard>
            </Grid>
          ))}
        </Grid>

        <Grid container sx={{ marginBottom: "10px" }}>
          <Grid item xs={12}>
            <CustomCard>
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <HeaderCell>Provider Name</HeaderCell>
                        <HeaderCell>Logo</HeaderCell>
                        <HeaderCell>Status</HeaderCell>
                       <HeaderCell>Action</HeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {shipMentList.map((row, index) => (
                        <TableRow key={index}>
                          <DataCell>{row.provider_name}</DataCell>
                          <DataCell>{row.logo}</DataCell>
                          
                          <DataCell>
                            <Button
                              variant="contained"
                              style={{
                                backgroundColor: row.status === 1 ? "green" : "red",
                                color: "white",
                              }}
                            >
                              {row.status === 1 ? "Active" : "Inactive"}
                            </Button>
                          </DataCell>
                   
                          <DataCell>
                            <IconButton onClick={() => handleEdit(row.id)}>
                              <EditIcon  color="primary"/>
                            </IconButton>
                            <IconButton onClick={() => handleDelete(row.id)}>
                              <DeleteIcon style={{color: 'red'}} />
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
        </Grid>

        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>{isEditing ? "Edit Shipment Channel" : "Create Shipment Channel"}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              
              <Grid item md={6} xs={12}>
                <TextField
                  margin="dense"
                  label={inputLabels.providernameLabel}
                  type="text"
                  fullWidth
                  value={formData.provider_name}
                  onChange={(e) => handleInputChange("provider_name", e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
              
              <Grid item md={6} xs={12}>                
                <TextField
                  margin="dense"
                  label={inputLabels.imageLabel}
                  type="file"
                  fullWidth
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              {isEditing ? "Save Changes" : "Create Channel"}
            </Button>
          </DialogActions>
        </Dialog>
        
      </Grid>
    </Grid>
  );
};

export default SuperadminShipmentChannels;
