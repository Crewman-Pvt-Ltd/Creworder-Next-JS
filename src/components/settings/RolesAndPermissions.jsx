import React, { useState } from "react";
import CustomCard from "../CustomCard";
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
  Paper,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

const tableCellStyles = {
  fontWeight: 'bold',
  backgroundColor: '#f5f5f5',
  color: 'gray',
};

const RolesAndPermissions = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <CustomCard>
      <CardContent>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Modules" />
          <Tab label="Order Editing" />
          <Tab label="Dashboard" />
          <Tab label="Settings" />
          <Tab label="Product" />
        </Tabs>
        <Divider sx={{ my: 2 }} />

        {activeTab === 0 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={tableCellStyles}>Permissions</TableCell>
                  <TableCell sx={tableCellStyles}>Create</TableCell>
                  <TableCell sx={tableCellStyles}>Update</TableCell>
                  <TableCell sx={tableCellStyles}>View</TableCell>
                  <TableCell sx={tableCellStyles}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { name: 'Package' },
                  { name: 'Company' },
                  { name: 'Employee' },
                  { name: 'Support Ticket' },
                  { name: 'Notice' },
                  { name: 'Landing Page Settings' },
                  { name: 'Sticky Note' },
                  { name: 'Notepad' },
                  { name: 'Follow Up' },
                  { name: 'Form Enquiry' },
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
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {activeTab === 1 && (
        <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={tableCellStyles}>Permissions</TableCell>
              
              <TableCell sx={tableCellStyles}>Update</TableCell>
              <TableCell sx={tableCellStyles}>View</TableCell>
            
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              { name: 'Address Verification Team' },
              { name: 'NDR Team' },
              { name: 'Accounts Team' },
              { name: 'Super Admin' },
              { name: 'Customer Information' },
              { name: 'Order Status Tracking' },
              { name: 'Order Payment Status' },
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
                    </Select>
                  </FormControl>
                </TableCell>
              
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        )}

        {activeTab === 2 && (
          <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={tableCellStyles}>Permissions</TableCell>
               <TableCell sx={tableCellStyles}>View</TableCell>
                
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
                      </Select>
                    </FormControl>
                  </TableCell>
                
                
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        )}
          {activeTab === 3 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={tableCellStyles}>Permissions</TableCell>
                  <TableCell sx={tableCellStyles}>Create</TableCell>
                  <TableCell sx={tableCellStyles}>Update</TableCell>
                  <TableCell sx={tableCellStyles}>View</TableCell>
                  <TableCell sx={tableCellStyles}>Delete</TableCell>
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
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {activeTab === 4 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={tableCellStyles}>Permissions</TableCell>
                  <TableCell sx={tableCellStyles}>Create</TableCell>
                  <TableCell sx={tableCellStyles}>Update</TableCell>
                  <TableCell sx={tableCellStyles}>View</TableCell>
                  <TableCell sx={tableCellStyles}>Delete</TableCell>
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
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </CustomCard>
  );
};

export default RolesAndPermissions;
