import React, { useState } from 'react';
import Layout from '@/components/Layout';
import LeaveList from '@/components/leaves/LeaveList';
import AddLeave from '@/components/leaves/AddLeave';


const Index = () => {
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

  return (
    <Layout type="admin">
      {showAddLeave ? (
        <AddLeave onLeaveList={handleShowLeaveList} />
      ) : (
        <LeaveList onAddLeave={handleAddLeave} />
      )}
    </Layout>
  );
};

export default Index;
