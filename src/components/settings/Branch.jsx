import React, { useState } from "react";
import { Grid } from "@mui/material";
import BranchListpage from "./BranchListpage";
import CreateBranch from "./CreateBranch";
import EditBranch from "./EditBranch";

const Branch = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBranch, setcurrentBranch] = useState(null);

  const handleAddBranch = () => {
    setIsCreating(true);
    setIsEditing(false); 
  };

  const handleEditBranch = (branch) => {
    setcurrentBranch(branch);
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleBranchList = () => {
    setIsCreating(false);
    setIsEditing(false);
    setcurrentBranch(null);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        {!isCreating && !isEditing ? (
          <BranchListpage onAddBranch={handleAddBranch} onEditBranch={handleEditBranch} />
        ) : isCreating ? (
          <CreateBranch onBranchList={handleBranchList} />
        ) : (
          <EditBranch branch={currentBranch} onBranchList={handleBranchList} />
        )}
      </Grid>
    </Grid>
  );
};

export default Branch;
