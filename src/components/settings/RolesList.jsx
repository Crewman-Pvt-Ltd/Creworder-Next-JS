"use client";
import { React, useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Poppins } from "next/font/google";
import { baseApiUrl } from "@/api-manage/ApiRoutes";
import { getToken } from "@/utils/getToken";
import RoleEdit from "@/components/settings/RoleEdit";
import swal from "sweetalert";
import axios from "axios";
const token = getToken();
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const RolesList = () => {
  const [showEditComponent, setShowEditComponent] = useState(false);
  const [editRoleData, setEditRoleData] = useState(null); 
  const handleEditClick = (roleId) => {
    setShowEditComponent(true);
    setEditRoleData(roleId);
  };
  const [roleList, setRoleList] = useState([]);
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

  const fetchRole = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${baseApiUrl}auth-role-group/`,
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        setRoleList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchRole();
  }, []);

  const handleDeleteClick = (id) => {
    sweetAlert({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this role?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteRole(id);
      }
    });
  };
  const deleteRole = async (id) => {
    let data = "";
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${baseApiUrl}auth-role-group/${id}/`,
      headers: {
        Authorization: `Token ${token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        sweetAlert(
          "Deleted!",
          "The role has been deleted successfully!",
          "success"
        );
        fetchRole();
      })
      .catch((error) => {
        sweetAlert(
          "Error",
          "Failed to delete the role. Please try again.",
          "error"
        );
      });
  };

  return (
    <Grid container sx={{ padding: 3 }}>
      <Grid item xs={12}>
      {!showEditComponent ? ( // If not showing the edit component, display the default card
        <Card>
          <CardContent>
            <Grid
              container
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                sx={{
                  fontWeight: '600',
                  fontSize: '20px',
                  whiteSpace: 'nowrap',
                  textTransform: 'capitalize',
                  color: 'black',
                }}
                className={poppins.className}
              >
                Roles
              </Typography>
            </Grid>
            <Divider sx={{ my: 1 }} />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={poppins.className}>ID</TableCell>
                    <TableCell className={poppins.className}>Roles</TableCell>
                    <TableCell className={poppins.className}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roleList.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        Role nhi he
                      </TableCell>
                    </TableRow>
                  ) : (
                    roleList.map((roledata, index) => (
                      <TableRow key={index}>
                        <TableCell className={poppins.className}>
                          {index + 1}
                        </TableCell>
                        <TableCell className={poppins.className}>
                          {roledata.group.name}
                        </TableCell>
                        <TableCell>
                          <IconButton aria-label="edit" sx={{ color: 'green' }} onClick={() => handleEditClick(roledata.id)}>
                            <Edit />
                          </IconButton>
                          <IconButton aria-label="delete" sx={{ color: 'red' }} onClick={() => handleDeleteClick(roledata.id)}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      ) : (
        <RoleEdit roleId={editRoleData} />
      )}
      </Grid>
    </Grid>
  );
};

export default RolesList;
