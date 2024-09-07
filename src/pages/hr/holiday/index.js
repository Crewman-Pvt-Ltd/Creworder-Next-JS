import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import HolidayList from '@/components/holiday/HolidayList';
import AddHoliday from '@/components/holiday/AddHoliday';
import { usePermissions } from "@/contexts/PermissionsContext";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
const Index = () => {
  const { permissionsData, permissionLoading } = usePermissions();

  const router = useRouter();

  const userRole = permissionsData?.role;

  useEffect(() => {
    if (!permissionLoading && !permissionsData?.role) {
      router.push("/login");
    }
  }, [permissionLoading, permissionsData, router]);

  if (permissionLoading) return <Loader />;
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

  if (userRole) {
    return (
      <Layout type={userRole}>
      {showAddHoliday ? (
        <AddHoliday onHolidayList={handleShowHolidayList} />
      ) : (
        <HolidayList onAddHoliday={handleAddHoliday} />
      )}
    </Layout>
    );
  }

 
  return null;
};

export default Index;
