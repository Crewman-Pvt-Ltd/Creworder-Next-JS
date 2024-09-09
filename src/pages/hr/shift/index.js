import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ShiftList from '@/components/shifts/ShiftList';
import AddShift from '@/components/shifts/AddShift';
import { usePermissions } from "@/contexts/PermissionsContext";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";

const Index = () => {
  const { permissionsData, permissionLoading } = usePermissions();
  const [showAddShift, setShowAddShift] = useState(false);
  const router = useRouter();

  const userRole = permissionsData?.role;

  
  useEffect(() => {
    if (!permissionLoading && !permissionsData?.role) {
      router.push("/login");
    }
  }, [permissionLoading, permissionsData, router]);

  if (permissionLoading) return <Loader />;



  const handleAddShift = () => {
    setShowAddShift(true);
  };

  const handleShowShiftList = () => {
    setShowAddShift(false);
  };

  const handleSubmit = () => {
   
    handleShowShiftList();
  };

  if (userRole) {
    return (
      <Layout type={userRole}>
      {showAddShift ? (
        <AddShift onShiftList={handleShowShiftList} />
      ) : (
        <ShiftList onAddShift={handleAddShift} />
      )}
      </Layout>
    );
  }


  return null;
};

export default Index;