import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import EmployeesList from '@/components/hr-employees/EmployeesList';
import AddEmployees from '@/components/hr-employees/AddEmployees';
import { usePermissions } from "@/contexts/PermissionsContext";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";

const Index = () => {
  const { permissionsData, permissionLoading } = usePermissions();
  const [showAddEmployees, setShowAddEmployees] = useState(false);
  const router = useRouter();

  const userRole = permissionsData?.role;

 
  useEffect(() => {
    if (!permissionLoading && !permissionsData?.role) {
      router.push("/login");
    }
  }, [permissionLoading, permissionsData, router]);

  if (permissionLoading) return <Loader />;


  const handleAddEmployees = () => {
    setShowAddEmployees(true);
  };

  const handleShowEmployeesList = () => {
    setShowAddEmployees(false);
  };

  const handleSubmit = () => {
    
    handleShowEmployeesList();
  };

  
  if (userRole) {
    return (
      <Layout type={userRole}>
        {showAddEmployees ? (
          <AddEmployees onEmployeesList={handleShowEmployeesList} />
        ) : (
          <EmployeesList onAddEmployees={handleAddEmployees} />
        )}
      </Layout>
    );
  }

  return null;
};

export default Index;
