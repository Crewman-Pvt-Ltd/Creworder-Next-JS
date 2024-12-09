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
  const [showAddLeave, setShowAddLeave] = useState(false);

  const userRole = permissionsData?.role;

  // Redirect to login if permissions are not available
  useEffect(() => {
    if (!permissionLoading && !userRole) {
      router.push("/login");
    }
  }, [permissionLoading, userRole, router]);

  // Loading state while checking permissions
  if (permissionLoading) {
    return <Loader />;
  }

  const handleAddLeave = () => {
    setShowAddLeave(true);
  };

  const handleShowLeaveList = () => {
    setShowAddLeave(false);
  };

  if (!userRole) {
    return null; // or consider redirecting or displaying a message
  }

  return (
    <Layout type={userRole}>
      {showAddLeave ? (
        <AddLeave onLeaveList={handleShowLeaveList} />
      ) : (
        <LeaveList onAddLeave={handleAddLeave} />
      )}
    </Layout>
  );
};

export default Index;
