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
import shiprocket from "../../images/shiprocket-logo.png";
import shipway from "../../images/shipway-logo.png";
import Techky from "../../images/Techky-post-logo.png";
import Nimbus from "../../images/Nimbus-logo.png";
import { baseApiUrl, backendUrl } from "@/api-manage/ApiRoutes";
import { getToken } from "@/utils/getToken";
import axios from "axios";
import dayjs from "dayjs";

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
  const [shipMentList, setshipMentList] = useState([]);
  const token = getToken();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    status: "Active",
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
      email: "",
      password: "",
      status: "Active",
    });
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (row) => {
    setFormData({
      email: row.email,
      password: "",
      status: row.status,
    });
    setEditId(row.id);
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (isEditing) {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === editId
            ? {
                ...item,
                ...formData,
                updated_at: new Date().toISOString().split("T")[0],
              }
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
        },
      ]);
    }
    console.log(formData)
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
      console.log(shipMentList);
    } catch (error) {
      console.error("Error fetching orders:", error);
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
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
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
                        emailLabel: "Provider Email",
                        usernameLabel: "Provider Username",
                        passwordLabel: "Provider Password",
                        tokenLabel: "Provider Token",
                        providerNameLabel: "Provider name",
                        nameLabel: "Name",
                        sameProviderPriorityLabel: "Same Provider Priority",
                        providerPriorityLabel: "Provider  Priority",
                        statusLabel: "Provider status",
                        imageLabel: "Provider Image",
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
          {/* Card 1 */}
          {shipMentList.map((row) => (
            <Grid item xs={12} sm={4}>
              <CustomCard padding="20px">
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Image
                      src={backendUrl + row.image}
                      alt={row.name}
                      width={100}
                      height={60}
                      style={{
                        width: "100%",
                        height: "60px",
                        borderRadius: "4px",
                      }}
                      // layout="responsive"
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
                <Grid
                  container
                  justifyContent="flex-end"
                  alignItems="center"
                  sx={{ marginTop: 2 }}
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        handleOpenDialog({
                          emailLabel: "Shiprocket Email ####",
                          passwordLabel: "Shiprocket Password",
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
                                backgroundColor:
                                  row.status === 1 ? "green" : "red",
                                color: "white",
                              }}
                            >
                              {row.status === 1 ? "Active" : "Inactive"}
                            </Button>
                          </DataCell>
                          <DataCell>
                            {dayjs(row.created_at).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )}
                          </DataCell>
                          <DataCell>
                            {dayjs(row.updated_at).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )}
                          </DataCell>

                          <DataCell>
                            <Box sx={{ display: "flex", gap: "8px" }}>
                              <IconButton
                                color="primary"
                                onClick={() => handleEdit(row)}
                              >
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
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {isEditing ? "Edit Channel" : "Create Channel"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} justifyContent="center">
            <Grid item md={6} xs={12}>
              <TextField
                margin="dense"
                label={inputLabels.usernameLabel}
                type="text"
                fullWidth
                value={formData.credential_username}
                onChange={(e) =>
                  handleInputChange("credential_username", e.target.value)
                }
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                margin="dense"
                label={inputLabels.passwordLabel}
                type="password"
                fullWidth
                value={formData.credential_password}
                onChange={(e) =>
                  handleInputChange("credential_password", e.target.value)
                }
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                margin="dense"
                label={inputLabels.emailLabel}
                type="email"
                fullWidth
                value={formData.credential_email}
                onChange={(e) =>
                  handleInputChange("credential_email", e.target.value)
                }
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                margin="dense"
                label={inputLabels.tokenLabel}
                type="token"
                fullWidth
                value={formData.credential_token}
                onChange={(e) =>
                  handleInputChange("credential_token", e.target.value)
                }
                sx={{ marginBottom: 2 }}
              />
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
                label={inputLabels.providerNameLabel}
                type="text"
                fullWidth
                value={formData.provider_name}
                onChange={(e) =>
                  handleInputChange("provider_name", e.target.value)
                }
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
                onChange={(e) =>
                  handleInputChange("same_provider_priority", e.target.value)
                }
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
                onChange={(e) =>
                  handleInputChange("provider_priority", e.target.value)
                }
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
              <label
                htmlFor="image-upload"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                {inputLabels.imageLabel}
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={(e) => handleInputChange("image", e.target.files[0])}
                style={{ width: "100%", marginBottom: "16px" }} // Adjust margin as needed
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            style={{ backgroundColor: "#213a8b", color: "#fff" }}
          >
            {isEditing ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default ShipmentChannelsList;
