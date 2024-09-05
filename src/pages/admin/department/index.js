import React, { useState } from 'react';
import Layout from '@/components/Layout';
import DepartmentList from '@/components/Department/DepartmentList';
import AddDepartment from '@/components/Department/AddDepartment';


const Index = () => {
  const [showAddDepartment, setShowAddDepartment] = useState(false);

  const handleAddDepartment = () => {
    setShowAddDepartment(true);
  };

  const handleShowDepartmentList = () => {
    setShowAddDepartment(false);
  };

  const handleSubmit = () => {
   
    handleShowDepartmentList();
  };

  return (
    <Layout type="admin">
      {showAddDepartment ? (
        <AddDepartment onDepartmentList={handleShowDepartmentList} />
      ) : (
        <DepartmentList onAddDepartment={handleAddDepartment} />
      )}
    </Layout>
  );
};

export default Index;
