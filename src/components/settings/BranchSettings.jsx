import React, { useState } from "react";
import { Grid } from "@mui/material";
import BranchList from "./BranchListpage";
import CreateBranch from "./CreateBranch";
import EditBranch from "./EditBranch"; // Assuming you also have an EditBranch component

const BranchSettings = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  const handleAddBranch = () => {
    setIsCreating(true);
    setIsEditing(false);
  };

  const handleEditBranch = (admin) => {
    setCurrentAdmin(admin);
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleBranchList = () => {
    setIsCreating(false);
    setIsEditing(false);
    setCurrentAdmin(null);
  };

  return (
    <Grid container>
      {/* <Grid item xs={12}>
        {!isCreating && !isEditing ? (
          <BranchList onAddBranch={handleAddBranch} onEditAdmin={handleEditBranch} />
        ) : isCreating ? (
          <CreateBranch onAdminList={handleBranchList} />
        ) : (
          <EditBranch admin={currentAdmin} onBranchList={handleBranchList} />
        )}
      </Grid> */}
    </Grid>
  );
};

export default BranchSettings;
