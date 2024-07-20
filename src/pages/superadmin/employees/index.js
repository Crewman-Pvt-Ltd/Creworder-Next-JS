import React from 'react'
import Layout from '@/components/Layout'
import EmployeeList from '@/components/employees/EmployeeList'
import CreateEmployees from '@/components/employees/CreateEmployees'
import CreateEmployes from '@/components/employees/CreateEmployees';
import { useState } from 'react';
const Index = () => {
    const [showCreateEmployee, setShowCreateEmployee] = useState(false);
  
    const handleShowCreateEmployee = () => {
      setShowCreateEmployee(true);
    };
    const handleBackToList = () => {
        setShowCreateEmployee(false);
      };
  
    return (
      <Layout>
        {showCreateEmployee ? (
          <CreateEmployes onEmployeeList={handleBackToList} />
        ) : (
          <EmployeeList onCreateEmployee={handleShowCreateEmployee} />
        )}
      </Layout>
    );
  };
  
  export default Index;
