import React, { useState } from "react";
import { Grid } from "@mui/material";
import AddBankDetails from "./AddBankDetails";
import EditBankDetails from "./EditBankDetails";

const BankDetails = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBank, setCurrentBank] = useState(null);

  const handleAddBank = () => {
    setIsCreating(true);
    setIsEditing(false); 
  };

  const handleEditBank = (bank) => {
    setCurrentBank(bank);
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleEditSave = () => {
    // Switch back to AddBankDetails after saving
    setIsEditing(false);
    setIsCreating(false);
    setCurrentBank(null);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        {!isCreating && !isEditing ? (
          <AddBankDetails onAdd={handleAddBank} onEdit={handleEditBank} />
        ) : isEditing ? (
          <EditBankDetails 
            bank={currentBank} 
            onAddBank={handleEditSave} // Pass the handler to save and return
          />
        ) : (
          <div>Form for adding bank details goes here</div>
        )}
      </Grid>
    </Grid>
  );
};

export default BankDetails;
