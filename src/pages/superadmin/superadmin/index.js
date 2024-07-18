import React from "react";
import SuperAdminList from "@/components/superAdmin/SuperAdminList";
import Layout from "@/components/Layout";
import CreateSuperAdmin from "@/components/superAdmin/CreateSuperAdmin";
import { useState } from "react";
import {
 
} from "@mui/material";

const Index = () => {
  const [showCreateSuperAdmin, setShowCreateSuperAdmin] = useState(false);

  const handleShowCreateSuperAdmin = () => {
    setShowCreateSuperAdmin(true);
  };
  const handleBackToList = () => {
      setShowCreateSuperAdmin(false);
    };

  return (
    <Layout>
      {showCreateSuperAdmin ? (
        <CreateSuperAdmin onSuperAdminList={handleBackToList} />
      ) : (
        <SuperAdminList onSuperAdmin={handleShowCreateSuperAdmin} />
      )}
    </Layout>
  );
};

export default Index;
