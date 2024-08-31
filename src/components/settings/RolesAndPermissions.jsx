import React, { useState } from "react";
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
  TableRow,
  Select,
  MenuItem,
  FormControl,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

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
  const { permissionsData, permissionLoading } = usePermissions();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Determine the tabs to show based on user role
  const isSuperAdmin = permissionsData?.role === "superadmin";
  const isAdmin = permissionsData?.role === "admin";

  const tabs = isSuperAdmin
    ? [{ label: "Modules", index: 0 }]
    : isAdmin
    ? [
        { label: "Order Editing", index: 0 },
        { label: "Dashboard", index: 1 },
        { label: "Settings", index: 2 },
        { label: "Product", index: 3 },
      ]
    : []; // Handle other roles or cases if needed

  return (
    <CustomCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Roles and Permissions
        </Typography>
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
                  <TableCell sx={tableHeadCellStyles}>Update</TableCell>
                  <TableCell sx={tableHeadCellStyles}>View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { name: "Address Verification Team" },
                  { name: "NDR Team" },
                  { name: "Accounts Team" },
                  { name: "Super Admin" },
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
                  { name: 'Agent' },
                  { name: 'Team Leader' },
                  { name: 'Address verification' },
                  { name: 'NDR' },
                  { name: 'Accounts' },
                  { name: 'Manager/HR' },
                ].map((permission, index) => (
                  <TableRow key={index}>
                    <TableCell>{permission.name}</TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select
                          defaultValue="All"
                          size="small"
                        >
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
        {activeTab === 2 && isAdmin && (
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
                  { name: 'Profile Information' },
                  { name: 'Company Settings' },
                  { name: 'Email Settings' },
                  { name: 'Security Settings' },
                  { name: 'Email Templates' },
                ].map((permission, index) => (
                  <TableRow key={index}>
                    <TableCell>{permission.name}</TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select
                          defaultValue="All"
                          size="small"
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
                        >
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
                  { name: 'Products' },
                ].map((permission, index) => (
                  <TableRow key={index}>
                    <TableCell>{permission.name}</TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <Select
                          defaultValue="All"
                          size="small"
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
                        >
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
      </CardContent>
    </CustomCard>
  );
};

export default RolesAndPermissions;
