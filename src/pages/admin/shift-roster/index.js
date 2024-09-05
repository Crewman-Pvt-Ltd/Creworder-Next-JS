import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ShiftRosterList from '@/components/shift-roster/ShiftRosterList';
import AddShiftRoster from '@/components/shift-roster/AddShiftRoster';

const Index = () => {
  const [showAddShiftRoster, setShowAddShiftRoster] = useState(false);

  const handleAddShiftRoster = () => {
    setShowAddShiftRoster(true);
  };

  const handleShowShiftRosterList = () => {
    setShowAddShiftRoster(false);
  };

  const handleSubmit = () => {
   
    handleShowShiftRosterList();
  };

  return (
    <Layout type="admin">
      {showAddShiftRoster ? (
        <AddShiftRoster onShiftRosterList={handleShowShiftRosterList} />
      ) : (
        <ShiftRosterList onAddShiftRoster={handleAddShiftRoster} />
      )}
    </Layout>
  );
};

export default Index;
