import React, { useState } from 'react';
import Layout from '@/components/Layout';
import AttendanceList from '@/components/Attendance/AttendanceList';
import AddAttendance from '@/components/Attendance/AddAttendance';

const Index = () => {
  const [showAddAttendance, setShowAddAttendance] = useState(false);

  const handleAddAttendance = () => {
    setShowAddAttendance(true);
  };

  const handleShowAttendanceList = () => {
    setShowAddAttendance(false);
  };

  const handleSubmit = () => {
   
    handleShowAttendanceList();
  };

  return (
    <Layout type="admin">
      {showAddAttendance ? (
        <AddAttendance onAttendanceList={handleShowAttendanceList} />
      ) : (
        <AttendanceList onAddAttendance={handleAddAttendance} />
      )}
    </Layout>
  );
};

export default Index;
