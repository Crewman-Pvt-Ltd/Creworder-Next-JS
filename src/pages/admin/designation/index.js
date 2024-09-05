import React, { useState } from 'react';
import Layout from '@/components/Layout';
import DesignationList from '@/components/designation/DesignationList';
import AddDesignation from '@/components/designation/AddDesignation';

const Index = () => {
  const [showAddDesignation, setShowAddDesignation] = useState(false);

  const handleAddDesignation = () => {
    setShowAddDesignation(true);
  };

  const handleShowDesignationList = () => {
    setShowAddDesignation(false);
  };

  const handleSubmit = () => {
   
    handleShowDesignationList();
  };

  return (
    <Layout type="admin">
      {showAddDesignation ? (
        <AddDesignation onDesignationList={handleShowDesignationList} />
      ) : (
        <DesignationList onAddDesignation={handleAddDesignation} />
      )}
    </Layout>
  );
};

export default Index;
