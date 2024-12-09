import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import AppreciationList from '@/components/appreciation/AppreciationList';
import AddAppreciation from '@/components/appreciation/AddAppreciation';
import { usePermissions } from "@/contexts/PermissionsContext";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
const Index = () => {
  const { permissionsData, permissionLoading } = usePermissions();
  const [showAddAppreciation, setShowAddAppreciation] = useState(false);
  const router = useRouter();

  const userRole = permissionsData?.role;

  
  useEffect(() => {
    if (!permissionLoading && !permissionsData?.role) {
      router.push("/login");
    }
  }, [permissionLoading, permissionsData, router]);

  if (permissionLoading) return <Loader />;



  const handleAddAppreciation = () => {
    setShowAddAppreciation(true);
  };

  const handleShowAppreciationList = () => {
    setShowAddAppreciation(false);
  };

  const handleSubmit = () => {
   
    handleShowAppreciationList();
  };

  if (userRole) {
    return (
      <Layout type={userRole}>
      {showAddAppreciation ? (
        <AddAppreciation onAppreciationList={handleShowAppreciationList} />
      ) : (
        <AppreciationList onAddAppreciation={handleAddAppreciation} />
      )}
   </Layout>
    );
  }


  return null;
};

export default Index;
