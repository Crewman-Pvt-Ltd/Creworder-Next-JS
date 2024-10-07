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
export const config = {
  api: {
    bodyParser: false,
  },
};
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [shipMentList, setshipMentList] = useState([]);
  const token = getToken();
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(null);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [formData, setFormData] = useState({
    name: "",
    name: "",
    image: "",
    status: "Active",
    credential_email: "",
    credential_token: "",
    provider_priority: "",
    credential_username: "",
    credential_password: "",
    same_provider_priority: "",
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
  };
  const handleImageUpload = (file) => {
    setImage(file);
  };
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  useEffect(() => {
  }, [formData]);

  const handleEdit = (id) => {
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (isEditing) {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === editId
            ? { ...item, ...formData, updated_at: new Date().toISOString().split("T")[0] }
            : item
        )
      );
    } else {
      setData([
        {
          name: formData.name,
          image: formData.image,
          status: formData.status,
          email: formData.credential_email,
          provider_name: formData.provider_name,
          credential_password: formData.credential_password,
          credential_token: formData.credential_token,
          provider_priority: formData.provider_priority,
          credential_username: formData.credential_username,
          same_provider_priority: formData.same_provider_priority,
        },
      ]);
      let data = new FormData();
      data.append('name', formData.name);
      data.append('provider_name', formData.provider_name);
      data.append('same_provider_priority', formData.same_provider_priority);
      data.append('provider_priority', formData.provider_priority);
      data.append('status', formData.status);
      data.append('image', image);
      data.append('credential_username', formData.credential_username);
      data.append('credential_password', formData.credential_password);
      data.append('credential_token', formData.credential_token);
      data.append('credential_email', formData.credential_email);

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${baseApiUrl}shipment-channel/`,
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      };
      axios
        .request(config)
        .then((response) => {
          getShipmentlist();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    handleCloseDialog();
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

  return (
    <Grid container sx={{ padding: 3 }}>
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
                        <HeaderCell>Email</HeaderCell>
                        <HeaderCell>User Name</HeaderCell>
                        <HeaderCell>Provider Name</HeaderCell>
                        <HeaderCell>Priority Provider Bias</HeaderCell>
                        <HeaderCell>Priority Same Provider Bias</HeaderCell>
                        <HeaderCell>Status</HeaderCell>
                        <HeaderCell>Created At</HeaderCell>
                        <HeaderCell>Updated At</HeaderCell>
                        <HeaderCell>Action</HeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {shipMentList.map((row, index) => (
                        <TableRow key={index}>
                          <DataCell>{row.credential_email}</DataCell>
                          <DataCell>{row.credential_username}</DataCell>
                          <DataCell>{row.name}</DataCell>
                          <DataCell>{row.provider_priority}</DataCell>
                          <DataCell>{row.same_provider_priority}</DataCell>
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
                          <DataCell>{dayjs(row.created_at).format("YYYY-MM-DD")}</DataCell>
                          <DataCell>{dayjs(row.updated_at).format("YYYY-MM-DD")}</DataCell>
                          <DataCell>
                            <IconButton onClick={() => handleEdit(row)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton>
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
        </Grid>

        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>{isEditing ? "Edit Shipment Channel" : "Create Shipment Channel"}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="dense"
                  label={inputLabels.emailLabel}
                  type="email"
                  fullWidth
                  value={formData.credential_email}
                  onChange={(e) => handleInputChange("credential_email", e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="dense"
                  label={inputLabels.usernameLabel}
                  type="text"
                  fullWidth
                  value={formData.credential_username}
                  onChange={(e) => handleInputChange("credential_username", e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="dense"
                  label={inputLabels.passwordLabel}
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  value={formData.credential_password}
                  onChange={(e) => handleInputChange("credential_password", e.target.value)}
                  sx={{ marginBottom: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="dense"
                  label={inputLabels.tokenLabel}
                  type="text"
                  fullWidth
                  value={formData.credential_token}
                  onChange={(e) => handleInputChange("credential_token", e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
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
                  label={inputLabels.providerPriorityLabel}
                  type="number"
                  fullWidth
                  value={formData.provider_priority}
                  onChange={(e) => handleInputChange("provider_priority", e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="dense"
                  label={inputLabels.sameProviderPriorityLabel}
                  type="number"
                  fullWidth
                  value={formData.same_provider_priority}
                  onChange={(e) => handleInputChange("same_provider_priority", e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  select
                  margin="dense"
                  label={inputLabels.statusLabel}
                  fullWidth
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  sx={{ marginBottom: 2 }}
                >
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="0">Inactive</MenuItem>
                </TextField>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="dense"
                  label={inputLabels.nameLabel}
                  type="text"
                  fullWidth
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="dense"
                  label={inputLabels.providerPriorityLabel}
                  type="file"
                  fullWidth
                  accept="image/*"
                  value={formData.image}
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

export default ShipmentChannelsList;
