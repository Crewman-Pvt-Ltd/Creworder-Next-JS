import React, { useState, useEffect } from "react";
import CustomCard from "../CustomCard";
import { usePermissions } from "@/contexts/PermissionsContext";
import {
  Divider,
  CardContent,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Button,
  Grid,
  TextField,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { fetchSideBarData } from "@/utils/sideBarData";
import { baseApiUrl } from "@/api-manage/ApiRoutes";
import { getToken } from "@/utils/getToken";
import swal from "sweetalert";
import axios from "axios";
const tableHeadCellStyles = {
  fontWeight: "bold",
  backgroundColor: "#405189",
  color: "#fff",
};

const tableCellStyles = {
  backgroundColor: "#fafafa",
};

const StyledTableContainer = styled(TableContainer)({
  borderRadius: "8px",
});
const RoleEdit = ({ roleId }) => {
  const [sideBarDataList, setsideBarDataList] = useState([]);
  const { permissionsData, permissionLoading } = usePermissions();
  const [permissionList, setPermissionList] = useState([]);
  const [permissionDict, setPermissionDict] = useState({});
  const [selectedPermmisions, setSelectedPermmisions] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const isSuperAdmin = permissionsData?.role === "superadmin";
  const isAdmin = permissionsData?.role === "admin";
  const [roleName, setRoleName] = useState("");
  const [permissionListPrv, setPermissionListPrv] = useState([]);
  const token = getToken();
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const tabs = isSuperAdmin
    ? [{ label: "Modules", index: 0 }]
    : isAdmin
      ? [
        { label: "Role", index: 0 },
        { label: "Order Detail", index: 1 },
        { label: "Dashboard", index: 2 },
        { label: "Settings", index: 3 },
        { label: "Product List", index: 4 },
        { label: "Order Status", index: 5 },
      ]
      : [];

  const fetchData = async () => {
    try {
      const data = await fetchSideBarData();
      let newSideBarData = [];
      Object.entries(data).forEach(([menu, items]) => {
        if (!menu.includes("_icon")) {
          if (Array.isArray(items)) {
            items.forEach((item) => {
              Object.entries(item).forEach(([key, value]) => {
                newSideBarData.push({ name: key });
              });
            });
          } else {
            newSideBarData.push({ name: menu });
          }
        }
      });
      setsideBarDataList(newSideBarData);
    } catch (error) {
      console.error("Error fetching sidebar data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => { }, [sideBarDataList]);

  const getPermission = async (name) => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${baseApiUrl}permissions/${name}/`,
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    if (!(name in permissionDict)) {
      try {
        const response = await axios.request(config);
        Object.values(response.data).forEach((value) => {
          const action = value.name.includes("add")
            ? "create"
            : value.name.includes("change") || value.name.includes("chan own")
              ? "update"
              : value.name.includes("view") || value.name.includes("view own")
                ? "view"
                : value.name.includes("delete") || value.name.includes("delete own")
                  ? "delete"
                  : "extra";

          if (action) {
            setPermissionDict((prevState) => ({
              ...prevState,
              [name]: {
                ...prevState[name],
                [action]: {
                  ...(prevState[name]?.[action] || {}),
                  [value.name]: value.id,
                },
              },
            }));
          }
        });
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    } else {
      console.log('Key "name" exists in the object');
    }
  };
  const getRoleSavedPermmision = async () => {
    let data = "";
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${baseApiUrl}auth-role-group/${roleId}/`,
      headers: {
        Authorization: `Token ${token}`,
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        setRoleName(response.data.group.name);
        response.data.group.permissions.map((item, index) =>
          setPermissionListPrv((prevItems) => [...prevItems, item.id])
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getRoleSavedPermmision();
  }, []);


  const selectedPermmision = async (data) => {
    const tempSelectedPermissions = {};
    Object.entries(data).forEach(([key, value]) => {
      Object.entries(value).forEach(([key1, value1]) => {
        Object.entries(value1).forEach(([key2, value2]) => {
          // console.log({ mainkey: key, action: key1, name: key2, value: value2 });
          if (permissionListPrv.includes(value2)) {
            if (!tempSelectedPermissions[key]) {
              tempSelectedPermissions[key] = {};
            }
            tempSelectedPermissions[key][key1] = value2;

          }
        });
      });
    });
    setSelectedPermmisions(tempSelectedPermissions);
  };

  useEffect(() => {
    selectedPermmision(permissionDict);
  }, [permissionDict]);
  console.log(selectedPermmisions)

  const makePermissionJson = async (permissionName, actionType, value) => {
    setSelectedPermmisions((prevPermissions) => ({
      ...prevPermissions,
      [permissionName]: {
        ...prevPermissions[permissionName],
        [actionType]: value,
      },
    }));
  };

  const makePermissionJsonList = (data) => {
    const uniquePermissions = new Set();
    Object.entries(data).forEach(([key, value]) => {
      Object.entries(value).forEach(([key1, value1]) => {
        uniquePermissions.add(value1);
      });
    });
  
    // Convert the Set back to an array and update state
    setPermissionList(Array.from(uniquePermissions));
  };
  

  const createRole = async () => {
    makePermissionJsonList(selectedPermmisions);
    console.log(permissionList);
    const data = {
      group: {
        name: "Testing",
      },
      permission_ids: permissionList,
    };

    const config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${baseApiUrl}auth-role-group/${roleId}/`,
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      swal("Updated!", "You clicked the button!", "success");
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.error) {
        sweetAlert("Oops...", `${error.response.data.error}`, "error");
      } else {
        sweetAlert("Oops...", `${error.response.data.group.name[0]}`, "error");
      }
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };


  return (
    <CustomCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Roles and Permissions
        </Typography>
        {isAdmin && (
          <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Role Name"
                variant="outlined"
                fullWidth
                value={roleName}
                onChange={(event) => {
                  setRoleName(event.target.value);
                }}
              />
            </Grid>
          </Grid>
        )}

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="roles and permissions tabs"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.index}
              label={
                <Typography variant="body1" fontWeight="bold">
                  {tab.label}
                </Typography>
              }
            />
          ))}
        </Tabs>
        <Divider sx={{ my: 2 }} />

        {activeTab === 0 && isSuperAdmin && (
          <StyledTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={tableHeadCellStyles}>Permissions</TableCell>
                  <TableCell sx={tableHeadCellStyles}>Create</TableCell>
                  <TableCell sx={tableHeadCellStyles}>Update</TableCell>
                  <TableCell sx={tableHeadCellStyles}>View</TableCell>
                  <TableCell sx={tableHeadCellStyles}>Delete</TableCell>
                  <TableCell sx={tableHeadCellStyles}>Export</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { name: "Package" },
                  { name: "Company" },
                  { name: "Employee" },
                  { name: "Support Ticket" },
                  { name: "Notice" },
                  { name: "Landing Page Settings" },
                  { name: "Sticky Note" },
                  { name: "Notepad" },
                  { name: "Follow Up" },
                  { name: "Form Enquiry" },
                ].map((permission, index) => (
                  <TableRow key={index}>
                    <TableCell sx={tableCellStyles}>
                      {permission.name}
                    </TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select
                          defaultValue="All"
                          size="small"
                          sx={{ minWidth: 120 }}
                        >
                          <MenuItem value="All">All</MenuItem>
                          <MenuItem value="Owned">Owned</MenuItem>
                          <MenuItem value="none">None</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select
                          defaultValue="All"
                          size="small"
                          sx={{ minWidth: 120 }}
                        >
                          <MenuItem value="All">All</MenuItem>
                          <MenuItem value="Owned">Owned</MenuItem>
                          <MenuItem value="none">None</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select
                          defaultValue="All"
                          size="small"
                          sx={{ minWidth: 120 }}
                        >
                          <MenuItem value="All">All</MenuItem>
                          <MenuItem value="Owned">Owned</MenuItem>
                          <MenuItem value="none">None</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select
                          defaultValue="All"
                          size="small"
                          sx={{ minWidth: 120 }}
                        >
                          <MenuItem value="All">All</MenuItem>
                          <MenuItem value="Owned">Owned</MenuItem>
                          <MenuItem value="none">None</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select
                          defaultValue="All"
                          size="small"
                          sx={{ minWidth: 120 }}
                        >
                          <MenuItem value="All">Allow</MenuItem>
                          <MenuItem value="Owned">None</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        )}

        {activeTab === 0 && isAdmin && (
          <StyledTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={tableHeadCellStyles}>Permissions</TableCell>
                  <TableCell sx={tableHeadCellStyles}>Create</TableCell>
                  <TableCell sx={tableHeadCellStyles}>Update</TableCell>
                  <TableCell sx={tableHeadCellStyles}>View</TableCell>
                  <TableCell sx={tableHeadCellStyles}>Delete</TableCell>
                  <TableCell sx={tableHeadCellStyles}>Export</TableCell>
                  <TableCell sx={tableHeadCellStyles}>Extra</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sideBarDataList.map((permission, index) => {
                  getPermission(permission.name);
                  return (
                    <TableRow key={index}>
                      <TableCell>{permission.name}</TableCell>
                      <TableCell>
                        <FormControl fullWidth sx={{ width: 120 }}>
                          <Select
                            value={
                              selectedPermmisions[permission.name] && selectedPermmisions[permission.name].create
                                ? selectedPermmisions[permission.name].create
                                : "N"
                            }
                            size="small"
                            onChange={(event) =>
                              makePermissionJson(permission.name, "create", event.target.value)
                            }

                          >
                            <MenuItem value="N">NO</MenuItem>
                            {permissionDict[permission.name]?.create &&
                              Object.entries(
                                permissionDict[permission.name].create
                              ).map(([key, value], index) => (
                                <MenuItem key={index} value={value}>
                                  YES
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl fullWidth sx={{ width: 120 }}>
                          <Select
                            value={
                              selectedPermmisions[permission.name] && selectedPermmisions[permission.name].update
                                ? selectedPermmisions[permission.name].update
                                : "N"
                            }
                            size="small"
                            onChange={(event) =>
                              makePermissionJson(permission.name, "update", event.target.value)
                            }
                          >
                            <MenuItem value="N">None</MenuItem>
                            {permissionDict[permission.name]?.update &&
                              Object.entries(
                                permissionDict[permission.name].update
                              ).map(([key, value], index) =>
                                key.includes("own") ? (
                                  <MenuItem key={index} value={value}>
                                    Owned
                                  </MenuItem>
                                ) : (
                                  <MenuItem key={index} value={value}>
                                    All
                                  </MenuItem>
                                )
                              )}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl fullWidth sx={{ width: 120 }}>
                          <Select
                            value={
                              selectedPermmisions[permission.name] && selectedPermmisions[permission.name].view
                                ? selectedPermmisions[permission.name].view
                                : "N"
                            }
                            size="small"
                            onChange={(event) =>
                              makePermissionJson(permission.name, "view", event.target.value)
                            }
                          >
                            <MenuItem value="N">None</MenuItem>
                            {permissionDict[permission.name]?.view &&
                              Object.entries(
                                permissionDict[permission.name].view
                              ).map(([key, value], index) =>
                                key.includes("own") ? (
                                  <MenuItem key={index} value={value}>
                                    Owned
                                  </MenuItem>
                                ) : (
                                  <MenuItem key={index} value={value}>
                                    All
                                  </MenuItem>
                                )
                              )}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl fullWidth sx={{ width: 120 }}>
                          <Select
                            // defaultValue="N"
                            value={
                              selectedPermmisions[permission.name] && selectedPermmisions[permission.name].delete
                                ? selectedPermmisions[permission.name].delete
                                : "N"
                            }
                            size="small"
                            onChange={(event) =>
                              makePermissionJson(permission.name, "delete", event.target.value)
                            }
                          >
                            <MenuItem value="N">None</MenuItem>
                            {permissionDict[permission.name]?.delete &&
                              Object.entries(
                                permissionDict[permission.name].delete
                              ).map(([key, value], index) =>
                                key.includes("own") ? (
                                  <MenuItem key={index} value={value}>
                                    Owned
                                  </MenuItem>
                                ) : (
                                  <MenuItem key={index} value={value}>
                                    All
                                  </MenuItem>
                                )
                              )}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl fullWidth sx={{ width: 120 }}>
                          <Select
                            defaultValue="N"
                            size="small"
                            onChange={(event) =>
                              makePermissionJson(permission.name, "export", event.target.value)
                            }
                          >
                            <MenuItem value="N">None</MenuItem>
                            {permissionDict[permission.name]?.export &&
                              Object.entries(
                                permissionDict[permission.name].export
                              ).map(([key, value], index) =>
                                key.includes("own") ? (
                                  <MenuItem key={index} value={value}>
                                    Owned
                                  </MenuItem>
                                ) : (
                                  <MenuItem key={index} value={value}>
                                    All
                                  </MenuItem>
                                )
                              )}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl fullWidth sx={{ width: 120 }}>
                          <Select
                            value={
                              selectedPermmisions[permission.name] && selectedPermmisions[permission.name].extra
                                ? selectedPermmisions[permission.name].extra
                                : "N"
                            }
                            size="small"
                            onChange={(event) =>
                              makePermissionJson(permission.name, "extra", event.target.value)
                            }
                          >
                            <MenuItem value="N">None</MenuItem>
                            {permissionDict[permission.name]?.extra &&
                              Object.entries(
                                permissionDict[permission.name].extra
                              ).map(([key, value], index) => (
                                <MenuItem key={index} value={value}>
                                  {key}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </StyledTableContainer>
        )}

        {activeTab === 1 && isAdmin && (
          <StyledTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={tableHeadCellStyles}>Permissions</TableCell>
                  <TableCell sx={tableHeadCellStyles}>Update</TableCell>
                  <TableCell sx={tableHeadCellStyles}>View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { name: "Customer Information" },
                  { name: "Order Status Tracking" },
                  { name: "Order Payment Status" },
                ].map((permission, index) => (
                  <TableRow key={index}>
                    <TableCell>{permission.name}</TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select defaultValue="All" size="small">
                          <MenuItem value="All">All</MenuItem>
                          <MenuItem value="Owned">Owned</MenuItem>
                          <MenuItem value="none">None</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select defaultValue="All" size="small">
                          <MenuItem value="All">All</MenuItem>
                          <MenuItem value="Owned">Owned</MenuItem>
                          <MenuItem value="none">None</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        )}
        {activeTab === 2 && isAdmin && (
          <StyledTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={tableHeadCellStyles}>Permissions</TableCell>
                  <TableCell sx={tableHeadCellStyles}>View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { name: "Agent" },
                  { name: "Show All Order status Tiles" },
                  { name: "Team view" },
                  { name: "All, Own, Team" },
                  { name: "Notis Followup" },
                ].map((permission, index) => (
                  <TableRow key={index}>
                    <TableCell>{permission.name}</TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select defaultValue="All" size="small">
                          <MenuItem value="All">All</MenuItem>
                          <MenuItem value="Owned">Owned</MenuItem>
                          <MenuItem value="none">None</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        )}

        {/* Tab Content for "Dashboard" */}
        {activeTab === 3 && isAdmin && (
          <StyledTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={tableHeadCellStyles}>Permissions</TableCell>
                  <TableCell sx={tableHeadCellStyles}>Create</TableCell>
                  <TableCell sx={tableHeadCellStyles}>Update</TableCell>
                  <TableCell sx={tableHeadCellStyles}>View</TableCell>
                  <TableCell sx={tableHeadCellStyles}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { name: "Profile Information" },
                  { name: "Company Settings" },
                  { name: "Email Settings" },
                  { name: "Security Settings" },
                  { name: "Email Templates" },
                ].map((permission, index) => (
                  <TableRow key={index}>
                    <TableCell>{permission.name}</TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select defaultValue="All" size="small">
                          <MenuItem value="All">All</MenuItem>
                          <MenuItem value="Owned">Owned</MenuItem>
                          <MenuItem value="none">None</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select defaultValue="All" size="small">
                          <MenuItem value="All">All</MenuItem>
                          <MenuItem value="Owned">Owned</MenuItem>
                          <MenuItem value="none">None</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select defaultValue="All" size="small">
                          <MenuItem value="All">All</MenuItem>
                          <MenuItem value="Owned">Owned</MenuItem>
                          <MenuItem value="none">None</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select defaultValue="All" size="small">
                          <MenuItem value="All">All</MenuItem>
                          <MenuItem value="Owned">Owned</MenuItem>
                          <MenuItem value="none">None</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        )}

        {/* Tab Content for "Settings" */}
        {activeTab === 4 && isAdmin && (
          <StyledTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={tableHeadCellStyles}>Permissions</TableCell>
                  <TableCell sx={tableHeadCellStyles}>Create</TableCell>
                  <TableCell sx={tableHeadCellStyles}>Update</TableCell>
                  <TableCell sx={tableHeadCellStyles}>View</TableCell>
                  <TableCell sx={tableHeadCellStyles}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[{ name: "Products" }].map((permission, index) => (
                  <TableRow key={index}>
                    <TableCell>{permission.name}</TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select defaultValue="All" size="small">
                          <MenuItem value="All">All</MenuItem>
                          <MenuItem value="Owned">Owned</MenuItem>
                          <MenuItem value="none">None</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select defaultValue="All" size="small">
                          <MenuItem value="All">All</MenuItem>
                          <MenuItem value="Owned">Owned</MenuItem>
                          <MenuItem value="none">None</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select defaultValue="All" size="small">
                          <MenuItem value="All">All</MenuItem>
                          <MenuItem value="Owned">Owned</MenuItem>
                          <MenuItem value="none">None</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select defaultValue="All" size="small">
                          <MenuItem value="All">All</MenuItem>
                          <MenuItem value="Owned">Owned</MenuItem>
                          <MenuItem value="none">None</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        )}
        {isAdmin && (
          <Grid
            item
            xs={12}
            md={12}
            sm={12}
            mt={3}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              sx={{
                backgroundColor: "#405189",
                color: "white",
                "&:hover": {
                  backgroundColor: "#405189",
                },
              }}
              onClick={() => {
                createRole();
              }}
            >
              Save
            </Button>
          </Grid>
        )}
      </CardContent>
    </CustomCard>
  );
};

export default RoleEdit;