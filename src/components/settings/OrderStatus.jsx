import React, { useState } from "react";
import { Grid } from "@mui/material";
import EditOrderStatus from "./EditOrderStatus";
import AddOrderStatus from "./AddOrderStatus";

const OrderStatus = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentOrderStatus, setCurrentOrderStatus] = useState(null);

  const handleAddOrder = () => {
    setIsCreating(true);
    setIsEditing(false); 
  };

  const handleEditOrder = (orderstatus) => {
    setCurrentOrderStatus(orderstatus);
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleEditSave = () => {
   
    setIsEditing(false);
    setIsCreating(false);
    setCurrentOrderStatus(null);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        {!isCreating && !isEditing ? (
          <AddOrderStatus onAdd={handleAddOrder} onEdit={handleEditOrder} />
        ) : isEditing ? (
          <EditOrderStatus 
          orderstatus={currentOrderStatus} 
            onAddOrderStatus={handleEditSave} 
          />
        ) : (
          <div>Form for adding Order Status  goes here</div>
        )}
      </Grid>
    </Grid>
  );
};

export default OrderStatus;
