import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import DesignationList from '@/components/designation/DesignationList';
import AddDesignation from '@/components/designation/AddDesignation';
import { usePermissions } from "@/contexts/PermissionsContext";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";

const Index = () => {
  const { permissionsData, permissionLoading } = usePermissions();
  const [showAddDesignation, setShowAddDesignation] = useState(false);
  const router = useRouter();

  const userRole = permissionsData?.role;

  
  useEffect(() => {
    if (!permissionLoading && !permissionsData?.role) {
      router.push("/login");
    }
  }, [permissionLoading, permissionsData, router]);

  if (permissionLoading) return <Loader />;


  const handleAddDesignation = () => {
    setShowAddDesignation(true);
  };

  const handleShowDesignationList = () => {
    setShowAddDesignation(false);
  };

  const handleSubmit = () => {
   
    handleShowDesignationList();
  };

 
  if (userRole) {
    return (
      <Layout type={userRole}>
        {showAddDesignation ? (
          <AddDesignation onDesignationList={handleShowDesignationList} onSubmit={handleSubmit} />
        ) : (
          <DesignationList onAddDesignation={handleAddDesignation} />
        )}
      </Layout>
    );
  }


  return null;
};

export default Index;
