import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import AttendanceList from '@/components/Attendance/AttendanceList';
import AddAttendance from '@/components/Attendance/AddAttendance';
import { usePermissions } from "@/contexts/PermissionsContext";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
const Index = () => {
  const { permissionsData, permissionLoading } = usePermissions();
  const [showAddAttendance, setShowAddAttendance] = useState(false);
  const router = useRouter();

  const userRole = permissionsData?.role;

  
  useEffect(() => {
    if (!permissionLoading && !permissionsData?.role) {
      router.push("/login");
    }
  }, [permissionLoading, permissionsData, router]);

  if (permissionLoading) return <Loader />;


  const handleAddAttendance = () => {
    setShowAddAttendance(true);
  };

  const handleShowAttendanceList = () => {
    setShowAddAttendance(false);
  };

  const handleSubmit = () => {
   
    handleShowAttendanceList();
  };

  if (userRole) {
    return (
      <Layout type={userRole}>
      {showAddAttendance ? (
        <AddAttendance onAttendanceList={handleShowAttendanceList} />
      ) : (
        <AttendanceList onAddAttendance={handleAddAttendance} />
      )}
 </Layout>
    );
  }


  return null;
};

export default Index;
