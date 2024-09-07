import React, { useState } from 'react';
import Layout from '@/components/Layout';
import HolidayList from '@/components/holiday/HolidayList';
import AddHoliday from '@/components/holiday/AddHoliday';

const Index = () => {
  const [showAddHoliday, setShowAddHoliday] = useState(false);

  const handleAddHoliday = () => {
    setShowAddHoliday(true);
  };

  const handleShowHolidayList = () => {
    setShowAddHoliday(false);
  };

  const handleSubmit = () => {
   
    handleShowHolidayList();
  };

  return (
    <Layout type="admin">
      {showAddHoliday ? (
        <AddHoliday onHolidayList={handleShowHolidayList} />
      ) : (
        <HolidayList onAddHoliday={handleAddHoliday} />
      )}
    </Layout>
  );
};

export default Index;
