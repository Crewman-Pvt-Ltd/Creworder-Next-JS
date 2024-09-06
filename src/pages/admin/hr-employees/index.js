import React, { useState } from 'react';
import Layout from '@/components/Layout';
import EmployeesList from '@/components/hr-employees/EmployeesList';
import AddEmployees  from '@/components/hr-employees/AddEmployees';

const Index = () => {
  const [showAddEmployees, setShowAddEmployees] = useState(false);

  const handleAddEmployees = () => {
    setShowAddEmployees(true);
  };

  const handleShowEmployeesList = () => {
    setShowAddEmployees(false);
  };

  const handleSubmit = () => {
   
    handleShowEmployeesList();
  };

  return (
    <Layout type="admin">
      {showAddEmployees ? (
        <AddEmployees onEmployeesList={handleShowEmployeesList} />
      ) : (
        <EmployeesList onAddEmployees={handleAddEmployees} />
      )}
    </Layout>
  );
};

export default Index;
