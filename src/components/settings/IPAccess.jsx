import React, { useState } from "react";
import { Grid } from "@mui/material";
import AdminSettingsList from "./AdminSettingsList";
import CreateAdminSettings from "./CreateAdminSettings";
import EditAdminSettings from "./EditAdminSettings";
import IPAccessList from "./IPAccessList";
import CreateIPAccess from "./CreateIPAccess";

const IPAccess = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  const handleAddAdmin = () => {
    setIsCreating(true);
    setIsEditing(false); 
  };

  const handleEditAdmin = (admin) => {
    setCurrentAdmin(admin);
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleAdminList = () => {
    setIsCreating(false);
    setIsEditing(false);
    setCurrentAdmin(null);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        {!isCreating && !isEditing ? (
          <IPAccessList onAddAdmin={handleAddAdmin} onEditAdmin={handleEditAdmin} />
        ) : isCreating ? (
          <CreateIPAccess onAdminList={handleAdminList} />
        ) : (
          <EditAdminSettings admin={currentAdmin} onAdminList={handleAdminList} />
        )}
      </Grid>
    </Grid>
  );
};

export default IPAccess;
