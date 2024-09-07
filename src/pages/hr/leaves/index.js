import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import LeaveList from '@/components/leaves/LeaveList';
import AddLeave from '@/components/leaves/AddLeave';
import { usePermissions } from "@/contexts/PermissionsContext";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";

const Index = () => {
  const { permissionsData, permissionLoading } = usePermissions();

  const router = useRouter();

  const userRole = permissionsData?.role;

  useEffect(() => {
    if (!permissionLoading && !permissionsData?.role) {
      router.push("/login");
    }
  }, [permissionLoading, permissionsData, router]);

  if (permissionLoading) return <Loader />;
  const [showAddLeave, setShowAddLeave] = useState(false);

  const handleAddLeave = () => {
    setShowAddLeave(true);
  };

  const handleShowLeaveList = () => {
    setShowAddLeave(false);
  };

  const handleSubmit = () => {
   
    handleShowLeaveList();
  };

 
  if (userRole) {
    return (
      <Layout type={userRole}>
      {showAddLeave ? (
        <AddLeave onLeaveList={handleShowLeaveList} />
      ) : (
        <LeaveList onAddLeave={handleAddLeave} />
      )}
     </Layout>
    );
  }

  return null;
};

export default Index;
