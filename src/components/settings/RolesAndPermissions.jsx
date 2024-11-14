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
  CircularProgress,
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

const RolesAndPermissions = () => {
  const token = getToken();
  const { permissionsData, permissionLoading } = usePermissions();
  const [activeTab, setActiveTab] = useState(0);
  const [sideBarDataList, setsideBarDataList] = useState([]);
  const [permissionList, setPermissionList] = useState([]);
  const [permissionDict, setPermissionDict] = useState({});
  const [roleName, setRoleName] = useState("");
  const [settingName, setSettingName] = useState([]);
  const [productNamelist, setProductNamelist] = useState([]);
  const [productNameData, setProductNameData] = useState();
  const [orderStatus, setOrderStatus] = useState([]);
  const [orderStatusList, setOrderStatuslist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isSuperAdmin = permissionsData?.role === "superadmin";
  const isAdmin = permissionsData?.role === "admin";

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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const sideBarData = await fetchSideBarData();
      let newSideBarData = [];
      Object.entries(sideBarData).forEach(([menu, items]) => {
        if (!menu.includes("_icon")) {
          if (Array.isArray(items)) {
            items.forEach((item) => {
              Object.entries(item).forEach(([key]) => {
                newSideBarData.push({ name: key });
              });
            });
          } else {
            newSideBarData.push({ name: menu });
          }
        }
      });
      setsideBarDataList(newSideBarData);
      const [productResponse, settingResponse, statusResponse] = await Promise.all([
        axios.get(`${baseApiUrl}products/`, {
          headers: { Authorization: `Token ${token}` },
        }),
        axios.get(`${baseApiUrl}setting_menu/`, {
          headers: { Authorization: `Token ${getToken()}` },
        }),
        axios.get(`${baseApiUrl}order_status/`, {
          headers: { Authorization: `Token ${getToken()}` },
        }),
      ]);
      setProductNameData(productResponse.data);
      const productNamelist = productResponse.data.map((item) => item.product_name);
      setProductNamelist(productNamelist);
      setSettingName(settingResponse.data);
      setOrderStatus(statusResponse.data);
      const orderStatusList = statusResponse.data.map((item) => item.name);
      setOrderStatuslist(orderStatusList);

      const nameList = newSideBarData.map((item) => item.name).concat(productNamelist).concat(orderStatusList);
      const permissionsResponse = await axios.post(`${baseApiUrl}get-permission-ids/`, {
        name_list: nameList,
      }, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      setPermissionDict(permissionsResponse.data);

    } catch (error) {
      console.error("Error during data fetching:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const makePermissionJson = async (id) => {
    try {
      setPermissionList((prevItems) => [...prevItems, id]);
    } catch (error) {
      console.error("Error creating permission object:", error);
    }
  };

  const createRole = async () => {
    const permissionData = permissionList.filter((item) => typeof item === "number");
    const data = {
      group: {
        name: roleName,
      },
      permission_ids: permissionData,
    };

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseApiUrl}auth-role-group/`,
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      await axios.request(config);
      swal("Created!", "Role has been successfully created!", "success");
    } catch (error) {
      console.error("Error creating role:", error);
      swal("Oops...", error.response?.data?.error || "Error creating role", "error");
    }
  };

  if (loading || permissionLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  }

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
                {
                  sideBarDataList.map((permission, index) => {
                    return (
                      <TableRow key={index} >
                        <TableCell>{permission.name} </TableCell>
                        < TableCell >
                          <FormControl fullWidth sx={{ width: 120 }
                          }>
                            <Select
                              defaultValue="N"
                              size="small"
                              onChange={(event) =>
                                makePermissionJson(event.target.value)
                              }
                            >
                              <MenuItem value="N" > NO </MenuItem>
                              < MenuItem
                                key={
                                  permission.name
                                    .replace(/ /g, "_")
                                    .toLowerCase()
                                }
                                value={
                                  permissionDict[
                                  `add_${permission.name
                                    .replace(/ /g, "_")
                                    .toLowerCase()}`
                                  ]
                                }
                              >
                                YES
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        < TableCell >
                          <FormControl fullWidth sx={{ width: 120 }}>
                            <Select
                              defaultValue="N"
                              size="small"
                              onChange={(event) =>
                                makePermissionJson(event.target.value)
                              }
                            >
                              <MenuItem value="N" > None </MenuItem>
                              < MenuItem
                                key={
                                  permission.name
                                    .replace(/ /g, "_")
                                    .toLowerCase()
                                }
                                value={
                                  permissionDict[
                                  `change_own_${permission.name
                                    .replace(/ /g, "_")
                                    .toLowerCase()}`
                                  ]
                                }
                              >
                                Owned
                              </MenuItem>
                              < MenuItem
                                key={
                                  permission.name
                                    .replace(/ /g, "_")
                                    .toLowerCase()
                                }
                                value={
                                  permissionDict[
                                  `change_all_${permission.name
                                    .replace(/ /g, "_")
                                    .toLowerCase()}`
                                  ]
                                }
                              >
                                All
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        < TableCell >
                          <FormControl fullWidth sx={{ width: 120 }}>
                            <Select
                              defaultValue="N"
                              size="small"
                              onChange={(event) =>
                                makePermissionJson(event.target.value)
                              }
                            >
                              <MenuItem value="N" > Nones </MenuItem>
                              < MenuItem
                                key={
                                  permission.name
                                    .replace(/ /g, "_")
                                    .toLowerCase()
                                }
                                value={
                                  permissionDict[
                                  `view_own_${permission.name
                                    .replace(/ /g, "_")
                                    .toLowerCase()}`
                                  ]
                                }
                              >
                                Owned
                              </MenuItem>
                              < MenuItem
                                key={
                                  permission.name
                                    .replace(/ /g, "_")
                                    .toLowerCase()
                                }
                                value={
                                  permissionDict[
                                  `view_all_${permission.name
                                    .replace(/ /g, "_")
                                    .toLowerCase()}`
                                  ]
                                }
                              >
                                All
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        < TableCell >
                          <FormControl fullWidth sx={{ width: 120 }}>
                            <Select
                              defaultValue="N"
                              size="small"
                              onChange={(event) =>
                                makePermissionJson(event.target.value)
                              }
                            >
                              <MenuItem value="N" > None </MenuItem>
                              < MenuItem
                                key={
                                  permission.name
                                    .replace(/ /g, "_")
                                    .toLowerCase()
                                }
                                value={
                                  permissionDict[
                                  `delete_own_${permission.name
                                    .replace(/ /g, "_")
                                    .toLowerCase()}`
                                  ]
                                }
                              >
                                Owned
                              </MenuItem>
                              < MenuItem
                                key={
                                  permission.name
                                    .replace(/ /g, "_")
                                    .toLowerCase()
                                }
                                value={
                                  permissionDict[
                                  `delete_all_${permission.name
                                    .replace(/ /g, "_")
                                    .toLowerCase()}`
                                  ]
                                }
                              >
                                All
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        < TableCell >
                          <FormControl fullWidth sx={{ width: 120 }}>
                            <Select
                              defaultValue="N"
                              size="small"
                              onChange={(event) =>
                                makePermissionJson(event.target.value)
                              }
                            >
                              <MenuItem value="N" > None </MenuItem>
                              < MenuItem
                                key={
                                  permission.name
                                    .replace(/ /g, "_")
                                    .toLowerCase()
                                }
                                value={
                                  permissionDict[
                                  `export_own_${permission.name
                                    .replace(/ /g, "_")
                                    .toLowerCase()}`
                                  ]
                                }
                              >
                                Owned
                              </MenuItem>
                              < MenuItem
                                key={
                                  permission.name
                                    .replace(/ /g, "_")
                                    .toLowerCase()
                                }
                                value={
                                  permissionDict[
                                  `export_all_${permission.name
                                    .replace(/ /g, "_")
                                    .toLowerCase()}`
                                  ]
                                }
                              >
                                All
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        < TableCell >
                          <FormControl
                            fullWidth
                            sx={{ width: 120 }}
                            onChange={(event) =>
                              makePermissionJson(
                                permission.name,
                                "extra",
                                event.target.value
                              )
                            }
                          >
                            <Select
                              defaultValue="N"
                              size="small"
                              onChange={(event) =>
                                makePermissionJson(event.target.value)
                              }
                            >
                              <MenuItem value="N" > None </MenuItem>
                              {
                                permissionDict[permission.name] &&
                                permissionDict[permission.name]["extra"] &&
                                Object.entries(
                                  permissionDict[permission.name]["extra"]
                                ).map(([key, value], index) => (
                                  <MenuItem key={index} value={value} >
                                    {key}
                                  </MenuItem>
                                ))
                              }
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
                  <TableCell sx={tableHeadCellStyles}>View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { name: "Customer Information" },
                  { name: "Order Status Tracking" },
                  { name: "Order Payment Status" },
                  { name: "Order Number Masking" },
                ].map((permission, index) => (
                  <TableRow key={index}>
                    <TableCell>{permission.name}</TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select defaultValue="N" size="small">
                          <MenuItem value={permissionDict[`order_details_${permission.name.replace(/ /g, "_").toLowerCase()}`]}>YES</MenuItem>
                          <MenuItem value="N">NO</MenuItem>
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
                  { name: "Accepted Tile" },
                  { name: "Delivered Tile" },
                  { name: "Future Tile" },
                  { name: "Intransit Tile" },
                  { name: "Lost Tile" },
                  { name: "NDR Tile" },
                  { name: "No Response Tile" },
                  { name: "Accepted Pending" },
                  { name: "Ofd Tile" },
                  { name: "Pending Tile" },
                  { name: "Reattempt Tile" },
                  { name: "Rejected Tile" },
                  { name: "Repeat Order Tile" },
                  { name: "RTO" },
                  { name: "Running Tile" },
                  { name: "Future Tile" },
                  { name: "Total Tile" },
                  { name: "Sales Forecast Chart" },
                  { name: "Schedule Order Chart" },
                  { name: "Team Order List" },
                  { name: "Top Selling List" },
                  { name: "Non Serviceable Tile" },
                ].map((permission, index) => (
                  <TableRow key={index}>
                    <TableCell>{permission.name}</TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select defaultValue="N" size="small" sx={{
                          width: "75%",
                        }}>
                          <MenuItem value="N">NO</MenuItem>
                          <MenuItem value={permissionDict[`view_all_dashboard_${permission.name.replace(/ /g, "_").toLowerCase()}`]}>ALL</MenuItem>
                          <MenuItem value={permissionDict[`view_own_dashboard_${permission.name.replace(/ /g, "_").toLowerCase()}`]}>OWN</MenuItem>
                          <MenuItem value={permissionDict[`view_manager_dashboard_${permission.name.replace(/ /g, "_").toLowerCase()}`]}>Manager</MenuItem>
                          <MenuItem value={permissionDict[`view_teamlead_dashboard_${permission.name.replace(/ /g, "_").toLowerCase()}`]}>Teamlead</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        )}


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
                {settingName.map((permission, index) => (
                  <TableRow key={index}>
                    <TableCell>{permission.name}</TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select defaultValue="N" size="small" onChange={(event) =>
                          makePermissionJson(event.target.value)
                        }>
                          <MenuItem value="N">NO</MenuItem>
                          <MenuItem value={permissionDict[`settings_add_${permission.name.replace(/ /g, "_").toLowerCase()}`]}>YES</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select defaultValue="N" size="small" onChange={(event) =>
                          makePermissionJson(event.target.value)
                        }>
                          <MenuItem value="N">NO</MenuItem>
                          <MenuItem value={permissionDict[`settings_change_${permission.name.replace(/ /g, "_").toLowerCase()}`]}>YES</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select defaultValue="N" size="small" onChange={(event) =>
                          makePermissionJson(event.target.value)
                        }>
                          <MenuItem value="N">NO</MenuItem>
                          <MenuItem value={permissionDict[`settings_view_${permission.name.replace(/ /g, "_").toLowerCase()}`]}>YES</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select defaultValue="N" size="small" onChange={(event) =>
                          makePermissionJson(event.target.value)
                        }>
                          <MenuItem value="N">NO</MenuItem>
                          <MenuItem value={permissionDict[`settings_delete_${permission.name.replace(/ /g, "_").toLowerCase()}`]}>YES</MenuItem>
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
                  <TableCell sx={tableHeadCellStyles}>Products</TableCell>
                  <TableCell sx={tableHeadCellStyles}>Can work on this product</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productNameData.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.product_name}</TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select defaultValue="N" size="small" onChange={(event) =>
                          makePermissionJson(event.target.value)
                        }>
                          <MenuItem value="N">NO</MenuItem>
                          <MenuItem value={permissionDict[`product_can_work_on_this_${product.product_name.replace(/ /g, "_").toLowerCase()}`]}>YES</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        )}
        {activeTab === 5 && isAdmin && (
          <StyledTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={tableHeadCellStyles}>Order Status</TableCell>
                  <TableCell sx={tableHeadCellStyles}>Can work on this Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderStatus.map((orderSatatusData, index) => (
                  <TableRow key={index}>
                    <TableCell>{orderSatatusData.name}</TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select defaultValue="N" size="small" onChange={(event) =>
                          makePermissionJson(event.target.value)
                        }>
                          <MenuItem value="N">NO</MenuItem>
                          <MenuItem value={permissionDict[`order_status_can_work_on_this_${orderSatatusData.name.replace(/ /g, "_").toLowerCase()}`]}>YES</MenuItem>
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

export default RolesAndPermissions;
