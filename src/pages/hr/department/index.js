import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import DepartmentList from '@/components/department/DepartmentList';
import AddDepartment from '@/components/department/AddDepartment';
import { usePermissions } from "@/contexts/PermissionsContext";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";

const Index = () => {
  const { permissionsData, permissionLoading } = usePermissions();
  const router = useRouter();
  const userRole = permissionsData?.role;
  const [showAddDepartment, setShowAddDepartment] = useState(false);
  
  useEffect(() => {
    if (!permissionLoading && !permissionsData?.role) {
      router.push("/login");
    }
  }, [permissionLoading, permissionsData, router]);

  if (permissionLoading) return <Loader />;

  

  const handleAddDepartment = () => {
    setShowAddDepartment(true);
  };

  const handleShowDepartmentList = () => {
    setShowAddDepartment(false);
  };

  const handleSubmit = () => {
   
    handleShowDepartmentList();
  };

  if (userRole) {
    return (
      <Layout type={userRole}>
      {showAddDepartment ? (
        <AddDepartment onDepartmentList={handleShowDepartmentList} />
      ) : (
        <DepartmentList onAddDepartment={handleAddDepartment} />
      )}
      </Layout>
    );
  }


  return null;
};

export default Index;