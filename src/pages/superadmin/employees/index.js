import React from 'react'
import Layout from '@/components/Layout'
import EmployeeList from '@/components/employees/EmployeeList'
import EditEmployee from '@/components/employees/EditEmployee';
import CreateEmployes from '@/components/employees/CreateEmployees';
import { useState } from 'react';
const Index = () => {
  //   const [showCreateEmployee, setShowCreateEmployee] = useState(false);
  //   const[editingEmployee, setEditingEmployee] = useState(null);
  
  //   const handleShowCreateEmployee = () => {
  //     setShowCreateEmployee(true);
  //   };
  //   const handleBackToList = () => {
  //       setShowCreateEmployee(false);
  //       setEditingEmployee(null);
  //     };
  // const handleEditEmployee =(employee) =>{
  //   setEditingEmployee(employee)
  //   setShowCreateEmployee(true);
  // }
  // const handleUpdateEmployee =()=>{
  //   handleBackToList();
  // }
    return (
      <Layout>
        {/* {showCreateEmployee ? (
          editingEmployee ?(
            <EditEmployee  onUpdateEmployee={handleUpdateEmployee}/>
          ): (
          <CreateEmployes onEmployeeList={handleBackToList} />
          )
        ) : (
          <EmployeeList onCreateEmployee={handleShowCreateEmployee} onEditEmployee={handleEditEmployee} />
        )} */}
        <EmployeeList />
      </Layout>
    );
  };
  
  export default Index;
