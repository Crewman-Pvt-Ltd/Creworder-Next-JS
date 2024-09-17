import React, { useState } from "react";
import { Grid } from "@mui/material";
import PickupAddressList from "./PickupAddressList";
import AddPickupAddress from "./AddPickupAddress";
import EditPickupAddress from "./EditPickupAddress";

const PickupPoint = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPickup, setCurrentPickup] = useState(null);

  const handleAddPickup = () => {
    setIsCreating(true);
    setIsEditing(false); 
  };

  const handleEditPickup = (admin) => {
    setCurrentPickup(admin);
    setIsEditing(true);
    setIsCreating(false);
  };

  const handlePickupList = () => {
    setIsCreating(false);
    setIsEditing(false);
    setCurrentPickup(null);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        {!isCreating && !isEditing ? (
          <PickupAddressList onAddPickup={handleAddPickup} onEditPickup={handleEditPickup} />
        ) : isCreating ? (
          <AddPickupAddress onPickupList={handlePickupList} />
        ) : (
          <EditPickupAddress admin={currentPickup} onPickupList={handlePickupList} />
        )}
      </Grid>
    </Grid>
  );
};

export default PickupPoint;
