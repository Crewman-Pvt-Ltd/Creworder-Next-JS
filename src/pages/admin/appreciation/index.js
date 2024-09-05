import React, { useState } from 'react';
import Layout from '@/components/Layout';
import AppreciationList from '@/components/appreciation/AppreciationList';
import AddAppreciation from '@/components/Appreciation/AddAppreciation';

const Index = () => {
  const [showAddAppreciation, setShowAddAppreciation] = useState(false);

  const handleAddAppreciation = () => {
    setShowAddAppreciation(true);
  };

  const handleShowAppreciationList = () => {
    setShowAddAppreciation(false);
  };

  const handleSubmit = () => {
   
    handleShowAppreciationList();
  };

  return (
    <Layout type="admin">
      {showAddAppreciation ? (
        <AddAppreciation onAppreciationList={handleShowAppreciationList} />
      ) : (
        <AppreciationList onAddAppreciation={handleAddAppreciation} />
      )}
    </Layout>
  );
};

export default Index;
